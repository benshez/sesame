import { SessionRequest } from "supertokens-node/framework/express";
import { Response } from "express-serve-static-core";
import { NextFunction } from "supertokens-node/lib/build/framework/custom/framework";
import { BaseController } from "../../../core/routing";
import { BadRequestError } from "../../../core/error";
import { ITenantService, TenantRequest } from "../";

export class TenantController extends BaseController<ITenantService> {
  public Id: string = "TenantsController";
  private request = new TenantRequest();

  GetTenants = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const reponse = await this.ControllerService.GetTenants();
      res
        .json(reponse);
    } catch (error) {
      next(new BadRequestError({ message: `Error getting tenants ${error}`, logging: true }));
    }
  }

  GetTenant = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const reponse = await this.ControllerService.GetTenant(this.request.CreateRequest(req).baseRequest);;
      res
        .json(reponse);
    } catch (error) {
      next(new BadRequestError({ message: `Error getting tenant ${error}`, logging: true }));
    }
  }

  CreateTenant = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const reponse = await this.ControllerService.CreateTenant(this.request.CreateRequest(req), next);

      if (reponse.createdNew) {
        res
          .json(reponse);
      } else {
        res
          .json(null);
      }
    } catch (error) {
      next(new BadRequestError({ message: `Error tenant ${error}`, logging: true }));
    }
  }

  AddUserToTenant = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const reponse = await this.ControllerService.AddUserToTenant(this.request.CreateRequest(req));

      if (reponse.status === "OK") {
        res
          .json(reponse);
      }
    } catch (error) {
      next(new BadRequestError({ message: `Error tenant ${error}`, logging: true }));
    }
  }

  RemoveUserFromTenant = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const reponse = await this.ControllerService.RemoveUserFromTenant(this.request.CreateRequest(req));

      if (reponse.status === "OK") {
        res
          .json(reponse);
      }
    } catch (error) {
      next(new BadRequestError({ message: `Error tenant ${error}`, logging: true }));
    }
  }
}