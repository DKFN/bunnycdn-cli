# List files in a storage

Listing files and directory in a storage is done via ls command

Make sure you have a storage password stored and then use `ls` (ls implementation)

## Usage
```console
bnycdn -s <storage_key_name> -d <path_of_storage_directory>
```

Please note that the path *must* start with the storage name from bunnycdn.

For example, my storage name is testcdn.

## Examples
Adding a key and then listing all directories:
```console
$ bnycdn key -s testcdn -v XXXXXXX
 ⓘ Key successfully set: testcdn
➜  bunnycdn-cli git:(master) ✗ bnycdn ls -s testcdn -d /testcdn/                                          
type       lastChanged              size      path                                
---------  -----------------------  --------  ------------------------------------
[ DIR  ]   2019-03-11T22:08:20.501  0 B       /testcdn/minireddit              
[ DIR  ]   2019-03-10T21:24:20.971  0 B       /testcdn/nightly                 
[ FILE ]   2019-03-09T23:27:04.895  1 MB      /testcdn/samplebig.mkv           
[ FILE ]   2019-03-10T00:32:26.305  1000 MB   /testcdn/1GB.bin                 
[ FILE ]   2019-03-16T12:51:56.237  317 B     /testcdn/manifest.json           
[ FILE ]   2019-03-09T23:36:43.722  10.01 MB  /testcdn/samplemid1.mkv          
[ FILE ]   2019-03-09T23:24:16.448  97.11 KB  /testcdn/paris.jpg               

$ bnycdn ls -s testcdn -d /testcdn/nightly/
type       lastChanged              size  path                   
---------  -----------------------  ----  -----------------------
[ DIR  ]   2019-03-10T21:59:01.941  0 B   /testcdn/nightly/deb

```

