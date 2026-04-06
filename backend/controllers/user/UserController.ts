import { SessionRequest } from 'supertokens-node/framework/express';
import supertokens from "supertokens-node";


export class UserController {

  GetUserInfo = async (req: SessionRequest, res) => {
    try {
      const session = req.session;
      const userInfo = await supertokens.getUser(session!.getUserId());
      // res.send({
      //   sessionHandle: session!.getHandle(),
      //   userId: session!.getUserId(),
      //   accessTokenPayload: session!.getAccessTokenPayload(),
      //   tenantId: session!.getTenantId()
      // });
            console.log("Received xx request for user info with userId: ",userInfo);
      res.send(userInfo);
    } catch (err) {
      console.log("Error fetching user info: ", err);
      throw err;
    }
  }
}