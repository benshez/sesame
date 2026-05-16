import { SessionRequest } from "supertokens-node/framework/express";
import { Response } from "express-serve-static-core";
import { NextFunction } from "supertokens-node/lib/build/framework/custom/framework";
import { BaseController } from "../../../core/routing";
import { BadRequestError } from "../../../core/error";

export class SessionController extends BaseController {
  public Id: string = "SessionController";

  GetSessionInfo = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const session = req.session;
      res
        .json({
          sessionHandle: session!.getHandle(),
          userId: session!.getUserId(),
          accessTokenPayload: session!.getAccessTokenPayload(),
          tenantId: session!.getTenantId()
        });
    } catch (error) {
      next(new BadRequestError({ message: `Error un-verifying email ${error}`, logging: true }));
    }
  }
}