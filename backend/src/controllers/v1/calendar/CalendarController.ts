import { SessionRequest } from "supertokens-node/framework/express";
import { Response } from "express-serve-static-core";
import { BaseController } from "../../../core/routing";

export class CalendarController extends BaseController {
  public Id: string = "CalendarController";

  GetCalenderItems = async (req: SessionRequest, res: Response) => {
    try {
      const session = req.session;
      res.send({
        sessionHandle: session!.getHandle(),
        userId: session!.getUserId(),
        accessTokenPayload: session!.getAccessTokenPayload(),
        tenantId: session!.getTenantId()
      });
    } catch (err) {
      console.log("Error fetching user info: ", err);
      throw err;
    }
  }

  CreateCalenderItem = async (req: SessionRequest, res: Response) => {

  }

  UpdateCalenderItem = async (req: SessionRequest, res: Response) => {

  }

  DeleteCalenderItem = async (req: SessionRequest, res: Response) => {

  }
}