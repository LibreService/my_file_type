<script lang="ts">
import { ref } from 'vue'
import { NCode, NCard, NConfigProvider, NSelect, NScrollbar } from 'naive-ui'
import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import c from 'highlight.js/lib/languages/c'
import clojure from 'highlight.js/lib/languages/clojure'
import cmake from 'highlight.js/lib/languages/cmake'
import coffeescript from 'highlight.js/lib/languages/coffeescript'
import cpp from 'highlight.js/lib/languages/cpp'
import csharp from 'highlight.js/lib/languages/csharp'
import css from 'highlight.js/lib/languages/css'
import dart from 'highlight.js/lib/languages/dart'
import delphi from 'highlight.js/lib/languages/delphi'
import dockerfile from 'highlight.js/lib/languages/dockerfile'
import dos from 'highlight.js/lib/languages/dos'
import elixir from 'highlight.js/lib/languages/elixir'
import erlang from 'highlight.js/lib/languages/erlang'
import fortran from 'highlight.js/lib/languages/fortran'
import go from 'highlight.js/lib/languages/go'
import groovy from 'highlight.js/lib/languages/groovy'
import haskell from 'highlight.js/lib/languages/haskell'
import ini from 'highlight.js/lib/languages/ini'
import java from 'highlight.js/lib/languages/java'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import julia from 'highlight.js/lib/languages/julia'
import kotlin from 'highlight.js/lib/languages/kotlin'
import latex from 'highlight.js/lib/languages/latex'
import lisp from 'highlight.js/lib/languages/lisp'
import lua from 'highlight.js/lib/languages/lua'
import makefile from 'highlight.js/lib/languages/makefile'
import markdown from 'highlight.js/lib/languages/markdown'
import matlab from 'highlight.js/lib/languages/matlab'
import objectivec from 'highlight.js/lib/languages/objectivec'
import ocaml from 'highlight.js/lib/languages/ocaml'
import perl from 'highlight.js/lib/languages/perl'
import php from 'highlight.js/lib/languages/php'
import plaintext from 'highlight.js/lib/languages/plaintext'
import powershell from 'highlight.js/lib/languages/powershell'
import prolog from 'highlight.js/lib/languages/prolog'
import python from 'highlight.js/lib/languages/python'
import r from 'highlight.js/lib/languages/r'
import ruby from 'highlight.js/lib/languages/ruby'
import rust from 'highlight.js/lib/languages/rust'
import scala from 'highlight.js/lib/languages/scala'
import sql from 'highlight.js/lib/languages/sql'
import swift from 'highlight.js/lib/languages/swift'
import typescript from 'highlight.js/lib/languages/typescript'
import verilog from 'highlight.js/lib/languages/verilog'
import vbscript from 'highlight.js/lib/languages/vbscript'
import xml from 'highlight.js/lib/languages/xml'
import yaml from 'highlight.js/lib/languages/yaml'
import x86asm from 'highlight.js/lib/languages/x86asm'

const hljsLang = {
  bash,
  c,
  clojure,
  cmake,
  coffeescript,
  cpp,
  csharp,
  css,
  dart,
  delphi,
  dockerfile,
  dos,
  elixir,
  erlang,
  fortran,
  go,
  groovy,
  haskell,
  ini,
  java,
  javascript,
  json,
  julia,
  kotlin,
  latex,
  lisp,
  lua,
  makefile,
  markdown,
  matlab,
  objectivec,
  ocaml,
  perl,
  php,
  plaintext,
  powershell,
  prolog,
  python,
  r,
  ruby,
  rust,
  scala,
  sql,
  swift,
  typescript,
  verilog,
  vbscript,
  xml,
  yaml,
  x86asm
}

const guessLang2Hljs: {
  [key: string]: string
} = {
  'Plain Text': 'plaintext',
  Assembly: 'x86asm',
  Batchfile: 'dos',
  C: 'c',
  'C#': 'csharp',
  'C++': 'cpp',
  Clojure: 'clojure',
  CMake: 'cmake',
  // COBOL
  CoffeeScript: 'coffeescript',
  CSS: 'css',
  // CSV
  Dart: 'dart',
  // DM
  Dockerfile: 'dockerfile',
  Elixir: 'elixir',
  Erlang: 'erlang',
  Fortran: 'fortran',
  Go: 'go',
  Groovy: 'groovy',
  Haskell: 'haskell',
  HTML: 'xml',
  INI: 'ini',
  Java: 'java',
  JavaScript: 'javascript',
  JSON: 'json',
  Julia: 'julia',
  Kotlin: 'kotlin',
  Lisp: 'lisp',
  Lua: 'lua',
  Makefile: 'makefile',
  Markdown: 'markdown',
  Matlab: 'matlab',
  'Objective-C': 'objectivec',
  OCaml: 'ocaml',
  Pascal: 'delphi',
  Perl: 'perl',
  PHP: 'php',
  PowerShell: 'powershell',
  Prolog: 'prolog',
  Python: 'python',
  R: 'r',
  Ruby: 'ruby',
  Rust: 'rust',
  Scala: 'scala',
  Shell: 'bash',
  SQL: 'sql',
  Swift: 'swift',
  TeX: 'latex',
  TOML: 'ini',
  TypeScript: 'typescript',
  Verilog: 'verilog',
  'Visual Basic': 'vbscript',
  XML: 'xml',
  YAML: 'yaml'
}

for (const [key, value] of Object.entries(hljsLang)) {
  hljs.registerLanguage(key, value)
}

const options = Object.keys(guessLang2Hljs).map(key => ({ label: key, value: key }))
</script>

<script setup lang="ts">
const props = defineProps<{
  code: string
  predictedLanguage: string
}>()

const language = ref(props.predictedLanguage)

function fallback () {
  return options[0]
}
</script>

<template>
<n-config-provider :hljs="hljs">
  <n-card>
    <div style="display: flex; align-items: center; justify-content: flex-end">
      Language:
      <n-select v-model:value="language" :options="options" :fallback-option="fallback" style="width: 160px; margin-left: 8px"/>
    </div>
    <n-scrollbar x-scrollable>
      <n-code :code="code" :language="guessLang2Hljs[language]" show-line-numbers style="margin-top: 8px"/>
    </n-scrollbar>
  </n-card>
</n-config-provider>
</template>
