import { BaseRoute } from "../../../core/routing";
//import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { EmailController, IEmailService, EmailService } from "../../../controllers/v1";

class EmailRoutes extends BaseRoute<EmailController> {
  public baseUri = "v1/email";

  constructor() {
    const service: IEmailService = new EmailService();
    super(new EmailController(service));
  }

  protected RegisterRoutes(): void {
    this
    .router
    .post("/send-verification-email", async (req, res, next) => {
      return await this.controller.SendVerificationEmail(req, res, next);
    });

    this
    .router
    .post("/verify-email", async (req, res, next) => {
      return await this.controller.VerifyEmail(req, res, next);
    });
    
    this
    .router
    .post("/un-verify-email",async (req, res, next) => {
      return await this.controller.UnVerifyEmail(req, res, next);
    })
  }  
}

export default EmailRoutes;