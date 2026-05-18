import { SessionRequest } from "supertokens-node/framework/express";
import { sanitize } from "express-xss-sanitizer";
import { ILookupRequest } from ".";

export class LookupRequest {
  public request: ILookupRequest = {
    baseRequest: {
      userId: "",
      tenantId: "",
      recipeUserId: undefined
    }
  } as ILookupRequest;

  CreateRequest = (request: SessionRequest): ILookupRequest => {
    const session = request.session;

    if (session) {
      this.request.baseRequest.userId = session!.getUserId();
      this.request.baseRequest.tenantId = session!.getTenantId();
      this.request.baseRequest.recipeUserId = session!.getRecipeUserId();
    }

    return sanitize(this.request);
  }
}