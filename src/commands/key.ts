import {Command, flags} from '@oclif/command'
import {Config, IStoredKey} from "../Config";

export default class Key extends Command {

  static description = 'To add / delete / set a key for account pullzones or a storage';

  static examples = [
    `
        ➜  bunnycdn-cli git:(master) ✗ bnycdn key -l  
        ==== PullZones : 
        Key Name        : Key Value
        default   | .....
        ==== Storages: 
        Key Name        : Key Value
        default | .....
        name | .....

        Add default API Key:
        ➜  bunnycdn-cli git:(master) ✗ bnycdn key -s default -v my_api_key_from_panel
        ⓘ Successfully deleted key : default

        Add aliased API Key (If you have multiple accounts):
        ➜  bunnycdn-cli git:(master) ✗ bnycdn key -s myKeyName -v my_api_key_from_panel
        ⓘ Successfully deleted key : myKeyName

        Add a storage Key:
        ➜  bunnycdn-cli git:(master) ✗ bnycdn key -s mynewkey -t storages -v my_storage_ftp_password
        ⓘ Key successfully set: mynewkey

        Add a default storage Key:
        ➜  bunnycdn-cli git:(master) ✗ bnycdn key -s default -t storages -v my_storage_ftp_password
        ⓘ Key successfully set: mynewkey

        Delete a key
        ➜  bunnycdn-cli git:(master) ✗ bnycdn key -d mynewkey -t storages                         
        ⓘ Successfully deleted key : mynewkey
    `,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    type: flags.string({char: 't', description: 'Type of the key ( pullzones OR storages )'}),
    set: flags.string({char: 's', description: 'Sets a key with given name '}),
    del: flags.string({char: 'd', description: 'Deletes a key with given name'}),
    value: flags.string({char: 'v', description: 'Gives a value for add and set operations'}),
    list: flags.boolean({char: 'l', description: 'lists all keys stored and their names'}),
  };

  static args = [{name: "", add: "name", set: "string", value: "value"}];

  async run() {
    Config.loadConfig();
    const {args, flags} = this.parse(Key);


    if (flags.list) {
      this.listKeys();
      return;
    }

    if (flags.set) {
      // TODO : Allow edition in prompt mode if no params is specified
      if (flags.value) {
        this.addKey(flags.value, flags.set, flags.type);
        this.exit(0);
      } else {
        this.error(" 1 You must specify a value and a type for the set operation and must be correctly set",
          {code: "NOVALUE", exit: 1}
        );
      }
    }

    if (flags.del) {
        Config.deleteKey(flags.del, flags.type);
    }
  }

  private listKeys() {
    const conf = Config.getConf();
    this.log("==== PullZones : ");

    const pullzoneKeys = conf["pullzones"].map((pzKs: IStoredKey) => {
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
  private addKey(v: string, k: string = "default", t: string = "pullzones") {
    Config.mergeToConf( {name: k, value: v}, t);
    Config.persistConf();
    this.log(" ⓘ Key successfully set: " + k);
  }

  private checkType(type?: string) {
    return (type === "pullzones" || type === "storages" || !type)
  }
}
