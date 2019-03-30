# Install

- [Ubuntu/Debian]()

- [MacOS]() -pending 0.5-

- [Windows]() -pending 0.5-

- [NPM]() -pending 0.5-

- [Docker]() -pending 0.5-


## Ubuntu/Debian
This is the only release method for now. More operating systems will be 

```console
wget http://cdn.infra.tetel.in/bunnycdncli/nightly/bnycdn_0.0.3-1_amd64.deb;
sudo dpgk -i bnycdn_0.0.3-1_amd64.deb 
```

You should be able to execute bunnycdn connands :
```console
$ bnycdn help

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

