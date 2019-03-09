import {Command, flags} from '@oclif/command'
import {Config} from "../Config";
import {Client} from "../BunnyClient";

export default class Cp extends Command {

  static description = 'This is the cp-like command for BunnyCDN storages';

  static examples = [
    `$ bnycdn pz -l
    Lists all the pul zone
    `,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
    storage: flags.string({char: 's'}),
    from: flags.string({char: 'f'}),
    to: flags.string({char: 't'}),
  };

  static args = [{name: "Cp command for storages", storage: "storage"}];

  async run() {
    Config.loadConfig();
    const {args, flags} = this.parse(Cp);

    if (!flags.storage) {
      this.error("You must specify a storage zone with -s");
      this.exit(127);
    }

    const storageZone = flags.storage;
    console.log(storageZone);
  }
}
