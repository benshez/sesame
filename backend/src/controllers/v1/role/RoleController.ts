import { SessionRequest } from "supertokens-node/framework/express";
import { Response } from "express-serve-static-core";
import { BaseController } from "../../../core/routing";
import { IRoleService } from "../";
import { RoleRequest } from "../";

export class RoleController extends BaseController<IRoleService> {
  public Id: string = "RoleController";
  private request = new RoleRequest();

  GetRoles = async (req: SessionRequest, res: Response) => {
    try {
      const response = await this.ControllerService.GetRoles();

      res
        .json(response);
    } catch (error) {
      console.log("Error roles: ", error);
      throw error;
    }
  }

  DeleteRole = async (req: SessionRequest, res: Response) => {
    try {
      const response = await this.ControllerService.DeleteRole(this.request.CreateRequest(req));

      res
        .json(response);
    } catch (error) {
      console.log("Error roles: ", error);
      throw error;
    }
  }

  CreateNewRoleOrAddPermissions = async (req: SessionRequest, res: Response) => {
    try {
      const response = await this.ControllerService.DeleteRole(this.request.CreateRequest(req));

      res
        .json(response);
    } catch (error) {
      console.log("Error roles: ", error);
      throw error;
    }
  }

  RemovePermissionsFromRole = async (req: SessionRequest, res: Response) => {
    try {
      const response = await this.ControllerService.DeleteRole(this.request.CreateRequest(req));

      res
        .json(response);
    } catch (error) {
      console.log("Error roles: ", error);
      throw error;
    }
  }  

  GetPermissionsForRole = async (req: SessionRequest, res: Response) => {
    try {
      const response = await this.ControllerService.DeleteRole(this.request.CreateRequest(req));

      res
        .json(response);
    } catch (error) {
      console.log("Error roles: ", error);
      throw error;
    }
  }   

  GetRolesThatHavePermission = async (req: SessionRequest, res: Response) => {
    try {
      const response = await this.ControllerService.DeleteRole(this.request.CreateRequest(req));

      res
        .json(response);
    } catch (error) {
      console.log("Error roles: ", error);
      throw error;
    }
  }  

  AddRoleToUser = async (req: SessionRequest, res: Response) => {
    try {
      const response = await this.ControllerService.DeleteRole(this.request.CreateRequest(req));

      res
        .json(response);
    } catch (error) {
      console.log("Error roles: ", error);
      throw error;
    }
  }  

  RemoveUserRole = async (req: SessionRequest, res: Response) => {
    try {
      const response = await this.ControllerService.DeleteRole(this.request.CreateRequest(req));

      res
        .json(response);
    } catch (error) {
      console.log("Error roles: ", error);
      throw error;
    }
  }   
}