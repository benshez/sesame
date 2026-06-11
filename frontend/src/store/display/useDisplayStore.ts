import { ref } from "vue";
import type { RouteRecordRaw } from "vue-router";
import { defineStore, } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import type { IMenuOption } from "@/interfaces";
import { useUserRoutes } from "@/router/useUserRoutes";
import { useTenantRoutes } from "@/router/useTenantRoutes";
import { useRoutes } from "@/router/useRoutes";

export const useDisplayStore = defineStore("auth", () => {
  const displayState = ref(useLocalStorage("sesame.display.state", {
    loaderShowing: false,
    sidebarShowing: false,
    siderbarMenuItems: [] as Array<IMenuOption>,
    menuShowing: false,
    profileListShowing: false,
    darkMode: false,
    hasSession: false,
    authActionText: "Sign In",
    canAddMapMarker: false,
    canCalculateMapDistance: false,
    canClearMap: false,
    notificationShowing: false,
  }));

  const IsVisibleInMenu = async (route: RouteRecordRaw) => {
    if (route?.meta?.hasOwnProperty("isVisibleInMenu")) {
      if (typeof route.meta.isVisibleInMenu === "function") {
        return await route.meta.isVisibleInMenu();
      }

      return route.meta.isVisibleInMenu as boolean;
    }

    return true;
  }

  const IsRouteVisible = async (route: RouteRecordRaw) => {
    return await IsVisibleInMenu(route);
  }

  const FilterMenuItems = async () => {
    const menuOptions: Array<IMenuOption> = [];

    for (const route of useRoutes().GetRoutes() as Array<RouteRecordRaw>) {
      if (route.children?.length ?? 0 > 0) {
        menuOptions.push({
          description: route.meta?.name?.toString() ?? "",
          routeName: route.name?.toString() ?? "",
          isParentRoute: true,
          visible: true
        });

        for (const childRoute of route.children as Array<RouteRecordRaw>) {
          const isVisible: boolean = await IsRouteVisible(childRoute);

          if (isVisible) {
            menuOptions.push({
              description: childRoute.meta?.name?.toString() ?? "",
              routeName: childRoute.name?.toString() ?? "",
              isParentRoute: childRoute?.meta?.isParentRoute as boolean ?? false,
              visible: isVisible
            });
          }
        }
      }
    }

    displayState.value.siderbarMenuItems = menuOptions;
  }

  const InitializeMenuOptions = async () => {
    await FilterMenuItems();
  }

  const UpdateLoaderShowingState = (show: boolean) => {
    displayState.value.loaderShowing = show;
  };
  const UpdateSidebarShowingState = (show: boolean) => {
    displayState.value.sidebarShowing = show;
  };
  const UpdateMenuShowingState = (show: boolean) => {
    displayState.value.menuShowing = show;
  };
  const UpdateProfileShowingState = (show: boolean) => {
    displayState.value.profileListShowing = show;
  };
  const UpdateDarkModeState = (show: boolean) => {
    displayState.value.darkMode = show;
  };
  const UpdateHasSessionState = (show: boolean) => {
    displayState.value.hasSession = show;
  };
  const UpdateCanAddMapMarkerState = (show: boolean) => {
    displayState.value.canAddMapMarker = show;
  };
  const UpdateCanCalculateMapDistanceState = (show: boolean) => {
    displayState.value.canCalculateMapDistance = show;
  };
  const UpdateCanClearMap = (show: boolean) => {
    displayState.value.canClearMap = show;
  };
  const UpdateNotificationShowingState = (show: boolean) => {
    displayState.value.notificationShowing = show;
  };
  const UpdateActionTextState = (text: string) => {
    displayState.value.authActionText = text;
  };

  return {
    displayState,
    UpdateLoaderShowingState,
    UpdateSidebarShowingState,
    UpdateMenuShowingState,
    UpdateProfileShowingState,
    UpdateDarkModeState,
    UpdateHasSessionState,
    UpdateActionTextState,
    UpdateCanAddMapMarkerState,
    UpdateCanCalculateMapDistanceState,
    UpdateCanClearMap,
    UpdateNotificationShowingState,
    InitializeMenuOptions
  }
})