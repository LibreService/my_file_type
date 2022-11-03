#include "../file/src/magic.h"

extern magic_t magic_none, magic_mime, magic_extension;

void init();
const char *get_type(const char *buf, size_t len);
const char *get_mime(const char *buf, size_t len);
const char *get_extension(const char *buf, size_t len);
