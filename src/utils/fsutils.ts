import Cp from "../commands/cp";
import {setInterval} from "timers";
import * as fs from "fs";
import {Client} from "../BunnyClient";

const SCHEDULER_PARRALLEL = 8;

export interface IStatusStruct {
  pending: number;
  working: number;
  errors: number;
  ok: number;
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
export const uploadScanDir = (dirPath: string,
                              targetPath: string,
                              storageKey: string,
                              status: IStatusStruct,
                              handler: (k: string, f: string, t: string, ststrct: IStatusStruct) => void) => {

  const filesGot = fs.readdirSync(dirPath);
  filesGot.map((file) => {
    const fstat = fs.statSync(dirPath + file);
    if (fstat.isFile()) {
      const schedulerRunner = () => handler(storageKey, dirPath + file, targetPath + file, status);
      internalScheduler(status, schedulerRunner);
    } else {
      uploadScanDir(dirPath + file + "/", targetPath + file + "/", storageKey, status, handler);
    }
  });
};

export const downloadScanDir = async (k: string, path: string, to: string, status: IStatusStruct, removePath?: string) => {
  try {
    const gottenDir = await Client.listDirectory(k, path, status);

    if (!gottenDir) {
      console.error("error : We didnt had a directory as response");
      return ;
    }
    //console.log(gottenDir);
    gottenDir!
      .sort((a, b) => a.isDir && !b.isDir && -1 || 1)
      .map((e) => {
        if (e.isDir) {
          internalScheduler(status, () => downloadScanDir(k,  e.FullPath + "/", to, status, removePath));
          // console.log(e);
        } else {
          const pth = e.FullPath.replace(removePath, "");
          console.log(" ↻ [WT] " + qString(status) + "    " + e.FullPath + " => "+ e.humanLenght);
          internalScheduler(status, () => Client.downloadFile(k, e.FullPath, to + pth, status, e.humanLenght));
        }
      })
  } catch (e) {
    console.error("FS Got an error : ", e);
  }

  // internalScheduler(status, handler(status));
};

export const qString = (counterRef?: IStatusStruct) => counterRef
        && counterRef.pending + counterRef.working !== 0
        && `[ ∞ ${counterRef.pending}| ⇅ ${counterRef.working} | o ${counterRef.ok}]` || "            ";

// TODO : The interval based scheduler gets really busy when having a lot of intervals to deal with
// TODO : And is waisting some time
// TODO : Maybe defer some download/uploads inside a list to avoid overloading intervals
export const internalScheduler = (status: IStatusStruct , handler: () => any) => {
  ++status.pending;
      if (status.working >= SCHEDULER_PARRALLEL) {
        // Delay the upload of the file when a client slot will be available
        // TODO : Add a progression (time indication atleast for big files that takes workers and brandwith in backgroumd making the thing look slow)
        // TODO : Counter error encountered
        const retryFuncId = setInterval(() => {
            if (status.working >= SCHEDULER_PARRALLEL) {
              // Interval not cleared, upload not set
              // console.log("ret");
              return;
            } else {
              // Take client slot, upload file and clear interval
              --status.pending;
              ++status.working;
              // When task is done, handler itselfs clears client slot
              clearInterval(retryFuncId);
              handler();
            }
          }
          , 1 + status.pending > 1000 ? 5 * status.working : status.working * 10);
      } else {
        // Reserve client slot and then proceed to task, no delay
        --status.pending;
        ++status.working;
        handler();
      }
};
