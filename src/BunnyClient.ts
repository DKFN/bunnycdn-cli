import axios from "axios"
import {Config} from "./Config";
import * as filesize from "filesize";
import * as fs from "fs";
import * as _ from "lodash";
import {cli} from "cli-ux";
const cTable = require('console.table');

class _Client {
  static RESTClient = (k: string, type: string) => axios.create({
    baseURL: type === "pullzones" ? "https://bunnycdn.com/api/" : "https://storage.bunnycdn.com/",
    timeout: 20000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'AccessKey': Config.getApiKey(k, type),
      'XX-CLIENT': "DKFN/bunnycdn-cli 0.0.3"
    }
  });

  static FileUpload = (k: string ,fileStream: Buffer, url: string) => axios.put(url, fileStream, {
    baseURL: "https://storage.bunnycdn.com/",
    timeout: 2000000000,
    data: fileStream.toString(),
    maxContentLength: Number.POSITIVE_INFINITY,
    headers: {
      'AccessKey': Config.getApiKey(k, "storages"),
      'XX-CLIENT': "DKFN/bunnycdn-cli 0.0.3"
    },
  });

  static FileDownload = (k: string, url: string) => axios.get(url, {
    baseURL: "https://storage.bunnycdn.com/",
    timeout: 2000000000,
    maxContentLength: Number.POSITIVE_INFINITY,
    headers: {
       'AccessKey': Config.getApiKey(k, "storages"),
      'XX-CLIENT': "DKFN/bunnycdn-cli 0.0.3"
    },
  });

  // GET   /api/pullzone
  public async listPullZones(k: string = "default") {
    try {
      const response = await _Client.RESTClient(k, "pullzones").get("pullzone");

      if (!Array.isArray(response.data)) {
        console.error("We didnt get a correct response from BunnyCDN. Please check if you have errors upper.");
        return;
      }

      // console.log("ID    |Hit(%)|    Name     |   HostNames");
      const finalData = response.data.map((x: any) => {
        let hostNamesString = "";

        x.Hostnames.forEach((hst: any) => {
          hostNamesString += "[" + hst.Id + "] " + hst.Value + " ; "
        });

        return  {id: x.Id, cacheQuality: x.CacheQuality, name: x.Name, hostnames: hostNamesString};
      });
      console.table(finalData);
    } catch (e) {
      _Client.throwHttpError(e);
      return [];
    }
  }

  // POST  /api/pullzone/id
  public async purgeCache(k: string = "default") {
    this.pullzoneActionByName(k, async (pullZone: any) => {
      const purge = await _Client.RESTClient("default", "pullzones").post("pullzone/" + pullZone.id + "/purgeCache");
      if (purge.status === 200)
        console.info(" ✔ Cleared cache for " + k + " successfully");
      else
        console.error("Error clearing cache for " + k + " ( " + purge.status + ") " + purge.statusText);
    });

  }

  public async downloadFile(k: string = "default",
                            from: string,
                            pathToDownload: string,
                            counterRef?: {pending: number, working: number, errors: number}) {
    try {
      console.log(" ⌛[DWN] " + "    "  + pathToDownload + " => ? ");
      const response = await _Client.FileDownload(k, from);
      console.info(" ✔ Downloaded from : " + from + " with key : " + k + " successfully");
      const fd = fs.openSync(pathToDownload, "w");
      const writeStatus = fs.writeFileSync(fd, response.data);
      console.log( " ✔[OK] " + "    " + pathToDownload + " => " + filesize(response.headers["content-length"]));
    } catch (e) {
      console.log(e);
      _Client.throwHttpError(e);
    }

  }


  public async uploadFile(k: string = "default",
                          from: string,
                          pathToUpload: string,
                          counterRef?: {pending: number, working: number, errors: number}) {
    try {
      const fd = fs.openSync(from, 'r');
      if (fd === -1) {
        console.error(" ❌[ERR] Uncaught sys errno. Error opening file");
      }
      const fileData = fs.readFileSync(fd);
      const qString = () => counterRef
        && counterRef.pending + counterRef.working !== 0
        && `[ ∞ ${counterRef.pending}| ⇈ ${counterRef.working}]` || "            ";

      console.log(" ⌛[UP] " + qString() + "    "  + pathToUpload + " => " + filesize(fileData.length));
      const response = await _Client.FileUpload(k, fileData,  pathToUpload);
      if (counterRef) {
        counterRef.working = counterRef.working - 1;
      }

      const data = response.data;
      if (response.status > 300) {
        counterRef && counterRef.errors++;
        console.error(" ❌[ERR] ERROR HTTP : " + data.HttpCode + " : " + data.message);
      }

      if (response.status === 201) {
        console.log( " ✔[OK] " + qString() + "    " + pathToUpload + " => " + filesize(fileData.length));
      }
    } catch (e) {
      console.error(" ❌[UP] Error " + pathToUpload + " " + e.message);
      console.debug(e.statusCode);
      console.debug(e);
    }
  }

  // POST   /api/pullzone/addHostname
  public async addHost(k: string = "default", hostname: string) {
    this.pullzoneActionByName(k, async (pullZone: any) => {
      const response = await _Client.RESTClient("default", "pullzones").post("pullzone/addHostname", {
        "PullZoneId": pullZone.id,
        "Hostname": hostname
      });

      if (response.status === 200) {
        cli.url(" ✔ Successfully added hostname ","http://" + hostname + "/" )
      } else {
        console.error(" ❌ Sorry, an error was met adding " + hostname + " hostname to pullzone " + k);
      }
    });
  }

  // POST   /api/pullzone/removeBlockedIp
  public async removeBlockedIp(k: string = "default", ipToBlock: string) {
    this.pullzoneActionByName(k, async (pullZone: any) => {
      const response = await _Client.RESTClient("default", "pullzones").post("pullzone/removeBlockedIp", {
        "PullZoneId": pullZone.id,
        "BlockedIp": ipToBlock
      });

      if (response.status === 200) {
        console.info(" ✔ Successfully removed blocked ip : " + ipToBlock);
      } else {
        console.error(" ❌ Sorry, an error was met removing " + ipToBlock);
      }
    });
  }

  // POST   /api/pullzone/addBlockedIp
  public async addBlockedIp(k: string = "default", ipToBlock: string) {
    this.pullzoneActionByName(k, async (pullZone: any) => {
      const response = await _Client.RESTClient("default", "pullzones").post("pullzone/addBlockedIp", {
        "PullZoneId": pullZone.id,
        "BlockedIp": ipToBlock
      });

      if (response.status === 200) {
        console.info(" ✔ Successfully added blockedIp " + ipToBlock)
      } else {
        console.error(" ❌ Sorry, an error was met adding " + ipToBlock + " hostname to pullzone " + k);
      }
    });
  }

  // DELETE /api/pullzone/deleteHostname
  public async deleteHost(k: string, hostname: string) {
    this.pullzoneActionByName(k, async (pullZone: any) => {
      const response = await _Client.RESTClient("default", "pullzones")
        .delete("pullzone/deleteHostname?id=" + pullZone.id + "&hostname=" + hostname);

      if (response.status === 200) {
        cli.url(" ✔ Successfully deleted hostname ","http://" + hostname + "/" )
      } else {
        console.error(" ❌ Sorry, an error was met deleting " + hostname + " hostname to pullzone " + k);
      }
    });
  }

  // POST  /api/pullzone
  public async createPullzone(n: string, origin: string) {
    try {
      const response = await _Client.RESTClient("default", "pullzones").post("pullzone", {
        "Name": n,
        "OriginUrl": origin,
      });

      if (response.status === 200) {
        console.info(" ✔ Successfully created pullZone " + n);
      } else {
        console.error(" ❌ Sorry, an error was met creating " + n + " pullzone");
      }
    } catch (e) {
      _Client.throwHttpError(e);
    }
  }

  public async listDirectory(k: string, targetPath: string) {
    try {
      const response = await _Client.RESTClient(k, "storages").get(targetPath);

      if (!Array.isArray(response.data)) {
        console.error("We didnt get a correct response from BunnyCDN. Please check if you have errors upper.");
        return;
      }

      return response.data.map((object) => {
        return {
          isDir: object.IsDirectory,
          FullPath: object.Path + object.ObjectName,
          lastChanged: object.DateCreated,
          Lenght: object.Length,
          humanLenght: filesize(object.Length)
        };
      })
    } catch (e) {
      _Client.throwHttpError(e);
    }
  }

  private async pullzoneActionByName(k: string = "default", actionHandler: (pz: any) => any) {
    try {
      const finalpz = await this.findPullzoneByName(k);

      if (!finalpz) {
        this.throwNoPullZoneWithId(k);
        return ;
      }

      actionHandler(finalpz);

    } catch (e) {
      _Client.throwHttpError(e);
    }
  }

  private async findPullzoneByName(k: string = "default"): Promise<any> {
    const response = await _Client.RESTClient("default", "pullzones").get("pullzone");

    if (!Array.isArray(response.data)) {
      console.error("We didnt get a correct response from BunnyCDN. Please check if you have errors upper.");
      return;
    }

    const gottenPzs = response.data.map((pz: any) => {
      return {id: pz.Id, name: pz.Name};
    });

     return _.find(gottenPzs, {name: k});
  }

  private static throwHttpError(e) {
    console.error("> [ " + ( e.response && e.response.status || "NO STATUS" ) +
      " ] There was an error during HTTP Request ( " + e.message + " )");

    if (e.response && e.response.data && e.response.data.Message) {
      console.error("> BunnyCDN error : " + e.response.data.Message);
    }
  }

  private throwNoPullZoneWithId(k) {
    console.error("I do not see pullzone : " + k);
    console.error(" Here is the list of pullzones : ");
    this.listPullZones();
  }
}

export const Client = new _Client();
