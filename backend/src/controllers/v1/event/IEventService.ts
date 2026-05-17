import { NextFunction } from "supertokens-node/lib/build/framework/custom/framework";
import type Event from "../../../../../shared/interfaces/sesame_model_types/event";
import { IEventRequest } from "./";

export interface IEventService {
  GetActiveItemsByTenantIdAndUserId(request: IEventRequest): Promise<Event[]>;
  CreateEventByTenenantAndUserId(request: IEventRequest): Promise<Event>;
  UpdateEventById(request: IEventRequest, next: NextFunction): Promise<Event>;
  DeleteEventById(request: IEventRequest, next: NextFunction): Promise<Event>;
}