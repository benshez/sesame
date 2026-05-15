import { SessionRequest } from "supertokens-node/framework/express";
import { Response } from "express-serve-static-core";
import supertokens from "supertokens-node";
import { BaseController } from "../../../core/routing";
import { IEmailService } from "../index";

export class EmailController extends BaseController<IEmailService> {
  public Id: string = "EmailController";

  SendVerificationEmail = async (req: SessionRequest, res: Response) => {
    try {
      const session = req.session;
      const userId = session!.getUserId();
      const tenantId = session!.getTenantId();
      const recipeUserId = session!.getRecipeUserId();
      const email = req.body.email;
      const response = await this.ControllerService.SendVerificationEmail(userId, recipeUserId, tenantId, email);

      if (response.status === "OK") {
        res
          .status(200)
          .json("Verification Sent");
      } else {
        res
          .status(500)
          .json("Verification Not Sent");
      }

    } catch (err) {
      console.log("Error sending verification email: ", err);
      throw err;
    }
  }

  VerifyEmail = async (req: SessionRequest, res: Response) => {
    try {
      const response = await this.ControllerService.VerifyEmail(req.body.tenantId, new supertokens.RecipeUserId(req.body.userId));

      if (response.status === "OK") {
        res
          .status(200)
          .json("Verified");
      } else {
        res
          .status(500)
          .json("Not Verified");
      }

    } catch (err) {
      console.log("Error verifying email: ", err);
      throw err;
    }
  }

  UnVerifyEmail = async (req: SessionRequest, res: Response) => {
    try {
      const response = await this.ControllerService.UnVerifyEmail(new supertokens.RecipeUserId(req.body.userId));

      if (response.status === "OK") {
        res
          .status(200)
          .json("UnVerified");
      } else {
        res
          .status(500)
          .json("Not UnVerified");
      }

    } catch (err) {
      console.log("Error verifying email: ", err);
      throw err;
    }
  }

}