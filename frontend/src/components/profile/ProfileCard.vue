<template>
  <div>
    <div class="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
      <div class="space-y-5">
        <div class="space-y-6">
          <div>
            <slot name="content">
              <div class="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div class="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                  <div class="flex flex-col items-center w-full gap-6 xl:flex-row">
                    <div
                      class="relative w-20 h-20 overflow-hidden bg-neutral-secondary-medium border border-gray-200 rounded-full dark:border-gray-800">
                      <ProfileIcon />
                    </div>
                    <div class="order-3 xl:order-2">
                      <h4 class="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                        {{ userStore.UserMetaDataState?.displayName }}
                      </h4>
                      <div class="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                        <p class="text-sm text-gray-500 dark:text-gray-400">{{ userStore.UserMetaDataState?.position }}</p>
                        <div class="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block">
                        </div>
                        <p class="text-sm text-gray-500 dark:text-gray-400">{{ userStore.UserMetaDataState?.address?.city }}, {{
                          userStore.UserMetaDataState?.address?.state }}</p>
                      </div>
                    </div>
                    <div class="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end">
                      <SocialIcons />
                    </div>
                  </div>
                  <button class="edit-button" @click="ShowModal">
                    <EditIcon/>
                    Edit
                  </button>
                </div>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
    <Modal v-if="isProfileInfoModal" @close="isProfileInfoModal = false">
      <template #body>
        <div class="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white dark:bg-gray-900">
          <FormBody :view="'profile'" :css-class="'grid grid-cols-2 gap-4'">
            <template v-slot:header>
              <p class="mb-2 font-semibold">
                Edit Personal Information
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Update your details to keep your profile up-to-date.
              </p>
              <button @click="isProfileInfoModal = false"
                class="transition-color absolute right-5 top-3 z-999 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:bg-gray-700 dark:bg-white/[0.05] dark:text-gray-400 dark:hover:bg-white/[0.07] dark:hover:text-gray-300">
                <CloseIcon />
              </button>
            </template>
            <template v-slot:content></template>
            <template v-slot:footer="elements">
              <div class="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
                <div class="flex items-center gap-5 lg:justify-end">
                  <button @click="SaveProfile"
                    class="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300">
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </template>
          </FormBody>
        </div>
      </template>
    </Modal>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import * as Session from "supertokens-web-js/recipe/session";
import Modal from "@/components/profile/Modal.vue";
import FormBody from "@/components/Form/FormBody.vue";
import { useUserStore, useFormStore } from "@/store";
import ProfileIcon from "@/components/svg/ProfileIcon.vue";
import SocialIcons from "@/components/svg/SocialIcons.vue"
import EditIcon from "@/components/svg/EditIcon.vue";
import CloseIcon from "@/components/svg/CloseIcon.vue";

const userStore = useUserStore();
const formStore = useFormStore();
const isProfileInfoModal = ref<boolean>(false);

const SaveProfile = async () => {
  if (await Session.doesSessionExist()) {
    //await userStore.SaveUserMetaData();
  }

  isProfileInfoModal.value = false;
}

const ShowModal = async () => {
  isProfileInfoModal.value = true;

  if (await Session.doesSessionExist()) {
    const userInfo = await userStore.GetUserInfo();

    formStore.updateElementState("newemail", { key: "value", value: userInfo.emails.at(0) });
    formStore.updateElementState("email", { key: "value", value: userInfo.emails.at(0) });
  }
}
</script>