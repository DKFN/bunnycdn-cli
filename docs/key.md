# Managing keys and password

Via the `key` command you can add, edit and delete API keys and storage passwords.

## Usage
```console
bnycdn [-l] [-s <key_name>] [-d <key_name>] [-v <key_value>] [-t <key_type>]   
```

### Examples
#### Add default API Key:
```console
$ bnycdn key -s default -v my_api_key_from_panel
ⓘ Successfully deleted key : default
```

### Add aliased API Key (If you have multiple accounts):

```console
$ bnycdn key -s myKeyName -v my_api_key_from_panel
ⓘ Successfully deleted key : myKeyName
```

#### Add a storage Key:

```console
$ bnycdn key -s mynewkey -t storages -v my_storage_ftp_password
ⓘ Key successfully set: mynewkey
```

#### Add a default storage Key:

```console
$ bnycdn key -s default -t storages -v my_storage_ftp_password
ⓘ Key successfully set: mynewkey
```

#### Delete a key

```console
$ bnycdn key -d mynewkey -t storages                         
ⓘ Successfully deleted key : mynewkey
```
