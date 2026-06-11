<template>
  <router-view />
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { useDisplayStore } from "@/store";

const displayStore = useDisplayStore();

onMounted(async () => {
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const isSidebarButton = ["sidebarShowButton", "sidebarIsShownButton"].includes(target.id);

    if (!isSidebarButton && displayStore.displayState.sidebarShowing) {
      displayStore.UpdateSidebarShowingState(!displayStore.displayState.sidebarShowing);
    }

    const isMenuButton = ["menuShowButton", "menuIsShownButton"].includes(target.id);
    const isProfileButton = ["profileShownButton", "profileIsShownButton"].includes(target.id);

    if ((!isMenuButton && !isProfileButton) && displayStore.displayState.menuShowing) {
      displayStore.UpdateMenuShowingState(!displayStore.displayState.menuShowing);

      if (!isProfileButton && displayStore.displayState.profileListShowing) {
        displayStore.UpdateProfileShowingState(false);
      }
    }
  });
})
</script>
