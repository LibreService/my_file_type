set -e
cd wasm
emcc \
  -O2 \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s EXPORTED_RUNTIME_METHODS='["cwrap"]' \
  --preload-file magic.mgc \
  -o ../public/magic.js \
  api.c \
  -L . -l magic
