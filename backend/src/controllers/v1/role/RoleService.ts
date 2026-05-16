import UserRoles from "supertokens-node/recipe/userroles";
import { IRoleRequest, IRoleService } from "../";

export class RoleService implements IRoleService {
  GetRoles = async (): Promise<{ status: "OK"; roles: string[]; }> => {
    const reponse = await UserRoles.getAllRoles();

    return reponse;
  }
  DeleteRole = async (request: IRoleRequest): Promise<{ status: "OK"; didRoleExist: boolean; }> => {
    const response = await UserRoles.deleteRole(request.roleId as string);

    return response;
  }
  CreateNewRoleOrAddPermissions = async (request: IRoleRequest): Promise<{ status: "OK"; createdNewRole: boolean; }> => {
    const response = await UserRoles.createNewRoleOrAddPermissions(request.roleId as string, request.permissions as Array<string>);

    return response;
  }
  RemovePermissionsFromRole = async (request: IRoleRequest): Promise<{ status: "OK" | "UNKNOWN_ROLE_ERROR"; }> => {
    const response = await UserRoles.removePermissionsFromRole(request.roleId as string, request.permissions as Array<string>);

    return response;
  }
  GetPermissionsForRole = async (request: IRoleRequest): Promise<{ status: "OK"; permissions: string[]; } | { status: "UNKNOWN_ROLE_ERROR"; }> => {
    const response = await UserRoles.getPermissionsForRole(request.roleId as string);

    return response;
  }
  GetRolesThatHavePermission = async (request: IRoleRequest): Promise<{ status: "OK"; roles: string[]; }> => {
    const response = await UserRoles.getRolesThatHavePermission(request.permission as string);

    return response;
  }
  AddRoleToUser = async (request: IRoleRequest): Promise<{ status: "OK"; didUserAlreadyHaveRole: boolean; } | { status: "UNKNOWN_ROLE_ERROR"; }> => {
    const response = await UserRoles.addRoleToUser(request.baseRequest.tenantId, request.baseRequest.userId, request.roleId as string);

    return response;
  }
  RemoveUserRole = async (request: IRoleRequest): Promise<{ status: "OK"; didUserHaveRole: boolean; } | { status: "UNKNOWN_ROLE_ERROR"; }> => {
    const response = await UserRoles.removeUserRole(request.baseRequest.tenantId, request.baseRequest.userId, request.roleId as string);

    return response;
  }
}