import * as fs from "fs"
import * as os from "os"

class _Config {
  static storePath = os.homedir() + "/.bunnycdn";

  private configuration: Object = {};

  // Typically loading configuration from the storage files
  public loadConfig() {
    if (fs.existsSync(_Config.storePath)) {
      const fd = fs.openSync(_Config.storePath, 'r');
      const storeContent = fs.readFileSync(fd);
      this.configuration = JSON.parse(storeContent.toString());
      fs.closeSync(fd);
      console.log("Loaded config : ", this.configuration);
      return this.configuration
    } else {
      this.createInitFile();
    }
  }

  // Gets the local configuration loaded
  public getConf() {
    return this.configuration
  }

  // This function will auto append unexisting keys and will replace existing keys
  public mergeToConf(objectToMerge: Object) {
    this.configuration = Object.assign(this.configuration, objectToMerge);
  }

  // Deletes a key and its values from the store
  public deleteKey(k: string) {
    if (!this.has(k)) {
      console.error("There is no key " + k);
      return ;
    }

    delete this.configuration[k];
    this.persistConf();
    console.log("Successfully deleted key : " + k);
  }

  public has(k: string) {
    return Object.keys(this.configuration).indexOf(k) !== -1
  }

  public getApiKey(k: string) {
    if (!this.has(k)) {
      console.error("There is no key " + k);
      return ;
    }
    return this.configuration[k];
  }

  // This function persists the current state of the configuration into the configuration file
  public persistConf() {
    const fd = fs.openSync(_Config.storePath, 'a+');
    fs.ftruncateSync(fd);
    fs.writeFileSync(fd, JSON.stringify(this.configuration));
    fs.closeSync(fd);
  }

  // This creates the configuration file with the base state
  private createInitFile() {
    const fd = fs.openSync(_Config.storePath, 'a+');
    fs.ftruncateSync(fd);
    fs.writeFileSync(fd, JSON.stringify({}));
    fs.closeSync(fd);
  }
}

export const Config = new _Config();
