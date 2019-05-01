import {Command, flags} from '@oclif/command'
import {Config} from "../Config";
import {Client} from "../BunnyClient";
import {PZ_COMMAND_EXAMPLE} from "../examples";
const cTable = require("console.table");

export default class Pz extends Command {

  static description = 'This is the subcommand for pullzone operations';

  static examples = [ PZ_COMMAND_EXAMPLE ];

  static flags = {
    help: flags.help({char: 'h'}),
    list: flags.boolean({char: 'l', description: 'lists all pull zones'}),
    key: flags.string({char: 'k', description: 'specify a key if you use anorther one than default'}),
    // TODO : If no pullzone specified, then clear cache for all pullzones
    purge: flags.string({char: 'p', description: 'purge cache for pullzone in id'}),
    addHost: flags.string({char: 'a', description: 'Adds an hostname to a pull zone'}),
    delHost: flags.string({char: 'd', description: 'Deletes an hostname from a pull zone'}),
    ban: flags.string({char: 'b', description: 'Bans an IP from a pullzone'}),
    grace: flags.string({char: 'g', description: 'Unbans an IP from a pullzone'}),
    create: flags.string({char: 'c', description: 'Creates a new pullzone'}),
    value: flags.string({char: 'v', description: 'Value for add hostname / purge pullzone '}),
    target: flags.string({char: 't', description: 'Target for the given operation'})
  };

  static args = [{name: "command"}, {name: "value"}];

  async run() {
    Config.loadConfig();
    const {flags, argv} = this.parse(Pz);

    const command = argv[0];
    const maybeValue = argv[1] || flags.value;

    const checkHasValue = (maybeValue?: string) => {
      if (!maybeValue)
        console.error(" This call needs a value (-v <value>) flag or second argument");
      return !!maybeValue;
    };

    if (flags.list || command === "list") {
      Client.listPullZones(flags.key || "default");
    }

    if ((flags.addHost || command === "add") && checkHasValue(maybeValue)) {
      Client.addHost(flags.key, flags.addHost || flags.target, maybeValue!);
    }

    if ((flags.delHost || command === "del") && checkHasValue(maybeValue)) {
      Client.deleteHost(flags.key, flags.delHost || flags.target!, maybeValue!);
    }

    if (flags.purge || command === "purge") {
      Client.purgeCache(flags.key, flags.purge || flags.target);
    }

    if ((flags.ban || command === "ban") && checkHasValue(maybeValue)) {
      Client.addBlockedIp(flags.key, flags.ban || flags.target, maybeValue!);
    }

    if ((flags.grace  || command === "grace") && checkHasValue(maybeValue)) {
      Client.removeBlockedIp(flags.key, flags.grace || flags.target, maybeValue!);
    }
  }
}
