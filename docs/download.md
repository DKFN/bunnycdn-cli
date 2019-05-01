# Downloading file or directories

Downloading a file into a storage is done via cp command, directories with -R (recursive) option

Make sure you have a storage password stored and then use `cp`

A read only storage password is enough for downloads, but you can use standard password of course.

*Please note that there is no progress bar as of now, backgrounded large file downloads may look idle.*

## Usage
```console
bnycdn cp -s <storage_key_name> [-R] --from <path_from_bunnycdn> --to <path_to_machine> 
```

Please note that the path *must* start with the storage name from bunnycdn.

For example, my storage name is testcdn.

## Examples

### Download a single file
```console
$ bnycdn cp -s testcdn --from /testcdn/bunnycdncli/nightly/bnycdn_0.0.3-1_amd64.deb --to ./test/test.deb
 ⌛ [DL]                 ./test/test.deb =>  ? 
 ⌛ [IO]                 ./test/test.deb =>  ? 
 ✔ [OK]                 ./test/test.deb => 8.92 MB
```

### Download directory recursivly
```console
$ bnycdn cp -R -s testcdn --from /testcdn/bunnycdncli/nightly/ --to ./testfiles/
 ↻ [WT] [ ∞ 0| ⇅ 1 | o 0]    /testcdn/bunnycdncli/nightly/Packages => 1.04 KB
 ⌛ [DL] [ ∞ 0| ⇅ 2 | o 0]    ./testfiles/Packages => 1.04 KB
 [ truncated for readability]
 ⌛ [DL] [ ∞ 2| ⇅ 8 | o 1]    ./testfiles/bnycdn_0.0.2-1_armel.deb => 7.66 MB
 ↻ [WT] [ ∞ 2| ⇅ 7 | o 1]    /testcdn/bunnycdncli/nightly/deb/Release => 1.96 KB
 ⌛ [DL] [ ∞ 2| ⇅ 8 | o 1]    ./testfiles/deb/Release => 1.96 KB
 ↻ [WT] [ ∞ 2| ⇅ 8 | o 1]    /testcdn/bunnycdncli/nightly/deb/Packages.xz => 652 B
 ↻ [WT] [ ∞ 3| ⇅ 8 | o 1]    /testcdn/bunnycdncli/nightly/deb/Packages.gz => 594 B
 ↻ [WT] [ ∞ 4| ⇅ 8 | o 1]    /testcdn/bunnycdncli/nightly/deb/Packages.bz2 => 661 B
 ↻ [WT] [ ∞ 5| ⇅ 8 | o 1]    /testcdn/bunnycdncli/nightly/deb/Packages => 1.04 KB
 [ truncated for readability]
 ⌛ [IO] [ ∞ 0| ⇅ 1 | o 14]    ./testfiles/bnycdn_0.0.2-1_amd64.deb => 8.78 MB
 ✔ [OK] [ ∞ 0| ⇅ 1 | o 15]    ./testfiles/bnycdn_0.0.2-1_amd64.deb => 8.78 MB
```
