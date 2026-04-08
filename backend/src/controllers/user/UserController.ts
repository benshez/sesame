import { SessionRequest } from "supertokens-node/framework/express";
import { Response } from "express-serve-static-core";
import supertokens from "supertokens-node";

export class UserController {

  GetUserInfo = async (req: SessionRequest, res: Response) => {
    try {
      const session = req.session;
      const userInfo = await supertokens.getUser(session!.getUserId());

      res.send(userInfo);
    } catch (err) {
      console.log("Error fetching user info: ", err);
      throw err;
    }
  }
}