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
                    <th class="px-5 py-3 text-left w-3/11 sm:px-6">
                      <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">User id</p>
                    </th>
                    <th class="px-5 py-3 text-left w-3/11 sm:px-6">
                      <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">User email</p>
                    </th>
                    <th class="px-5 py-3 text-left w-3/11 sm:px-6">
                      <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Verified</p>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr class="border-t border-gray-100 dark:border-gray-800" v-for="(user, userIndex) in users"
                    :key="userIndex">
                    <td class="px-5 py-4 sm:px-6">
                      <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        <router-link :to="`/edit/public/${ user.id }`">
                          {{ user.id }}
                        </router-link>
                      </span>
                    </td>
                    <td class="px-5 py-4 sm:px-6">
                      <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {{ user.emails[0] }}
                      </span>
                    </td>
                    <td class="px-5 py-4 sm:px-6">
                      <span v-if="user.loginMethods[0].verified" class="rounded-full px-2 py-0.5 text-theme-xs font-medium bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500">
                        {{ user.loginMethods[0].verified }}
                      </span>
                      <span v-else class="rounded-full px-2 py-0.5 text-theme-xs font-medium bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-500">
                        {{ user.loginMethods[0].verified }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import Session from "supertokens-web-js/recipe/session";
import BaseLayout from "@/layouts/BaseLayout.vue";
import { ApiClient } from "@/plugins";
import type { IUserInfo } from "@/interfaces";

const apiClient = new ApiClient();
const users = ref<IUserInfo[]>([]);

onMounted(async () => {
  const accessToken = await Session.getAccessTokenPayloadSecurely();

  const response: any = await apiClient
    .setBearerAuth(accessToken)
    .tenant()
    .getTenantUsers()

  response.users.forEach((user: IUserInfo) => {
    users.value.push(user)
  })


});
</script>