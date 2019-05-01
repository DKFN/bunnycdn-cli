# bnycdn

![SonarQuality](https://sonarcloud.io/api/project_badges/quality_gate?project=DKFN_bunnycdn-cli)
======

Simple cli for BunnyCDN service. This app is not an official one.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
<!-- [![Version](https://img.shields.io/npm/v/bnycdn.svg)](https://npmjs.org/package/bnycdn)
#[![Downloads/week](https://img.shields.io/npm/dw/bnycdn.svg)](https://npmjs.org/package/bnycdn)
[![License](https://img.shields.io/npm/l/bnycdn.svg)](https://github.com/DKFN/bnycdn/blob/master/package.json)
!-->

<!-- toc -->
* [bnycdn](#bnycdn)
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
bnycdn/0.3.0 linux-x64 node-v8.10.0
$ bnycdn --help [COMMAND]
USAGE
  $ bnycdn COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`bnycdn billing`](#bnycdn-billing)
* [`bnycdn cp [FROM] [TO]`](#bnycdn-cp-from-to)
* [`bnycdn help [COMMAND]`](#bnycdn-help-command)
* [`bnycdn key []`](#bnycdn-key-)
* [`bnycdn ls [PATH]`](#bnycdn-ls-path)
* [`bnycdn pz [COMMAND]`](#bnycdn-pz-command)
* [`bnycdn rm []`](#bnycdn-rm-)
* [`bnycdn stats []`](#bnycdn-stats-)

## `bnycdn billing`

This command is to get statics for your account

```
USAGE
  $ bnycdn billing

OPTIONS
  -h, --help     show CLI help
  -k, --key=key  Key to use to get the statistics
```

_See code: [src/commands/billing.ts](https://github.com/DKFN/bnycdn/blob/v0.3.0/src/commands/billing.ts)_

## `bnycdn cp [FROM] [TO]`

This is the cp-like command for BunnyCDN storages.

```
USAGE
  $ bnycdn cp [FROM] [TO]

OPTIONS
  -R, --R
  -f, --from=from
  -h, --help             show CLI help
  -s, --storage=storage
  -t, --to=to

EXAMPLE

       Maximum async file operations is 8. You can change this value: 
  https://dkfn.github.io/bunnycdn-cli/docs/set-workers
    
       One file upload
    
       $ bnycdn cp -s tetelincdn --from ./dist/deb/bnycdn_0.0.2-1_amd64.deb --to /tetelincdn/nightly/deb/test.deb
       ⌛[UP]                 /tetelincdn/nightly/deb/test.deb => 8.78 MB
       ✔[OK]                 /tetelincdn/nightly/deb/test.deb => 8.78 MB

    
       Recursive file upload
    
       $ bnycdn -s dkfn -R --from ./dist --to /dkfn/nightly                
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
```

_See code: [src/commands/cp.ts](https://github.com/DKFN/bnycdn/blob/v0.3.0/src/commands/cp.ts)_

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

To add / delete / set a key for account pullzones or a storage

```
USAGE
  $ bnycdn key []

OPTIONS
  -d, --del=del      Deletes a key with given name
  -h, --help         show CLI help
  -l, --list         lists all keys stored and their names
  -s, --set=set      Sets a key with given name
  -t, --type=type    Type of the key ( pullzones OR storages )
  -v, --value=value  Gives a value for add and set operations

EXAMPLE

           ➜  bunnycdn-cli git:(master) ✗ bnycdn key -l  
           ==== PullZones : 
           Key Name        : Key Value
           default   | .....
           ==== Storages: 
           Key Name        : Key Value
           default | .....
           name | .....

           Add default API Key:
           ➜  bunnycdn-cli git:(master) ✗ bnycdn key -s default -v my_api_key_from_panel
           ⓘ Successfully deleted key : default

           Add aliased API Key (If you have multiple accounts):
           ➜  bunnycdn-cli git:(master) ✗ bnycdn key -s myKeyName -v my_api_key_from_panel
           ⓘ Successfully deleted key : myKeyName

           Add a storage Key:
           ➜  bunnycdn-cli git:(master) ✗ bnycdn key -s mynewkey -t storages -v my_storage_ftp_password
           ⓘ Key successfully set: mynewkey

           Add a default storage Key:
           ➜  bunnycdn-cli git:(master) ✗ bnycdn key -s default -t storages -v my_storage_ftp_password
           ⓘ Key successfully set: mynewkey

           Delete a key
           ➜  bunnycdn-cli git:(master) ✗ bnycdn key -d mynewkey -t storages                         
           ⓘ Successfully deleted key : mynewkey
```

_See code: [src/commands/key.ts](https://github.com/DKFN/bnycdn/blob/v0.3.0/src/commands/key.ts)_

## `bnycdn ls [PATH]`

describe the command here

```
USAGE
  $ bnycdn ls [PATH]

OPTIONS
  -d, --dir=dir
  -h, --help             show CLI help
  -s, --storage=storage

EXAMPLE
  $ bnycdn pz -l
       Lists all the pul zone
```

_See code: [src/commands/ls.ts](https://github.com/DKFN/bnycdn/blob/v0.3.0/src/commands/ls.ts)_

## `bnycdn pz [COMMAND]`

Only allows you to list pull zones so far

```
USAGE
  $ bnycdn pz [COMMAND]

OPTIONS
  -a, --addHost=addHost  Adds an hostname to a pull zone
  -b, --ban=ban          Bans an IP from a pullzone
  -c, --create=create    Creates a new pullzone
  -d, --delHost=delHost  Deletes an hostname from a pull zone
  -g, --grace=grace      Unbans an IP from a pullzone
  -h, --help             show CLI help
  -k, --key=key          specify a key if you use anorther one than default
  -l, --list             lists all pull zones
  -p, --purge=purge      purge cache for pullzone in id
  -t, --target=target    Target for the given operation
  -v, --value=value      Value for add hostname / purge pullzone

EXAMPLE

       ➜  bunnycdn-cli git:(master) ✗ ./bin/run pz -l
       ID    |Hit(%)|    Name     |   HostNames
       0 |  75  | pzb | [2] pzb.b-cdn.net ; 
       1 |  75  | pza | [3] pza.b-cdn.net ; [4] custom.example.com ; 
    
       Lists all the pull zones
```

_See code: [src/commands/pz.ts](https://github.com/DKFN/bnycdn/blob/v0.3.0/src/commands/pz.ts)_

## `bnycdn rm []`

This is the rm-like command for BunnyCDN storages.

```
USAGE
  $ bnycdn rm []

OPTIONS
  -R, --R                Recursive flag
  -f, --from=from        Path to remove (from)
  -h, --help             show CLI help
  -s, --storage=storage  Name of the target storage

EXAMPLE

       This command is used to remove file and directory recursivly on the given storage
```

_See code: [src/commands/rm.ts](https://github.com/DKFN/bnycdn/blob/v0.3.0/src/commands/rm.ts)_

## `bnycdn stats []`

This command is to get statics for your account

```
USAGE
  $ bnycdn stats []
```

_See code: [src/commands/stats.ts](https://github.com/DKFN/bnycdn/blob/v0.3.0/src/commands/stats.ts)_
<!-- commandsstop -->
