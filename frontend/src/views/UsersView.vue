<template>
  <BaseLayout>
    <div
      class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] col-span-12 xl:col-span-6 xl:col-start-5 xl:col-end-9">
      <div class="px-6 py-5">
        <slot name="header">
          <h3 class="text-base font-medium text-gray-800 dark:text-white/90">Users</h3>
        </slot>
      </div>
      <slot name="subheader"></slot>

      <Table :id="'users-table'" :columns="GetTableHeaders()" :rows="GetTableRows()" @toggle="onToggleVerification"
        @onEditRowClicked="ShowModal" />

      <div class="flex space-x-1" v-if="nextPaginationToken !== ''">
        <button @click="onGetMoreClick"
          class="min-w-9 rounded-md border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white fc-addEventButton-button fc-button fc-button-primary focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-0 mt-2">
          Load more
        </button>
      </div>
    </div>

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
              <Tab :tabs="[
                { id: 'personalInfo', name: 'Personal Info', selected: true, component: PersonalInfoCard },
                { id: 'sessions', name: 'Sessions', selected: false, component: CloseIcon }
              ]" @onTabChange="onTabChange" />

            </template>
            <template v-slot:footer="elements">
              <div class="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">

              </div>
            </template>
          </FormBody>
        </div>
      </template>
    </Modal>
  </BaseLayout>

</template>
<script setup lang="ts">
import { type Component, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Session from "supertokens-web-js/recipe/session";
import BaseLayout from "@/layouts/BaseLayout.vue";
import Toggle from "@/components/elements/Toggle.vue";
import Modal from "@/components/profile/Modal.vue";
import FormBody from "@/components/Form/FormBody.vue";
import CloseIcon from "@/components/svg/CloseIcon.vue";
import PersonalInfoCard from "@/components/profile/PersonalInfoCard.vue";
import Tab from "@/components/elements/Tab.vue";
import Table from "@/components/elements/Table.vue";
import { ApiClient } from "@/plugins";
import type { IUserInfo, ITableColumn, ITableRow, ITableRowElement } from "@/interfaces";

const apiClient = new ApiClient();
const users = ref<IUserInfo[]>([]);
const nextPaginationToken = ref<string>("get-tenant-users-next-pagination-token");
const route = useRoute();
const isUserInfoModal = ref<boolean>(false);

const GetTableHeaders = (): Array<ITableColumn> => {
  return [
    { id: "userId", caption: "User id", type: String },
    { id: "userEmail", caption: "User email", type: String },
    { id: "verified", caption: "Verified", type: Toggle },
    { id: "action", caption: "Action", type: { tag: "button", html: "<div>Edit</div>" } as unknown as ITableRowElement }
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

    const actionButtonComponent: ITableRowElement = {
      tag: "button",
      html: `
        <svg class="fill-current" width="21" height="21" viewBox="0 0 21 21" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M17.0911 3.53206C16.2124 2.65338 14.7878 2.65338 13.9091 3.53206L5.6074 11.8337C5.29899 12.1421 5.08687 12.5335 4.99684 12.9603L4.26177 16.445C4.20943 16.6931 4.286 16.9508 4.46529 17.1301C4.64458 17.3094 4.90232 17.3859 5.15042 17.3336L8.63507 16.5985C9.06184 16.5085 9.45324 16.2964 9.76165 15.988L18.0633 7.68631C18.942 6.80763 18.942 5.38301 18.0633 4.50433L17.0911 3.53206ZM14.9697 4.59272C15.2626 4.29982 15.7375 4.29982 16.0304 4.59272L17.0027 5.56499C17.2956 5.85788 17.2956 6.33276 17.0027 6.62565L16.1043 7.52402L14.0714 5.49109L14.9697 4.59272ZM13.0107 6.55175L6.66806 12.8944C6.56526 12.9972 6.49455 13.1277 6.46454 13.2699L5.96704 15.6283L8.32547 15.1308C8.46772 15.1008 8.59819 15.0301 8.70099 14.9273L15.0436 8.58468L13.0107 6.55175Z"
          fill="">
        </path>
      </svg>
    `}

    rows.push({
      values: [user.id, user.emails[0], toggleComponent, actionButtonComponent],
      rowData: user,
      props: [{}, {},
      {
        id: user.id,
        checked: user.loginMethods[0]?.verified
      },
      {
        class: "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
      }],
    })
  })

  return rows;
}
const ShowModal = async (user: IUserInfo) => {
  isUserInfoModal.value = true;
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