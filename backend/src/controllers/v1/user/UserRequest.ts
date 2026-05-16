import { SessionRequest } from "supertokens-node/framework/express";
import { IUserRequest } from "./IUserRequest";
import { IUser } from "../../../../../shared/interfaces";

export class UserRequest {
  private request: IUserRequest = {
    baseRequest: {
      userId: "",
      tenantId: "",
      recipeUserId: undefined
    },
    user: {} as IUser
  } as IUserRequest;

  CreateRequest(req: SessionRequest): IUserRequest {
    const session = req.session;
    const body = req.body;

    if (session) {
      this.request.baseRequest.userId = session!.getUserId();
      this.request.baseRequest.tenantId = session!.getTenantId();
      this.request.baseRequest.recipeUserId = session!.getRecipeUserId();
      this.request.roleId = body.roleId ? body.roleId : "";
    }

    if (body.userInfo) {
      this.request.userInfo = body.userInfo ? body.userInfo : {};
      this.request.UpdateObject = {
        recipeUserId: session!.getRecipeUserId(),
        applyPasswordPolicy: true,
        tenantIdForPasswordPolicy: session!.getTenantId(),
      }
    }

    if (body.user) {
      this.request.user.email = body.user.email;
      this.request.user.password = body.user.password;
    }

    return this.request;
  }
}