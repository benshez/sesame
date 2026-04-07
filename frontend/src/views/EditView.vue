<template>
  <BaseLayout>
    <div
      class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] col-span-12 xl:col-span-6 xl:col-start-5 xl:col-end-9">
      <div class="px-6 py-5">
        <slot name="header">
          <h3 class="text-base font-medium text-gray-800 dark:text-white/90">Profile</h3>
        </slot>
      </div>
      <slot name="subheader"></slot>  
      <ProfileCard />
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Session from "supertokens-web-js/recipe/session";
import BaseLayout from "@/layouts/BaseLayout.vue";
import ProfileCard from "@/components/profile/ProfileCard.vue";
import Modal from "@/components/profile/Modal.vue";
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
  //formStore.updateElementState("email", { key: "value", value: userStore.userInfo.email });
  //formStore.updateElementState("name", { key: "value", value: userStore.userInfo.displayName });
})

</script>