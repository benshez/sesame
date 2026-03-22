<template>
  <div class="flex h-screen overflow-hidden">
    <Sidebar v-if="displayStore.hasSession" />
    <div class="relative flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
      <Menubar />
      <div class="p-4 md:p-6">

        <slot />
      </div>
    </div>
  </div>
  <footer>
    dfsdfsf
  </footer>
</template>
<script setup lang="ts">

import Menubar from "@/components/menu/Menubar.vue";
import Sidebar from "@/components/sidebar/Sidebar.vue";
import { useDisplayStore } from "@/store";

const displayStore = useDisplayStore();

</script>
