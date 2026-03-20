<template>
  <BaseLayout>
    Dashboard
  </BaseLayout>
</template>


<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as Session from "supertokens-web-js/recipe/session";
import { useRouter } from "vue-router";

import CelebrateIcon from "../assets/images/celebrate-icon.svg";
import BaseLayout from "../layouts/BaseLayout.vue";

const router = useRouter();
const userId = ref<string | null>(null);

const apiPort = import.meta.env.VITE_APP_API_PORT || 3001;
const apiUrl = import.meta.env.VITE_APP_API_URL || `http://localhost:${apiPort}`;

async function callAPIClicked() {
  try {
    const response = await fetch(`${apiUrl}/sessioninfo`);
    const data = await response.json();
    window.alert("Session Information:\n" + JSON.stringify(data, null, 2));
  } catch (error) {
    window.alert("Failed to fetch session information:\n" + error);
  }
}

async function logoutClicked() {
  await Session.signOut();
  router.push("/auth");
}

onMounted(async () => {
  if (await Session.doesSessionExist()) {
    userId.value = await Session.getUserId();
  }
});
</script>
