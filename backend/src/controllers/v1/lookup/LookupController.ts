import { SessionRequest } from "supertokens-node/framework/express";
import { NextFunction } from "supertokens-node/lib/build/framework/custom/framework";
import { Response } from "express-serve-static-core";
import { BaseController } from "../../../core/routing";
import { BadRequestError } from "../../../core/error";
import { useDatabase } from "../../../core/db/query/useDatabase";
import { LookupRequest } from "./";


export class LookupController extends BaseController {
  public Id: string = "LookupController";
  private request = new LookupRequest();
  private database = useDatabase();

  GetCountries = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const tenantId = this.request.CreateRequest(req).baseRequest.tenantId;

      const events = await this.database
        .country(this.database.db)
        .find(
          {
            tenant_id: tenantId,
            active: true
          })
        .all();

      res.json(events);
    } catch (error) {
      next(new BadRequestError({ message: `Error getting countries ${error}`, logging: true }));
    }
  }

  GetEventTypes = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const tenantId = this.request.CreateRequest(req).baseRequest.tenantId;

      const eventType = await this.database
        .event_type(this.database.db)
        .find(
          {
            tenant_id: tenantId,
            active: true
          })
        .all();

      res.json(eventType);
    } catch (error) {
      next(new BadRequestError({ message: `Error event types ${error}`, logging: true }));
    }
  }

  GetVenues = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const tenantId = this.request.CreateRequest(req).baseRequest.tenantId;

      const eventType = await this.database
        .venue(this.database.db)
        .find(
          {
            tenant_id: tenantId,
            active: true
          })
        .all();

      res.json(eventType);
    } catch (error) {
      next(new BadRequestError({ message: `Error getting venues ${error}`, logging: true }));
    }
  }

  GetOrganizations = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const tenantId = this.request.CreateRequest(req).baseRequest.tenantId;

      const eventType = await this.database
        .organization(this.database.db)
        .find(
          {
            tenant_id: tenantId,
            active: true
          })
        .all();

      res.json(eventType);
    } catch (error) {
      next(new BadRequestError({ message: `Error getting organizations ${error}`, logging: true }));
    }
  }

  GetEventStatuses = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const tenantId = this.request.CreateRequest(req).baseRequest.tenantId;

      const statuses = await this.database
        .event_status(this.database.db)
        .find(
          {
            tenant_id: tenantId,
            active: true
          })
        .all();

      res.json(statuses);
    } catch (error) {
      next(new BadRequestError({ message: `Error getting event statusses ${error}`, logging: true }));
    }
  }
}