import { Router } from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { EmailController } from "../../controllers";


class EmailRoutes {
  router = Router();
  controller = new EmailController();

  constructor() {
    this.InitializeRoutes();
  }

  InitializeRoutes() {
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

export default new EmailRoutes().router;