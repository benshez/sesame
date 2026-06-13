<template>
  <Transition enter-from-class="translate-x-[-100%]" enter-active-class="transition-transform duration-300 ease-in-out"
    enter-to-class="translate-x-0" leave-from-class="translate-x-0"
    leave-active-class="transition-transform duration-300 ease-in-out" leave-to-class="translate-x-[-100%]">
    <aside ref="sideBar" v-if="displayStore.displayState.sidebarShowing"
      class="show-sidebar-trigger fixed left-0 top-0 h-full w-64 z-50 border-r xl:relative px-5 py-5">
      <div class="flex justify-start mb-5 text-xl">{{ configuration.AppTitle }}</div>
      <div class="flex flex-col gap-4 mt-2">
        <h2 class="mb-4 text-xs uppercase flex leading-[20px] justify-start">Menu</h2>
        <ul class="flex flex-col gap-4">
          <li v-for="(route, routeIndex) in displayStore.displayState.siderbarMenuItems" :key="routeIndex">
            <button v-if="!route.isParentRoute" @click="OnRouteClick(route)"
              :class="{ 'menu-item group w-full menu-item-inactive lg:justify-start show-sidebar-trigger': true, 'menu-item group w-full lg:justify-start menu-dropdown-item-active show-sidebar-trigger': route?.routeName?.toString() === activeItem }">
              <span class="menu-item-text show-sidebar-trigger">{{ route.description }}</span>
            </button>
            <span v-else class="menu-item group w-full menu-item-inactive lg:justify-start cursor-default show-sidebar-trigger">
              <span class="menu-item-text show-sidebar-trigger">{{ route?.description }}</span>
            </span>
          </li>
        </ul>
      </div>
    </aside>
  </Transition>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, useTemplateRef } from "vue";
import { useDisplayStore } from "@/store";
import { useRouter, useRoute } from "vue-router";
import { configuration } from "@/utilities";
import * as Session from "supertokens-web-js/recipe/session";
import type { IMenuOption } from "@/interfaces";

const displayStore = useDisplayStore();
const router = useRouter();
const route = useRoute();
const userId = ref<string | null>(null);
const tenantId = ref<string | null>(null);
const activeItem = ref<string>(route.name?.toString() ?? "");
const target = useTemplateRef("sideBar");


const OnRouteClick = (menuItem: IMenuOption) => {
  router.getRoutes().forEach(route => {
    if (route.name === menuItem.routeName) {
      let toRoute = route.path;
      activeItem.value = route.name;

      if (toRoute.includes(":tenantId")) {
        toRoute = toRoute.replace(":tenantId", tenantId.value as string)
      }

      if (route.path.includes(":userId")) {
        toRoute = toRoute.replace(":userId", userId.value as string)
      }

      router.push(toRoute);
    }
  })
}

const OnClickOutside = (e: Event) => {
  const sender = e.target as HTMLElement;
  e.preventDefault()
  e.stopPropagation()
  if(!target || !target.value) {
    displayStore.UpdateSidebarShowingState(false);
  }

}

onMounted(async () => {
  //document.addEventListener("click", OnClickOutside);

  if (await Session.doesSessionExist()) {
    userId.value = await Session.getUserId();
    tenantId.value = localStorage.getItem("tenantId") ?? "public";
  }
  //GetUserRoutes();
  //GetTenantRoutes();
  await displayStore.InitializeMenuOptions();
});

onBeforeUnmount(() => {
  //document.removeEventListener("click", OnClickOutside);
});
</script>