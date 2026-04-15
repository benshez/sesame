<template>
  <div>
    <div class="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
      <slot name="content">
        <div class="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
          <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h4 class="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">Person Information</h4>
              <div class="grid grid-cols-1 gap-0 lg:grid-cols-3 lg:gap-4 2xl:gap-x-32">
                <div v-for="(summary, summaryIndex) in formData" :key="summaryIndex">
                  <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">{{ summary.key }}
                  </p>
                  <p class="text-sm font-medium text-gray-800 dark:text-white/90">{{ summary.value }}</p>
                </div>
              </div>
            </div>
            <button class="edit-button" @click="ShowPersonalInfoModal">
              <EditIcon />
              Edit
            </button>
          </div>
        </div>
      </slot>
    </div>
    <Modal v-if="isPersonalInfofoModal" @close="isPersonalInfofoModal = false">
      <template #body>
        <div class="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white dark:bg-gray-900">
          <FormBody :view="'personalInfo'"
            :css-class="'grid grid-cols-2 gap-4 custom-scrollbar h-[458px] overflow-y-auto p-2'">
            <template v-slot:header>
              <p class="mb-2 font-semibold">
                Edit Personal Information
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Update your details to keep your personal information up-to-date.
              </p>
              <button @click="isPersonalInfofoModal = false"
                class="transition-color absolute right-5 top-3 z-999 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:bg-gray-700 dark:bg-white/[0.05] dark:text-gray-400 dark:hover:bg-white/[0.07] dark:hover:text-gray-300">
                <CloseIcon />
              </button>
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
        </div>
      </template>
    </Modal>
  </div>
</template>
<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import * as Session from "supertokens-web-js/recipe/session";
import Modal from "@/components/profile/Modal.vue";
import FormBody from "@/components/Form/FormBody.vue";
import { useUserStore, useFormStore } from "@/store";
import type { IUserMetaData } from "@/interfaces";
import { useObjectHelper } from "@/utilities";
import EditIcon from "@/components/svg/EditIcon.vue";
import CloseIcon from "@/components/svg/CloseIcon.vue";

interface IFormData {
  key: string,
  value: string,
  description: string;
}
const userStore = useUserStore();
const formStore = useFormStore();
const isPersonalInfofoModal = ref<boolean>(false);
const formData = ref<Array<IFormData>>([]);
const helper = useObjectHelper();
let userInfo = ref<IUserMetaData>({} as IUserMetaData);


const SetProperty = <T>(obj: T, path: string, value: any): T => {
  const [head, ...rest] = path.split(".");
  return {
    ...obj,
    [head]: rest.length
      ? SetProperty(obj[head as keyof T], rest.join("."), value)
      : value
  };
};

const SaveUserMetaData = async () => {
  if (await Session.doesSessionExist()) {
    let user: IUserMetaData = {} as IUserMetaData;

    formStore.elementsState.forEach((e) => {
      user = helper.SetProperty(user, e.id?.toString() as string, e.value)
    });

    await userStore.SaveUserMetaData(user);
    await CreateSummary();
  }

  isPersonalInfofoModal.value = false;
}

const CreateSummary = async () => {
  userInfo.value = await userStore.GetUserMetaData();
  const user = helper.Flatten(userInfo.value, {});
  formData.value = helper.ToArray<IFormData>(user);
}

const ShowPersonalInfoModal = async () => {
  isPersonalInfofoModal.value = true;

  if (await Session.doesSessionExist()) {
    if (!userInfo.value) userInfo.value = await userStore.GetUserMetaData();
    formStore.bind(userInfo.value);
  }
}

onBeforeMount(async () => {
  await CreateSummary();
})

</script>