<template>
  <Transition enter-from-class="translate-x-[-100%]" enter-active-class="transition-transform duration-300 ease-in-out"
    enter-to-class="translate-x-0" leave-from-class="translate-x-0"
    leave-active-class="transition-transform duration-300 ease-in-out" leave-to-class="translate-x-[-100%]">
    <aside ref="sideBar" v-if="displayStore.sidebarShowing" class="fixed left-0 top-0 h-full w-64 z-50 border-r xl:relative px-5 py-5" @click="OnShowingSidebar">
      <div class="flex justify-start mb-5 text-2xl">{{ configuration.AppTitle }}</div>
      <div class="flex flex-col gap-4 mt-2">
        <h2 class="mb-4 text-xs uppercase flex leading-[20px] justify-start">Menu</h2>
        <ul class="flex flex-col gap-4">
          <li v-for="route in routesList" :key="route.path" class="flex rounded w-full">
            <SVGRouteButton 
              :route-description="`${route.meta.name}`"
              :to-route="`${route.path}`"
              :svg-path-d="`${route.meta.svg}`"
            />
          </li>
        </ul>
      </div>
    </aside>
  </Transition>
</template>
<script setup lang="ts">
import { computed } from "vue";
import SVGRouteButton from "@/components/svg/SVGRouteButton.vue";
import { useDisplayStore } from "@/store";
import { useRouter } from "vue-router";
import { configuration } from "@/utilities";

const displayStore = useDisplayStore();
const router = useRouter();

const routesList = computed(() => {
  return router.getRoutes();
});

const OnShowingSidebar = () => {
  displayStore.UpdateSidebarShowingState(!displayStore.sidebarShowing);
}

</script>