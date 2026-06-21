<template>
  <router-view />
</template>
<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";
import { RouterView } from "vue-router";
import { useDisplayStore } from "@/store/display/useDisplayStore";
import { useOnOutsideClick } from "@/plugins";
import { Pages } from "@/utilities/formBuilder/Pages";
import { Visibility } from "@/utilities/formBuilder/Visibility";
import { Validation } from "@/utilities/formBuilder/Validation";

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


  const _Page = new Pages(new Visibility(),
    new Validation(),
    "public")
  await _Page.Initialise();


  const Step = _Page.GetElement("email");
  if (Step) {
    const vis = await _Page.HandleIsVisible(Step);
    console.log(vis)

        const val = await _Page.HandleIsValid(Step);
    console.log(val)
  }


})

onBeforeUnmount(async () => {
  document.removeEventListener("click", OnClickOutside);
});
</script>
