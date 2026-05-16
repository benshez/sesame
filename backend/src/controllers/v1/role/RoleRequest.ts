import { SessionRequest } from "supertokens-node/framework/express";
import { IRoleRequest } from "../";
import { IRole } from "../../../../../shared/interfaces";

export class RoleRequest {
  private request: IRoleRequest = {
    baseRequest: {
      userId: "",
      tenantId: "",
      recipeUserId: undefined
    },
    role: {} as IRole
  } as IRoleRequest;

  CreateRequest(req: SessionRequest): IRoleRequest {
    const session = req.session;
    const body = req.body;

    this.request.baseRequest.userId = session!.getUserId();
    this.request.baseRequest.tenantId = session!.getTenantId();
    this.request.baseRequest.recipeUserId = session!.getRecipeUserId();
    if (body.role && this.request.role) {
      this.request.role.roleId = body.role.roleId ? body.role.roleId : "";
      this.request.role.permission = body.role.permission ? body.role.permission : "";
      this.request.role.permissions = body.role.permissions ? body.role.permissions : [];
    }

    return this.request as unknown as IRoleRequest;
  }
}