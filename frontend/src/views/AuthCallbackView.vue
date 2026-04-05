<template>
  <div class="fill">
    <div class="spinner">
      <svg version="1.1" viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20" fill="none" strokeWidth="20" stroke="rgb(255, 155, 51)" strokeLinecap="round"
          strokeDashoffset="0" strokeDasharray="200, 200">
          <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 50 50" to="360 50 50"
            dur="4s" repeatCount="indefinite" />
          <animate attributeName="stroke-dashoffset" values="0;-30;-124" dur="2s" repeatCount="indefinite" />
          <animate attributeName="stroke-dasharray" values="0,200;110,200;110,200" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import ThirdParty from "supertokens-web-js/recipe/thirdparty";

onMounted(async () => {
  try {
    // we try and consume the authorisation code sent by the social login provider.
    // this knows which third party provider has sent the user back because
    // we store that in localstorage when the user clicks on the provider's button
    // on the sign in / up screen
    const response = await ThirdParty.signInAndUp({});
    if (response.status !== "OK") {
      // this means that the third party provider does not have an email associated
      // with this user. In this case, we disallow the sign in and show a message
      // on the login UI
      return window.location.assign("/auth?error=signin");
    }

    // login / signup is successful, and we redirect the user to the home page.
    // Note that session cookies are added automatically and nothing needs to be
    // done here about them.
    window.location.assign("/");
  } catch (_) {
    // we show a something went wrong error in the auth page.
    window.location.assign("/auth?error=signin");
  }
})
</script>