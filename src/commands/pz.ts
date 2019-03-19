import {Command, flags} from '@oclif/command'
import {Config} from "../Config";
import {Client} from "../BunnyClient";

export default class Pz extends Command {

  static description = 'Only allows you to list pull zones so far';

  static examples = [
     `
    ➜  bunnycdn-cli git:(master) ✗ ./bin/run pz -l
    ID    |Hit(%)|    Name     |   HostNames
    0 |  75  | pzb | [2] pzb.b-cdn.net ; 
    1 |  75  | pza | [3] pza.b-cdn.net ; [4] custom.example.com ; 
    
    Lists all the pull zones
    `,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
    list: flags.boolean({char: 'l', description: 'lists all pull zones'}),
    // TODO : If no pullzone specified, then clear cache for all pullzones
    purge: flags.string({char: 'p', description: 'purge cache for pullzone in id'}),
    addHost: flags.string({char: 'a', description: 'Adds an hostname to a pull zone'}),
    delHost: flags.string({char: 'd', description: 'Deletes an hostname from a pull zone'}),
    value: flags.string({char: 'v', description: 'Value for add hostname / purge pullzone '})
  };

  static args = [{name: "PullZones", help: "help", list: "list"}];

  async run() {
    Config.loadConfig();
    const {args, flags} = this.parse(Pz);

    if (flags.list) {
      Client.listPullZones("default");
    }

    if (flags.addHost) {
      Client.addHost(flags.addHost, flags.value!);
    }

    if (flags.delHost) {
      Client.deleteHost(flags.delHost, flags.value!);
    }

    if (flags.purge) {
      Client.purgeCache(flags.purge);
    }
  }
}
