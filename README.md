# My File Type
![](https://img.shields.io/github/license/LibreService/my_file_type)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/LibreService/my_file_type.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/LibreService/my_file_type/context:javascript)

Find type of your file in a fast and secure way.

https://my-file-type.vercel.app/

## Development workflow
### Install node and pnpm
### Install autoconf, automake and libtool
### Install emsdk
https://emscripten.org/docs/getting_started/downloads.html
### Get submodule
```sh
git submodule init
git submodule update
```
### Build wasm
```sh
pnpm run db
pnpm run lib
pnpm run wasm
```
### Run develop server
```sh
pnpm run dev
```
### Lint
```sh
pnpm run lint:fix
```
### Build
```sh
pnpm run build
```
### Preview
```sh
pnpm run preview
```

## License
AGPLv3+
