set -e
cd file
[[ -f configure ]] || autoreconf --install
emconfigure ./configure
rm a.wasm
cd src
emmake make libmagic.la
cp magic.h ../../wasm

os=`uname`
if [[ $os == 'Linux' ]]; then
  mv .libs/libmagic.so.1.0.0 ../../wasm/libmagic.so
elif [[ $os == 'Darwin' ]]; then
  mv .libs/libmagic.1.dylib ../../wasm/libmagic.dylib
else
  echo 'Unsupported OS'
  exit 1
fi
