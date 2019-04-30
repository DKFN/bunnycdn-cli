import {Command, flags} from '@oclif/command'
import {Config} from "../Config";
import {Client} from "../BunnyClient";
import * as fs from "fs";
import {setInterval} from "timers";
import {downloadScanDir, IStatusStruct, uploadScanDir} from "../utils/fsutils";


export default class Billing extends Command {

  static description = 'This command is to get statics for your account';

  static examples = [
    `
    `,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
    key: flags.string({char: 'k', description: "Key to use to get the statistics"}),
  };

  static filesPooled = 0;

  static status: IStatusStruct = {pending: 0, working: 0, errors: 0, ok: 0, lastUpdate: Date.now()};

  static args = [{name: "", storage: "storage"}];

  async run() {
    Config.loadConfig();
    const {args, flags} = this.parse(Billing);
    const res = await Client.getBilling(flags.key);
    res && console.table([res]);
  }
}
