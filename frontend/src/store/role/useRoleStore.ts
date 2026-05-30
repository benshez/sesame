import { defineStore } from "pinia";
import { type Component, ref } from "vue";
import { ApiClient } from "@/plugins";
import { useFormStore, useUserStore } from "@/store";
import type { IRole } from "../../../../shared/interfaces";
import type { IOption, ITableColumn, ITableRow } from "@/interfaces";
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

    rolesState.value.roles.forEach((role: IRole) => {
      rows.push({
        values: [role.roleId || "", role.permissions || "", actionButtonComponent],
        rowData: role,
        props: [{}, {}, {
          buttons: [
            {
              title: `Edit User - ${role.roleId}`,
              type: "edit",
              visible: true
            },
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

  const GetRoles = async () => {
    const roles: Array<IRole> = [];
    const authToken = await userStore.GetAccessToken();

    const response = await apiClient
      .setBearerAuth(authToken)
      .role()
      .getRoles() as unknown as Array<IRole>;


    response.forEach(async (role: IRole) => {
      const roleId: string = role as unknown as string;
      const permissions = await GetRolePermissions(roleId, authToken) as unknown as Array<string>;
      rolesState.value.roles.push(
        {
          roleId: roleId,
          permissions: permissions
        }
      );
      CreateTableRows()
    })
  }

  const UpdateSelectedRole = (role: IRole) => {
    rolesState.value.selectedRole = {};
    Object.assign(rolesState.value.selectedRole, role);
  }

  const RemoveRolePermissions = async () => {
    const permissions = formStore.getElement("permissions");
    const roleId: string = formStore.getElement("role").value as string;
    const currentPermissions = rolesState.value.selectedRole.permissions;

    let options: Array<IOption> = [];

    if (typeof permissions.options === "function") {
      options = await permissions.options()
    }

    const token = await userStore.GetAccessToken();

    options.forEach(async (option) => {
      if (!permissions.value.includes(option.key as string)) {
        const role = {
          roleId: roleId,
          permissions: [option.key] as Array<string>
        }
        await apiClient
          .setBearerAuth(token)
          .role()
          .removePermissionsFromRole(role) as unknown as Array<IRole>;

        CreateTableRows()
      } else {
        if (currentPermissions && !currentPermissions.includes(option.key as string)) {
          const role = {
            roleId: roleId,
            permissions: [option.key] as Array<string>
          }
          await apiClient
            .setBearerAuth(token)
            .role()
            .createNewRoleOrAddPermissions(role) as unknown as Array<IRole>;

          CreateTableRows()
        }
      }
    })
    //if(options)

    // const roleId: string = formStore.getElement("role").value as string;

    // const token = await userStore.GetAccessToken();

    // await apiClient
    //   .setBearerAuth(token)
    //   .role()
    //   .removePermissionsFromRole(role) as unknown as Array<IRole>;
  }

  const CreateRole = async () => {
    const permissions = formStore.getElement("permissions");
    const roleId: string = formStore.getElement("role").value as string;

    const role = {
      roleId: roleId,
      permissions: permissions.value as Array<string>
    }
    const token = await userStore.GetAccessToken();

    await apiClient
      .setBearerAuth(token)
      .role()
      .createNewRoleOrAddPermissions(role) as unknown as Array<IRole>;
  }

  return {
    rolesState,
    CreateTableHeader,
    GetRoles,
    CreateRole,
    RemoveRolePermissions,
    GetRolePermissions,
    UpdateSelectedRole
  }
})