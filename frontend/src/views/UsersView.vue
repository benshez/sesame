<template>

  <BaseLayout>
    <Table :id="'users-table'" :header="'Users'"
      :load-more-button-visible="userStore.userState.nextPaginationToken !== ''"
      :columns="userStore.GetUserTableColumns()" :rows="userStore.userState.userTableRows"
      @toggle="onToggleVerification" @edit-clicked="onEditUser" @delete-clicked="onNotifyBeforeDelete"
      @get-more-clicked="onGetMoreClick" />

    <div class="mt-4 md:mt-6">
      <FormBody :view="'roles'" :css-class="'grid grid-cols-2 gap-4 custom-scrollbar overflow-y-auto p-2'">
        <template v-slot:header>
          <p class="mb-2 font-semibold">
            Edit User
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Edit user and user roles.
          </p>
        </template>
        <template v-slot:content>
          <Tab :tabs="userStore.GetTabs()" @onTabChange="onTabChange" />
        </template>
      </FormBody>
    </div>
    <Notification :message="'Are you sure you want to delete this user?'" :acceptButtonText="'Yes'"
      :closeButtonText="'No'" @close-button-clicked="onCloseNotification"
      @accept-button-clicked="onAcceptNotification" />

  </BaseLayout>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDisplayStore } from "@/store/display/useDisplayStore";
import { useUserStore } from "@/store/user/useUserStore";
import { useRoleStore } from "@/store/role/useRoleStore";
import { useFormStore } from "@/store/forms/useFormStore";
import BaseLayout from "@/layouts/BaseLayout.vue";
import FormBody from "@/components/Form/FormBody.vue";
import Notification from "@/components/notifications/notification.vue";
import Tab from "@/components/elements/Tab.vue";
import Table from "@/components/elements/Table.vue";
import type { IUserInfo } from "@/interfaces";

const displayStore = useDisplayStore();
const userStore = useUserStore();
const roleStore = useRoleStore();
const formStore = useFormStore();

const route = useRoute();
const router = useRouter();
const isUserInfoModal = ref<boolean>(false);


const onEditUser = async (user: IUserInfo) => {
  //if (await Session.doesSessionExist()) {
  await userStore.GetUserMetaData(user.id);
  formStore.bind(userStore.userState.UserMetaData);
  userStore.UpdateSelectedUserState(user);
  await roleStore.GetRolesAndRolePermissions(false);
  await userStore.GetRolesForSelectedUser(userStore.selectedUserState.UserInfo.id);
  userStore.CreateUserRolesTableRows(roleStore.rolesState.roles);

  //await userStore.GetRolesForSelectedUser(user.id);
  //}
  //router.push(`/edit/public/${user.id}`);
  //isUserInfoModal.value = true;
  //const roles = await roleStore.GetAllRoles();
}

const onNotifyBeforeDelete = (user: IUserInfo) => {
  displayStore.UpdateNotificationShowingState(true);
  userStore.UpdateSelectedUserState(user);
}

const onAcceptNotification = async () => {
  if (userStore.selectedUserState.UserInfo) {
    await onDeleteUser(userStore.selectedUserState.UserInfo);
  }
  displayStore.UpdateNotificationShowingState(false);
}

const onDeleteUser = async (user: IUserInfo) => {
  await userStore.RemoveUser(user);
}

const onCloseNotification = () => {
  displayStore.UpdateNotificationShowingState(false);
}

const onToggleVerification = async (user: IUserInfo): Promise<void> => {
  await userStore.VerifyOrUnverifyUserEmail(user);
}

const onTabChange = (tabId: string) => {

}
const onGetMoreClick = async () => {
  await userStore.GetUsersForTenant();
}

onMounted(async () => {
  await userStore.GetUsersForTenant();
  userStore.CreateUserTableRows();
});
</script>