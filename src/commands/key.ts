import {Command, flags} from '@oclif/command'
import * as fs from "fs"
import * as os from "os"

export default class Key extends Command {
  static storePath = os.homedir() + "/.bunnycdn";

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
    add: flags.string({char: 'a', description: 'Adds a key with given name'}),
    set: flags.string({char: 's', description: 'Sets a key with given name'}),
    value: flags.string({char: 'v', description: 'Gives a value for add and set operations'}),
    // flag with no value (-f, --force)
    list: flags.boolean({char: 'l', description: 'lists all keys stored and their names'}),
  };

  static args = [{add: "name", set: "name", value: "value"}];

  async run() {
    const {args, flags} = this.parse(Key);

    if (flags.add) {
      if (!flags.value) {
        this.error("You must specify a value for the add operation", {code: "NOVALUE", exit: 1})
      }
      // TODO : Check fd ret codes
      this.addKey(flags.add, flags.value);
    }

    if (flags.list) {
      this.listKeys();
    }
  }

  private listKeys() {
    if (fs.existsSync(Key.storePath)) {
      // TODO : Check fd ret codes
      const fd = fs.openSync(Key.storePath, 'r');
      const storeContent = fs.readFileSync(fd);
      this.log("This is the content of the store apiKeys files : ");
      this.log("Key Name : Key Value");
      const storeobj = JSON.parse(storeContent.toString());
      Object.keys(storeobj).forEach((k: string) => {
        this.log(k + " : " + storeobj[k]);
      });
      fs.closeSync(fd);
    } else {
      this.error("There is no key to list as there is no " + Key.storePath + " file yet (Have you added a key ?)", {code: "NOCONF", exit: 1});
    }
  }

  private addKey(key: string, value: string) {
      const fd = fs.openSync(Key.storePath, 'a+');
      const storeContent = fs.readFileSync(fd).toString();

      // State is stored truncate the file
      const store = storeContent === "" ? {} : JSON.parse(storeContent);
      this.debug("This is the content of the store apiKeys files : " + store);
      this.debug(store);

      store[key] = value;

      fs.ftruncateSync(fd);
      fs.writeFileSync(fd, JSON.stringify(store));

      fs.closeSync(fd);
  }
}
