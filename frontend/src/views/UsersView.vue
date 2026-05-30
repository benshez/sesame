<template>

  <BaseLayout>
    <Table :id="'users-table'" :header="'Users'" :load-more-button-visible="nextPaginationToken !== ''"
      :columns="GetTableHeaders()" :rows="GetTableRows()" @toggle="onToggleVerification" @edit-clicked="onEditUser"
      @delete-clicked="onNotifyBeforeDelete" @get-more-clicked="onGetMoreClick" />
  </BaseLayout>
  <Notification :message="'Are you sure you want to delete this user?'" :acceptButtonText="'Yes'"
    :closeButtonText="'No'" @close-button-clicked="onCloseNotification" @accept-button-clicked="onAcceptNotification" />

  <Modal v-if="isUserInfoModal" @close="isUserInfoModal = false">
    <template #body>
      <div class="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white dark:bg-gray-900">
        <FormBody :view="'personalInfo'"
          :css-class="'grid grid-cols-2 gap-4 custom-scrollbar h-[458px] overflow-y-auto p-2'">
          <template v-slot:header>
            <p class="font-semibold">
              Edit User
            </p>
            <button @click="isUserInfoModal = false"
              class="transition-color absolute right-3 top-3 z-999 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:bg-gray-700 dark:bg-white/[0.05] dark:text-gray-400 dark:hover:bg-white/[0.07] dark:hover:text-gray-300">
              <CloseIcon />
            </button>
          </template>
          <template v-slot:content>
            <Tab :tabs="GetTabData()" @onTabChange="onTabChange" />

          </template>
          <template v-slot:footer="elements">
            <div class="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">

            </div>
          </template>
        </FormBody>
      </div>
    </template>
  </Modal>
</template>
<script setup lang="ts">
import { type Component, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDisplayStore } from "@/store";
import Session from "supertokens-web-js/recipe/session";
import BaseLayout from "@/layouts/BaseLayout.vue";
import Toggle from "@/components/elements/Toggle.vue";
import Modal from "@/components/profile/Modal.vue";
import FormBody from "@/components/Form/FormBody.vue";
import Notification from "@/components/notifications/notification.vue";
import CloseIcon from "@/components/svg/CloseIcon.vue";
import ActionButtons from "@/components/buttons/ActionButtons.vue";
import PersonalInfoCard from "@/components/profile/PersonalInfoCard.vue";
import Tab from "@/components/elements/Tab.vue";
import Table from "@/components/elements/Table.vue";
import { ApiClient } from "@/plugins";
import type { IUserInfo, ITableColumn, ITableRow } from "@/interfaces";

const apiClient = new ApiClient();
const displayStore = useDisplayStore();
const users = ref<IUserInfo[]>([]);
const nextPaginationToken = ref<string>("get-tenant-users-next-pagination-token");
const route = useRoute();
const router = useRouter();
const isUserInfoModal = ref<boolean>(false);
const seletedUser = ref<IUserInfo | null>(null);

const GetTableHeaders = (): Array<ITableColumn> => {
  return [
    { id: "userId", caption: "User id", type: String },
    { id: "userEmail", caption: "User email", type: String },
    { id: "verified", caption: "Verified", type: Toggle },
    { id: "action", caption: "Action", type: ActionButtons }
  ]
}

const GetTableRows = (): Array<ITableRow> => {
  const rows: Array<ITableRow> = [];

  users.value.forEach((user: IUserInfo) => {

    const toggleComponent = {
      name: "Toggle",
      props: {
        id: user.id,
        checked: user.loginMethods[0]?.verified
      },
    } as unknown as Component;

    const actionButtonComponent = {
      name: "ActionButtons",

    } as unknown as Component;

    rows.push({
      values: [user.id, user.emails[0], toggleComponent, actionButtonComponent],
      rowData: user,
      props: [{}, {},
      {
        id: user.id,
        checked: user.loginMethods[0]?.verified,
        title: user.loginMethods[0]?.verified ? `Unverify email - ${user.emails[0]}` : `Verify email - ${user.emails[0]}`
      },
      {
        buttons: [
          {
            title: `Edit User - ${user.emails[0]}`,
            type: "edit",
            visible: true
          },
          {
            title: `Delete User - ${user.emails[0]}`,
            type: "delete",
            visible: true
          }
        ]
      }
      ],
    })
  })

  return rows;
}

const GetTabData = (): Array<{ id: string, name: string, selected: boolean, component: Component }> => {
  return [
    { id: "personalInfo", name: "Personal Info", selected: true, component: PersonalInfoCard },
    { id: "sessions", name: "Sessions", selected: false, component: CloseIcon }
  ]
}

const onEditUser = async (user: IUserInfo) => {
  //router.push(`/edit/public/${user.id}`);
  isUserInfoModal.value = true;
  const roles = await apiClient
    .setBearerAuth(await Session.getAccessTokenPayloadSecurely())
    .role()
    .getRoles();
}

const onNotifyBeforeDelete = (user: IUserInfo) => {
  displayStore.UpdateNotificationShowingState(true);
  seletedUser.value = user;
}

const onAcceptNotification = async () => {
  if (seletedUser.value) {
    await onDeleteUser(seletedUser.value);
  }
  displayStore.UpdateNotificationShowingState(false);
}

const onDeleteUser = async (user: IUserInfo) => {
  // const accessToken = await Session.getAccessTokenPayloadSecurely();
  // await apiClient
  //   .setBearerAuth(accessToken)
  //   .users()
  //   .deleteUser(user.id);
  seletedUser.value = null;
  // users.value = [];
  // await onGetUsersForTenant();
}

const onCloseNotification = () => {
  displayStore.UpdateNotificationShowingState(false);
}

const onToggleVerification = async (user: IUserInfo): Promise<void> => {
  const loginMethod = user.loginMethods[0];
  const accessToken = await Session.getAccessTokenPayloadSecurely();

  if (loginMethod.verified) {

    await apiClient
      .setBearerAuth(accessToken)
      .email()
      .unVerifyEmail(
        {
          recipeUserId: loginMethod.recipeUserId.recipeUserId as unknown as string,
          email: user.emails[0]
        });
  } else {

    await apiClient
      .setBearerAuth(accessToken)
      .email()
      .verifyEmail({
        tenantId: route.params.tenantId as string,
        userId: user.id,
        recipeUserId: loginMethod.recipeUserId.recipeUserId as unknown as string
      });
  }
}

const onTabChange = (tabId: string) => {
  console.log("Selected Tab: ", tabId);
}
const onGetMoreClick = async () => {
  onGetUsersForTenant();
}

const onGetUsersForTenant = async () => {
  if (nextPaginationToken.value === "") return;

  const accessToken = await Session.getAccessTokenPayloadSecurely();

  const response: any = await apiClient
    .setBearerAuth(accessToken)
    .tenant()
    .getTenantUsers(nextPaginationToken.value);

  nextPaginationToken.value = (response.nextPaginationToken ? response.nextPaginationToken : "");

  response.users.forEach((user: IUserInfo) => {
    users.value.push(user)
  })
}

onMounted(async () => {
  onGetUsersForTenant();
});
</script>