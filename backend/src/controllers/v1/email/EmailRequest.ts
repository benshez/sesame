import { SessionRequest } from "supertokens-node/framework/express";
import { sanitize } from "express-xss-sanitizer";
import { IEmailRequest } from ".";
import superTokens from "supertokens-node";

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
      if (body.userId) this.request.baseRequest.userId = body.userId;
      if (body.tenantId && this.request.baseRequest.tenantId === "") this.request.baseRequest.tenantId = body.tenantId;
      if (body.recipeUserId) this.request.baseRequest.recipeUserId = superTokens.convertToRecipeUserId(body.recipeUserId);
    }

    return sanitize(this.request);
  }
}