# Uploading file or directories

Uploading a file into a storage is done via cp command, directories with -R (recursive) option

Make sure you have a storage password stored and then use `cp`

*Please note that there is no progress bar as of now, backgrounded large file uploads may look idle.*

## Usage
```console
bnycdn cp -s <name_of_storage_key> [-R] --from <path_from_machine> --to <path_to_storage>
```

Please note that the path *must* start with the storage name from bunnycdn.

For example, my storage name is tetelincdn.

## Examples

Single file upload
```console
➜  bunnycdn-cli git:(master) ✗ bnycdn cp -s tetelincdn --from ./dist/deb/bnycdn_0.0.3-1_amd64.deb --to ./tetelincdn/bunnycdncli/nightly/testup.deb 
 ⌛ [UP]                 ./tetelincdn/bunnycdncli/nightly/testup.deb => 8.92 MB
 ✔ [OK]                 ./tetelincdn/bunnycdncli/nightly/testup.deb => 8.92 MB
 
```

Directory upload
```console
➜  bunnycdn-cli git:(master) ✗ bnycdn cp -s tetelincdn -R --from ./dist/deb/ --to ./tetelincdn/bunnycdncli/nightly/           
 ⌛ [UP] [ ∞ 0| ⇅ 1 | o 0]    ./tetelincdn/bunnycdncli/nightly/Packages => 1.04 KB
 ⌛ [UP] [ ∞ 0| ⇅ 2 | o 0]    ./tetelincdn/bunnycdncli/nightly/Packages.bz2 => 661 B
 ⌛ [UP] [ ∞ 0| ⇅ 3 | o 0]    ./tetelincdn/bunnycdncli/nightly/Packages.gz => 596 B
 ⌛ [UP] [ ∞ 0| ⇅ 4 | o 0]    ./tetelincdn/bunnycdncli/nightly/Packages.xz => 656 B
 ⌛ [UP] [ ∞ 0| ⇅ 5 | o 0]    ./tetelincdn/bunnycdncli/nightly/Release => 1.96 KB
 ⌛ [UP] [ ∞ 0| ⇅ 6 | o 0]    ./tetelincdn/bunnycdncli/nightly/bnycdn_0.0.3-1_amd64.deb => 8.92 MB
 ⌛ [UP] [ ∞ 0| ⇅ 7 | o 0]    ./tetelincdn/bunnycdncli/nightly/bnycdn_0.0.3-1_armel.deb => 7.8 MB
 ✔ [OK] [ ∞ 0| ⇅ 6 | o 0]    ./tetelincdn/bunnycdncli/nightly/Release => 1.96 KB
 ✔ [OK] [ ∞ 0| ⇅ 5 | o 0]    ./tetelincdn/bunnycdncli/nightly/Packages => 1.04 KB
 ✔ [OK] [ ∞ 0| ⇅ 4 | o 0]    ./tetelincdn/bunnycdncli/nightly/Packages.bz2 => 661 B
 ✔ [OK] [ ∞ 0| ⇅ 3 | o 0]    ./tetelincdn/bunnycdncli/nightly/Packages.xz => 656 B
 ✔ [OK] [ ∞ 0| ⇅ 2 | o 0]    ./tetelincdn/bunnycdncli/nightly/Packages.gz => 596 B
 ✔ [OK] [ ∞ 0| ⇅ 1 | o 0]    ./tetelincdn/bunnycdncli/nightly/bnycdn_0.0.3-1_armel.deb => 7.8 MB
 ✔ [OK]                 ./tetelincdn/bunnycdncli/nightly/bnycdn_0.0.3-1_amd64.deb => 8.92 MB
```
