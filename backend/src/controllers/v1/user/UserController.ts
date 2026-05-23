import { SessionRequest } from "supertokens-node/framework/express";
import { Response } from "express-serve-static-core";
import UserRoles from "supertokens-node/recipe/userroles";
import Session from "supertokens-node/recipe/session";
import { NextFunction } from "supertokens-node/lib/build/framework/custom/framework";
import { BaseController } from "../../../core/routing";
import { IUserService } from "../";
import { UserRequest } from "./UserRequest";
import { BadRequestError } from "../../../core/error";

export class UserController extends BaseController<IUserService> {
  public Id: string = "UserController";
  private request = new UserRequest();

  GetUserInfo = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const response = await this.ControllerService.GetUserInfo(this.request.CreateRequest(req));

      res
        .json(response);
    } catch (error) {
      next(new BadRequestError({ message: `Error un-verifying email ${error}`, logging: true }));
    }
  }

  GetUserMetadata = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const response = await this.ControllerService.GetUseMetaData(this.request.CreateRequest(req));

      res
        .json(response);
    } catch (error) {
      next(new BadRequestError({ message: `Error un-verifying email ${error}`, logging: true }));
    }
  }

  UpdateUserMetadata = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const response = await this.ControllerService.UpdateUserMetadata(this.request.CreateRequest(req));

      res
        .json(response.status);
    } catch (error) {
      next(new BadRequestError({ message: `Error un-verifying email ${error}`, logging: true }));
    }
  }

  DeleteUser = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const response = await this.ControllerService.DeleteUser(this.request.CreateRequest(req));
      res
        .json(response);
    } catch (error) {
      next(new BadRequestError({ message: `Error deleting user ${error}`, logging: true }));
    }
  }

  AddRoleToUser = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const response = await this.ControllerService.AddRoleToUser(this.request.CreateRequest(req));

      res
        .json(response);
    } catch (error) {
      next(new BadRequestError({ message: `Error un-verifying email ${error}`, logging: true }));
    }
  }

  UserHasRole = async (req: SessionRequest, res: Response, next: NextFunction) => {
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
      next(new BadRequestError({ message: `Error un-verifying email ${error}`, logging: true }));
    }
  }

  UserHasClaim = async (req: SessionRequest, res: Response, next: NextFunction) => {
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
      next(new BadRequestError({ message: `Error un-verifying email ${error}`, logging: true }));
    }
  }

  UpdateUserPasswordAndEmail = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const response = await this.ControllerService.UpdateUserPasswordAndEmail(this.request.CreateRequest(req));

      if (response.status === "OK") {
        await Session.revokeAllSessionsForUser(req.session!.getUserId());

        await req.session!.revokeSession();
      }

      res
        .json(response.metadata);

    } catch (error) {
      next(new BadRequestError({ message: `Error un-verifying email ${error}`, logging: true }));
    }
  }

  SignUp = async(req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const response = await this.ControllerService.SignUp(this.request.CreateRequest(req));

      res
        .json(response);
    } catch (error) {
      next(new BadRequestError({ message: `Error signing up ${error}`, logging: true }));
    }
  }

  SignIn = async(req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const response = await this.ControllerService.SignIn(this.request.CreateRequest(req));

      res
        .json(response);
    } catch (error) {
      next(new BadRequestError({ message: `Error signing up ${error}`, logging: true }));
    }
  }  
}