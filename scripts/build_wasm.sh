set -e
cd wasm
emcc \
  -O2 \
  -s STACK_SIZE=5MB \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s EXPORTED_FUNCTIONS=_init,_get_type,_get_mime,_get_extension \
  -s EXPORTED_RUNTIME_METHODS='["ccall"]' \
  --preload-file magic.mgc.bz2 \
  -o ../public/magic.js \
  api.c \
  -L . -l bz2 -l magic
