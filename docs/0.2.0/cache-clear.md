# Clearing cache

Clearing  the cache is done via the pz command line.

Make sure you have a pullzone api key stored and then use `pz -p` (PullZone purge)

## Usage

```console
bnycdn pz -p <name>
```

If you are unsure about your pullzone name, use `pz -l` to list all accessible pullzoneswith your current API Key and search for the name column

You can also use anorther API key than default:

```console
bnycdn pz -p <name> -k <key_name>
```
