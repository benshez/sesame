<template>
  <FormBody :view="'personalInfo'" :css-class="'grid grid-cols-2 gap-4'">
    <template v-slot:header>
      <p class="mb-2 font-semibold">
        Edit Personal Information
      </p>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        Update user datails.
      </p>
    </template>
    <template v-slot:content></template>
    <template v-slot:footer="elements">
      <div class="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div class="flex items-center gap-5 lg:justify-end">
          <button @click="SaveUserMetaData"
            class="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300">
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </template>
  </FormBody>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import FormBody from "@/components/Form/FormBody.vue";
import * as Session from "supertokens-web-js/recipe/session";
import { useUserStore, useFormStore } from "@/store";
import type { IUserMetaData } from "@/interfaces";
import { useObjectHelper } from "@/utilities";

const userStore = useUserStore();
const formStore = useFormStore();
const helper = useObjectHelper();

const SaveUserMetaData = async () => {
  if (!formStore.formState.formIsValid) return;

  if (await Session.doesSessionExist() &&
    userStore.selectedUserState.UserInfo.hasOwnProperty("id")) {
    let user: IUserMetaData = {} as IUserMetaData;

    formStore.formState.elements.forEach((e) => {
      user = helper.SetProperty(user, e.id?.toString() as string, e.value)
    });

    await userStore.SaveUserMetaData(user);
  }
}
onMounted(async () => {
  if (await Session.doesSessionExist() && userStore.selectedUserState.UserInfo.hasOwnProperty("id")) {
    await userStore.GetUserMetaData(userStore.selectedUserState.UserInfo.id);
    formStore.bind(userStore.selectedUserState.UserMetaData);
  }
});
</script>