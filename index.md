## Getting started

### Early rabbit notice
Sorry, the documentation is still work in progress like the projet.

I suggest you to open the [README](https://github.com/DKFN/bunnycdn-cli/blob/master/README.md) if you want to try it

I strongly suggest that you wait v0.5 before using this CLI in automated processes because the commands may change until the whole BunnyCDN API is implemented.

### Installation
Follow [installation procedures](https://dkfn.github.io/bunnycdn-cli/docs/install) dependings on your installation desires.

### Register API Key
In order to use most of the functionnalities of the CLI you need to register an API key using this command:"

*Pullzones key type wil be renamed to client_key (v0.2)*

```console 
$ bnycdn key -s default -v "<your_key_from_panel>" -t "pullzones"
 ⓘ Key successfully set: default
```

All keys are stored in `~/.bnycdn` text file

There is two types of keys: Pullzones and Storages.
* The pullzone key is yout unique client key in order to do operations on pullzones (pz command)
* The storage key is the FTP Password of your storage. If you provide a read-only key you will have limitted fonctionnalities (ls, cp only for download).

### List your pullzones

Once you have set your API  key set, lets try to list all the pullzones:

```console
$ bnycdn pz -l
id     cacheQuality  name             hostnames                                                   
-----  ------------  ---------------  ------------------------------------------------------------
585XX  75            A                [820XX] a.b-cdn.net ;                         
598XX  75            B                [841XX] b.b-cdn.net ; [841XX] cdn.example.com ; 
```

### Browse command tutorial and/or manuals

## Contribute
Contributions are very welcomed, if you are not really sure how to start it feel free to join my [Discord](https://discord.gg/m6Hewcx) and let me know what's up :)

Contributions may be as simple as trying the CLI and letting me know what you found unconvenient or convenient, outside looks are welcomed !

