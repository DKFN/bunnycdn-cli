import axios from "axios"
import {Config} from "./Config";
import * as filesize from "filesize";
import * as fs from "fs";

class _Client {
  // FIXME : Rename to json client
  static HTTPClient = (k: string, type: string) => axios.create({
    baseURL: "https://bunnycdn.com/api/",
    timeout: 20000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'AccessKey': Config.getApiKey(k, type),
      'XX-CLIENT': "DKFN/bunnycdn-cli 0.0.2"
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
        'XX-CLIENT': "DKFN/bunnycdn-cli 0.0.2"
      },
    });
  };

  public async listPullZones(k: string = "default") {
    try {
      const response = await _Client.HTTPClient(k, "pullzones").get("pullzone");
      console.log("ID    |Hit(%)|    Name     |   HostNames");

      if (!Array.isArray(response.data)) {
        console.error("We didnt get a correct response from BunnyCDN. Please check if you have errors upper.");
        return;
      }

      response.data.forEach((x: any) => {
        let hostNamesString = "";

        x.Hostnames.forEach((hst: any) => {
          hostNamesString += "[" + hst.Id + "] " + hst.Value + " ; "
        });

        console.log("" + x.Id + " |  " + x.CacheQuality + "  | " + x.Name + " | " + hostNamesString);
      })
    } catch (e) {
      console.error("> There was an error during HTTP Request");
      console.error("> Dump", e);
      return [];
    }
  }

  public async uploadFile(k: string = "default",
                          from: string,
                          pathToUpload: string,
                          counterRef?: {pending: number, working: number, errors: number}) {
    try {
      const fd = fs.openSync(from, 'r');
      if (fd === -1) {
        console.error(" ❌[ERR] Uncaught errno. Error opening file");
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
}

export const Client = new _Client();
