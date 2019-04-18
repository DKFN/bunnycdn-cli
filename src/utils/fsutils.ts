import * as fs from "fs";
import {Client} from "../BunnyClient";
import FileQueue, {FileDirection, IQueueStatusStruct} from "./filequeue";
import filesize = require('filesize');

export interface IStatusStruct {
  pending: number;
  working: number;
  errors: number;
  ok: number;
  lastUpdate: number;
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
                              handler: (k: string, f: string, t: string, ststrct: IStatusStruct) => Promise<void>) => {

  const filesGot = fs.readdirSync(dirPath);
  filesGot.map((file) => {
    const fstat = fs.statSync(dirPath + file);
    if (fstat.isFile()) {
      const schedulerRunner: (status: IQueueStatusStruct) => Promise<any> = (status: IQueueStatusStruct) =>
        Promise.resolve(handler(storageKey, dirPath + file, targetPath + file, status));

      FileQueue.register({
        size: filesize(fstat.size),
        direction: FileDirection.UPLOAD,
        path: dirPath + file,
        handler: schedulerRunner
      });
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
    gottenDir!
      .sort((a, b) => (a.isDir && !b.isDir && -1) || 1)
      .map((e) => {
        if (e.isDir) {
          const handler = (status: IQueueStatusStruct) => downloadScanDir(k,  e.FullPath + "/", to, status, removePath);

          FileQueue.register({
            size: "DIR",
            handler,
            direction: FileDirection.DOWNLOAD,
            path: e.FullPath + "/"
          });
        } else {
          const pth = e.FullPath.replace(removePath, "");
          const handler = (status: IQueueStatusStruct) =>
            Client.downloadFile(k, e.FullPath, to + pth, status, e.humanLenght);

          FileQueue.register({
            size: e.humanLenght,
            handler,
            direction: FileDirection.DOWNLOAD,
            path: e.FullPath
          });
        }
      })
  } catch (e) {
    console.error("FS Got an error : ", e);
  }
};
