<template>
  <router-view />
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RouterView } from "vue-router";
import { useDisplayStore } from "@/store";
import * as Session from "supertokens-web-js/recipe/session";

const displayStore = useDisplayStore();

onMounted(async () => {
  displayStore.UpdateHasSessionState(await Session.doesSessionExist());
});

</script>
