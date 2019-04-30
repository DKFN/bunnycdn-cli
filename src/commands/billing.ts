import {Command, flags} from '@oclif/command'
import {Config} from "../Config";
import {Client} from "../BunnyClient";

export default class Billing extends Command {

  static description = 'This command is to get statics for your account';

  static flags = {
    help: flags.help({char: 'h'}),
    key: flags.string({char: 'k', description: "Key to use to get the statistics"}),
  };

  async run() {
    Config.loadConfig();
    const {args, flags} = this.parse(Billing);
    const res = await Client.getBilling(flags.key);
    res && console.table([res]);
  }
}
