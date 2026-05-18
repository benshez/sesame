import { NextFunction } from "supertokens-node/lib/build/framework/custom/framework";
import { IEventRequest } from "./";
import { IEvent } from "../../../../../shared/interfaces";

export interface IEventService {
  GetActiveItemsByTenantIdAndUserId(request: IEventRequest): Promise<IEvent[]>;
  CreateEventByTenenantAndUserId(request: IEventRequest): Promise<IEvent>;
  UpdateEventById(request: IEventRequest, next: NextFunction): Promise<IEvent>;
  DeleteEventById(request: IEventRequest, next: NextFunction): Promise<IEvent>;
}