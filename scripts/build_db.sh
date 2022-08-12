set -e
cd file
[[ -f configure ]] || autoreconf --install
./configure
make
mv magic/magic.mgc ../wasm
