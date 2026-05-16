import { SessionRequest } from "supertokens-node/framework/express";
import { NextFunction } from "supertokens-node/lib/build/framework/custom/framework";
import { Response } from "express-serve-static-core";
import { BaseController } from "../../../core/routing";
import { BadRequestError } from "../../../core/error";
import { useDatabase } from "../../../core/db/query/useDatabase";

const database = useDatabase();

export class LookupController extends BaseController {
  public Id: string = "LookupController";

  GetCountries = async (req: SessionRequest, res: Response, next: NextFunction) => {
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
      next(new BadRequestError({ message: `Error un-verifying email ${error}`, logging: true }));
    }
  }

  GetEventTypes = async (req: SessionRequest, res: Response, next: NextFunction) => {
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
      next(new BadRequestError({ message: `Error un-verifying email ${error}`, logging: true }));
    }
  }

  GetVenues = async (req: SessionRequest, res: Response, next: NextFunction) => {
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
      next(new BadRequestError({ message: `Error un-verifying email ${error}`, logging: true }));
    }
  }

  GetOrganizations = async (req: SessionRequest, res: Response, next: NextFunction) => {
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
      next(new BadRequestError({ message: `Error un-verifying email ${error}`, logging: true }));
    }
  }  

  GetEventStatuses = async (req: SessionRequest, res: Response, next: NextFunction) => {
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
      next(new BadRequestError({ message: `Error un-verifying email ${error}`, logging: true }));
    }
  }  
}