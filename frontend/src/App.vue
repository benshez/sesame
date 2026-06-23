<template>

  <router-view />
</template>
<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";
import { RouterView } from "vue-router";
import { useDisplayStore } from "@/store/display/useDisplayStore";
import { useOnOutsideClick } from "@/plugins";

const displayStore = useDisplayStore();
const outsideClick = useOnOutsideClick();

const OnClickOutside = (e: Event) => {
  const target = e.target as HTMLElement;
  const triggers: Array<string> = ["show-sidebar-trigger"]
  const triggerMethods: Array<Function> = [displayStore.UpdateSidebarShowingState];

  triggers.forEach((trigger: string, index: number) => {
    let show: boolean = target.classList.contains(trigger);

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

onBeforeUnmount(async () => {
  document.removeEventListener("click", OnClickOutside);
});
</script>
