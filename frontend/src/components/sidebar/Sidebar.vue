<template>
  <Transition enter-from-class="translate-x-[-100%]" enter-active-class="transition-transform duration-300 ease-in-out"
    enter-to-class="translate-x-0" leave-from-class="translate-x-0"
    leave-active-class="transition-transform duration-300 ease-in-out" leave-to-class="translate-x-[-100%]">
    <aside ref="sideBar" v-if="displayStore.sidebarShowing"
      class="fixed left-0 top-0 h-full w-64 z-50 border-r xl:relative px-5 py-5">
      <div class="flex justify-start mb-5 text-2xl">{{ configuration.AppTitle }}</div>
      <div class="flex flex-col gap-4 mt-2">
        <h2 class="mb-4 text-xs uppercase flex leading-[20px] justify-start">Menu</h2>
        <ul class="flex flex-col gap-4">
          <li v-for="(route, routeIndex) in GetTenantRoutes()" :key="routeIndex">
            <button class="menu-item group w-full menu-item-inactive lg:justify-start" @click="OnTenantRouteClick(route?.name?.toString() ?? '')">
              <span class="menu-item-text">{{ route.meta?.name }}</span>
            </button>
          </li>
          <li v-for="(route, routeIndex) in GetUserRoutes()" :key="routeIndex">
            <button class="menu-item group w-full menu-item-inactive lg:justify-start" @click="OnUserRoutesClick(route?.name?.toString() ?? '')">
              <span class="menu-item-text">{{ route.meta?.name }}</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  </Transition>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import SVGRouteButton from "@/components/svg/SVGRouteButton.vue";
import { useDisplayStore } from "@/store";
import { useRouter } from "vue-router";
import { configuration } from "@/utilities";
import * as Session from "supertokens-web-js/recipe/session";
import { useRoutes } from "@/router/useRoutes";
import { useTenantRoutes } from "@/router/useTenantRoutes";
import { useUserRoutes } from "@/router/useUserRoutes";

const displayStore = useDisplayStore();
const router = useRouter();
const userId = ref<string | null>(null);
const tenantId = ref<string | null>(null);

const routesList = computed(() => {
  return router.getRoutes();
});

const OnShowingSidebar = () => {
  displayStore.UpdateSidebarShowingState(!displayStore.sidebarShowing);
}

const OnTenantRouteClick = (routeName: string) => {
  router.push(`/${routeName}/${tenantId.value}`);
}

const OnUserRoutesClick = (routeName: string) => {
  router.push(`/${routeName}/${tenantId.value}/${userId.value}`);
}

const GetParentMenuItems = () => {
  const routes = useRoutes();
  return routes.GetRoutes().filter(route => route?.meta?.isParentRoute === true);
}

const GetTenantRoutes = () => {
  const routes = useTenantRoutes();
  return routes.GetRoutes().filter(route => route?.meta?.isTenantRoute === true);
}

const GetUserRoutes = () => {
  const routes = useUserRoutes();
  return routes.GetRoutes().filter(route => route?.meta?.isUserRoute === true);
}

onMounted(async () => {
  if (await Session.doesSessionExist()) {
    userId.value = await Session.getUserId();
    tenantId.value = localStorage.getItem("tenantId") ?? "public";
  }
});

</script>