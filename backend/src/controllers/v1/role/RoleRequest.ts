import { SessionRequest } from "supertokens-node/framework/express";
import { IRoleRequest } from "../";

export class RoleRequest {
  private request: IRoleRequest = {
    baseRequest: {
      userId: "",
      tenantId: "",
      recipeUserId: ""
    }
  } as IRoleRequest;

  CreateRequest(req: SessionRequest): IRoleRequest {
    const session = req.session;
    const body = req.body;

    this.request.baseRequest.userId = session!.getUserId();
    this.request.baseRequest.tenantId = session!.getTenantId();
    this.request.baseRequest.recipeUserId = session!.getRecipeUserId().getAsString();
    this.request.permission = body.permission !== "" ? body.permission : "";
    this.request.permissions = body.permissions !== "" ? body.permissions : [];
    this.request.roleId = body.roleId ? body.roleId : "";

    return this.request.permissions as unknown as IRoleRequest;
  }
}