
export const KEY_COMMAND_EXAMPLE =
  `
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
