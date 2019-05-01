import {Command, flags} from '@oclif/command'
import {Config} from "../Config";
import {Client} from "../BunnyClient";
const cTable = require('console.table');

export default class Ls extends Command {

  static description = 'describe the command here';

  static examples = [
    `
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
    `,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
    storage: flags.string({char: 's'}),
    dir: flags.string({char: 'd'}),
  };

  static args = [{name: "Path", storage: "storage"}];

  async run() {
    Config.loadConfig();
    const {flags, argv} = this.parse(Ls);
    const storage = flags.storage || "default";
    const maybeDir = argv[0] || flags.dir;

    if (!maybeDir) {
      this.error("You must specify a storage zone with -s and a flag directory with -d");
      this.exit(127);
    } else {
      const dirContent = await Client.listDirectory(storage, maybeDir);

      const finalData = dirContent && dirContent
        .sort((a, b) => a.isDir && !b.isDir && -1 || 1)
        .map((element) => {
          const type = element.isDir ? "[ DIR  ] " : "[ FILE ] " ;
          return {type: type,  lastChanged: element.lastChanged, size: element.humanLenght, path: element.FullPath};
      });
      console.table(finalData);
    }

  }
}
