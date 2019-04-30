import {Command, flags} from '@oclif/command'
import {Config} from "../Config";
import {Client} from "../BunnyClient";

export default class Stats extends Command {

  static description = 'This command is to get statics for your account';

  static args = [{name: "", storage: "storage"}];

  async run() {
    Config.loadConfig();
    const {args, flags} = this.parse(Stats);
    const res = await Client.getStatistics(flags.key);
    res && console.table([res]);
  }
}
