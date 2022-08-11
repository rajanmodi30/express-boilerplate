import { CronJob } from "cron";
import { CronEnums } from "../../types/enums";
import { helloWorld } from "../commands/helloWorld";
//IMPORT CRON HERE
export class cron {
  public static async setup(): Promise<void> {
    new CronJob(CronEnums.EVERY_30_MINUTES, helloWorld).start();
    //ADD CRON JOBS HERE
  }
}
