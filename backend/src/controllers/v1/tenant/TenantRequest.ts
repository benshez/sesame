import { SessionRequest } from "supertokens-node/framework/express";
import { ITenantRequest } from "../";
import { ITenant } from "../../../../../shared/interfaces";

export class TenantRequest {
  private request: ITenantRequest = {
    baseRequest: {
      userId: "",
      tenantId: "",
      recipeUserId: undefined
    },
    tenant: {} as ITenant
  } as ITenantRequest;

  CreateRequest(req: SessionRequest): ITenantRequest {
    const session = req.session;
    const body = req.body;

    this.request.baseRequest.userId = session!.getUserId();
    this.request.baseRequest.tenantId = session!.getTenantId();
    this.request.baseRequest.recipeUserId = session!.getRecipeUserId();

    if (body.tenant && this.request.tenant) {
      if (body.tenant.coreConfig) this.request.tenant.coreConfig = body.tenant.coreConfig;
      if (body.tenant.firstFactors) this.request.tenant.firstFactors = body.tenant.firstFactors;
    }

    return this.request as unknown as ITenantRequest;
  }
}