import { SessionRequest } from "supertokens-node/framework/express";
import { Response } from "express-serve-static-core";
import { NextFunction } from "supertokens-node/lib/build/framework/custom/framework";
import { BaseController } from "../../../core/routing";
import { BadRequestError } from "../../../core/error";
import { RoleRequest, IRoleService } from "../";

export class RoleController extends BaseController<IRoleService> {
  public Id: string = "RoleController";
  private request = new RoleRequest();

  /* @ts-expect-error Description */
  GetRoles = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const response = await this.ControllerService.GetRoles();

      res
        .json(response.roles);
    } catch (error) {
      next(new BadRequestError({ message: `Error getting roles ${error}`, logging: true }));
    }
  }

  DeleteRole = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const response = await this.ControllerService.DeleteRole(this.request.CreateRequest(req));

      res
        .json(response);
    } catch (error) {
      next(new BadRequestError({ message: `Error deleting ${error}`, logging: true }));
    }
  }

  CreateNewRoleOrAddPermissions = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const response = await this.ControllerService.CreateNewRoleOrAddPermissions(this.request.CreateRequest(req));

      res
        .json(response);
    } catch (error) {
      next(new BadRequestError({ message: `Error creating role or permission ${error}`, logging: true }));
    }
  }

  RemovePermissionsFromRole = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const response = await this.ControllerService.RemovePermissionsFromRole(this.request.CreateRequest(req));

      res
        .json(response);
    } catch (error) {
      next(new BadRequestError({ message: `Error removing permission from role ${error}`, logging: true }));
    }
  }

  GetPermissionsForRole = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const response = await this.ControllerService.GetPermissionsForRole(this.request.CreateRequest(req));

      if (response.status === "OK") {
        res
          .json(response.permissions);
      }
    } catch (error) {
      next(new BadRequestError({ message: `Error getting permissions for role ${error}`, logging: true }));
    }
  }

  GetRolesThatHavePermission = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const response = await this.ControllerService.GetRolesThatHavePermission(this.request.CreateRequest(req));

      res
        .json(response);
    } catch (error) {
      next(new BadRequestError({ message: `Error getting roles that have permission ${error}`, logging: true }));
    }
  }

  AddRoleToUser = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const response = await this.ControllerService.AddRoleToUser(this.request.CreateRequest(req));

      res
        .json(response);
    } catch (error) {
      next(new BadRequestError({ message: `Error adding role to user ${error}`, logging: true }));
    }
  }

  RemoveUserRole = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const response = await this.ControllerService.RemoveUserRole(this.request.CreateRequest(req));

      res
        .json(response);
    } catch (error) {
      next(new BadRequestError({ message: `Error removing user role ${error}`, logging: true }));
    }
  }
}