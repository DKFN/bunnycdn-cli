bnycdn

======

Simple cli for BunnyCDN service. This app is not an official one.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/bnycdn.svg)](https://npmjs.org/package/bnycdn)
[![Downloads/week](https://img.shields.io/npm/dw/bnycdn.svg)](https://npmjs.org/package/bnycdn)
[![License](https://img.shields.io/npm/l/bnycdn.svg)](https://github.com/DKFN/bnycdn/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g bnycdn
$ bnycdn COMMAND
running command...
$ bnycdn (-v|--version|version)
bnycdn/0.0.1 linux-x64 node-v8.10.0
$ bnycdn --help [COMMAND]
USAGE
  $ bnycdn COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`bnycdn hello [FILE]`](#bnycdn-hello-file)
* [`bnycdn help [COMMAND]`](#bnycdn-help-command)
* [`bnycdn key [NAME]`](#bnycdn-key-name)
* [`bnycdn ls [LS COMMAND FOR STORAGES]`](#bnycdn-ls-ls-command-for-storages)
* [`bnycdn pz [PULLZONES]`](#bnycdn-pz-pullzones)

## `bnycdn hello [FILE]`

describe the command here

```
USAGE
  $ bnycdn hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ bnycdn hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/DKFN/bnycdn/blob/v0.0.1/src/commands/hello.ts)_

## `bnycdn help [COMMAND]`

display help for bnycdn

```
USAGE
  $ bnycdn help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_

## `bnycdn key [NAME]`

describe the command here

```
USAGE
  $ bnycdn key [NAME]

OPTIONS
  -d, --del=del      Deletes a key with given name
  -h, --help         show CLI help
  -l, --list         lists all keys stored and their names
  -n, --name=name    name to print
  -s, --set=set      Sets a key with given name
  -v, --value=value  Gives a value for add and set operations

EXAMPLE
  $ bnycdn key -l
       hello world from ./src/hello.ts!
```

_See code: [src/commands/key.ts](https://github.com/DKFN/bnycdn/blob/v0.0.1/src/commands/key.ts)_

## `bnycdn ls [LS COMMAND FOR STORAGES]`

describe the command here

```
USAGE
  $ bnycdn ls [LS COMMAND FOR STORAGES]

OPTIONS
  -h, --help             show CLI help
  -s, --storage=storage

EXAMPLE
  $ bnycdn pz -l
       Lists all the pul zone
```

_See code: [src/commands/ls.ts](https://github.com/DKFN/bnycdn/blob/v0.0.1/src/commands/ls.ts)_

## `bnycdn pz [PULLZONES]`

describe the command here

```
USAGE
  $ bnycdn pz [PULLZONES]

OPTIONS
  -h, --help  show CLI help
  -l, --list  lists all keys stored and their names

EXAMPLE
  $ bnycdn pz -l
       Lists all the pul zone
```

_See code: [src/commands/pz.ts](https://github.com/DKFN/bnycdn/blob/v0.0.1/src/commands/pz.ts)_
<!-- commandsstop -->
