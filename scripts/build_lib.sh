set -e

root=$PWD

emcmake cmake bzip2 -B build/bzip2_wasm \
  -DENABLE_APP=OFF \
  -DCMAKE_BUILD_TYPE="Release"
cmake --build build/bzip2_wasm
cp build/bzip2_wasm/libbz2.a wasm

mkdir -p build/file_wasm && pushd build/file_wasm
[[ -f $root/file/configure ]] || autoreconf --install $root/file
emconfigure $root/file/configure \
  --enable-static \
  --disable-shared
cd src
cp $root/build/file_native/src/magic.h .
emmake make libmagic.la
cp .libs/libmagic.a $root/wasm/libmagic.so
