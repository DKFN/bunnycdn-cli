import {Command, flags} from '@oclif/command'
import {Config} from "../Config";
import {Client} from "../BunnyClient";
import * as fs from "fs";

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
    R: flags.string({char: 'R'}),
  };

  static args = [{name: "", storage: "storage"}];

  async run() {
    Config.loadConfig();
    const {args, flags} = this.parse(Cp);

    if (!flags.storage) {
      this.error("You must specify a storage zone with -s");
      this.exit(127);
    }

    if (flags.to && flags.from) {
      if (fs.existsSync(flags.from)) {
          if (flags.R) {
            console.log("Not implemented");
          } else {
            const fd = fs.openSync(flags.from, 'r');
            const content = fs.readFileSync(fd);
              /*if (err) {
                console.error(`[${err.errno}] Unable to open host file : ${err.message} ( ${err.syscall} ${err.path}`);
                this.exit(127);
              }*/
              Client.uploadFile(flags.storage, content, flags.to!);
            }
      } else {
          // TODO : Then it might be a download
      }
    }

    const storageZone = flags.storage;
    console.log(storageZone);

    // TODO : Try to resolve path from filesystem, if unable assume its a download and storage path is first
  }
}
