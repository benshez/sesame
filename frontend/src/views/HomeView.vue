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
import { ApiClient } from "@/plugins";

// Define reactive variables
const doesSessionExist = ref<boolean | false>(false);
const userId = ref<string | null>(null);
const apiPort = import.meta.env.VUE_APP_API_PORT || 3001;
const apiDomain = import.meta.env.VUE_APP_API_URL || `http://localhost:${apiPort}`;
const apiClient = new ApiClient(apiDomain);

const signOut = async () => {
  await Session.signOut();
  window.location.assign("/auth");
};

const callAPI = async function () {
  const accessToken = await Session.getAccessTokenPayloadSecurely();
  let err: any = "";

  try {
    const response = await apiClient
      .setBearerAuth(accessToken)
      .session()
      .sessionInfo();

    if (response.status === 401) {
      window.location.assign("/auth");
      return;
    }
  } catch (error) {
  }
};

const checkForSession = async function () {
  if (!(await Session.doesSessionExist())) {
    // since a session does not exist, we send the user to the login page.
    return window.location.assign("/auth");
  }
  await callAPI()
  // this will render the UI
  doesSessionExist.value = true;
  userId.value = await Session.getUserId();
};

onMounted(async () => {
  await checkForSession();
});
</script>