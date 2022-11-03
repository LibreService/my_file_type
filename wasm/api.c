#include <stdio.h>
#include "api.h"

magic_t magic_none, magic_mime, magic_extension;

void init() {
    static const char *magic_path = "magic.mgc";
    magic_none = magic_open(MAGIC_NONE);
    magic_mime = magic_open(MAGIC_MIME);
    magic_extension = magic_open(MAGIC_EXTENSION);
    magic_load(magic_none, magic_path);
    magic_load(magic_mime, magic_path);
    magic_load(magic_extension, magic_path);
}

const char *get_type(const char *buf, size_t len) {
    return magic_buffer(magic_none, buf, len);
}

const char *get_mime(const char *buf, size_t len) {
    return magic_buffer(magic_mime, buf, len);
}

const char *get_extension(const char *buf, size_t len) {
    return magic_buffer(magic_extension, buf, len);
}
