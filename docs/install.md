# Install

- [Ubuntu/Debian]()

- [NPM]()

- [MacOS]() -pending 0.5-

- [Windows]() -pending 0.5-

- [Docker]() -pending 0.5-

> As the project is in early developpement stages and will receive frequent updates, I strongly suggest that you use NPM to easily get updates

## Ubuntu/Debian
This is the only native release method for now. More operating systems will be supported native

*Using this method will not get you auto-updates. This will be supported in a future release*

### AMD64
```console
wget https://cdn.deadlykungfu.ninja/bnycdn-cli/deb/bnycdn_0.3.0_amd64.deb
sudo dpkg -i bnycdn_0.3.0_amd64.deb
```

### ARM
```console
wget https://cdn.deadlykungfu.ninja/bnycdn-cli/deb/bnycdn_0.3.0_armel.deb
sudo dpkg -i bnycdn_0.3.0_armel.deb
```

## NPM
This is great if you already have NodeJS installed (>= 8.0.0) and you can update the cli with a simple command.
Also, it is the only way to get it working on unsupported systems.

```console
$ npm install -g bnycdn
```


You should be able to execute bunnycdn connands :
```console
$ bnycdn help

Simple cli for BunnyCDN service. This app is not an official one.

VERSION
  bnycdn/0.2.1 linux-x64 node-v8.10.0

USAGE
  $ bnycdn [COMMAND]

COMMANDS
  cp    This is the cp-like command for BunnyCDN storages.
  help  display help for bnycdn
  key   To add / delete / set a key for a pullzon or a storage
  ls    describe the command here
  pz    Only allows you to list pull zones so far


```
