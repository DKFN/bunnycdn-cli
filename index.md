## Getting started

#### Early rabbit notice
The documentation is still work in progress like the projet.

### Installation
Follow [installation procedures](https://dkfn.github.io/bunnycdn-cli/docs/install) dependings on your installation desires.

### Register API Key
In order to use most of the functionnalities of the CLI you need to register an API key using this command:

```console 
$ bnycdn key set default <your_key_from_panel>
 ⓘ Key successfully set: default
```

All keys are stored in `~/.bunnycdn` text file

There is two types of keys: Pullzones and Storages.
* The API key is your unique client key in order to do operations on your pullzones (pz command). If you only have one account, you wiill not need anymore than default value but you can specify more if you need multiple accounts.
* The storage key is the FTP Password of your storage. If you provide a read-only key you will have limitted fonctionnalities (ls, cp only for download).

### List your pullzones

Once you have set your API  key set, lets try to list all the pullzones:

```console
$ bnycdn pz list
id     cacheQuality  name             hostnames                                                   
-----  ------------  ---------------  ------------------------------------------------------------
585XX  75            A                [820XX] a.b-cdn.net ;                         
598XX  75            B                [841XX] b.b-cdn.net ; [841XX] cdn.example.com ; 
```

### Get stats
You can also get stats and billing information via
```console
$ bnycdn stats
```

```console
$ bnycdn billing
```

### Download a file
This cli implements a simple clone of the unix cp command. If you are working with the terminal in Linux or MacOS you might be familliar with it.

Here is for example a simple download file:
```console
$ bnycdn cp -s testcdn /tetelincdn/nightly/deb/test.deb ./myfolder/mydeb.deb
⌛ [DL]                 ./myfolder/mydeb.deb =>  ? 
⌛ [IO]                 ./myfolder/mydeb.deb => 8.97 MB
✔ [OK]                 ./myfolder/mydeb.deb => 8.97 MB
```
### Upload a file
Uploading a file is also using cp but instead of putting the cdn address first we put it as the destination and chose the file from the disk

```console
$ bnycdn cp -s testcdn ./dist/deb/bnycdn_0.3.0-1_amd64.deb /tetelincdn/nightly/deb/test.deb
⌛ [UP]                 /tetelincdn/nightly/deb/test.deb => 8.97 MB
✔ [OK]                 /tetelincdn/nightly/deb/test.deb => 8.97 MB
```

Feel free to read the [manual](https://dkfn.github.io/bunnycdn-cli/docs/cp) for recursive download and orther operations
You can also get help from any command with -h flag (`bnycdn cp -h`)

### Browse command tutorial and/or manuals

The [docs](https://dkfn.github.io/bunnycdn-cli/docs/index) contains pratical examples for what you may want to do and manual pages if you want to use more specific options.


## Contribute
Contributions are very welcomed, if you are not really sure how to start it feel free to join my [Discord](https://discord.gg/m6Hewcx) and let me know what's up :)

Contributions may be as simple as trying the CLI and letting me know what you found unconvenient or convenient, outside looks are welcomed !

