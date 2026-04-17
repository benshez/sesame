import { BaseRoute } from "../../../core/routing";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { EmailController } from "../../../controllers/v1";

class EmailRoutes extends BaseRoute<EmailController> {
  public baseUri = "v1/email";

  constructor() {
    super(new EmailController());
  }

  protected RegisterRoutes(): void {
    this
    .router
    .post("/send-verification-email", verifySession(), async (req, res) => {
      return await this.controller.SendVerificationEmail(req, res);
    });

    this
    .router
    .post("/verify-email", async (req, res) => {
      return await this.controller.VerifyEmail(req, res);
    });
    
    this
    .router
    .post("/un-verify-email",async (req, res) => {
      return await this.controller.UnVerifyEmail(req, res);
    })
  }  
}

export default EmailRoutes;