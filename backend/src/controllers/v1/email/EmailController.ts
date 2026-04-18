import EmailVerification from "supertokens-node/recipe/emailverification";
import { SessionRequest } from "supertokens-node/framework/express";
import { Response } from "express-serve-static-core";
import supertokens from "supertokens-node";
import { BaseController } from "../../../core/routing";

export class EmailController extends BaseController {
  public Id: string = "EmailController";

  SendVerificationEmail = async (req: SessionRequest, res: Response) => {
    try {
      const session = req.session;
      const email = req.body.email;
      const sendEmailRes = await EmailVerification.sendEmailVerificationEmail(session!.getTenantId(), session!.getUserId(), session!.getRecipeUserId(), email);

      if (sendEmailRes.status === "OK") {
        res
          .status(200)
          .send("Email verification email sent");
      }
    } catch (err) {
      console.log("Error sending verification email: ", err);
      throw err;
    }
  }

  VerifyEmail = async (req: SessionRequest, res: Response) => {
    try {

      const tokenRes = await EmailVerification.createEmailVerificationToken(req.body.tenantId, new supertokens.RecipeUserId(req.body.userId));

      if (tokenRes.status === "OK") {
        const verifiedRes = await EmailVerification.verifyEmailUsingToken(req.body.tenantId, tokenRes?.token || "", true);

        if (verifiedRes.status === "OK") {
          res
            .status(200)
            .send(verifiedRes);
        }
      }
    } catch (err) {
      console.log("Error verifying email: ", err);
      throw err;
    }
  }

  UnVerifyEmail = async (req: SessionRequest, res: Response) => {
    try {
      const verifiedRes = await EmailVerification.unverifyEmail(new supertokens.RecipeUserId(req.body.userId));

      if (verifiedRes.status === "OK") {
        res
          .status(200)
          .send(verifiedRes);
      }

    } catch (err) {
      console.log("Error verifying email: ", err);
      throw err;
    }
  }

}