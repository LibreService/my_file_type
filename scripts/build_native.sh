set -e
cd file
[[ -f configure ]] || autoreconf --install
./configure
make clean
make
mv magic/magic.mgc ../wasm

cd ../test
ln -s ../wasm/magic.mgc
lib_path=../file/src/.libs
gcc \
  -fsanitize=address \
  -o test_sanitizer \
  ../wasm/api.c test_sanitizer.c \
  -L $lib_path -l magic
LD_LIBRARY_PATH=$lib_path ./test_sanitizer
