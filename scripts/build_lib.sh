set -e

pushd bzip2
rm -rf build/* && cd build
emcmake cmake .. -DENABLE_APP=OFF -DCMAKE_BUILD_TYPE="Release"
cmake --build .
mv libbz2.a ../../wasm
popd

cd file
[[ -f configure ]] || autoreconf --install
emconfigure ./configure
rm a.wasm
cd src
emmake make libmagic.la

os=`uname`
if [[ $os == 'Linux' ]]; then
  mv .libs/libmagic.so.1.0.0 ../../wasm/libmagic.so
elif [[ $os == 'Darwin' ]]; then
  mv .libs/libmagic.1.dylib ../../wasm/libmagic.dylib
else
  echo 'Unsupported OS'
  exit 1
fi
