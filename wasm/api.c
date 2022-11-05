#include <stdio.h>
#include "api.h"

magic_t magic_none, magic_mime, magic_extension;

void init() {
    static const char *magic_path = "magic.mgc";

    static const char *magic_bz2_path = "magic.mgc.bz2";
    FILE *magic = fopen(magic_path, "wb");
    FILE *bz2 = fopen(magic_bz2_path, "rb");
    int bzerr;
    BZFILE* bzf = BZ2_bzReadOpen(NULL, bz2, 0, 0, NULL, 0);

    do {
        char obuf[OBUF_LEN];
        int nread = BZ2_bzRead(&bzerr, bzf, obuf, OBUF_LEN);
        if (nread > 0) {
            fwrite(obuf, 1, nread, magic);
        }
    } while(bzerr == BZ_OK);

    BZ2_bzReadClose(NULL, bzf);
    fclose(bz2);
    fclose(magic);

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
