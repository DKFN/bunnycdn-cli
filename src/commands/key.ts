import {Command, flags} from '@oclif/command'
import {Config, IStoredKey} from "../Config";
const ctable = require("console.table");
import * as process from "process";
import {KEY_COMMAND_EXAMPLE} from "../examples";
const cTable = require("console.table");

export default class Key extends Command {

  static description = 'To add / delete / set a key for account pullzones or a storage';

  static examples = [ KEY_COMMAND_EXAMPLE ];

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    type: flags.string({char: 't', description: 'Type of the key ( pullzones OR storages )'}),
    set: flags.string({char: 's', description: 'Sets a key with given name '}),
    del: flags.string({char: 'd', description: 'Deletes a key with given name'}),
    value: flags.string({char: 'v', description: 'Gives a value for add and set operations'}),
    list: flags.boolean({char: 'l', description: 'lists all keys stored and their names'}),
  };

  static args = [{name: "Command"}, {name: "key_name"}, {name: "key_value"}];

  async run() {
    Config.loadConfig();
    const {flags, argv} = this.parse(Key);

    const command = argv[0];
    const maybeName = argv[1] || flags.set || flags.del;
    const maybeValue = argv[2] || flags.value;

    if (flags.list || command === "list") {
      this.listKeys();
      return;
    }

    if (flags.set || command === "set") {
      // TODO : Allow edition in prompt mode if no params is specified
      if (maybeValue) {
        this.addKey(maybeValue, flags.set || maybeName, flags.type || "apikey");
        return ;
      } else {
        this.error("You must specify a value and a type for the set operation and must be correctly set",
          {code: "NOVALUE", exit: 1}
        );
      }
    }

    if ((flags.del || command === "del") && maybeName) {
        Config.deleteKey(maybeName, flags.type);
    }
  }

  private listKeys() {
    const conf = Config.getConf();

    this.log("==== API Keys: ");
    const pullzoneKeys = conf["apikey"].map((pzKs: IStoredKey) => {
      return {name: pzKs.name, value: pzKs.value};
    });
    console.table(pullzoneKeys);

    this.log("==== Storages: ");
    const storageKeys = conf["storages"].map((stKz: IStoredKey) => {
      return {name: stKz.name, value: stKz.value};
    });
    console.table(storageKeys);
  }

  // TODO : Add prompt version  if parameters are unspecified
  private addKey(v: string, k: string = "default", t: string = "apikey") {
    Config.mergeToConf( {name: k, value: v}, t);
    Config.persistConf();
    this.log(" ⓘ Key successfully set: " + k);
  }

  private checkType(type?: string) {
    return (type === "apikey" || type === "storages" || !type)
  }
}
