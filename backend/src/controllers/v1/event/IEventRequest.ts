import { IBaseRequest } from "../";
import { IEvent } from "../../../../../shared/interfaces";


export interface IEventRequest {
  baseRequest: IBaseRequest;
  event?: IEvent;
}