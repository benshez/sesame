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
      <Suspense>
      <ProfileCard />
      </Suspense>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import BaseLayout from "@/layouts/BaseLayout.vue";
import ProfileCard from "@/components/profile/ProfileCard.vue";
import { useUserStore } from "@/store";

const userStore = useUserStore();

onBeforeMount(async () => {
  await userStore.GetUserMetaData();
});
</script>