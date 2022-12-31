set -e

root=$PWD
n=`python -c 'import multiprocessing as mp; print(mp.cpu_count())'`

emcmake cmake bzip2 -B build/bzip2_wasm \
  -DENABLE_APP:BOOL=OFF \
  -DENABLE_STATIC_LIB:BOOL=ON \
  -DENABLE_SHARED_LIB:BOOL=OFF \
  -DCMAKE_BUILD_TYPE:STRING="Release"
cmake --build build/bzip2_wasm -j $n
cp build/bzip2_wasm/libbz2_static.a wasm

mkdir -p build/file_wasm && pushd build/file_wasm
[[ -f $root/file/configure ]] || autoreconf --install $root/file
emconfigure $root/file/configure \
  --enable-static \
  --disable-shared
cd src
cp $root/build/file_native/src/magic.h .
emmake make -j $n libmagic.la
cp .libs/libmagic.a $root/wasm/libmagic.so
