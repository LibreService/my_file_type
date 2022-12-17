#include "../build/file_native/src/magic.h"
#include "../bzip2/bzlib.h"

#define OBUF_LEN 5000

extern magic_t magic_none, magic_mime, magic_extension;

void init();
const char *get_type(const char *buf, size_t len);
const char *get_mime(const char *buf, size_t len);
const char *get_extension(const char *buf, size_t len);
