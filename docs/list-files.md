# List files in a storage

Listing files and directory in a storage is done via ls command

Make sure you have a storage password stored and then use `ls` (ls implementation)

## Usage
```console
bnycdn -s <storage_key_name> -d /<storage_base_path/
```

## Examples
Adding a key and then listing all directories:
```console
➜  bunnycdn-cli git:(master) ✗ bnycdn key -s testcdn -v XXXXXXX
 ⓘ Key successfully set: testcdn
➜  bunnycdn-cli git:(master) ✗ bnycdn ls -s testcdn -d /tetelincdn/                                          
type       lastChanged              size      path                                
---------  -----------------------  --------  ------------------------------------
[ DIR  ]   2019-03-11T22:08:20.501  0 B       /tetelincdn/minireddit              
[ DIR  ]   2019-03-10T21:24:20.971  0 B       /tetelincdn/nightly                 
[ FILE ]   2019-03-09T23:27:04.895  1 MB      /tetelincdn/samplebig.mkv           
[ FILE ]   2019-03-10T00:32:26.305  1000 MB   /tetelincdn/1GB.bin                 
[ FILE ]   2019-03-16T12:51:56.237  317 B     /tetelincdn/manifest.json           
[ FILE ]   2019-03-09T23:36:43.722  10.01 MB  /tetelincdn/samplemid1.mkv          
[ FILE ]   2019-03-09T23:24:16.448  97.11 KB  /tetelincdn/paris.jpg               
```

