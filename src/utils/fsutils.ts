import Cp from "../commands/cp";
import {setInterval} from "timers";
import * as fs from "fs";

export interface IStatusStruct {
  pending: number;
  working: number;
  errors: number;
}

/**
 * -R option has quite an exotic behavior. We limit the number of simultaneous uploads to 2 to avoir overloading
 * the storage endpoint.
 *
 * If we are below 4 workers then we launch the calls immediatly,
 * else, we will set an interval that will try to recall the upload later again checking if there is less
 * than 4 upload calls working
 * @returns {number}
 */
export const scanDir = (dirPath: string,
                 targetPath: string,
                 storageKey: string,
                 status: IStatusStruct,
                 handler: (k: string, f: string, t: string, ststrct: IStatusStruct) => void) => {

  const filesGot = fs.readdirSync(dirPath);
  filesGot.map((file) => {

    const fstat = fs.statSync(dirPath + file);
    if (fstat.isFile()) {
      ++status.pending;
      if (status.working >= 4) {
        // Delay the upload of the file when a client slot will be available
        const retryFuncId = setInterval(() => {
            if (status.working >= 4) {
              // Interval not cleared, upload not set
            } else {
              // Take client slot, upload file and clear interval
              --status.pending;
              ++status.working;
              handler(storageKey, dirPath + file, targetPath + file, status);
              // When upload is done, uploadFile itselfs clears client slot
              clearInterval(retryFuncId);
            }}
          , 50 * (Cp.status.pending % 4)
        );
      } else {
        // Reserve client slot and then proceed to upload, no delay
        --status.pending;
        ++status.working;
        handler(storageKey, dirPath + file, targetPath + file, status);
      }
    }
    else {
      scanDir(dirPath + file + "/", targetPath + file + "/", storageKey, status, handler);
    }
  });
};
