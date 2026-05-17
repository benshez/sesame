import type Event from "../../../../../shared/interfaces/sesame_model_types/event";
import { SessionRequest } from "supertokens-node/framework/express";
import { IEventRequest } from "./IEventRequest";

export class EventRequest {
  public request: IEventRequest = {
    baseRequest: {
      userId: "",
      tenantId: "",
      recipeUserId: undefined
    },
    event: {} as Event
  } as IEventRequest;

  CreateRequest(request: SessionRequest): IEventRequest {
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