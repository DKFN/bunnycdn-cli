import axios from "axios"
import {Config} from "./Config";
import * as FormData from "form-data";
import * as filesize from "filesize";

class _Client {
  // FIXME : Type is useless
  // FIXME : Rename to json client
  static HTTPClient = (k: string, type: string) => axios.create({
    baseURL: "https://bunnycdn.com/api/",
    timeout: 20000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'AccessKey': Config.getApiKey(k, type),
      'XX-CLIENT': "DKFN/bunnycdn-cli 0.0.1"
    }
  });

  static FileUpload = (k: string ,fileStream: FormData, url: string) => {
    return axios.put(url, fileStream, {
      timeout: 2000000000,
      data: fileStream.toString(),
      maxContentLength: Number.POSITIVE_INFINITY,
      onDownloadProgress: function(progressEvent) { var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total ); console.log('%',percentCompleted); },
      headers: {
        'AccessKey': Config.getApiKey(k, "storages"),
        'XX-CLIENT': "DKFN/bunnycdn-cli 0.0.1"
      },
    });
  };

  public async listPullZones(k: string = "default") {
    try {
      const response = await _Client.HTTPClient(k, "pullzones").get("pullzone");
      console.log("ID    |Hit(%)|    Name     |   HostNames");
      // console.log(response.data);

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

  public async uploadFile(k: string = "default", fileData: any, pathToUpload: string) {
    try {
      console.log(" ⌛[" + filesize(fileData.length) + "] " + pathToUpload + " -> UP");
      const response = await _Client.FileUpload(k, fileData, "https://storage.bunnycdn.com/" + pathToUpload);
      //console.debug(response.status);
      //console.debug(fileData);
      const data = response.data;

      if (response.status > 300) {
        console.error("> ERROR HTTP : " + data.HttpCode);
        console.error("> Message : " + data.Message);
      }

      if (response.status === 201) {
        console.log(" ✔[OK] " + pathToUpload + " -> UP");
      }
    } catch (e) {
      console.error("> There was an error durring upload");
      console.debug(e.statusCode);
      console.debug(e);
    }
  }
}

export const Client = new _Client();
