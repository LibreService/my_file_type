set -e
cd file
[[ -f configure ]] || autoreconf --install
emconfigure ./configure
rm a.wasm
cd src
emmake make libmagic.la
cp magic.h ../../wasm
mv .libs/libmagic.so.1.0.0 ../../wasm/libmagic.so
