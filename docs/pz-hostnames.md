# Adding and removing hostnames

Adding or removing hostnames into a pullzone is done via the pz command:


Make sure you have a pullzone api key stored and then use `pz add` (Adds an hostname) or `pz del` (Deletes an hostname)

## Usage
### Add
```console
bnycdn pz add <hostname> -t <pullzone_name> [-k <key_to_use>]
```

### Remove
```console
bnycdn pz del <hostname> -t <pullzone_name> [-k <key_to_use>]
```

## Examples:
```console
$ bnycdn pz add cdn.example.com -t testpz

$ bnycdn pz del cdn.example.com -t testpz
```
