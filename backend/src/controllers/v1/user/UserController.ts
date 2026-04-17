import { SessionRequest } from "supertokens-node/framework/express";
import { Response } from "express-serve-static-core";
import supertokens from "supertokens-node";
import UserRoles from "supertokens-node/recipe/userroles";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Session from "supertokens-node/recipe/session";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import { BaseController } from "../../../core";

export class UserController extends BaseController {
  public Id: string = "UserController";

  GetUserInfo = async (req: SessionRequest, res: Response) => {
    try {
      const session = req.session;
      const userInfo = await supertokens.getUser(session!.getUserId());

      res.send(userInfo);
    } catch (error) {
      console.log("Error fetching user info: ", error);
      throw error;
    }
  }

  GetUserMetadata = async (req: SessionRequest, res: Response) => {
    try {
      const session = req.session;
      const userId = session!.getUserId();

      const metadata = await UserMetadata.getUserMetadata(userId);

      res.send(metadata);
    } catch (error) {
      console.log("Error fetching user info: ", error);
      throw error;
    }
  }

  UpdateUserMetadata = async (req: SessionRequest, res: Response) => {
    try {
      const session = req.session;
      const userId = session!.getUserId();
      const userInfo = req.body.userInfo;

      await UserMetadata.updateUserMetadata(userId, userInfo);

      res.send({ resp: `User info updated successfully - ${userId}` });
    } catch (error) {
      console.log("Error updating user info: ", error);
      throw error;
    }
  }

  AddRoleToUser = async (req: SessionRequest, res: Response) => {
    try {
      const session = req.session;
      const roleId = req.body.roleId;
      
      const roleResponse = await UserRoles.addRoleToUser(session!.getTenantId(), session!.getUserId(), roleId);

      res.send(roleResponse);
    } catch (error) {
      console.log("Error fetching user info: ", error);
      throw error;
    }
  }

  UpdateUserPaswordAndEmail = async (req: SessionRequest, res: Response) => {
    try {
      const session = req.session;
      const userInfo = req.body.userInfo;
      const oldPassword = userInfo.oldPassword;
      const updatedPassword = userInfo.newPassword;
      const updatedEmail = userInfo.newEmail;
      const userId = req.session!.getUserId();
      const updateObject = {
        recipeUserId: session!.getRecipeUserId(),
        applyPasswordPolicy: true,
        tenantIdForPasswordPolicy: session!.getTenantId()
      }

      if (oldPassword !== "" && updatedPassword !== "") {
        const loginMethod = await this.GetUserLoginMetod(userId, session!.getRecipeUserId().getAsString());

        if (loginMethod === undefined) {
          res.send("Not Updated!");
          return;
        }

        const email = loginMethod.email!;
        const isPasswordValid = await this.IsValidPassword(session!.getTenantId(), email, oldPassword);

        if (!isPasswordValid) {
          res.send("Not Updated!");
          return;
        }

        Object.assign(updateObject, { password: updatedPassword });
      }

      if (updatedEmail !== "" && this.IsValidEmail(updatedEmail)) {
        Object.assign(updateObject, { email: updatedEmail });
      }

      const response = await EmailPassword.updateEmailOrPassword(updateObject);

      if (response.status === "PASSWORD_POLICY_VIOLATED_ERROR") {
        res.send("Not Updated!");
        return
      }

      await Session.revokeAllSessionsForUser(userId);

      await req.session!.revokeSession();

      res.send("Password and or email updated.");
    } catch (error) {
      console.log("Error updating user info: ", error);
    }
  }

  IsValidEmail = (email: string) => {
    const regexp = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return regexp.test(email);
  }

  IsValidPassword = async (tenantId: string, email: string, password: string) => {
    const isPasswordValid = await EmailPassword.verifyCredentials(tenantId, email, password);

    return isPasswordValid.status !== "OK"
  }

  GetUserLoginMetod = async (userId: string, recipeUserId: string) => {
    const userInfo = await supertokens.getUser(userId);

    if (userInfo === undefined) {
      throw new Error("Should never come here");
    }

    const loginMethod = userInfo.loginMethods.find((lM) => lM.recipeUserId.getAsString() === recipeUserId && lM.recipeId === "emailpassword");

    return loginMethod;
  }
}