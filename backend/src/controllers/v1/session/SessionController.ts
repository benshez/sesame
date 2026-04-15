import { SessionRequest } from "supertokens-node/framework/express";
import { Response } from "express-serve-static-core";

export class SessionController {

  GetSessionInfo = async (req: SessionRequest, res: Response) => {
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
}