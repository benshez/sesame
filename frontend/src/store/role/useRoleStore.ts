import { defineStore } from "pinia";
import { type Component, ref } from "vue";
import { ApiClient } from "@/plugins/client/ApiClient";
import { useFormStore } from "@/store/forms/useFormStore";
import { useUserStore } from "@/store/user/useUserStore";
import type { IRole } from "../../../../shared/interfaces";
import type { ITableColumn, ITableRow } from "@/interfaces";
import ActionButtons from "@/components/buttons/ActionButtons.vue";

export const useRoleStore = defineStore("role", () => {
  const apiClient = new ApiClient();
  const userStore = useUserStore();
  const formStore = useFormStore();

  const rolesState = ref({
    roles: [] as Array<IRole>,
    selectedRole: {} as IRole,
    tableRows: [] as Array<ITableRow>
  });

  const CreateRolesTableColumns = (): Array<ITableColumn> => {
    return [
      { id: "roleId", caption: "Role", type: String },
      { id: "permissions", caption: "Permissions", type: String },
      { id: "action", caption: "Action", type: ActionButtons }
    ]
  }

  const CreateRolesTableRows = () => {
    const actionButtonComponent = {
      name: "ActionButtons",
    } as unknown as Component;

    const rows: Array<ITableRow> = [];
    rolesState.value.tableRows = rows;

    rolesState.value.roles.forEach((role: IRole) => {
      rows.push({
        values: [role.roleId || "", role.permissions || "", actionButtonComponent],
        rowData: role,
        props: [{}, {}, {
          buttons: [
            {
              title: `Edit Role - ${role.roleId}`,
              type: "edit",
              visible: true
            },
            {
              title: `Delete Role - ${role.roleId}`,
              type: "delete",
              visible: true
            }
          ]
        }]
      })
    });

    Object.assign(rolesState.value.tableRows, rows);
  }

  const GetRolePermissions = async (roleId: string, token: any): Promise<Array<string>> => {
    return await apiClient
      .setBearerAuth(token)
      .role()
      .getPermissionsForRole(roleId) as unknown as Array<string>;
  }

  const GetAllRoles = async (authToken: string = ""): Promise<Array<string>> => {
    if (authToken === "") {
      authToken = await userStore.GetAccessToken();
    }

    return await apiClient
      .setBearerAuth(authToken)
      .role()
      .getRoles() as unknown as Array<string>;

  }

  const GetRolesAndRolePermissions = async (createTableRows: boolean = true) => {
    const authToken = await userStore.GetAccessToken();
    const roles = await GetAllRoles(authToken) as unknown as Array<string>;
    const response: Array<IRole> = [];

    await Promise.all(roles.map(async (role: string) => {
      response.push({
        roleId: role,
        permissions: await GetRolePermissions(role, authToken) as unknown as Array<string>
      })
    }));

    rolesState.value.roles = response;
    
    if (createTableRows) CreateRolesTableRows();
  }

  const UpdateSelectedRole = (role: IRole) => {
    rolesState.value.selectedRole = {};
    Object.assign(rolesState.value.selectedRole, role);
  }

  const RemoveRolePermissions = async (role: { roleId: string, permissions: Array<string> }) => {
    const token = await userStore.GetAccessToken();

    await apiClient
      .setBearerAuth(token)
      .role()
      .removePermissionsFromRole(role) as unknown as Array<IRole>;

    GetRolesAndRolePermissions();
  }

  const AddRolePermissions = async (role: { roleId: string, permissions: Array<string> }) => {
    const token = await userStore.GetAccessToken();

    await apiClient
      .setBearerAuth(token)
      .role()
      .createNewRoleOrAddPermissions(role) as unknown as Array<IRole>;

    GetRolesAndRolePermissions();
  }

  const CreateOrUpdateRole = async () => {
    const permissions = formStore.getElement("permissions").value as Array<string>;
    const roleId: string = formStore.getElement("role").value as string;

    const role = {
      roleId: roleId,
      permissions: permissions
    }
    const token = await userStore.GetAccessToken();

    await apiClient
      .setBearerAuth(token)
      .role()
      .createNewRoleOrAddPermissions(role) as unknown as Array<IRole>;

    GetRolesAndRolePermissions();
  }

  const DeleteRole = async (roleId: string) => {
    const token = await userStore.GetAccessToken();

    await apiClient
      .setBearerAuth(token)
      .role()
      .deleteRole(roleId);

    GetRolesAndRolePermissions();
  }

  return {
    rolesState,
    CreateRolesTableColumns,
    GetRolesAndRolePermissions,
    CreateOrUpdateRole,
    AddRolePermissions,
    RemoveRolePermissions,
    GetRolePermissions,
    GetAllRoles,
    DeleteRole,
    UpdateSelectedRole
  }
})