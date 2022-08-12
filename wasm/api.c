#include <stdio.h>
#include <emscripten.h>
#include "magic.h"

static magic_t magic_none, magic_mime, magic_extension;

EMSCRIPTEN_KEEPALIVE
void init() {
    static const char *magic_path = "magic.mgc";
    magic_none = magic_open(MAGIC_NONE);
    magic_mime = magic_open(MAGIC_MIME);
    magic_extension = magic_open(MAGIC_EXTENSION);
    magic_load(magic_none, magic_path);
    magic_load(magic_mime, magic_path);
    magic_load(magic_extension, magic_path);
}

EMSCRIPTEN_KEEPALIVE
const char *get_type(const char *buf, size_t len) {
    return magic_buffer(magic_none, buf, len);
}

EMSCRIPTEN_KEEPALIVE
const char *get_mime(const char *buf, size_t len) {
    return magic_buffer(magic_mime, buf, len);
}

EMSCRIPTEN_KEEPALIVE
const char *get_extension(const char *buf, size_t len) {
    return magic_buffer(magic_extension, buf, len);
}
