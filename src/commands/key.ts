import {Command, flags} from '@oclif/command'
import {Config} from "../Config";

export default class Key extends Command {

  static description = 'describe the command here';

  static examples = [
    `$ bnycdn key -l
    hello world from ./src/hello.ts!
    `,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    set: flags.string({char: 's', description: 'Sets a key with given name'}),
    del: flags.string({char: 'd', description: 'Deletes a key with given name'}),
    value: flags.string({char: 'v', description: 'Gives a value for add and set operations'}),
    // flag with no value (-f, --force)
    list: flags.boolean({char: 'l', description: 'lists all keys stored and their names'}),
  };

  static args = [{add: "name", set: "name", value: "value"}];

  async run() {
    Config.loadConfig();
    const {args, flags} = this.parse(Key);

    if (flags.set) {
      if (!flags.value) {
        this.error("You must specify a value for the set operation", {code: "NOVALUE", exit: 1})
      }
      // TODO : Check fd ret codes
      this.addKey(flags.set, flags.value);
    }

    if (flags.del) {
      Config.deleteKey(flags.del)
    }

    if (flags.list) {
      this.listKeys();
    }
  }

  private listKeys() {
    const storeObj = Config.getConf();
    this.log("This is the content of the store apiKeys files : ");
    this.log("Key Name : Key Value");

    Object.keys(storeObj).forEach((k: string) => {
      this.log(k + " : " + storeObj[k]);
    });
  }

  private addKey(k: string, v: string) {
    Config.mergeToConf({[k]: v});
    Config.persistConf();
    this.log("Key successfully set: " + k);
  }
}
