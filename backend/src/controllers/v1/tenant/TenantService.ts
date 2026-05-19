import { TenantConfig } from "supertokens-node/recipe/multitenancy/types";
import Multitenancy from "supertokens-node/recipe/multitenancy";
import { RecipeUserId, getUsersNewestFirst } from "supertokens-node";
import { NextFunction } from "supertokens-node/lib/build/framework/custom/framework";
import { IBaseRequest, ITenantRequest, ITenantService } from "../";
import { ValidationError } from "../../../core/error";
import { User } from "supertokens-node/types";

export class TenantService implements ITenantService {
  GetUsersForTenant = async (request: ITenantRequest): Promise<{ users: User[]; nextPaginationToken?: string; }> => {
    const input = {
      tenantId: request.baseRequest.tenantId,
      limit: 2
    };

    if (request.nextPaginationToken && request.nextPaginationToken !== "get-tenant-users-next-pagination-token") {
      Object.assign(input, { limit: 2, paginationToken: request.nextPaginationToken });
    }

    const response: {
      users: User[];
      nextPaginationToken?: string;
    } = {
      users: [],
      nextPaginationToken: ""
    };

    const usersResponse = await getUsersNewestFirst(input);

    if (usersResponse.users) {
      usersResponse.users.forEach((user: User) => {
        response.users.push(user)
      });
    }

    response.nextPaginationToken = usersResponse.nextPaginationToken;

    return response;
  }
  GetTenants = async (): Promise<{ status: "OK"; tenants: ({ tenantId: string; } & TenantConfig)[]; }> => {
    const reponse = await Multitenancy.listAllTenants();

    return reponse;
  }
  GetTenant = async (request: IBaseRequest): Promise<({ status: "OK"; } & TenantConfig) | undefined> => {
    const reponse = await Multitenancy.getTenant(request.tenantId);

    return reponse;
  }
  CreateTenant = async (request: ITenantRequest, next: NextFunction): Promise<{ status: "OK"; createdNew: boolean; }> => {
    const config = {};

    if (request.tenant) {
      if (request.tenant.firstFactors && request.tenant.firstFactors?.length > 0) {
        Object.assign(config, { firstFactors: request.tenant.firstFactors });
      }
      if (request.tenant.coreConfig && Object.keys(request.tenant.coreConfig).length > 0) {
        Object.assign(config, { coreConfig: request.tenant.coreConfig });
      }
    }

    if (!request.tenant || Object.keys(config).length === 0) {
      next(new ValidationError({ code: 400, context: "Config is required" as unknown as undefined, logging: true }));
      return {
        status: "OK",
        createdNew: false
      }
    }

    const reponse = await Multitenancy.createOrUpdateTenant(request.tenant.TenantId, config);

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