import axios from "axios"
import {Config} from "./Config";

class _Client {
  static HTTPClient = (k: string) => axios.create({
    baseURL: "https://bunnycdn.com/api/",
    timeout: 20000,
    headers: {
      'Content-Type': 'application/json',
      'AccessKey': Config.getApiKey(k)
    }
  })  ;

  public async listPullZones(k: string = "default") {
    try {
      const response = await _Client.HTTPClient(k).get("pullzone");
      console.log("ID    |Hit(%)|    Name     |   HostNames");
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
}

export const Client = new _Client();
