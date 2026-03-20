<template>
  <BaseLayout>
    Home
  </BaseLayout>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as Session from "supertokens-web-js/recipe/session";
import BaseLayout from "@/layouts/BaseLayout.vue";

// Define reactive variables
const doesSessionExist = ref(false);

onMounted(async () => {
  doesSessionExist.value = await Session.doesSessionExist();
});
</script>