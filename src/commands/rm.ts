import {Command, flags} from '@oclif/command'
import {Config} from "../Config";
import {Client} from "../BunnyClient";
import * as fs from "fs";
import {setInterval} from "timers";
import {downloadScanDir, IStatusStruct, uploadScanDir} from "../utils/fsutils";


export default class Rm extends Command {

  static description = 'This is the rm-like command for BunnyCDN storages.';

  static examples = [
    `
    This command is used to remove file and directory recursivly on the given storage
    `,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
    storage: flags.string({char: 's'}),
    from: flags.string({char: 'f'}),
    R: flags.boolean({char: 'R'}),
  };

  static filesPooled = 0;

  static status: IStatusStruct = {pending: 0, working: 0, errors: 0, ok: 0, lastUpdate: Date.now()};

  static args = [{name: "", storage: "storage"}];

  async run() {
    Config.loadConfig();
    const {args, flags} = this.parse(Rm);
  }
}
