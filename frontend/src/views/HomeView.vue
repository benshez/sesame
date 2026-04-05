<template>
  <BaseLayout>
    <div v-if="doesSessionExist">
      Your user ID is <br />
      {{ `${userId}` }}
    </div>
    Home
  </BaseLayout>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import Session from "supertokens-web-js/recipe/session";
import BaseLayout from "@/layouts/BaseLayout.vue";

// Define reactive variables
const doesSessionExist = ref<boolean | false>(false);
const userId = ref<string | null>(null);
const apiPort = import.meta.env.VUE_APP_API_PORT || 3001;
const apiDomain = import.meta.env.VUE_APP_API_URL || `http://localhost:${apiPort}`;


const signOut = async () => {
  await Session.signOut();
  window.location.assign("/auth");
};

const callAPI = async function () {
  const response = await fetch(`${apiDomain}/sessioninfo`);

  if (response.status === 401) {
    // this means that the session has expired and the
    // user needs to relogin.
    window.location.assign("/auth");
    return;
  }

  const json = await response.json();

  window.alert("Session Information:\n" + JSON.stringify(json, null, 2));
};

const checkForSession = async function () {
  if (!(await Session.doesSessionExist())) {
    // since a session does not exist, we send the user to the login page.
    return window.location.assign("/auth");
  }

  // this will render the UI
  doesSessionExist.value = true;
  userId.value = await Session.getUserId();
};

onMounted(async () => {
  await checkForSession();
});
</script>