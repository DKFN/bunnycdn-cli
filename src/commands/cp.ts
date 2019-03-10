import {Command, flags} from '@oclif/command'
import {Config} from "../Config";
import {Client} from "../BunnyClient";
import * as fs from "fs";
import {setInterval} from "timers";
import {IStatusStruct, scanDir} from "../utils/fsutils";


export default class Cp extends Command {

  static description = 'This is the cp-like command for BunnyCDN storages. Cp has only upload implemented for now';

  static examples = [
    `
    ### One file upload
    $ bnycdn pz -l
    
    ### Recursive file upload
    `,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
    storage: flags.string({char: 's'}),
    from: flags.string({char: 'f'}),
    to: flags.string({char: 't'}),
    R: flags.boolean({char: 'R'}),
  };

  static filesPooled = 0;

  static status: IStatusStruct = {pending: 0, working: 0, errors: 0};

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
            scanDir(
              flags.from.endsWith("/") ? flags.from : flags.from + "/",
              flags.to.endsWith("/") ? flags.to : flags.to + "/",
              flags.storage,
              Cp.status,
              Client.uploadFile
            );
          } else {
              Client.uploadFile(flags.storage, flags.from, flags.to!);
            }
      } else {
        console.error("Download is not implemented yet");
          // TODO : Then it might be a download
      }
    }
  }
}
