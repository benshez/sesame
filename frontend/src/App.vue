<template>
  <router-view />
</template>
<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";
import { RouterView } from "vue-router";
import { useDisplayStore } from "@/store";
import { useOnOutsideClick } from "@/plugins";

const displayStore = useDisplayStore();
const outsideClick = useOnOutsideClick();

const OnClickOutside = (e: Event) => {
  const target = e.target as HTMLElement;
  const triggers: Array<string> = ["show-menu-trigger", "show-sidebar-trigger", "show-profile-trigger"]
  const triggerMethods: Array<Function> = [displayStore.UpdateMenuShowingState, displayStore.UpdateSidebarShowingState, displayStore.UpdateProfileShowingState];

  triggers.forEach((trigger: string, index: number) => {
    let show: boolean = target.classList.contains(trigger);
    if (trigger === triggers.at(0) && displayStore.displayState.profileListShowing) show = displayStore.displayState.profileListShowing
    outsideClick.OnOutsideClick({
      triggerClass: trigger,
      displayMethod: triggerMethods[index],
      displayMethodParam: show
    }, e)
  })
}

onMounted(async () => {
  document.addEventListener("click", OnClickOutside);
})

onBeforeUnmount(() => {
  document.removeEventListener("click", OnClickOutside);
});
</script>
