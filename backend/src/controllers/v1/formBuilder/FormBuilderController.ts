import { SessionRequest } from "supertokens-node/framework/express";
import { Response } from "express-serve-static-core";
import { NextFunction } from "supertokens-node/lib/build/framework/custom/framework";
import { BadRequestError } from "../../../core/error";
import { BaseController } from "../../../core/routing";
import { IFormBuilderService } from ".";
import { FormBuilderRequest } from "./";

export class FormBuilderController extends BaseController<IFormBuilderService> {
  public Id: string = "FormBuilderController";
  private request = new FormBuilderRequest();

  ReadTenantJson = async (req: SessionRequest, res: Response, next: NextFunction) => { 
    try {
      const response = await this.ControllerService.ReadTenantJson(this.request.CreateRequest(req));

      if (response.status === "OK") {
        res
          .status(200)
          .json(response.Pages);
      } else {
        res
          .status(500)
          .json("Error reading Json file");
      }

    } catch (error) {
      next(new BadRequestError({ message: `Error reading Json file ${error}`, logging: true }));
    }
  }

  WriteTenantJson = async (req: SessionRequest, res: Response, next: NextFunction) => { 
    try {
      const response = await this.ControllerService.WriteTenantJson(this.request.CreateRequest(req));

      if (response.status === "OK") {
        res
          .status(200)
          .json(response);
      } else {
        res
          .status(500)
          .json("Error writing Json file");
      }

    } catch (error) {
      next(new BadRequestError({ message: `Error writing Json file ${error}`, logging: true }));
    }
  }  
}