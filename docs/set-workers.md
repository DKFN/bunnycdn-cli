# Changing the number of connections

By default, the CLI will try to perform download/uploads with 8 parallel connections.
You can change the number of asynchronous operations by setting `BNYCDN_PARALLEL` varenv

It is set to 8 by default. This is an average guess of the typical usage (mixed big and small files) and should give correct performance.
Of course, it may not be ideal for orther cases (slow connections, big file downloads).

Please note that raising this value to much may result in dropped connections or poor I/O performance.

## Examples
```console
$ export BNYCDN_PARALLEL=1; bnycdn cp -R -s tetelincdn --to /tetelincdn/bunnycdnclitest2/ --from ./testfiles2/ 
```
