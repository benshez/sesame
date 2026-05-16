import { IRoleRequest } from "../";

export interface IRoleService {
  GetRoles(): Promise<{
    status: "OK";
    roles: string[];
  }>;
  DeleteRole(request: IRoleRequest): Promise<{
    status: "OK";
    didRoleExist: boolean;
  }>;
  CreateNewRoleOrAddPermissions(request: IRoleRequest): Promise<{
    status: "OK";
    createdNewRole: boolean;
  }>;
  RemovePermissionsFromRole(request: IRoleRequest): Promise<{
    status: "OK" | "UNKNOWN_ROLE_ERROR";
  }>;
  GetPermissionsForRole(request: IRoleRequest): Promise<{
    status: "OK";
    permissions: string[];
  } | {
    status: "UNKNOWN_ROLE_ERROR";
  }>;
  GetRolesThatHavePermission(request: IRoleRequest): Promise<{
    status: "OK";
    roles: string[];
  }>;
  AddRoleToUser(request: IRoleRequest): Promise<{
    status: "OK";
    didUserAlreadyHaveRole: boolean;
  } | {
    status: "UNKNOWN_ROLE_ERROR";
  }>;
  RemoveUserRole(request: IRoleRequest): Promise<{
    status: "OK";
    didUserHaveRole: boolean;
  } | {
    status: "UNKNOWN_ROLE_ERROR";
  }>;
}