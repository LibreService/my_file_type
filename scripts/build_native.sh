set -e

root=$PWD
n=`python -c 'import multiprocessing as mp; print(mp.cpu_count())'`
magic_bz2_path=$root/wasm/magic.mgc.bz2

cmake bzip2 -B build/bzip2_native \
  -DENABLE_APP:BOOL=OFF \
  -DCMAKE_BUILD_TYPE:STRING="Release"
cmake --build build/bzip2_native -j $n

mkdir -p build/file_native && pushd build/file_native
[[ -f $root/file/configure ]] || autoreconf --install $root/file
$root/file/configure --disable-bzlib
make -j $n
bzip2 -9 -c magic/magic.mgc > $magic_bz2_path
popd

os=`uname`
if [[ $os == 'Linux' ]]; then
  cd test
  [[ -f magic.mgc.bz2 ]] || ln -s $magic_bz2_path
  libmagic_path=$root/build/file_native/src/.libs
  libbz2_path=$root/build/bzip2_native
  gcc \
    -fsanitize=address \
    -o test_sanitizer \
    ../wasm/api.c test_sanitizer.c \
    -L $libbz2_path -l bz2 \
    -L $libmagic_path -l magic
  LD_LIBRARY_PATH=$libbz2_path:$libmagic_path ./test_sanitizer
  diff magic.mgc $root/build/file_native/magic/magic.mgc
fi
