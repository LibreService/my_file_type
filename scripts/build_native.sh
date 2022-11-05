set -e

pushd bzip2
mkdir -p build && cd build
cmake .. -DENABLE_APP=OFF -DCMAKE_BUILD_TYPE="Release"
cmake --build .
popd

magic_bz2_path=wasm/magic.mgc.bz2

pushd file
[[ -f configure ]] || autoreconf --install
./configure
make clean
make
bzip2 -9 -c magic/magic.mgc > ../$magic_bz2_path
popd

os=`uname`
if [[ $os == 'Linux' ]]; then
  cd test
  [[ -f magic.mgc.bz2 ]] || ln -s ../$magic_bz2_path
  libmagic_path=../file/src/.libs
  libbz2_path=../bzip2/build
  gcc \
    -fsanitize=address \
    -o test_sanitizer \
    ../wasm/api.c test_sanitizer.c \
    -L $libbz2_path -l bz2 \
    -L $libmagic_path -l magic
  LD_LIBRARY_PATH=$libbz2_path:$libmagic_path ./test_sanitizer
  diff magic.mgc ../file/magic/magic.mgc
fi
