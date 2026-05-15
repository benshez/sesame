import { SessionRequest } from "supertokens-node/framework/express";
import { IUserRequest } from "./IUserRequest";

export class UserRequest {
  private request: IUserRequest = {
    baseRequest: {
      userId: "",
      tenantId: "",
      recipeUserId: ""
    }
  } as IUserRequest;

  CreateRequest(req: SessionRequest): IUserRequest {
    const session = req.session;
    const body = req.body;

    this.request.baseRequest.userId = session!.getUserId();
    this.request.baseRequest.tenantId = session!.getTenantId();
    this.request.baseRequest.recipeUserId = session!.getRecipeUserId().getAsString();
    this.request.roleId = body.roleId ? body.roleId : "";

    if (body.userInfo) {
      this.request.userInfo = body.userInfo ? body.userInfo : {};
      this.request.UpdateObject = {
        recipeUserId: session!.getRecipeUserId(),
        applyPasswordPolicy: true,
        tenantIdForPasswordPolicy: session!.getTenantId(),
      }
    }

    return this.request;
  }
}