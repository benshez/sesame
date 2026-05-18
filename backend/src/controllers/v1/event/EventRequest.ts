import { SessionRequest } from "supertokens-node/framework/express";
import { IEventRequest } from "./IEventRequest";
import { IEvent } from "../../../../../shared/interfaces";

export class EventRequest {
  public request: IEventRequest = {
    baseRequest: {
      userId: "",
      tenantId: "",
      recipeUserId: undefined
    },
    event: {} as IEvent
  } as IEventRequest;

  CreateRequest = (request: SessionRequest): IEventRequest => {
    const session = request.session;
    const body = request.body;

    if (session) {
      this.request.baseRequest.userId = session!.getUserId();
      this.request.baseRequest.tenantId = session!.getTenantId();
      this.request.baseRequest.recipeUserId = session!.getRecipeUserId();
    }

    if (body.event) {
      Object.assign(this.request, { event: body.event });
    }

    return this.request;
  }
}