import { type TenantConfig } from "supertokens-node/recipe/multitenancy/types";
import { NextFunction } from "supertokens-node/lib/build/framework/custom/framework";
import { IBaseRequest, ITenantRequest } from "../";
import { User } from "supertokens-node/types";

export interface ITenantService {
  GetTenants(): Promise<{
    status: "OK";
    tenants: ({
      tenantId: string;
    } & TenantConfig)[];
  }>;
  GetTenant(request: IBaseRequest): Promise<({
    status: "OK";
  } & TenantConfig) | undefined>;
  CreateTenant(request: ITenantRequest, next: NextFunction): Promise<{
    status: "OK";
    createdNew: boolean;
  }>
  GetUsersForTenant(request: ITenantRequest): Promise<{
    users: User[];
    nextPaginationToken?: string;
  }>
  AddUserToTenant(request: ITenantRequest): Promise<{
    status: "OK";
    wasAlreadyAssociated: boolean;
  } | {
    status: "UNKNOWN_USER_ID_ERROR" | "EMAIL_ALREADY_EXISTS_ERROR" | "PHONE_NUMBER_ALREADY_EXISTS_ERROR" | "THIRD_PARTY_USER_ALREADY_EXISTS_ERROR";
  } | {
    status: "ASSOCIATION_NOT_ALLOWED_ERROR";
    reason: string;
  }>
  RemoveUserFromTenant(request: ITenantRequest): Promise<{
    status: "OK";
    wasAssociated: boolean;
  }>
}