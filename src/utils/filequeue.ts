import {qString} from "./fsutils";

const SCHEDULER_PARRALLEL = Number.parseInt(process.env["BNYCDN_PARALLEL"] || "8");

import * as _ from "lodash";

export enum FileDirection {
  DOWNLOAD,
  UPLOAD
}

export interface IFileDefinition {
  size: string;
  path: string;
  direction: FileDirection;
  handler: (status: IQueueStatusStruct) => Promise<void>;
}

export interface IQueueStatusStruct {
  pending: number;
  working: number;
  errors: number;
  ok: number;
  lastUpdate: number;
}

class Filequeue {
  private queue: IFileDefinition[] = [];
  private working: IFileDefinition[] = [];
  private launched: boolean = false;
  public static status: IQueueStatusStruct = {pending: 0, working: 0, errors: 0, ok: 0, lastUpdate: 0};

  public register(f: IFileDefinition) {
    this.queue.push(f);
    console.log(" ↻ [WT] " + qString(Filequeue.status) + "    " + f.path + " => "+ f.size);
    Filequeue.status.pending++;
    if (!this.launched) {
      this.launched = true;
      this.watcherLoop();
      this.stuckWatcher(Filequeue.status);
    }
  }


  private watcherLoop(): void {
    const watcherId = setInterval(() => {
      if (this.working.length === 0 && Filequeue.status.pending === 0) {
        clearInterval(watcherId);
      } else {
        if (Filequeue.status.working < SCHEDULER_PARRALLEL) {
          const launched = this.queue.pop();
          launched && this.working.push(launched);
          launched && launched.handler(Filequeue.status).then(() => {
            _.remove(this.working, launched);
          });
        }
      }

    }, 1);
  }

  private stuckWatcher(statusStruct: IQueueStatusStruct) {
    const warnerFuncId = setInterval(() => {
      if (statusStruct.lastUpdate <= Date.now() - 5000) {
        console.info(" ⌛ [WT] " + qString(statusStruct) + "    It seems that I am still waiting for " + statusStruct.working + " files to process. Please wait ...");
        this.working.forEach((e) => {
          console.log(" ⌛ [DL] " + qString(statusStruct) + "    " + e.path + " => " + e.size);
        });
        statusStruct.lastUpdate = Date.now();
      }

      if (statusStruct.pending === 0 && statusStruct.working === 0)
        clearInterval(warnerFuncId);
    }, 500);
  }
}

const FileQueue = new Filequeue();

export default FileQueue;
