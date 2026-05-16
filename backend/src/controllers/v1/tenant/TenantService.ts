import { TenantConfig } from "supertokens-node/recipe/multitenancy/types";
import Multitenancy from "supertokens-node/recipe/multitenancy";
import {RecipeUserId} from "supertokens-node";
import { IBaseRequest, ITenantRequest, ITenantService } from "../";

export class TenantService implements ITenantService {
  GetTenants = async (): Promise<{ status: "OK"; tenants: ({ tenantId: string; } & TenantConfig)[]; }> => {
    const reponse = await Multitenancy.listAllTenants();

    return reponse;
  }
  GetTenant = async (request: IBaseRequest): Promise<({ status: "OK"; } & TenantConfig) | undefined> => {
    const reponse = await Multitenancy.getTenant(request.tenantId);

    return reponse;
  }
  CreateTenant = async (request: ITenantRequest): Promise<{ status: "OK"; createdNew: boolean; }> => {
    const reponse = await Multitenancy.createOrUpdateTenant(request.tenant.TenantId, {
      coreConfig: request.tenant.coreConfig
    });

    return reponse;
  }
  AddUserToTenant = async (request: ITenantRequest): Promise<{ status: "OK"; wasAlreadyAssociated: boolean; } | { status: "UNKNOWN_USER_ID_ERROR" | "EMAIL_ALREADY_EXISTS_ERROR" | "PHONE_NUMBER_ALREADY_EXISTS_ERROR" | "THIRD_PARTY_USER_ALREADY_EXISTS_ERROR"; } | { status: "ASSOCIATION_NOT_ALLOWED_ERROR"; reason: string; }> => {
    const response = await Multitenancy.associateUserToTenant(request.baseRequest.userId, request.baseRequest.recipeUserId as RecipeUserId);

    return response;
  }
  RemoveUserFromTenant = async (request: ITenantRequest): Promise<{ status: "OK"; wasAssociated: boolean; }> => {
    const response = await Multitenancy.disassociateUserFromTenant(request.baseRequest.userId, request.baseRequest.recipeUserId as RecipeUserId);

    return response;
  }
}