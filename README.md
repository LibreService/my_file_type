# My File Type
![](https://img.shields.io/github/license/LibreService/my_file_type)

Find type of your file in a fast and secure way.

https://my-file-type.vercel.app/

## Development workflow
My File Type can be built on Linux and macOS.

For Windows, you may use WSL.
### Install node
You may use [nvm](https://github.com/nvm-sh/nvm) to install node.
### Install pnpm and dev dependencies
```sh
npm i -g pnpm
pnpm i
```
### Install autoconf, automake and libtool
```sh
# Ubuntu
apt install autoconf automake libtool
# macOS
brew install autoconf automake libtool
```
### Install emsdk
https://emscripten.org/docs/getting_started/downloads.html
### Get submodule
```sh
git submodule init
git submodule update
```
### Build wasm
```sh
pnpm run native
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
### Check type
```sh
pnpm run check
```
### Build
```sh
pnpm run build
```
### Test
```sh
pnpm run test
```
### Preview
```sh
pnpm run preview
```

## License
AGPLv3+
