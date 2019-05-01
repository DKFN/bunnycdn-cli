export const KEY_COMMAND_EXAMPLE =
  `
        $ bnycdn key list
        ==== API Keys: 
        name     value                                                                   
        -------  ------------------------------------------------------------------------
        default  XXXX-XXXX_XXXX_XXXX

        ==== Storages: 
        name     value                                    
        -------  -----------------------------------------
        testcdn  XXXX-XXXX_XXXX_XXXX

       
        Version >= 0.3.0 style
        
        Add a default API Key
        $ bnycdn key set default XXXX-XXXX-XXXX-XXXX
         ⓘ Key successfully set: default
        
        Add a storage key
        $ bnycdn key set testcdn XXXX-XXXX-XXXX-XXXX -t storages
         ⓘ Key successfully set: testcdn
         
        Add a default storage key
        $ bnycdn key set default XXXX-XXXX-XXXX-XXXX -t storages
         ⓘ Key successfully set: testcdn
         
        Deletes a key
        $ bnycdn key del default
         ⓘ Successfully deleted key : default
         
         Deletes a storage key
        $ bnycdn key del mykey -t storages
         ⓘ Successfully deleted key : mykey

        Version < 0.3.0 style

        Add default API Key:
        $ bnycdn key -s default -v my_api_key_from_panel
        ⓘ Successfully deleted key : default

        Add aliased API Key (If you have multiple accounts):
        $ bnycdn key -s myKeyName -v my_api_key_from_panel
        ⓘ Successfully deleted key : myKeyName

        Add a storage Key:
        $ bnycdn key -s mynewkey -t storages -v my_storage_ftp_password
        ⓘ Key successfully set: mynewkey

        Add a default storage Key:
        $ bnycdn key -s default -t storages -v my_storage_ftp_password
        ⓘ Key successfully set: mynewkey

        Delete a key
        $ bnycdn key -d mynewkey -t storages                         
        ⓘ Successfully deleted key : mynewkey
  `;

export const CP_COMMAND_EXAMPLE =
  `
    Maximum async file operations is 4. You can change this value: https://dkfn.github.io/bunnycdn-cli/docs/set-workers
    
    Version >= 0.3.0 style
    One file upload
    $ bnycdn cp -s testcdn ./dist/deb/bnycdn_0.3.0-1_amd64.deb /tetelincdn/nightly/deb/test.deb
     ⌛ [UP]                 /tetelincdn/nightly/deb/test.deb => 8.97 MB
     ✔ [OK]                 /tetelincdn/nightly/deb/test.deb => 8.97 MB

    Recursive file upload
    bnycdn cp -s testcdn -R --from ./dist/ --to /tetelincdn/sample/nightly/
     ↻ [WT]                 ./dist/deb/Packages => 1.04 KB
     ↻ [WT] [ ∞ 1| ⇅ 0 | o 0]    ./dist/deb/Packages.bz2 => 663 B
     ↻ [WT] [ ∞ 2| ⇅ 0 | o 0]    ./dist/deb/Packages.gz => 598 B
     ↻ [WT] [ ∞ 3| ⇅ 0 | o 0]    ./dist/deb/Packages.xz => 652 B
     ↻ [WT] [ ∞ 4| ⇅ 0 | o 0]    ./dist/deb/Release => 1.96 KB
     ↻ [WT] [ ∞ 5| ⇅ 0 | o 0]    ./dist/deb/bnycdn_0.3.0-1_amd64.deb => 8.97 MB
     ↻ [WT] [ ∞ 6| ⇅ 0 | o 0]    ./dist/deb/bnycdn_0.3.0-1_armel.deb => 7.85 MB
     ⌛ [UP] [ ∞ 6| ⇅ 1 | o 0]    /tetelincdn/sample/nightly/deb/bnycdn_0.3.0-1_armel.deb => 7.85 MB
     ⌛ [UP] [ ∞ 5| ⇅ 2 | o 0]    /tetelincdn/sample/nightly/deb/bnycdn_0.3.0-1_amd64.deb => 8.97 MB
     ⌛ [UP] [ ∞ 4| ⇅ 3 | o 0]    /tetelincdn/sample/nightly/deb/Release => 1.96 KB
     ⌛ [UP] [ ∞ 3| ⇅ 4 | o 0]    /tetelincdn/sample/nightly/deb/Packages.xz => 652 B
     ✔ [OK] [ ∞ 3| ⇅ 3 | o 0]    /tetelincdn/sample/nightly/deb/Packages.xz => 652 B
     ⌛ [UP] [ ∞ 2| ⇅ 4 | o 1]    /tetelincdn/sample/nightly/deb/Packages.gz => 598 B
     ✔ [OK] [ ∞ 2| ⇅ 3 | o 1]    /tetelincdn/sample/nightly/deb/Release => 1.96 KB
     ⌛ [UP] [ ∞ 1| ⇅ 4 | o 2]    /tetelincdn/sample/nightly/deb/Packages.bz2 => 663 B
     ✔ [OK] [ ∞ 1| ⇅ 3 | o 2]    /tetelincdn/sample/nightly/deb/Packages.gz => 598 B
     ⌛ [UP] [ ∞ 0| ⇅ 4 | o 3]    /tetelincdn/sample/nightly/deb/Packages => 1.04 KB
     ✔ [OK] [ ∞ 0| ⇅ 3 | o 3]    /tetelincdn/sample/nightly/deb/Packages.bz2 => 663 B
     ✔ [OK] [ ∞ 0| ⇅ 2 | o 4]    /tetelincdn/sample/nightly/deb/Packages => 1.04 KB
     ⌛ [WT] [ ∞ 0| ⇅ 2 | o 5]    It seems that I am still waiting for 2 files to process. Please wait ...
     ⌛ [UP] [ ∞ 0| ⇅ 2 | o 5]    ./dist/deb/bnycdn_0.3.0-1_armel.deb => 7.85 MB
     ⌛ [UP] [ ∞ 0| ⇅ 2 | o 5]    ./dist/deb/bnycdn_0.3.0-1_amd64.deb => 8.97 MB
    ---------------------------------------------------
     ✔ [OK] [ ∞ 0| ⇅ 1 | o 5]    /tetelincdn/sample/nightly/deb/bnycdn_0.3.0-1_armel.deb => 7.85 MB
     ✔ [OK]                 /tetelincdn/sample/nightly/deb/bnycdn_0.3.0-1_amd64.deb => 8.97 MB

    
    Download single file
    bnycdn cp -s testcdn /tetelincdn/nightly/deb/test.deb ./myfolder/mydeb.deb
     ⌛ [DL]                 ./myfolder/mydeb.deb =>  ? 
     ⌛ [IO]                 ./myfolder/mydeb.deb => 8.97 MB
     ✔ [OK]                 ./myfolder/mydeb.deb => 8.97 MB
     
    Recursive file download
    bnycdn cp -R -s testcdn /tetelincdn/nightly/deb/ ./myfolder/mydebs/
     ↻ [WT]                 /tetelincdn/nightly/deb/test.deb => 8.97 MB
     ↻ [WT] [ ∞ 1| ⇅ 0 | o 0]    /tetelincdn/nightly/deb/Release => 1.96 KB
     ↻ [WT] [ ∞ 2| ⇅ 0 | o 0]    /tetelincdn/nightly/deb/Packages.xz => 656 B
     ↻ [WT] [ ∞ 3| ⇅ 0 | o 0]    /tetelincdn/nightly/deb/Packages.gz => 597 B
     ↻ [WT] [ ∞ 4| ⇅ 0 | o 0]    /tetelincdn/nightly/deb/Packages.bz2 => 656 B
     ↻ [WT] [ ∞ 5| ⇅ 0 | o 0]    /tetelincdn/nightly/deb/Packages => 1.04 KB
     ↻ [WT] [ ∞ 6| ⇅ 0 | o 0]    /tetelincdn/nightly/deb/bnycdn_0.0.2-1_armel.deb => 7.65 MB
     ↻ [WT] [ ∞ 7| ⇅ 0 | o 0]    /tetelincdn/nightly/deb/bnycdn_0.0.2-1_amd64.deb => 8.78 MB
     ⌛ [DL] [ ∞ 7| ⇅ 1 | o 0]    ./myfolder/mydebs/bnycdn_0.0.2-1_amd64.deb => 8.78 MB
     ⌛ [DL] [ ∞ 6| ⇅ 2 | o 0]    ./myfolder/mydebs/bnycdn_0.0.2-1_armel.deb => 7.65 MB
     ⌛ [DL] [ ∞ 5| ⇅ 3 | o 0]    ./myfolder/mydebs/Packages => 1.04 KB
     ⌛ [DL] [ ∞ 4| ⇅ 4 | o 0]    ./myfolder/mydebs/Packages.bz2 => 656 B
     ⌛ [IO] [ ∞ 4| ⇅ 4 | o 0]    ./myfolder/mydebs/Packages => 1.04 KB
     ✔ [OK] [ ∞ 4| ⇅ 3 | o 1]    ./myfolder/mydebs/Packages => 1.04 KB
     ⌛ [DL] [ ∞ 3| ⇅ 4 | o 1]    ./myfolder/mydebs/Packages.gz => 597 B
     ⌛ [IO] [ ∞ 3| ⇅ 4 | o 1]    ./myfolder/mydebs/Packages.bz2 => 656 B
     ✔ [OK] [ ∞ 3| ⇅ 3 | o 2]    ./myfolder/mydebs/Packages.bz2 => 656 B
     ⌛ [DL] [ ∞ 2| ⇅ 4 | o 2]    ./myfolder/mydebs/Packages.xz => 656 B
     ⌛ [IO] [ ∞ 2| ⇅ 4 | o 2]    ./myfolder/mydebs/Packages.gz => 597 B
     ✔ [OK] [ ∞ 2| ⇅ 3 | o 3]    ./myfolder/mydebs/Packages.gz => 597 B
     ⌛ [IO] [ ∞ 2| ⇅ 3 | o 3]    ./myfolder/mydebs/Packages.xz => 656 B
     ✔ [OK] [ ∞ 2| ⇅ 2 | o 4]    ./myfolder/mydebs/Packages.xz => 656 B
     ⌛ [DL] [ ∞ 1| ⇅ 3 | o 4]    ./myfolder/mydebs/Release => 1.96 KB
     ⌛ [DL] [ ∞ 0| ⇅ 4 | o 4]    ./myfolder/mydebs/test.deb => 8.97 MB
     ⌛ [IO] [ ∞ 0| ⇅ 4 | o 4]    ./myfolder/mydebs/bnycdn_0.0.2-1_armel.deb => 7.65 MB
     ✔ [OK] [ ∞ 0| ⇅ 3 | o 5]    ./myfolder/mydebs/bnycdn_0.0.2-1_armel.deb => 7.65 MB
     ⌛ [IO] [ ∞ 0| ⇅ 3 | o 5]    ./myfolder/mydebs/Release => 1.96 KB
     ✔ [OK] [ ∞ 0| ⇅ 2 | o 6]    ./myfolder/mydebs/Release => 1.96 KB
     ⌛ [IO] [ ∞ 0| ⇅ 2 | o 6]    ./myfolder/mydebs/bnycdn_0.0.2-1_amd64.deb => 8.78 MB
     ✔ [OK] [ ∞ 0| ⇅ 1 | o 7]    ./myfolder/mydebs/bnycdn_0.0.2-1_amd64.deb => 8.78 MB
     ⌛ [IO] [ ∞ 0| ⇅ 1 | o 7]    ./myfolder/mydebs/test.deb => 8.97 MB
     ✔ [OK]                 ./myfolder/mydebs/test.deb => 8.97 MB
        
    
    Version < 0.3.0 style
    
    One file upload
    
    $ bnycdn cp -s testcdn --from ./dist/deb/bnycdn_0.0.2-1_amd64.deb --to /testcdn/nightly/deb/test.deb
     ⌛[UP]                 /testcdn/nightly/deb/test.deb => 8.78 MB
     ✔[OK]                 /testcdn/nightly/deb/test.deb => 8.78 MB

    
    Recursive file upload
    
    $ bnycdn cp -s dkfn -R --from ./dist --to /dkfn/nightly                
     ⌛[UP] [ ∞ 0| ⇈ 1]    /dkfn/nightly/deb/Packages => 1.04 KB
     ⌛[UP] [ ∞ 0| ⇈ 2]    /dkfn/nightly/deb/Packages.bz2 => 656 B
     ⌛[UP] [ ∞ 0| ⇈ 3]    /dkfn/nightly/deb/Packages.gz => 597 B
     ⌛[UP] [ ∞ 0| ⇈ 4]    /dkfn/nightly/deb/Packages.xz => 656 B
     ✔[OK] [ ∞ 3| ⇈ 3]    /dkfn/nightly/deb/Packages.xz => 656 B
     ✔[OK] [ ∞ 3| ⇈ 2]    /dkfn/nightly/deb/Packages.gz => 597 B
     ⌛[UP] [ ∞ 2| ⇈ 3]    /dkfn/nightly/deb/bnycdn_0.0.2-1_amd64.deb => 8.78 MB
     ⌛[UP] [ ∞ 1| ⇈ 4]    /dkfn/nightly/deb/bnycdn_0.0.2-1_armel.deb => 7.65 MB
     ✔[OK] [ ∞ 1| ⇈ 3]    /dkfn/nightly/deb/Packages => 1.04 KB
     ✔[OK] [ ∞ 1| ⇈ 2]    /dkfn/nightly/deb/Packages.bz2 => 656 B
     ⌛[UP] [ ∞ 0| ⇈ 3]    /dkfn/nightly/deb/Release => 1.96 KB
     ✔[OK] [ ∞ 0| ⇈ 2]    /dkfn/nightly/deb/Release => 1.96 KB
     ✔[OK] [ ∞ 0| ⇈ 1]    /dkfn/nightly/deb/bnycdn_0.0.2-1_armel.deb => 7.65 MB
     ✔[OK]                /dkfn/nightly/deb/bnycdn_0.0.2-1_amd64.deb => 8.78 MB
    `;

export const LS_COMMAND_EXAMPLE = `
    $ bnycdn ls /teststorage/sample/ -s mystoragename
    type       lastChanged              size       path                                         
    ---------  -----------------------  ---------  ---------------------------------------------
    [ DIR  ]   2019-04-13T13:20:45.874  0 B        /testcdn/sample/finalUpTest/node_modules  
    [ DIR  ]   2019-04-13T13:21:03.133  0 B        /testcdn/sample/finalUpTest/.idea         
    [ DIR  ]   2019-04-13T13:21:03.329  0 B        /testcdn/sample/finalUpTest/.git          
    [ FILE ]   2019-04-13T13:20:52.59   1.89 MB    /testcdn/sample/finalUpTest/samplesml.mkv 
    [ FILE ]   2019-04-13T13:21:50.066  18.82 MB   /testcdn/sample/finalUpTest/samplemid1.mkv
    [ FILE ]   2019-04-13T13:23:57.191  56.45 MB   /testcdn/sample/finalUpTest/samplebig.mkv 
    [ FILE ]   2019-04-13T13:20:45.876  173.59 KB  /testcdn/sample/finalUpTest/paris.jpg     
    [ FILE ]   2019-04-13T13:21:04.011  171 B      /testcdn/sample/finalUpTest/.editorconfig 

    You can also still use 0.2.x style
    $ bnycdn ls -d /teststorage/mydirectory/ -s mystoragename
    `;

export const PZ_COMMAND_EXAMPLE = `
     COMMANDS
     list
     purge
     add
     del
     ban
     grace
     
    $ bnycdn pz list
    id     cacheQuality  name             hostnames                                                   
    -----  ------------  ---------------  ------------------------------------------------------------
    58516  75            citybuilderscdn  [82062] citybuilderscdn.b-cdn.net ;                         
    59831  75            tetelincdn       [84195] tetelincdn.b-cdn.net ; [84196] cdn.infra.tetel.in ; 
     
    $ bnycdn pz -l
    id     cacheQuality  name             hostnames                                                   
    -----  ------------  ---------------  ------------------------------------------------------------
    58516  75            citybuilderscdn  [82062] citybuilderscdn.b-cdn.net ;                         
    59831  75            tetelincdn       [84195] tetelincdn.b-cdn.net ; [84196] cdn.infra.tetel.in ; 
    
    $ bnycdn pz add example.com -t tetelincdn
    ✔ Successfully added hostname 

    $ bnycdn pz ban 8.8.8.8 -t tetelincdn
    ✔ Successfully added blockedIp 8.8.8.8
    
    $ bnycdn pz grace 8.8.8.8 -t tetelincdn
    ✔ Successfully removed blocked ip : 8.8.8.8
    `;
