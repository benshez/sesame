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
      <div class="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div class="space-y-5">
          <div
            class="rounded-2xl overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div class="max-w-full overflow-x-auto custom-scrollbar">
              <table class="min-w-full">
                <thead>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <th class="px-1 py-2 text-left w-3/11 sm:px-3">
                      <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">User id</p>
                    </th>
                    <th class="px-1 py-2 text-left w-3/11 sm:px-3">
                      <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">User email</p>
                    </th>
                    <th class="px-1 py-2 text-left w-3/11 sm:px-3">
                      <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Verified</p>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr class="border-t border-gray-100 dark:border-gray-800" v-for="(user, userIndex) in users"
                    :key="userIndex">
                    <td class="px-1 py-2 sm:px-3">
                      <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        <router-link :to="`/edit/public/${user.id}`">
                          {{ user.id }}
                        </router-link>
                      </span>
                    </td>
                    <td class="px-1 py-2 sm:px-3">
                      <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {{ user.emails[0] }}
                      </span>
                    </td>
                    <td class="px-1 py-2 sm:px-3">
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" checked class="sr-only peer"
                          v-if="user.loginMethods[0].verified">
                        <input type="checkbox" value="" class="sr-only peer" v-else>
                        <div @click="onToggleVerification(user)"
                          class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-gray-600 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                        </div>
                      </label>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="flex space-x-1" v-if="nextPaginationToken !== ''">
          <button @click="onGetMoreClick"
            class="min-w-9 rounded-md border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white fc-addEventButton-button fc-button fc-button-primary focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-0 mt-2">
            Load more
          </button>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Session from "supertokens-web-js/recipe/session";
import BaseLayout from "@/layouts/BaseLayout.vue";
import { ApiClient } from "@/plugins";
import type { IUserInfo } from "@/interfaces";
import { useUserStore } from "@/store/user/userStore";

const apiClient = new ApiClient();
const users = ref<IUserInfo[]>([]);
const nextPaginationToken = ref<string>("get-tenant-users-next-pagination-token");
const userStore = useUserStore();
const route = useRoute();

const onToggleVerification = async (user: IUserInfo) => {
  if (user.loginMethods[0].verified) {
    const accessToken = await Session.getAccessTokenPayloadSecurely();
    await apiClient
      .setBearerAuth(accessToken)
      .email()
      .unVerifyEmail({ recipeUserId: user.loginMethods[0].recipeUserId.recipeUserId as unknown as string, email: user.emails[0] });
  } else {
    const accessToken = await Session.getAccessTokenPayloadSecurely();
    await apiClient
      .setBearerAuth(accessToken)
      .email()
      .verifyEmail({ tenantId: route.params.tenantId as string, userId: user.id, recipeUserId: user.loginMethods[0].recipeUserId.recipeUserId as unknown as string });
  }
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