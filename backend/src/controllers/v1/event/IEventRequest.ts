import { IBaseRequest } from "../";
import { Event } from "../../../../../shared/interfaces/sesame_model_types";

export interface IEventRequest {
  baseRequest: IBaseRequest;
  event?: Event;
}