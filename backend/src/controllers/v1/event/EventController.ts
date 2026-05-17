import { SessionRequest } from "supertokens-node/framework/express";
import { Response } from "express-serve-static-core";
import { BaseController } from "../../../core/routing";
import { BadRequestError } from "../../../core/error";
import { NextFunction } from "supertokens-node/lib/build/framework/custom/framework";
import { IEventService } from "./IEventService";
import { EventRequest } from "./EventRequest";
import { IEventRequest } from "./IEventRequest";

export class EventController extends BaseController<IEventService> {
  public Id: string = "EventController";
  private request = new EventRequest();

  GetActiveEventsByTenantIdAndUserId = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const response = await this.ControllerService.GetActiveItemsByTenantIdAndUserId(this.request.CreateRequest(req) as unknown as IEventRequest);

      res
      .status(200)
      .json(response);

    } catch (error) {
      next(new BadRequestError({ message: `Error fetching event info ${error}`, logging: true }));
    }
  }

  CreateEventByTenenantAndUserId = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const response = await this.ControllerService.CreateEventByTenenantAndUserId(this.request.CreateRequest(req));
      
      res
      .status(200)
      .json(response);

    } catch (error) {
      next(new BadRequestError({ message: `Error creating event info ${error}`, logging: true }));
    }
  }

  UpdateEventById = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const response = await this.ControllerService.UpdateEventById(this.request.CreateRequest(req), next);

      res
      .status(200)
      .json(response);

    } catch (error: unknown) {
      next(new BadRequestError({ context: `Error updating event info ${error}` as unknown as undefined, logging: true }))
    }
  }

  DeleteEventById = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const response = await this.ControllerService.DeleteEventById(this.request.CreateRequest(req), next);

      res
      .status(200)
      .json(response);

    } catch (error) {
      next(new BadRequestError({ context: `Error deleting event info ${error}` as unknown as undefined, logging: true }));
    }
  }
}