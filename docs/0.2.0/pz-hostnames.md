# Adding and removing hostnames

Adding or removing hostnames into a pullzone is done via the pz command:


Make sure you have a pullzone api key stored and then use `pz -a` (Adds an hostname) or `pz -d` (Deletes an hostname)

## Usage
### Add
```console
bnycdn pz -a <pullzone_name> -v <hostname>
```

### Remove
```console
bnycdn pz -d <pullzone_name> -v <hostname>
```

## Examples:
```console
$ bnycdn pz -a testpz -v cdn.example.com

$ bnycdn pz -d testpz -v cdn.example.com
```
