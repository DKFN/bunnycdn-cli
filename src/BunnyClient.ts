import axios from "axios"
import {Config} from "./Config";
import * as filesize from "filesize";
import * as fse from "fs-extra";
import * as _ from "lodash";
import {cli} from "cli-ux";
import {IStatusStruct} from "./utils/fsutils";
import * as fs from "fs";
import {qString} from "./utils/filequeue";
const cTable = require('console.table');


class _Client {
  static RESTClient = (k: string, type: string) => axios.create({
    baseURL: type === "apikey" ? "https://bunnycdn.com/api/" : "https://storage.bunnycdn.com/",
    timeout: 20000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'AccessKey': Config.getApiKey(k, type),
      'XX-CLIENT': "DKFN/bunnycdn-cli 0.2.0"
    }
  });

  static FileUpload = (k: string ,fileStream: Buffer, url: string) => axios.put(url, fileStream, {
    baseURL: "https://storage.bunnycdn.com/",
    timeout: 2000000000,
    data: fileStream.toString(),
    maxContentLength: Number.POSITIVE_INFINITY,
    headers: {
      'AccessKey': Config.getApiKey(k, "storages"),
      'XX-CLIENT': "DKFN/bunnycdn-cli 0.2.0"
    },
  });

  static FileDownload = (k: string, url: string) => axios.get(url, {
    baseURL: "https://storage.bunnycdn.com/",
    timeout: 2000000000,
    maxContentLength: Number.POSITIVE_INFINITY,
    headers: {
      'AccessKey': Config.getApiKey(k, "storages"),
      'XX-CLIENT': "DKFN/bunnycdn-cli 0.2.0"
    },
  });

  // GET   /api/pullzone
  public async listPullZones(k: string = "default") {
    try {
      const response = await _Client.RESTClient(k, "apikey").get("pullzone");

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
    } catch(e) {
      _Client.throwHttpError(e);
      return [];
    }
  }

  // GET   /api/statistics
  public async getStatistics(k: string = "default") {
    try {
      const response = await _Client.RESTClient(k, "apikey").get("statistics");
      return {
        total: filesize(response.data.TotalBandwidthUsed),
        requests: response.data.TotalRequestsServed,
        hitrate: response.data.CacheHitRate.toFixed(2) + "%"
      }
    } catch(e) {
      _Client.throwHttpError(e);
      return;
    }
  }

  // GET   /api/billing
  public async getBilling(k: string = "default") {
    try {
      const response = await _Client.RESTClient(k, "apikey").get("billing")
      console.log("This month: " + response.data.ThisMonthCharges.toFixed(2) + " Balance: " + response.data.Balance.toFixed(2) + "\n");
      return {
        storageTotal: response.data.MonthlyChargesStorage.toFixed(4),
        euTraffic: response.data.MonthlyChargesEUTraffic.toFixed(4),
        usTraffic: response.data.MonthlyChargesUSTraffic.toFixed(4),
        asiaTraffic: response.data.MonthlyChargesASIATraffic.toFixed(4),
        saTraffic: response.data.MonthlyChargesSATraffic.toFixed(4)
      };
    } catch(e) {
      _Client.throwHttpError(e);
      return;
    }
  }

  // POST  /api/pullzone/id
  public async purgeCache(apiKey: string = "default", k: string = "default") {
    this.pullzoneActionByName(apiKey, k, async (pullZone: any) => {
      const purge = await _Client.RESTClient(apiKey, "apikey").post("pullzone/" + pullZone.id + "/purgeCache");
      if (purge.status === 200)
        console.info(" ✔ Cleared cache for " + k + " successfully");
      else
        console.error("Error clearing cache for " + k + " ( " + purge.status + ") " + purge.statusText);
    });

  }

  public async downloadFile(k: string = "default",
                            from: string,
                            pathToDownload: string,
                            counterRef?: IStatusStruct,
                            maybeLength?: string,
                            ) {
    try {
      counterRef && counterRef.pending--;
      counterRef && counterRef.working++;
      counterRef && (counterRef.lastUpdate = Date.now());
      const pathArray = pathToDownload.split("/");
      const dir = pathArray.splice(0, pathArray.length - 1).join("/");
      fse.ensureDirSync(dir);

      console.log(" ⌛ [DL] " + qString(counterRef) + "    "  + pathToDownload + " => " + ( maybeLength || " ? " ));
      const response = await _Client.FileDownload(k, from);

      if (!response.headers["content-length"]) {
        console.error("we did not get a filesize. (Did you tried to download a directory without -R option?)");
        return;
      }
      const size = filesize(response.headers["content-length"]);

      const fd = fs.openSync(pathToDownload, "w");
      console.log(" ⌛ [IO] " + qString(counterRef) + "    "  + pathToDownload + " => " + ( size || " ? " ));
      fs.writeFileSync(fd, response.data);
      fs.closeSync(fd);
      if (counterRef) {
        counterRef.ok = counterRef.ok + 1;
        counterRef.working = counterRef.working - 1;

      }
      console.log( " ✔ [OK] " + qString(counterRef) + "    " + pathToDownload + " => " + size);
    } catch (e) {
      if (counterRef) {
        counterRef.working = counterRef.working - 1;
        // counterRef.pending = counterRef.pending - 1;
      }
      _Client.throwHttpError(e);
    }

  }


  public async uploadFile(k: string = "default",
                          from: string,
                          pathToUpload: string,
                          counterRef?: IStatusStruct) {
    try {
      counterRef && counterRef.pending--;
      counterRef && counterRef.working++;
      counterRef && (counterRef.lastUpdate = Date.now());
      const fd = fs.openSync(from, 'r');
      if (fd === -1) {
        console.error(" ❌ [ERR] Uncaught sys errno. Error opening file");
      }
      const fileData = fs.readFileSync(fd);

      console.log(" ⌛ [UP] " + qString(counterRef) + "    "  + pathToUpload + " => " + filesize(fileData.length));
      const response = await _Client.FileUpload(k, fileData,  pathToUpload);
      if (counterRef) {
        counterRef.working = counterRef.working - 1;
      }

      const data = response.data;
      if (response.status > 300) {
        counterRef && counterRef.errors++;
        console.error(" ❌ [ERR] ERROR HTTP : " + data.HttpCode + " : " + data.message);
      }

      if (response.status === 201) {
        console.log( " ✔ [OK] " + qString(counterRef) + "    " + pathToUpload + " => " + filesize(fileData.length));
        if (counterRef) {
          counterRef.ok = counterRef.ok + 1;
          counterRef.lastUpdate = Date.now();
        }
      }
      fs.closeSync(fd);
    } catch (e) {
      console.error(" ❌ [UP] Error " + pathToUpload + " " + e.message);
      if (counterRef) {
        counterRef.working = counterRef.working - 1;
      }
      _Client.throwHttpError(e);
    }
  }

  // POST   /api/pullzone/addHostname
  public async addHost(apiKey: string = "default", k: string = "default", hostname: string) {
    this.pullzoneActionByName(apiKey, k, async (pullZone: any) => {
      try {
        const response = await _Client.RESTClient(apiKey, "apikey").post("pullzone/addHostname", {
          "PullZoneId": pullZone.id,
          "Hostname": hostname
        });

        if (response.status === 200) {
          cli.url(" ✔ Successfully added hostname ", "http://" + hostname + "/")
        } else {
          console.error(" ❌ Sorry, an error was met adding " + hostname + " hostname to pullzone " + k);
        }
      } catch (e) {
        _Client.throwHttpError(e);
      }
    });
  }

  public async removeFile(apiKey: string = "default", pathToDelete: string) {
    try {
      const response = await _Client.RESTClient(apiKey, "storages").delete(pathToDelete);
      if (response.status === 200) {
        console.info(` ✔ [OK] File deleted at : ${pathToDelete}`);
      } else {
        console.error(" ❌ Sorry, there was an error trying to delete the file at the path : " + pathToDelete);
      }
    } catch (e) {
      _Client.throwHttpError(e);
    }
  }

  // POST   /api/pullzone/removeBlockedIp
  public async removeBlockedIp(apiKey: string = "default", k: string = "default", ipToBlock: string) {
    this.pullzoneActionByName(apiKey, k, async (pullZone: any) => {
      try {
        const response = await _Client.RESTClient(apiKey, "apikey").post("pullzone/removeBlockedIp", {
          "PullZoneId": pullZone.id,
          "BlockedIp": ipToBlock
        });

        if (response.status === 200) {
          console.info(" ✔ Successfully removed blocked ip : " + ipToBlock);
        } else {
          console.error(" ❌ Sorry, an error was met removing " + ipToBlock);
        }
      } catch (e) {
        _Client.throwHttpError(e);
      }
    });
  }

  // POST   /api/pullzone/addBlockedIp
  public async addBlockedIp(apiKey: string = "default", k: string = "default", ipToBlock: string) {
    this.pullzoneActionByName(apiKey, k, async (pullZone: any) => {
      try {
        const response = await _Client.RESTClient(apiKey, "apikey").post("pullzone/addBlockedIp", {
          "PullZoneId": pullZone.id,
          "BlockedIp": ipToBlock
        });

        if (response.status === 200) {
          console.info(" ✔ Successfully added blockedIp " + ipToBlock)
        } else {
          console.error(" ❌ Sorry, an error was met adding " + ipToBlock + " hostname to pullzone " + k);
        }
      }
      catch (e) {
        _Client.throwHttpError(e);
      }
    });
  }

  // DELETE /api/pullzone/deleteHostname
  public async deleteHost(apiKey: string = "default", k: string, hostname: string) {
    this.pullzoneActionByName(apiKey, k, async (pullZone: any) => {
      try {
        const response = await _Client.RESTClient("default", "apikey")
          .delete("pullzone/deleteHostname?id=" + pullZone.id + "&hostname=" + hostname);

        if (response.status === 200) {
          cli.url(" ✔ Successfully deleted hostname ", "http://" + hostname + "/")
        } else {
          console.error(" ❌ Sorry, an error was met deleting " + hostname + " hostname to pullzone " + k);
        }
      } catch (e) {
        _Client.throwHttpError(e);
      }
    });
  }

  // POST  /api/pullzone
  public async createPullzone(n: string, origin: string) {
    try {
      const response = await _Client.RESTClient("default", "apikey").post("pullzone", {
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

  public async listDirectory(k: string, targetPath: string, status?: IStatusStruct) {
    try {
      status && status.pending--;
      status && status.working++;

      const response = await _Client.RESTClient(k, "storages").get(targetPath);

      // if (status && status.working > 0) {
      //  status.working = status.working - 1;
      //}

      status && status.working--;
      if (!Array.isArray(response.data)) {
        console.error("We didnt get a correct response from BunnyCDN. Please check if you have errors upper.");
        return;
      }

      return response.data.map((object: any) => {
        return {
          isDir: object.IsDirectory,
          FullPath: object.Path + object.ObjectName,
          name: object.ObjectName,
          lastChanged: object.DateCreated,
          Lenght: object.Length,
          humanLenght: filesize(object.Length)
        };
      })
    } catch (e) {
      _Client.throwHttpError(e);
    }
  }

  private async pullzoneActionByName(apiKey: string, k: string = "default", actionHandler: (pz: any) => any) {
    try {
      const finalpz = await this.findPullzoneByName(apiKey, k);

      if (!finalpz) {
        this.throwNoPullZoneWithId(k);
        return ;
      }

      actionHandler(finalpz);

    } catch (e) {
      _Client.throwHttpError(e);
    }
  }

  private async findPullzoneByName(apiKey: string, k: string = "default"): Promise<any> {
    const response = await _Client.RESTClient(apiKey, "apikey").get("pullzone");

    if (!Array.isArray(response.data)) {
      console.error("We didnt get a correct response from BunnyCDN. Please check if you have errors upper.");
      return;
    }

    const gottenPzs = response.data.map((pz: any) => {
      return {id: pz.Id, name: pz.Name};
    });

     return _.find(gottenPzs, {name: k});
  }

  public static throwHttpError(e: any) {
    console.error("> [ " + ( e.response && e.response.status || "NO STATUS" ) +
      " ] There was an error during HTTP Request ( " + e.message + " )");

    if (e.response && e.response.data && e.response.data.Message) {
      console.error("> BunnyCDN error : " + e.response.data.Message);
    }
  }

  private throwNoPullZoneWithId(k: string) {
    console.error("I do not see pullzone : " + k);
    console.error(" Here is the list of pullzones : ");
    this.listPullZones();
  }
}

export const Client = new _Client();
