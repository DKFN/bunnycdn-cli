import {Command, flags} from '@oclif/command'
import {Config} from "../Config";
import {Client} from "../BunnyClient";
import * as fs from "fs";
import {downloadScanDir, IStatusStruct, uploadScanDir} from "../utils/fsutils";
import {CP_COMMAND_EXAMPLE} from "../examples";
const cTable = require("console.table");


export default class Cp extends Command {

  static description = 'This is the cp-like command for BunnyCDN storages.';

  static examples = [ CP_COMMAND_EXAMPLE ];

  static flags = {
    help: flags.help({char: 'h'}),
    storage: flags.string({char: 's'}),
    from: flags.string({char: 'f'}),
    to: flags.string({char: 't'}),
    R: flags.boolean({char: 'R'}),
  };

  static filesPooled = 0;

  static status: IStatusStruct = {pending: 0, working: 0, errors: 0, ok: 0, lastUpdate: Date.now()};

  static args = [{name: "from"}, {name: "to"}];

  async run() {
    Config.loadConfig();

    const {flags, argv} = this.parse(Cp);
    const from = argv[0] || flags.from;
    const to = argv[1] || flags.to;

    if (!flags.storage) {
      this.error("You must specify a storage zone with -s");
      this.exit(127);
    }

    const makePath = (userPath: string) => userPath.endsWith("/") ? userPath : userPath + "/";

    if (to && from) {
      if (fs.existsSync(from)) {
          if (flags.R) {
            uploadScanDir(
              makePath(from),
              makePath(to),
              flags.storage!,
              Cp.status,
              Client.uploadFile
            );
          } else {
              Client.uploadFile(flags.storage, from, to);
            }
      } else {
          if (flags.R) {
            downloadScanDir(
              flags.storage!,
              makePath(from),
              makePath(to),
              Cp.status,
              from
            );
          } else {
            // TODO : Check if filename is written, if not, append to path inside function
            Cp.status.working = Cp.status.working + 1;
            Client.downloadFile(flags.storage, from, to);
          }
      }
    }
  }
}
