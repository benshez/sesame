<template>
  <BaseLayout>
    <Table :id="'roles-table'" :header="'Roles'" :columns="roleStore.CreateTableHeader()"
      :rows="roleStore.rolesState.tableRows" @edit-clicked="onEditRole" />
    <div class="mt-4 md:mt-6">
      <FormBody :view="'roles'" :css-class="'grid grid-cols-2 gap-4 custom-scrollbar overflow-y-auto p-2'">
        <template v-slot:header>
          <p v-if="roleStore.rolesState.selectedRole.roleId" class="mb-2 font-semibold">
            Edit Role
          </p>
          <p v-else class="mb-2 font-semibold">Add Role</p>
          <p v-if="roleStore.rolesState.selectedRole.roleId" class="text-sm text-gray-500 dark:text-gray-400">
            Edit role detail.
          </p>
          <p v-else class="text-sm text-gray-500 dark:text-gray-400">Add role detail.</p>
        </template>
        <template v-slot:content>

        </template>
        <template v-slot:footer="elements">
          <div class="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
            <div class="flex items-center gap-5 lg:justify-end">
              <button @click="onSaveRoleOrPermissions" v-if="roleStore.rolesState.selectedRole.roleId"
                class="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300">
                <span>Save Changes</span>
              </button>
              <button @click="onAddRoleOrPermissions" v-else
                class="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300">
                <span>Add Role</span>
              </button>
            </div>
          </div>
        </template>
      </FormBody>
    </div>
  </BaseLayout>
</template>
<script setup lang="ts">
import { onMounted, provide, inject } from "vue";
import Table from "@/components/elements/Table.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";
import FormBody from "@/components/Form/FormBody.vue";
import { useRoleStore, useFormStore } from "@/store";
import type { IRole } from "../../../shared/interfaces";


const roleStore = useRoleStore();
const formStore = useFormStore();

const onEditRole = (role: IRole) => {
  roleStore.UpdateSelectedRole(role);
  formStore.updateElementState("role", { key: "value", "value": role.roleId });
  const permissions: Array<string> = [];

  role.permissions?.forEach((permission: string) => {
    permissions.push(permission);
  })

  formStore.updateElementState("permissions", { key: "value", "value": permissions });
}

const onItemToggled = async (option: string, isChecked: boolean) => {
  const roleId = roleStore.rolesState.selectedRole.roleId;
  if (roleStore.rolesState.selectedRole) {
    const role = { roleId: roleId as string, permissions: [option] };
    if (isChecked) {
      await roleStore.AddRolePermissions(role);
    } else {
      await roleStore.RemoveRolePermissions(role);
    }
  }
  roleStore.UpdateSelectedRole({});
}

const onSaveRoleOrPermissions = async () => {
  //await roleStore.RemoveRolePermissions()
  roleStore.UpdateSelectedRole({});
}

const onAddRoleOrPermissions = async () => {
  roleStore.UpdateSelectedRole({});
  await roleStore.CreateRole()
}

provide("onItemToggled", onItemToggled)

onMounted(async () => {
  await roleStore.GetRoles();
});
</script>