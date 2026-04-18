import { SessionRequest } from "supertokens-node/framework/express";
import { Response } from "express-serve-static-core";
import Multitenancy from "supertokens-node/recipe/multitenancy";
import { BaseController } from "../../../core/routing";

export class TenantController extends BaseController {
  public Id: string = "TenantsController";

  GetTenants = async (req: SessionRequest, res: Response) => {
    try {
      const session = req.session;
      const tenants = await Multitenancy.listAllTenants(session?.getUserId);
      res.send(tenants);
    } catch (error) {
      console.log("Error fetching tenant info: ", error);
      throw error;
    }
  }
}