bnycdn

======

Simple cli for BunnyCDN service. This app is not an official one.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
<!-- [![Version](https://img.shields.io/npm/v/bnycdn.svg)](https://npmjs.org/package/bnycdn)
#[![Downloads/week](https://img.shields.io/npm/dw/bnycdn.svg)](https://npmjs.org/package/bnycdn)
[![License](https://img.shields.io/npm/l/bnycdn.svg)](https://github.com/DKFN/bnycdn/blob/master/package.json)
!-->

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
As the CLI is still very limited in functionnalities and some part of it is quite confusing and is not tested.

So, only a nightly build is available at the moment if you want to check early functionalities.
```sh-session
wget http://cdn.infra.tetel.in/bunnycdncli/nightly/bnycdn_0.0.2-1_amd64.deb
sudo dpkg -i bnycdn_0.0.2-1_amd64.deb
```

You should be able to call bnycdn after installation:
```shell
➜  bunnycdn-cli git:(master) ✗bnycdn                                                                          
Simple cli for BunnyCDN service. This app is not an official one.

VERSION
  bnycdn/0.0.2 linux-x64 node-v8.10.0

USAGE
  $ bnycdn [COMMAND]

COMMANDS
  cp    This is the cp-like command for BunnyCDN storages. Cp has only upload implemented for now
  help  display help for bnycdn
  key   To add / delete / set a key for a pullzon or a storage
  ls    describe the command here
  pz    Only allows you to list pull zones so far
```

PR and forks are very welcomed :)

For developpement, just fork and clone your repo, instead of running `bnycdn` you must launch `./bin/run` from project root

( The package is not yet available via NPM)
```sh-session
$ npm install -g bnycdn
$ bnycdn COMMAND
running command...
$ bnycdn (-v|--version|version)
bnycdn/0.0.2 linux-x64 node-v8.10.0
$ bnycdn --help [COMMAND]
USAGE
  $ bnycdn COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`bnycdn cp []`](#bnycdn-cp)
* [`bnycdn help [COMMAND]`](#bnycdn-help-command)
* [`bnycdn key []`](#bnycdn-key)
* [`bnycdn ls []`](#bnycdn-ls)
* [`bnycdn pz [PULLZONES]`](#bnycdn-pz-pullzones)

## `bnycdn cp []`

This is the cp-like command for BunnyCDN storages. Cp has only upload implemented for now

```
USAGE
  $ bnycdn cp []

OPTIONS
  -R, --R
  -f, --from=from
  -h, --help             show CLI help
  -s, --storage=storage
  -t, --to=to

EXAMPLE

       ### One file upload
    
       ➜  bunnycdn-cli git:(master) ✗ ./bin/run cp -s tetelincdn --from ./dist/deb/bnycdn_0.0.2-1_amd64.deb --to 
  /tetelincdn/nightly/deb/test.deb
       ⌛[UP]                 /tetelincdn/nightly/deb/test.deb => 8.78 MB
       ✔[OK]                 /tetelincdn/nightly/deb/test.deb => 8.78 MB

    
       ### Recursive file upload
    
       ➜  bunnycdn-cli git:(master) ✗ ./bin/run cp -s dkfn -R --from ./dist --to /dkfn/nightly                
        ⌛[UP] [ ∞ 0| ⇈ 1]    /dkfn/nightly/deb/Packages => 1.04 KB
        ⌛[UP] [ ∞ 0| ⇈ 2]    /dkfn/nightly/deb/Packages.bz2 => 656 B
        ⌛[UP] [ ∞ 0| ⇈ 3]    /dkfn/nightly/deb/Packages.gz => 597 B
        ⌛[UP] [ ∞ 0| ⇈ 4]    /dkfn/nightly/deb/Packages.xz => 656 B
        ✔[OK] [ ∞ 3| ⇈ 3]    /dkfn/nightly/deb/Packages.xz => 656 B
        ✔[OK] [ ∞ 3| ⇈ 2]    /dkfn/nightly/deb/Packages.gz => 597 B
        ⌛[UP] [ ∞ 2| ⇈ 3]    /dkfn/nightly/deb/bnycdn_0.0.2-1_amd64.deb => 8.78 MB
        ⌛[UP] [ ∞ 1| ⇈ 4]    /dkfn/nightly/deb/bnycdn_0.0.2-1_armel.deb => 7.65 MB
        ✔[OK] [ ∞ 1| ⇈ 3]    /dkfn/nightly/deb/Packages => 1.04 KB
        ✔[OK] [ ∞ 1| ⇈ 2]    /dkfn/nightly/deb/Packages.bz2 => 656 B
        ⌛[UP] [ ∞ 0| ⇈ 3]    /dkfn/nightly/deb/Release => 1.96 KB
        ✔[OK] [ ∞ 0| ⇈ 2]    /dkfn/nightly/deb/Release => 1.96 KB
        ✔[OK] [ ∞ 0| ⇈ 1]    /dkfn/nightly/deb/bnycdn_0.0.2-1_armel.deb => 7.65 MB
        ✔[OK]                /dkfn/nightly/deb/bnycdn_0.0.2-1_amd64.deb => 8.78 MB
     
        Maximum parrallel file uploads is 4
```

_See code: [src/commands/cp.ts](https://github.com/DKFN/bnycdn/blob/v0.0.2/src/commands/cp.ts)_

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

## `bnycdn key []`

To add / delete / set a key for a pullzon or a storage

```
USAGE
  $ bnycdn key []

OPTIONS
  -d, --del=del      Deletes a key with given name
  -h, --help         show CLI help
  -l, --list         lists all keys stored and their names
  -s, --set=set      Sets a key with given name
  -t, --type=type    Type of the key
  -v, --value=value  Gives a value for add and set operations

EXAMPLE

       ➜  bunnycdn-cli git:(master) ✗ ./bin/run key -l  
  ==== PullZones : 
  Key Name        : Key Value
  default   | .....
  ==== Storages: 
  Key Name        : Key Value
  default | .....
  name | .....

  ➜  bunnycdn-cli git:(master) ✗ ./bin/run key -s myneykey -t storages -v my_api_key_from_panel
  { k: 'myneykey', v: 'my_api_key_from_panel', t: 'storages' }
  ⓘKey successfully set: myneykey

  ➜  bunnycdn-cli git:(master) ✗ ./bin/run key -d myneykey -t storages                         
  ⓘSuccessfully deleted key : myneykey
```

_See code: [src/commands/key.ts](https://github.com/DKFN/bnycdn/blob/v0.0.2/src/commands/key.ts)_

## `bnycdn ls []`

describe the command here

```
USAGE
  $ bnycdn ls []

OPTIONS
  -h, --help             show CLI help
  -s, --storage=storage

EXAMPLE
  $ bnycdn pz -l
       Lists all the pul zone
```

_See code: [src/commands/ls.ts](https://github.com/DKFN/bnycdn/blob/v0.0.2/src/commands/ls.ts)_

## `bnycdn pz [PULLZONES]`

Only allows you to list pull zones so far

```
USAGE
  $ bnycdn pz [PULLZONES]

OPTIONS
  -h, --help  show CLI help
  -l, --list  lists all pull zones

EXAMPLE

       ➜  bunnycdn-cli git:(master) ✗ ./bin/run pz -l
       ID    |Hit(%)|    Name     |   HostNames
       0 |  75  | pzb | [2] pzb.b-cdn.net ; 
       1 |  75  | pza | [3] pza.b-cdn.net ; [4] custom.example.com ; 
    
       Lists all the pull zones
```

_See code: [src/commands/pz.ts](https://github.com/DKFN/bnycdn/blob/v0.0.2/src/commands/pz.ts)_
<!-- commandsstop -->
