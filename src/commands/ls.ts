import {Command, flags} from '@oclif/command'
import {Config} from "../Config";
import {Client} from "../BunnyClient";
import {LS_COMMAND_EXAMPLE} from "../examples";
const cTable = require('console.table');

export default class Ls extends Command {

  static description = 'describe the command here';

  static examples = [ LS_COMMAND_EXAMPLE ];

  static flags = {
    help: flags.help({char: 'h'}),
    storage: flags.string({char: 's'}),
    dir: flags.string({char: 'd'}),
  };

  static args = [{name: "Path", required: true}];

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
