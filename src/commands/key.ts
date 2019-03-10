import {Command, flags} from '@oclif/command'
import {Config, IStoredKey} from "../Config";

export default class Key extends Command {

  static description = 'To add / delete / set a key for a pullzon or a storage';

  static examples = [
    `$ bnycdn key -l
    hello world from ./src/hello.ts!
    `,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    type: flags.string({char: 't', description: 'Type of the key'}),
    set: flags.string({char: 's', description: 'Sets a key with given name'}),
    del: flags.string({char: 'd', description: 'Deletes a key with given name'}),
    value: flags.string({char: 'v', description: 'Gives a value for add and set operations'}),
    list: flags.boolean({char: 'l', description: 'lists all keys stored and their names'}),
  };

  static args = [{name: "", add: "name", set: "name", value: "value"}];

  async run() {
    Config.loadConfig();
    const {args, flags} = this.parse(Key);

    if (flags.set) {
      if (flags.value && flags.type && this.checkType(flags.type)) {
        this.addKey(flags.set, flags.value, flags.type);
        this.exit(0);
      } else {
        this.error("You must specify a value and a type for the set operation and must be correctly set",
          {code: "NOVALUE", exit: 1}
        );
      }
      // TODO : Check fd ret codes
    }

    if (flags.del && flags.type && this.checkType(flags.type)) {
      Config.deleteKey(flags.del, flags.type)
      this.exit(0);
    } else {
      this.error("You must specify a value and a type for the set operation and must be correctly set",
          {code: "NOVALUE", exit: 1}
      );
    }

    if (flags.list) {
      this.listKeys();
    }
  }

  private listKeys() {
    const conf = Config.getConf();
    this.log("==== PullZones : ");

    conf["pullzones"].forEach((pzKs: IStoredKey) => {
      this.log("Key Name        : Key Value");
      this.log(pzKs.name + "   | " + pzKs.value);
    });

    this.log("==== Storages: ");
    conf["storages"].forEach((stKz: IStoredKey) => {
      this.log("Key Name        : Key Value");
      this.log(stKz.name + " | " + stKz.value);
    });

  }

  private addKey(k: string, v: string, t: string = "pullzones") {
    console.log({k, v, t});
    Config.mergeToConf( {name: k, value: v}, t);
    Config.persistConf();
    this.log("ⓘKey successfully set: " + k);
  }

  private checkType(type?: string) {
    return (type === "pullzones" || type === "storages" || !type)
  }
}
