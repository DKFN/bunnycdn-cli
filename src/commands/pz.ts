import {Command, flags} from '@oclif/command'
import {Config} from "../Config";
import {Client} from "../BunnyClient";

export default class Pz extends Command {

  static description = 'describe the command here';

  static examples = [
    `$ bnycdn pz -l
    Lists all the pul zone
    `,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
    list: flags.boolean({char: 'l', description: 'lists all keys stored and their names'}),
  };

  static args = [{}];

  async run() {
    Config.loadConfig();
    const {args, flags} = this.parse(Pz);

    if (flags.list) {
      const response = this.listPullZones();
      console.log(response);
    }
  }

  private listPullZones() {
    Client.listPullZones("default");
  }
}
