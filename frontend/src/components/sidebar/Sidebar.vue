<template>
  <Transition enter-from-class="translate-x-[-100%]" enter-active-class="transition-transform duration-300 ease-in-out"
    enter-to-class="translate-x-0" leave-from-class="translate-x-0"
    leave-active-class="transition-transform duration-300 ease-in-out" leave-to-class="translate-x-[-100%]">
    <aside ref="sideBar" v-if="displayStore.displayState.sidebarShowing"
      class="fixed left-0 top-0 h-full w-64 z-50 border-r xl:relative px-5 py-5">
      <div class="flex justify-start mb-5 text-xl">{{ configuration.AppTitle }}</div>
      <div class="flex flex-col gap-4 mt-2">
        <h2 class="mb-4 text-xs uppercase flex leading-[20px] justify-start">Menu</h2>
        <ul class="flex flex-col gap-4">
          <li v-for="(route, routeIndex) in tenantMenuOptions" :key="routeIndex">
            <button @click="OnTenantRouteClick(route?.name?.toString() ?? '')"
              :class="{ 'menu-item group w-full menu-item-inactive lg:justify-start': true, 'menu-item group w-full lg:justify-start menu-dropdown-item-active': route?.name?.toString() === activeItem }">
              <span class="menu-item-text">{{ route.name }}</span>
            </button>
          </li>
          <li v-for="(route, routeIndex) in userMenuOptions" :key="routeIndex" v-show="route.visible">
            <button @click="OnUserRoutesClick(route?.name?.toString() ?? '')"
              :class="{ 'menu-item group w-full menu-item-inactive lg:justify-start': true, 'menu-item group w-full lg:justify-start menu-dropdown-item-active': route?.name?.toString() === activeItem }">
              <span class="menu-item-text">{{ route?.name }}</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  </Transition>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useDisplayStore } from "@/store";
import { useRouter, useRoute } from "vue-router";
import { configuration } from "@/utilities";
import * as Session from "supertokens-web-js/recipe/session";
import { useRoutes } from "@/router/useRoutes";
import { useTenantRoutes } from "@/router/useTenantRoutes";
import { useUserRoutes } from "@/router/useUserRoutes";

interface IMenuOption {
  name: string;
  routeName: string;
  visible: boolean;
}

const displayStore = useDisplayStore();
const router = useRouter();
const route = useRoute();
const userId = ref<string | null>(null);
const tenantId = ref<string | null>(null);
const activeItem = ref<string>(route.name?.toString() ?? "");
const userMenuOptions = ref<Array<IMenuOption>>([]);
const tenantMenuOptions = ref<Array<IMenuOption>>([]);


const OnTenantRouteClick = (routeName: string) => {
  router.push(`/${routeName}/${tenantId.value}`);
  activeItem.value = routeName;
}

const OnUserRoutesClick = (routeName: string) => {
  router.push(`/${routeName}/${tenantId.value}/${userId.value}`);
  activeItem.value = routeName;
}

const GetParentMenuItems = () => {
  const routes = useRoutes();
  return routes.GetRoutes().filter(route => route?.meta?.isParentRoute === true);
}




const IsVisibleInMenu = async (route: any) => {
  if (route?.meta?.hasOwnProperty("isVisibleInMenu")) {
    return await route.meta.isVisibleInMenu();
  }
  return true;
}

const GetUserRoutes = () => {
  const routes = useUserRoutes();

  routes.GetRoutes().forEach(route => {
    if (route?.meta?.hasOwnProperty("isVisibleInMenu") && typeof route.meta.isVisibleInMenu === "function") {
      route.meta.isVisibleInMenu().then((isVisible: boolean) => {
        if (isVisible) {
          userMenuOptions.value.push({
            name: route.meta?.name?.toString() ?? "",
            routeName: route.name?.toString() ?? "",
            visible: isVisible && route?.meta?.isUserRoute === true
          });
        }
      });
    } else {
      userMenuOptions.value.push({
        name: route.meta?.name?.toString() ?? "",
        routeName: route.name?.toString() ?? "",
        visible: true && route?.meta?.isUserRoute === true
      });
    }
  });
}

const GetTenantRoutes = () => {
  const routes = useTenantRoutes();

  routes.GetRoutes().forEach(route => {
    if (route?.meta?.hasOwnProperty("isVisibleInMenu") && typeof route.meta.isVisibleInMenu === "function") {
      route.meta.isVisibleInMenu().then((isVisible: boolean) => {
        if (isVisible) {
          tenantMenuOptions.value.push({
            name: route.meta?.name?.toString() ?? "",
            routeName: route.name?.toString() ?? "",
            visible: isVisible && route?.meta?.isTenantRoute === true
          });
        }
      });
    } else {
      tenantMenuOptions.value.push({
        name: route.meta?.name?.toString() ?? "",
        routeName: route.name?.toString() ?? "",
        visible: true && route?.meta?.isTenantRoute === true
      });
    }
  });
}

onMounted(async () => {
  if (await Session.doesSessionExist()) {
    userId.value = await Session.getUserId();
    tenantId.value = localStorage.getItem("tenantId") ?? "public";
  }
  GetUserRoutes();
  GetTenantRoutes();
});

</script>