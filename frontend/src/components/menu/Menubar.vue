<template>
  <header class="sticky top-0 z-99999 flex w-full">
    <div class="flex grow flex-col items-center justify-between flex-row xl:px-6 border-b">
      <div
        class="flex w-full items-center justify-between gap-2 border-b px-3 py-3 sm:gap-4 lg:py-4 justify-normal border-b-0 xl:px-0 shadow-none">
        <DisplaySidebarButton />
      </div>
      <div
        class="flex w-full items-center justify-between gap-2 border-b px-3 py-3 sm:gap-4 lg:py-4 justify-normal border-b-0 xl:px-0 shadow-none">
        <div class="w-full items-center justify-between gap-2 flex justify-end">
          <DisplayMenuButton />
          <div class="hidden xl:flex">
            <MenuItems />
          </div>
        </div>
      </div>
    </div>
  </header>
  <Transition enter-from-class="opacity-0 translate-y-[-100%]" enter-active-class="transition-all duration-300 ease-out"
    leave-active-class="transition-all duration-300 ease-in" leave-to-class="opacity-0 translate-y-[-100%]">
    <div id="" v-if="displayStore.menuShowing" class="sticky top-0 z-99999 flex w-full border-b xl:hidden">
      <MenuItems />
    </div>
  </Transition>
</template>
<script setup lang="ts">
import DisplayMenuButton from "@/components/buttons/DisplayMenuButton.vue";
import DisplaySidebarButton from "@/components/buttons/DisplaySidebarButton.vue";
import MenuItems from "@/components/menu/MenuItems.vue";
import { useDisplayStore } from "@/store";

const displayStore = useDisplayStore();

</script>