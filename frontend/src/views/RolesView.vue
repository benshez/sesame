<template>
  <BaseLayout>
    <Table :id="'roles-table'" :header="'Roles'" :columns="roleStore.CreateRolesTableColumns()"
      :rows="roleStore.rolesState.tableRows" @edit-clicked="onEditRole" @delete-clicked="onNotifyBeforeDelete" />
    <Notification :message="'Are you sure you want to delete this role?'" :acceptButtonText="'Yes'"
      :closeButtonText="'No'" @close-button-clicked="onCloseNotification"
      @accept-button-clicked="onAcceptNotification" />

    <div class="mt-4 md:mt-6">
      <FormBody :view="'roles'" :css-class="'grid grid-cols-2 gap-4 custom-scrollbar overflow-y-auto p-2'">
        <template v-slot:header>
          <p v-if="roleStore.rolesState.selectedRole.roleId" class="mb-2 font-semibold">
            Edit Role
          </p>
          <p v-else class="mb-2 font-semibold">Add Role</p>
          <p v-if="roleStore.rolesState.selectedRole.roleId" class="text-sm text-gray-500 dark:text-gray-400">
            Edit role permissions.
          </p>
          <p v-else class="text-sm text-gray-500 dark:text-gray-400">Add role permissions.</p>
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
              <button @click="onSaveRoleOrPermissions" v-else
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
import { onMounted, provide } from "vue";
import Table from "@/components/elements/Table.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";
import FormBody from "@/components/Form/FormBody.vue";
import Notification from "@/components/notifications/notification.vue";
import { useRoleStore, useFormStore, useDisplayStore } from "@/store";
import type { IRole } from "../../../shared/interfaces";

const roleStore = useRoleStore();
const formStore = useFormStore();
const displayStore = useDisplayStore();

const UpdateRoleFormState = (roleId: string = "", permissions: Array<string> | string = "") => {
  formStore.updateElementState("role", { key: "value", "value": roleId });
  formStore.updateElementState("permissions", { key: "value", "value": permissions });
}
const UpdateSelectedRole = (role: IRole = {}) => {
  roleStore.UpdateSelectedRole(role);
}

const onEditRole = (role: IRole) => {
  UpdateSelectedRole(role);
  const permissions: Array<string> = [];

  role.permissions?.forEach((permission: string) => {
    permissions.push(permission);
  })

  UpdateRoleFormState(role.roleId, permissions);
}

const onItemToggled = async (option: string, isChecked: boolean) => {
  if (roleStore.rolesState && roleStore.rolesState.selectedRole.roleId) {
    const roleId = roleStore.rolesState.selectedRole.roleId;
    const role = { roleId: roleId as string, permissions: [option] };
    if (isChecked) {
      await roleStore.AddRolePermissions(role);
    } else {
      await roleStore.RemoveRolePermissions(role);
    }
  }
}

const onNotifyBeforeDelete = (role: IRole) => {
  displayStore.UpdateNotificationShowingState(true);
  UpdateSelectedRole(role);
}

const onCloseNotification = () => {
  UpdateSelectedRole();
  displayStore.UpdateNotificationShowingState(false);
}

const onAcceptNotification = async () => {
  if (roleStore.rolesState && roleStore.rolesState.selectedRole.roleId) {
    await roleStore.DeleteRole(roleStore.rolesState.selectedRole.roleId);
  }

  UpdateSelectedRole();
  UpdateRoleFormState();
  displayStore.UpdateNotificationShowingState(false);
}

const onSaveRoleOrPermissions = async () => {
  await roleStore.CreateOrUpdateRole();
  UpdateSelectedRole();
  UpdateRoleFormState();
}

provide("onItemToggled", onItemToggled)

onMounted(async () => {
  await roleStore.GetRolesAndRolePermissions();
});
</script>