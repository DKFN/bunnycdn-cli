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
bnycdn/0.3.0 linux-x64 node-v18.16.0
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
* [`bnycdn key [COMMAND] [KEY_NAME] [KEY_VALUE]`](#bnycdn-key-command-key_name-key_value)
* [`bnycdn ls PATH`](#bnycdn-ls-path)
* [`bnycdn pz [COMMAND] [VALUE]`](#bnycdn-pz-command-value)
* [`bnycdn rm`](#bnycdn-rm)
* [`bnycdn stats`](#bnycdn-stats)

## `bnycdn billing`

This command is to get statics for your account

```
USAGE
  $ bnycdn billing

OPTIONS
  -h, --help     show CLI help
  -k, --key=key  Key to use to get the billing informations
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
  -r, --R2
  -s, --storage=storage
  -t, --to=to

EXAMPLE

       Maximum async file operations is 4. You can change this value: 
  https://dkfn.github.io/bunnycdn-cli/docs/set-workers
    
       Version >= 0.3.0 style
       One file upload
       $ bnycdn cp -s testcdn ./dist/deb/bnycdn_0.3.0-1_amd64.deb /tetelincdn/nightly/deb/test.deb
        ⌛ [UP]                 /tetelincdn/nightly/deb/test.deb => 8.97 MB
        ✔ [OK]                 /tetelincdn/nightly/deb/test.deb => 8.97 MB

       Recursive file upload
       bnycdn cp -s testcdn -R --from ./dist/ --to /tetelincdn/sample/nightly/
        ↻ [WT]                 ./dist/deb/Packages => 1.04 KB
        ↻ [WT] [ ∞ 1| ⇅ 0 | o 0]    ./dist/deb/Packages.bz2 => 663 B
        ↻ [WT] [ ∞ 2| ⇅ 0 | o 0]    ./dist/deb/Packages.gz => 598 B
        ↻ [WT] [ ∞ 3| ⇅ 0 | o 0]    ./dist/deb/Packages.xz => 652 B
        ↻ [WT] [ ∞ 4| ⇅ 0 | o 0]    ./dist/deb/Release => 1.96 KB
        ↻ [WT] [ ∞ 5| ⇅ 0 | o 0]    ./dist/deb/bnycdn_0.3.0-1_amd64.deb => 8.97 MB
        ↻ [WT] [ ∞ 6| ⇅ 0 | o 0]    ./dist/deb/bnycdn_0.3.0-1_armel.deb => 7.85 MB
        ⌛ [UP] [ ∞ 6| ⇅ 1 | o 0]    /tetelincdn/sample/nightly/deb/bnycdn_0.3.0-1_armel.deb => 7.85 MB
        ⌛ [UP] [ ∞ 5| ⇅ 2 | o 0]    /tetelincdn/sample/nightly/deb/bnycdn_0.3.0-1_amd64.deb => 8.97 MB
        ⌛ [UP] [ ∞ 4| ⇅ 3 | o 0]    /tetelincdn/sample/nightly/deb/Release => 1.96 KB
        ⌛ [UP] [ ∞ 3| ⇅ 4 | o 0]    /tetelincdn/sample/nightly/deb/Packages.xz => 652 B
        ✔ [OK] [ ∞ 3| ⇅ 3 | o 0]    /tetelincdn/sample/nightly/deb/Packages.xz => 652 B
        ⌛ [UP] [ ∞ 2| ⇅ 4 | o 1]    /tetelincdn/sample/nightly/deb/Packages.gz => 598 B
        ✔ [OK] [ ∞ 2| ⇅ 3 | o 1]    /tetelincdn/sample/nightly/deb/Release => 1.96 KB
        ⌛ [UP] [ ∞ 1| ⇅ 4 | o 2]    /tetelincdn/sample/nightly/deb/Packages.bz2 => 663 B
        ✔ [OK] [ ∞ 1| ⇅ 3 | o 2]    /tetelincdn/sample/nightly/deb/Packages.gz => 598 B
        ⌛ [UP] [ ∞ 0| ⇅ 4 | o 3]    /tetelincdn/sample/nightly/deb/Packages => 1.04 KB
        ✔ [OK] [ ∞ 0| ⇅ 3 | o 3]    /tetelincdn/sample/nightly/deb/Packages.bz2 => 663 B
        ✔ [OK] [ ∞ 0| ⇅ 2 | o 4]    /tetelincdn/sample/nightly/deb/Packages => 1.04 KB
        ⌛ [WT] [ ∞ 0| ⇅ 2 | o 5]    It seems that I am still waiting for 2 files to process. Please wait ...
        ⌛ [UP] [ ∞ 0| ⇅ 2 | o 5]    ./dist/deb/bnycdn_0.3.0-1_armel.deb => 7.85 MB
        ⌛ [UP] [ ∞ 0| ⇅ 2 | o 5]    ./dist/deb/bnycdn_0.3.0-1_amd64.deb => 8.97 MB
       ---------------------------------------------------
        ✔ [OK] [ ∞ 0| ⇅ 1 | o 5]    /tetelincdn/sample/nightly/deb/bnycdn_0.3.0-1_armel.deb => 7.85 MB
        ✔ [OK]                 /tetelincdn/sample/nightly/deb/bnycdn_0.3.0-1_amd64.deb => 8.97 MB

    
       Download single file
       bnycdn cp -s testcdn /tetelincdn/nightly/deb/test.deb ./myfolder/mydeb.deb
        ⌛ [DL]                 ./myfolder/mydeb.deb =>  ? 
        ⌛ [IO]                 ./myfolder/mydeb.deb => 8.97 MB
        ✔ [OK]                 ./myfolder/mydeb.deb => 8.97 MB
     
       Recursive file download
       bnycdn cp -R -s testcdn /tetelincdn/nightly/deb/ ./myfolder/mydebs/
        ↻ [WT]                 /tetelincdn/nightly/deb/test.deb => 8.97 MB
        ↻ [WT] [ ∞ 1| ⇅ 0 | o 0]    /tetelincdn/nightly/deb/Release => 1.96 KB
        ↻ [WT] [ ∞ 2| ⇅ 0 | o 0]    /tetelincdn/nightly/deb/Packages.xz => 656 B
        ↻ [WT] [ ∞ 3| ⇅ 0 | o 0]    /tetelincdn/nightly/deb/Packages.gz => 597 B
        ↻ [WT] [ ∞ 4| ⇅ 0 | o 0]    /tetelincdn/nightly/deb/Packages.bz2 => 656 B
        ↻ [WT] [ ∞ 5| ⇅ 0 | o 0]    /tetelincdn/nightly/deb/Packages => 1.04 KB
        ↻ [WT] [ ∞ 6| ⇅ 0 | o 0]    /tetelincdn/nightly/deb/bnycdn_0.0.2-1_armel.deb => 7.65 MB
        ↻ [WT] [ ∞ 7| ⇅ 0 | o 0]    /tetelincdn/nightly/deb/bnycdn_0.0.2-1_amd64.deb => 8.78 MB
        ⌛ [DL] [ ∞ 7| ⇅ 1 | o 0]    ./myfolder/mydebs/bnycdn_0.0.2-1_amd64.deb => 8.78 MB
        ⌛ [DL] [ ∞ 6| ⇅ 2 | o 0]    ./myfolder/mydebs/bnycdn_0.0.2-1_armel.deb => 7.65 MB
        ⌛ [DL] [ ∞ 5| ⇅ 3 | o 0]    ./myfolder/mydebs/Packages => 1.04 KB
        ⌛ [DL] [ ∞ 4| ⇅ 4 | o 0]    ./myfolder/mydebs/Packages.bz2 => 656 B
        ⌛ [IO] [ ∞ 4| ⇅ 4 | o 0]    ./myfolder/mydebs/Packages => 1.04 KB
        ✔ [OK] [ ∞ 4| ⇅ 3 | o 1]    ./myfolder/mydebs/Packages => 1.04 KB
        ⌛ [DL] [ ∞ 3| ⇅ 4 | o 1]    ./myfolder/mydebs/Packages.gz => 597 B
        ⌛ [IO] [ ∞ 3| ⇅ 4 | o 1]    ./myfolder/mydebs/Packages.bz2 => 656 B
        ✔ [OK] [ ∞ 3| ⇅ 3 | o 2]    ./myfolder/mydebs/Packages.bz2 => 656 B
        ⌛ [DL] [ ∞ 2| ⇅ 4 | o 2]    ./myfolder/mydebs/Packages.xz => 656 B
        ⌛ [IO] [ ∞ 2| ⇅ 4 | o 2]    ./myfolder/mydebs/Packages.gz => 597 B
        ✔ [OK] [ ∞ 2| ⇅ 3 | o 3]    ./myfolder/mydebs/Packages.gz => 597 B
        ⌛ [IO] [ ∞ 2| ⇅ 3 | o 3]    ./myfolder/mydebs/Packages.xz => 656 B
        ✔ [OK] [ ∞ 2| ⇅ 2 | o 4]    ./myfolder/mydebs/Packages.xz => 656 B
        ⌛ [DL] [ ∞ 1| ⇅ 3 | o 4]    ./myfolder/mydebs/Release => 1.96 KB
        ⌛ [DL] [ ∞ 0| ⇅ 4 | o 4]    ./myfolder/mydebs/test.deb => 8.97 MB
        ⌛ [IO] [ ∞ 0| ⇅ 4 | o 4]    ./myfolder/mydebs/bnycdn_0.0.2-1_armel.deb => 7.65 MB
        ✔ [OK] [ ∞ 0| ⇅ 3 | o 5]    ./myfolder/mydebs/bnycdn_0.0.2-1_armel.deb => 7.65 MB
        ⌛ [IO] [ ∞ 0| ⇅ 3 | o 5]    ./myfolder/mydebs/Release => 1.96 KB
        ✔ [OK] [ ∞ 0| ⇅ 2 | o 6]    ./myfolder/mydebs/Release => 1.96 KB
        ⌛ [IO] [ ∞ 0| ⇅ 2 | o 6]    ./myfolder/mydebs/bnycdn_0.0.2-1_amd64.deb => 8.78 MB
        ✔ [OK] [ ∞ 0| ⇅ 1 | o 7]    ./myfolder/mydebs/bnycdn_0.0.2-1_amd64.deb => 8.78 MB
        ⌛ [IO] [ ∞ 0| ⇅ 1 | o 7]    ./myfolder/mydebs/test.deb => 8.97 MB
        ✔ [OK]                 ./myfolder/mydebs/test.deb => 8.97 MB
        
    
       Version < 0.3.0 style
    
       One file upload
    
       $ bnycdn cp -s testcdn --from ./dist/deb/bnycdn_0.0.2-1_amd64.deb --to /testcdn/nightly/deb/test.deb
        ⌛[UP]                 /testcdn/nightly/deb/test.deb => 8.78 MB
        ✔[OK]                 /testcdn/nightly/deb/test.deb => 8.78 MB

    
       Recursive file upload
    
       $ bnycdn cp -s dkfn -R --from ./dist --to /dkfn/nightly                
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

## `bnycdn key [COMMAND] [KEY_NAME] [KEY_VALUE]`

To add / delete / set a key for account pullzones or a storage

```
USAGE
  $ bnycdn key [COMMAND] [KEY_NAME] [KEY_VALUE]

OPTIONS
  -d, --del=del      Deletes a key with given name
  -h, --help         show CLI help
  -l, --list         lists all keys stored and their names
  -s, --set=set      Sets a key with given name
  -t, --type=type    Type of the key ( pullzones OR storages )
  -v, --value=value  Gives a value for add and set operations

EXAMPLE

           $ bnycdn key list
           ==== API Keys: 
           name     value                                                                   
           -------  ------------------------------------------------------------------------
           default  XXXX-XXXX_XXXX_XXXX

           ==== Storages: 
           name     value                                    
           -------  -----------------------------------------
           testcdn  XXXX-XXXX_XXXX_XXXX

       
           Version >= 0.3.0 style
        
           Add a default API Key
           $ bnycdn key set default XXXX-XXXX-XXXX-XXXX
            ⓘ Key successfully set: default
        
           Add a storage key
           $ bnycdn key set testcdn XXXX-XXXX-XXXX-XXXX -t storages
            ⓘ Key successfully set: testcdn
         
           Add a default storage key
           $ bnycdn key set default XXXX-XXXX-XXXX-XXXX -t storages
            ⓘ Key successfully set: testcdn
         
           Deletes a key
           $ bnycdn key del default
            ⓘ Successfully deleted key : default
         
            Deletes a storage key
           $ bnycdn key del mykey -t storages
            ⓘ Successfully deleted key : mykey

           Version < 0.3.0 style

           Add default API Key:
           $ bnycdn key -s default -v my_api_key_from_panel
           ⓘ Successfully deleted key : default

           Add aliased API Key (If you have multiple accounts):
           $ bnycdn key -s myKeyName -v my_api_key_from_panel
           ⓘ Successfully deleted key : myKeyName

           Add a storage Key:
           $ bnycdn key -s mynewkey -t storages -v my_storage_ftp_password
           ⓘ Key successfully set: mynewkey

           Add a default storage Key:
           $ bnycdn key -s default -t storages -v my_storage_ftp_password
           ⓘ Key successfully set: mynewkey

           Delete a key
           $ bnycdn key -d mynewkey -t storages                         
           ⓘ Successfully deleted key : mynewkey
```

_See code: [src/commands/key.ts](https://github.com/DKFN/bnycdn/blob/v0.3.0/src/commands/key.ts)_

## `bnycdn ls PATH`

describe the command here

```
USAGE
  $ bnycdn ls PATH

OPTIONS
  -d, --dir=dir
  -h, --help             show CLI help
  -s, --storage=storage

EXAMPLE

       $ bnycdn ls /teststorage/sample/ -s mystoragename
       type       lastChanged              size       path                                         
       ---------  -----------------------  ---------  ---------------------------------------------
       [ DIR  ]   2019-04-13T13:20:45.874  0 B        /testcdn/sample/finalUpTest/node_modules  
       [ DIR  ]   2019-04-13T13:21:03.133  0 B        /testcdn/sample/finalUpTest/.idea         
       [ DIR  ]   2019-04-13T13:21:03.329  0 B        /testcdn/sample/finalUpTest/.git          
       [ FILE ]   2019-04-13T13:20:52.59   1.89 MB    /testcdn/sample/finalUpTest/samplesml.mkv 
       [ FILE ]   2019-04-13T13:21:50.066  18.82 MB   /testcdn/sample/finalUpTest/samplemid1.mkv
       [ FILE ]   2019-04-13T13:23:57.191  56.45 MB   /testcdn/sample/finalUpTest/samplebig.mkv 
       [ FILE ]   2019-04-13T13:20:45.876  173.59 KB  /testcdn/sample/finalUpTest/paris.jpg     
       [ FILE ]   2019-04-13T13:21:04.011  171 B      /testcdn/sample/finalUpTest/.editorconfig 

       You can also still use 0.2.x style
       $ bnycdn ls -d /teststorage/mydirectory/ -s mystoragename
```

_See code: [src/commands/ls.ts](https://github.com/DKFN/bnycdn/blob/v0.3.0/src/commands/ls.ts)_

## `bnycdn pz [COMMAND] [VALUE]`

This is the subcommand for pullzone operations

```
USAGE
  $ bnycdn pz [COMMAND] [VALUE]

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

        COMMANDS
        list
        purge
        add
        del
        ban
        grace
     
       $ bnycdn pz list
       id     cacheQuality  name             hostnames                                                   
       -----  ------------  ---------------  ------------------------------------------------------------
       58516  75            citybuilderscdn  [82062] citybuilderscdn.b-cdn.net ;                         
       59831  75            tetelincdn       [84195] tetelincdn.b-cdn.net ; [84196] cdn.infra.tetel.in ; 
     
       $ bnycdn pz -l
       id     cacheQuality  name             hostnames                                                   
       -----  ------------  ---------------  ------------------------------------------------------------
       58516  75            citybuilderscdn  [82062] citybuilderscdn.b-cdn.net ;                         
       59831  75            tetelincdn       [84195] tetelincdn.b-cdn.net ; [84196] cdn.infra.tetel.in ; 
    
       $ bnycdn pz add example.com -t tetelincdn
       ✔ Successfully added hostname 

       $ bnycdn pz ban 8.8.8.8 -t tetelincdn
       ✔ Successfully added blockedIp 8.8.8.8
    
       $ bnycdn pz grace 8.8.8.8 -t tetelincdn
       ✔ Successfully removed blocked ip : 8.8.8.8
```

_See code: [src/commands/pz.ts](https://github.com/DKFN/bnycdn/blob/v0.3.0/src/commands/pz.ts)_

## `bnycdn rm`

This is the rm-like command for BunnyCDN storages.

```
USAGE
  $ bnycdn rm

OPTIONS
  -R, --R                Recursive flag
  -f, --from=from        Path to remove (from)
  -h, --help             show CLI help
  -s, --storage=storage  Name of the target storage

EXAMPLE

       This command is used to remove file and directory recursivly on the given storage
```

_See code: [src/commands/rm.ts](https://github.com/DKFN/bnycdn/blob/v0.3.0/src/commands/rm.ts)_

## `bnycdn stats`

This command is to get statics for your account

```
USAGE
  $ bnycdn stats
```

_See code: [src/commands/stats.ts](https://github.com/DKFN/bnycdn/blob/v0.3.0/src/commands/stats.ts)_
<!-- commandsstop -->
