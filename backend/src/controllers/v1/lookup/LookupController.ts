import { SessionRequest } from "supertokens-node/framework/express";
import { Response } from "express-serve-static-core";
import { BaseController } from "../../../core/routing";

import { useDatabase } from "../../../core/db/query/useDatabase";

const database = useDatabase();

export class LookupController extends BaseController {
  public Id: string = "LookupController";

  GetCountries = async (req: SessionRequest, res: Response) => {
    try {
      const session = req.session;
      const tenantId = session!.getTenantId();

      const events = await database
        .country(database.db)
        .find(
          {
            tenant_id: tenantId,
            active: true
          })
        .all();

      res.json(events);
    } catch (error) {
      console.log("Error fetching user info: ", error);
      throw error;
    }
  }
}