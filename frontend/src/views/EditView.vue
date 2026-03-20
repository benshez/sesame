<template>
  <BaseLayout>
    <FormTwoColumnLayout>
      <template v-slot:form-body-left>
        <div class="flex flex-col items-center">
          <div class="relative profile-pic-upload mb-4">
            <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow">
              <img id="profileImage" :src="userStore?.userInfo?.photoURL!" alt="Profile"
                class="w-full h-full object-cover">
            </div>
            <div
              class="upload-overlay absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 transition-opacity duration-300 cursor-pointer">
              <label for="fileInput" class="text-white cursor-pointer">
                <i class="fas fa-camera text-xl"></i>
              </label>
              <input type="file" id="fileInput" class="hidden" accept="image/*">
            </div>
          </div>
          <h2>
            {{ userStore.userInfo.displayName }}
          </h2>
          <p class="text-sm mb-5">Software Developer</p>
          <button id="changePhotoBtn" class="flex w-full justify-center border p-2 rounded">
            Change Photo
          </button>
        </div>
      </template>

      <template v-slot:form-body-right>
        <FormBodyLayout>
          <template v-slot:header>
            Personal Information
          </template>
          <template v-slot:content></template>
          <template v-slot:footer="elements">
            <div class="mb-6 text-center">
              <div class="mt-6">
                <button type="button" @click="SaveProfile(elements.elements)"
                  class="flex w-full justify-center border p-2 rounded">
                  Save Changes
                </button>
              </div>
            </div>
          </template>
        </FormBodyLayout>
      </template>
    </FormTwoColumnLayout>
  </BaseLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import BaseLayout from "@/layouts/BaseLayout.vue";
import FormBodyLayout from "@/layouts/FormBodyLayout.vue";
import FormTwoColumnLayout from "@/layouts/FormTwoColumnLayout.vue";
import { useUserStore, useFormStore, useDisplayStore } from "@/store";
import type { IElement } from "@/interfaces";

const formStore = useFormStore();
const userStore = useUserStore();
const displayStore = useDisplayStore();

const SaveProfile = async (elements: Array<IElement>) => {
  displayStore.UpdateLoaderShowingState(true);
  let email: string = "";
  let name: string = "";
  let password: string = "";

  elements.forEach((element: IElement) => {
    switch (element.id) {
      case "email":
        email = element.isValid ? element.value : "";
        break;
      case "name":
        name = element.isValid ? element.value : "";
        break;
      case "password":
        password = element.isValid ? element.value : "";
        break;
    }
  })

  //await userStore.UpdateUserProfile({ displayName: name, photoURL: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" });

  displayStore.UpdateLoaderShowingState(false);
}

onMounted(async () => {
  //const user = await userStore.UpdateUserInfo();
  formStore.updateElementState("email", { key: "value", value: userStore.userInfo.email });
  formStore.updateElementState("name", { key: "value", value: userStore.userInfo.displayName });
})

</script>