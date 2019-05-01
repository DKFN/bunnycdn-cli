import {Command, flags} from '@oclif/command'
import {Config} from "../Config";
import {Client} from "../BunnyClient";
const cTable = require("console.table");

export default class Stats extends Command {

  static description = 'This command is to get statics for your account';

  static args = [];

  async run() {
    Config.loadConfig();
    const {flags} = this.parse(Stats);
    const res = await Client.getStatistics(flags.key);
    res && console.table([res]);
  }
}
