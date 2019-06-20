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
$ npm install -g @lio-spa/cli
$ lio-spa COMMAND
running command...
$ lio-spa (-v|--version|version)
@lio-spa/cli/1.1.0 win32-x64 node-v10.13.0
$ lio-spa --help [COMMAND]
USAGE
  $ lio-spa COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`lio-spa build`](#lio-spa-build)
* [`lio-spa help [COMMAND]`](#lio-spa-help-command)
* [`lio-spa new PROJECTNAME`](#lio-spa-new-projectname)
* [`lio-spa serve`](#lio-spa-serve)

## `lio-spa build`

Builds the application.

```
USAGE
  $ lio-spa build

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ lio-spa build
  Builds the application
```

_See code: [src\commands\build.ts](https://github.com/Liiioooo/lio-spa/blob/v1.1.0/src\commands\build.ts)_

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

## `lio-spa new PROJECTNAME`

Creates a new workspace and an initial Lio-SPA app.

```
USAGE
  $ lio-spa new PROJECTNAME

OPTIONS
  -h, --help   show CLI help
  --noInitGit

EXAMPLE
  $ lio-spa new myNewApp
  Creates a new workspace and an initial Lio-SPA app in ./myNewApp.
```

_See code: [src\commands\new.ts](https://github.com/Liiioooo/lio-spa/blob/v1.1.0/src\commands\new.ts)_

## `lio-spa serve`

Serves the application in the working directory.

```
USAGE
  $ lio-spa serve

OPTIONS
  -h, --help   show CLI help
  --port=port  [default: 8200]

EXAMPLE
  $ lio-spa serve
  Serves the application in the working directory
```

_See code: [src\commands\serve.ts](https://github.com/Liiioooo/lio-spa/blob/v1.1.0/src\commands\serve.ts)_
<!-- commandsstop -->
