#include <stdio.h>
#include <stdlib.h>
#include "../wasm/api.h"

int main() {
    FILE *fp = fopen("test_sanitizer.c", "rb");
    if(!fp) {
        return 1;
    }
    fseek(fp, 0, SEEK_END);
    size_t len = ftell(fp);
    rewind(fp);
    char *buf = malloc(len);
    fread(buf, len, 1, fp);

    init();
    puts(get_type(buf, len));
    puts(get_mime(buf, len));
    puts(get_extension(buf, len));

    free(buf);
    return 0;
}
