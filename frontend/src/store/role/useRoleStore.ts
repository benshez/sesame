import { defineStore } from "pinia";
import { type Component, ref } from "vue";
import { ApiClient } from "@/plugins";
import { useFormStore, useUserStore } from "@/store";
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

  const CreateTableHeader = (): Array<ITableColumn> => {
    return [
      { id: "roleId", caption: "Role", type: String },
      { id: "permissions", caption: "Permissions", type: String },
      { id: "action", caption: "Action", type: ActionButtons }
    ]
  }

  const CreateTableRows = () => {
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

  const GetAllRoles = async () => {
    const roles: Array<IRole> = [];
    rolesState.value.roles = roles;

    return await apiClient
      .setBearerAuth(await userStore.GetAccessToken())
      .role()
      .getRoles() as unknown as Array<IRole>;
  }

  const GetRolesAndRolePermissions = async () => {
    const authToken = await userStore.GetAccessToken();
    const response = await GetAllRoles() as unknown as Array<IRole>;

    response.forEach(async (role: IRole, index: number) => {
      const roleId: string = role as unknown as string;
      const permissions = await GetRolePermissions(roleId, authToken) as unknown as Array<string>;
      rolesState.value.roles.push(
        {
          roleId: roleId,
          permissions: permissions
        }
      );

      CreateTableRows();
    })
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
    CreateTableHeader,
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