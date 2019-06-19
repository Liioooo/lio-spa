cli
===



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/cli.svg)](https://npmjs.org/package/cli)
[![Downloads/week](https://img.shields.io/npm/dw/cli.svg)](https://npmjs.org/package/cli)
[![License](https://img.shields.io/npm/l/cli.svg)](https://github.com/packages/cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g cli
$ lio-spa COMMAND
running command...
$ lio-spa (-v|--version|version)
cli/0.0.0 win32-x64 node-v10.13.0
$ lio-spa --help [COMMAND]
USAGE
  $ lio-spa COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`lio-spa hello [FILE]`](#lio-spa-hello-file)
* [`lio-spa help [COMMAND]`](#lio-spa-help-command)

## `lio-spa hello [FILE]`

describe the command here

```
USAGE
  $ lio-spa hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ lio-spa hello
  hello world from ./src/hello.ts!
```

_See code: [src\commands\hello.ts](https://github.com/packages/cli/blob/v0.0.0/src\commands\hello.ts)_

## `lio-spa help [COMMAND]`

display help for lio-spa

```
USAGE
  $ lio-spa help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.0/src\commands\help.ts)_
<!-- commandsstop -->
