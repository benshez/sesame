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
const apiClient = new ApiClient();

const signOut = async () => {
  await Session.signOut();
  window.location.assign("/auth");
};

const callAPI = async function () {
  const accessToken = await Session.getAccessTokenPayloadSecurely();

  try {
    const response = await apiClient
      .setBearerAuth(accessToken)
      .session()
      .sessionInfo();

    const userId = await Session.getUserId()

    const user = await apiClient
      .setBearerAuth(accessToken)
      .users()
      .userInfo(userId)


    console.log(user)
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