import { SessionRequest } from "supertokens-node/framework/express";
import { sanitize } from "express-xss-sanitizer";
import { IEmailRequest } from ".";

export class EmailRequest {
  public request: IEmailRequest = {
    baseRequest: {
      userId: "",
      tenantId: "",
      recipeUserId: undefined
    },
    email: ""
  } as IEmailRequest;

  CreateRequest = (request: SessionRequest): IEmailRequest => {
    const session = request.session;
    const body = request.body;

    if (session) {
      this.request.baseRequest.userId = session!.getUserId();
      this.request.baseRequest.tenantId = session!.getTenantId();
      this.request.baseRequest.recipeUserId = session!.getRecipeUserId();
    }

    if (body) {
      if (body.email) this.request.email = body.email;
      if (body.tenantId && this.request.baseRequest.tenantId === "") this.request.baseRequest.tenantId = body.tenantId;
    }

    return sanitize(this.request);
  }
}