import {Command, flags} from '@oclif/command'
import {Config} from "../Config";
import {Client} from "../BunnyClient";

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
  };

  static args = [{name: "", storage: "storage"}];

  async run() {
    Config.loadConfig();
    const {args, flags} = this.parse(Ls);

    if (!flags.storage) {
      this.error("You must specify a storage zone with -s");
      this.exit(127);
    }

    const storageZone = flags.storage;
    console.log(storageZone);
  }

  private listPullZones() {
    Client.listPullZones();
  }
}
