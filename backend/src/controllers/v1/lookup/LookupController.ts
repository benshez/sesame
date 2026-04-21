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
      console.log("Error fetching countries info: ", error);
      throw error;
    }
  }

  GetEventTypes = async (req: SessionRequest, res: Response) => {
    try {
      const session = req.session;
      const tenantId = session!.getTenantId();

      const eventType = await database
        .event_type(database.db)
        .find(
          {
            tenant_id: tenantId,
            active: true
          })
        .all();

      res.json(eventType);
    } catch (error) {
      console.log("Error fetching event types info: ", error);
      throw error;
    }
  }

  GetVenues = async (req: SessionRequest, res: Response) => {
    try {
      const session = req.session;
      const tenantId = session!.getTenantId();

      const eventType = await database
        .venue(database.db)
        .find(
          {
            tenant_id: tenantId,
            active: true
          })
        .all();

      res.json(eventType);
    } catch (error) {
      console.log("Error fetching event venue info: ", error);
      throw error;
    }
  }

  GetOrganizations = async (req: SessionRequest, res: Response) => {
    try {
      const session = req.session;
      const tenantId = session!.getTenantId();

      const eventType = await database
        .organization(database.db)
        .find(
          {
            tenant_id: tenantId,
            active: true
          })
        .all();

      res.json(eventType);
    } catch (error) {
      console.log("Error fetching event organization info: ", error);
      throw error;
    }
  }  

  GetEventStatuses = async (req: SessionRequest, res: Response) => {
    try {
      const session = req.session;
      const tenantId = session!.getTenantId();

      const statuses = await database
        .event_status(database.db)
        .find(
          {
            tenant_id: tenantId,
            active: true
          })
        .all();

      res.json(statuses);
    } catch (error) {
      console.log("Error fetching event statuses info: ", error);
      throw error;
    }
  }  
}