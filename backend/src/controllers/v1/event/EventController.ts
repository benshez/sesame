import { SessionRequest } from "supertokens-node/framework/express";
import type Event from "../../../core/db/sesame_model_types/event";
import { Response } from "express-serve-static-core";
import { BaseController } from "../../../core/routing";
import { BadRequestError, ValidationError } from "../../../core/error"
import { NextFunction } from "supertokens-node/lib/build/framework/custom/framework";
import { IEventService } from "./IEventService";
import { EventRequest } from "./EventRequest";


export class EventController extends BaseController<IEventService> {

  public Id: string = "EventController";

  GetActiveEventsByTenantIdAndUserId = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {

      const session = req.session;
      const tenantId = session!.getTenantId();
      const userId = session!.getUserId();

      res
      .status(200)
      .json(await this.ControllerService.GetActiveItemsByTenantIdAndUserId(userId, tenantId));

    } catch (error) {
      next(new BadRequestError({ message: `Error fetching event info ${error}`, logging: true }));
    }
  }

  CreateEventByTenenantAndUserId = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {

      const session = req.session;
      const eventInfo = req.body.eventInfo;
      const tenantId = session!.getTenantId();
      const userId = session!.getUserId();
      delete eventInfo.id;
      const request: Event = new EventRequest().CreateRequest(eventInfo, userId, tenantId);

      res
      .status(200)
      .json(await this.ControllerService.CreateEventByTenenantAndUserId(request));

    } catch (error) {
      next(new BadRequestError({ message: `Error creating event info ${error}`, logging: true }));
    }
  }

  UpdateEventById = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {

      const session = req.session;
      const eventInfo = req.body.eventInfo;
      const eventId = eventInfo.id;
      delete eventInfo.id;
      const tenantId = session!.getTenantId();
      const userId = session!.getUserId();

      if (!eventId || eventId === "") {
        next(new ValidationError({ code: 400, context: "Event Id is required" as unknown as undefined, logging: true }));
      }

      const request: Event = new EventRequest().CreateRequest(eventInfo, userId ,tenantId);

      res
      .status(200)
      .json(await this.ControllerService.UpdateEventById(request, eventId));

    } catch (error: unknown) {
      next(new BadRequestError({ context: `Error updating event info ${error}` as unknown as undefined, logging: true }))
    }
  }

  DeleteEventById = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const eventId = req.body.eventId;

      if (!eventId || eventId === "") {
        next(new ValidationError({ code: 400, context: "Event Id is required" as unknown as undefined, logging: true }));
      }

      res
      .status(200)
      .json(await this.ControllerService.DeleteEventById(eventId));

    } catch (error) {
      next(new BadRequestError({ context: `Error deleting event info ${error}` as unknown as undefined, logging: true }));
    }
  }
}