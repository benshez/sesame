<template>

  <div class="flex h-screen overflow-hidden">
    <Sidebar />
    <div class="relative flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
      <Menubar />
      <div class="p-4 md:p-6">

        <slot />
      </div>
    </div>
  </div>


  <footer>

  </footer>

</template>
<script setup lang="ts">
import { useDisplayStore } from "@/store";
import Menubar from "@/components/menu/Menubar.vue";
import Sidebar from "@/components/sidebar/Sidebar.vue";
</script>
