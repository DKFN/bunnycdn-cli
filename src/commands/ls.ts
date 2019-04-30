import {Command, flags} from '@oclif/command'
import {Config} from "../Config";
import {Client} from "../BunnyClient";
const cTable = require('console.table');

export default class Ls extends Command {

  static description = 'describe the command here';

  static examples = [
    `$ bnycdn pz -l
    Lists all the pul zone
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
    const maybeDir = argv[0] || flags.dir;
    console.log(maybeDir);

    if (!flags.storage || !maybeDir) {
      this.error("You must specify a storage zone with -s and a flag directory with -d");
      this.exit(127);
    } else {
      const dirContent = await Client.listDirectory(flags.storage!, maybeDir);

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
