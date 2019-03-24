import axios from "axios"
import {Config} from "./Config";
import * as filesize from "filesize";
import * as fs from "fs";
import * as _ from "lodash";
import {cli} from "cli-ux";

class _Client {
  // FIXME : Rename to json client
  static HTTPClient = (k: string, type: string) => axios.create({
    baseURL: "https://bunnycdn.com/api/",
    timeout: 20000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'AccessKey': Config.getApiKey(k, type),
      'XX-CLIENT': "DKFN/bunnycdn-cli 0.0.3"
    }
  });

  static FileUpload = (k: string ,fileStream: Buffer, url: string) => {
    if (fileStream.length < 1024) {
    }
    return axios.put(url, fileStream, {
      timeout: 2000000000,
      data: fileStream.toString(),
      maxContentLength: Number.POSITIVE_INFINITY,
      headers: {
        'AccessKey': Config.getApiKey(k, "storages"),
        'XX-CLIENT': "DKFN/bunnycdn-cli 0.0.3"
      },
    });
  };

  // GET   /api/pullzone
  public async listPullZones(k: string = "default") {
    try {
      const response = await _Client.HTTPClient(k, "pullzones").get("pullzone");

      if (!Array.isArray(response.data)) {
        console.error("We didnt get a correct response from BunnyCDN. Please check if you have errors upper.");
        return;
      }

      console.log("ID    |Hit(%)|    Name     |   HostNames");
      response.data.forEach((x: any) => {
        let hostNamesString = "";

        x.Hostnames.forEach((hst: any) => {
          hostNamesString += "[" + hst.Id + "] " + hst.Value + " ; "
      });

        console.log("" + x.Id + " |  " + x.CacheQuality + "  | " + x.Name + " | " + hostNamesString);
      })
    } catch (e) {
      _Client.throwHttpError(e);
      return [];
    }
  }

  // POST  /api/pullzone/id
  // TODO : This kind of call is ez factorisable
  public async purgeCache(k: string = "default") {
    this.pullzoneActionByName(k, async (pullZone: any) => {
      const purge = await _Client.HTTPClient("default", "pullzones").post("pullzone/" + pullZone.id + "/purgeCache");
      if (purge.status === 200)
        console.log(" ✔ Cleared cache for " + k + " successfully");
      else
        console.error("Error clearing cache for " + k + " ( " + purge.status + ") " + purge.statusText);
    });

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
      const response = await _Client.FileUpload(k, fileData, "https://storage.bunnycdn.com/" + pathToUpload);
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
  // TODO : This kind of call is ez factorisable
  public async addHost(k: string = "default", hostname: string) {
    this.pullzoneActionByName(k, async (pullZone: any) => {
      const response = await _Client.HTTPClient("default", "pullzones").post("pullzone/addHostname", {
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



  // TODO : This kind of code is ez factorisable
  public async removeBlockedIp(k: string = "default", ipToBlock: string) {
    this.pullzoneActionByName(k, async (pullZone: any) => {
      const response = await _Client.HTTPClient("default", "pullzones").post("pullzone/removeBlockedIp", {
        "PullZoneId": pullZone.id,
        "BlockedIp": ipToBlock
      });

      if (response.status === 200) {
        console.info(" ✔ Successfully added blocked ip : " + ipToBlock);
      } else {
        console.error(" ❌ Sorry, an error was met adding " + ipToBlock + " to iplists " + k);
      }
    });
  }


  // TODO : This kind of code is ez factorisable
  public async addBlockedIp(k: string = "default", ipToBlock: string) {
    try {
      const finalpz = await this.findPullzoneByName(k);

      if (!finalpz) {
        this.throwNoPullZoneWithId(k);
        return ;
      }

      const response = await _Client.HTTPClient("default", "pullzones").post("pullzone/addBlockedIp", {
        "PullZoneId": finalpz.id,
        "BlockedIp": ipToBlock
      });

      if (response.status === 200) {
        cli.url(" ✔ Successfully added hostname ","http://" + ipToBlock + "/" )
      } else {
        console.error(" ❌ Sorry, an error was met adding " + ipToBlock + " hostname to pullzone " + k);
      }

    } catch (e) {
      _Client.throwHttpError(e);
    }
  }

  // DELETE /api/pullzone/deleteHostname
  // TODO : This kind of call is ez factorisable
  public async deleteHost(k: string, hostname: string) {
    this.pullzoneActionByName(k, async (pullZone: any) => {
      const response = await _Client.HTTPClient("default", "pullzones")
        .delete("pullzone/deleteHostname?id=" + pullZone.id + "&hostname=" + hostname);

      if (response.status === 200) {
        cli.url(" ✔ Successfully deleted hostname ","http://" + hostname + "/" )
      } else {
        console.error(" ❌ Sorry, an error was met deleting " + hostname + " hostname to pullzone " + k);
      }
    });
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

  private async findPullzoneByName(k: string = "default"): Promise<any> {
    const response = await _Client.HTTPClient("default", "pullzones").get("pullzone");

    if (!Array.isArray(response.data)) {
      console.error("We didnt get a correct response from BunnyCDN. Please check if you have errors upper.");
      return;
    }

    const gottenPzs = response.data.map((pz: any) => {
      return {id: pz.Id, name: pz.Name};
    });

     return _.find(gottenPzs, {name: k});
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
}

export const Client = new _Client();
