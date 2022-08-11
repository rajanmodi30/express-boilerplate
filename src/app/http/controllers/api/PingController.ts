import { Request, Response } from "express";
import { BaseResponse } from "../../../../types/response/base.response";
import { logger } from "../../../providers/logger";

export class PingController {
  public static async pong(
    req: Request,
    res: Response
  ): Promise<Response<BaseResponse>> {
    logger.debug("Server Pingged");
    return res.json({
      status: true,
      message: req.t("pong"),
    });
  }
}
