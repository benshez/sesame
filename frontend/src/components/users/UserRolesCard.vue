<template>
  <Table :id="'roles-table'" :header="'Roles'" :columns="userStore.CreateUserRolesTableColumns()"
    :rows="userStore.userState.userRolesTableRows" @toggle="onToggleRole" />
</template>
<script setup lang="ts">
import { onMounted, provide } from "vue";
import Table from "@/components/elements/Table.vue";
import { useRoleStore, useUserStore } from "@/store";

const roleStore = useRoleStore();
const userStore = useUserStore();

const onItemToggled = async (option: string, e: Event) => {
  const isChecked = (e.target as HTMLInputElement).checked;
  if (isChecked) {
    //await useUserStore.AddUserToRole({ userId: userStore.userState.selectedUser.id, roleId: option });
  } else {
    //await roleStore.RemoveUserFromRole({ userId: userStore.userState.selectedUser.id, roleId: option });
  }
}

const onToggleRole = async (option: Record<string, any>, e: Event) => {
  const isChecked = (e.target as HTMLInputElement).checked;
  if (userStore.userState.selectedUser.id) {
    if (isChecked) {
      await userStore.AddRoleToUser(userStore.userState.selectedUser.id, option.roleId);
    } else {
      console.log("Mounted UserRolesCard", option, isChecked);
      //await roleStore.RemoveUserFromRole({ userId: userStore.userState.selectedUser.id, roleId: option });
    }
  }
}
//provide("onItemToggled", onItemToggled);


onMounted(async () => {
  // await roleStore.GetRolesAndRolePermissions(false);
  // await userStore.GetRolesForSelectedUser(userStore.userState.selectedUser.id);
  // userStore.CreateUserRolesTableRows(roleStore.rolesState.roles);
});
</script>