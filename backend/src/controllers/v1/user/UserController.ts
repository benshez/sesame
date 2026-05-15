import { SessionRequest } from "supertokens-node/framework/express";
import { Response } from "express-serve-static-core";
import UserRoles from "supertokens-node/recipe/userroles";
import Session from "supertokens-node/recipe/session";
import { BaseController } from "../../../core/routing";
import { IUserService } from "../";
import { UserRequest } from "./UserRequest";

export class UserController extends BaseController<IUserService> {
  public Id: string = "UserController";
  private request = new UserRequest();

  GetUserInfo = async (req: SessionRequest, res: Response) => {
    try {
      const response = await this.ControllerService.GetUserInfo(this.request.CreateRequest(req));

      res
        .json(response);
    } catch (error) {
      console.log("Error fetching user info: ", error);
      throw error;
    }
  }

  GetUserMetadata = async (req: SessionRequest, res: Response) => {
    try {
      const response = await this.ControllerService.GetUseMetaData(this.request.CreateRequest(req));

      res
        .json(response);
    } catch (error) {
      console.log("Error fetching user info: ", error);
      throw error;
    }
  }

  UpdateUserMetadata = async (req: SessionRequest, res: Response) => {
    try {
      const response = await this.ControllerService.UpdateUserMetadata(this.request.CreateRequest(req));

      res
        .json(response.status);
    } catch (error) {
      console.log("Error updating user info: ", error);
      throw error;
    }
  }

  AddRoleToUser = async (req: SessionRequest, res: Response) => {
    try {
      const response = await this.ControllerService.AddRoleToUser(this.request.CreateRequest(req));

      res
        .json(response);
    } catch (error) {
      console.log("Error fetching user info: ", error);
      throw error;
    }
  }

  UserHasRole = async (req: SessionRequest, res: Response) => {
    try {
      const roleId = req.body.roleId;
      const session = await Session.getSession(req, res, {
        overrideGlobalClaimValidators: async (globalValidators) => [
          ...globalValidators,
          UserRoles.UserRoleClaim.validators.includes(roleId)
        ]
      });

      const userId = session.getUserId();

      res
        .json(userId);
    } catch (error) {
      console.log("Error fetching user info: ", error);
    }
  }

  UserHasClaim = async (req: SessionRequest, res: Response) => {
    try {
      const claimId = req.body.claimId;
      const session = await Session.getSession(req, res, {
        overrideGlobalClaimValidators: async (globalValidators) => [
          ...globalValidators,
          UserRoles.PermissionClaim.validators.includes(claimId)
        ]
      });

      const userId = session.getUserId();

      res
        .json(userId);

    } catch (error) {
      console.log("Error fetching user info: ", error);
    }
  }

  UpdateUserPasswordAndEmail = async (req: SessionRequest, res: Response) => {
    try {
      const response = await this.ControllerService.UpdateUserPasswordAndEmail(this.request.CreateRequest(req));

      if (response.status === "OK") {
        await Session.revokeAllSessionsForUser(req.session!.getUserId());

        await req.session!.revokeSession();
      }

      res
        .json(response.metadata);

    } catch (error) {
      console.log("Error updating user info: ", error);
    }
  }
}