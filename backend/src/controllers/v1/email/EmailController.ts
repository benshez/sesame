import { SessionRequest } from "supertokens-node/framework/express";
import { Response } from "express-serve-static-core";
import supertokens from "supertokens-node";
import { NextFunction } from "supertokens-node/lib/build/framework/custom/framework";
import { BaseController } from "../../../core/routing";
import { IEmailService } from "../index";
import { BadRequestError } from "../../../core/error";

export class EmailController extends BaseController<IEmailService> {
  public Id: string = "EmailController";

  SendVerificationEmail = async (req: SessionRequest, res: Response, next: NextFunction) => {
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

    } catch (error) {
      next(new BadRequestError({ message: `Error sending verification email ${error}`, logging: true }));
    }
  }

  VerifyEmail = async (req: SessionRequest, res: Response, next: NextFunction) => {
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

    } catch (error) {
      next(new BadRequestError({ message: `Error verifing email ${error}`, logging: true }));
    }
  }

  UnVerifyEmail = async (req: SessionRequest, res: Response, next: NextFunction) => {
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

    } catch (error) {
      next(new BadRequestError({ message: `Error un-verifying email ${error}`, logging: true }));
    }
  }

}