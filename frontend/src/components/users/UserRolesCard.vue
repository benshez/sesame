<template>
  <Table :id="'roles-table'" :header="'Roles'" :columns="userStore.CreateUserRolesTableColumns()"
    :rows="userStore.userState.userRolesTableRows" @toggle="onToggleRole" />
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import Table from "@/components/elements/Table.vue";
import { useRoleStore, useUserStore } from "@/store";

const roleStore = useRoleStore();
const userStore = useUserStore();

const onToggleRole = async (option: Record<string, any>, e: Event) => {
  const isChecked = (e.target as HTMLInputElement).checked;
  if (userStore.selectedUserState.UserInfo.id) {
    if (isChecked) {
      await userStore.AddRoleToUser(userStore.selectedUserState.UserInfo.id, option.roleId);
    } else {
      console.log("Mounted UserRolesCard", option, isChecked);
      await userStore.RemoveRoleFromUser(userStore.selectedUserState.UserInfo.id, option.roleId);
    }
  }
}

onMounted(async () => {
  // await roleStore.GetRolesAndRolePermissions(false);
  // await userStore.GetRolesForSelectedUser(userStore.userState.selectedUser.id);
  // userStore.CreateUserRolesTableRows(roleStore.rolesState.roles);
});
</script>