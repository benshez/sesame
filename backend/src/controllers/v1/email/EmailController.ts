import { SessionRequest } from "supertokens-node/framework/express";
import { Response } from "express-serve-static-core";
import { NextFunction } from "supertokens-node/lib/build/framework/custom/framework";
import { BaseController } from "../../../core/routing";
import { IEmailService } from "../index";
import { BadRequestError } from "../../../core/error";
import { EmailRequest } from "./";

export class EmailController extends BaseController<IEmailService> {
  public Id: string = "EmailController";
  private request = new EmailRequest();

  SendVerificationEmail = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const response = await this.ControllerService.SendVerificationEmail(this.request.CreateRequest(req));

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
      const response = await this.ControllerService.VerifyEmail(this.request.CreateRequest(req));

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
      const response = await this.ControllerService.UnVerifyEmail(this.request.CreateRequest(req));

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