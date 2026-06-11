import { ref } from "vue";
import type { RouteRecordRaw } from "vue-router";
import { defineStore, } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import type { IMenuOption } from "@/interfaces";
import { useUserRoutes } from "@/router/useUserRoutes";
import { useTenantRoutes } from "@/router/useTenantRoutes";

export const useDisplayStore = defineStore("auth", () => {
  const displayState = ref(useLocalStorage("sesame.display.state", {
    loaderShowing: false,
    sidebarShowing: false,
    siderMenuItems: {
      userMenuOptions: [] as Array<IMenuOption>,
      tenantMenuOptions: [] as Array<IMenuOption>
    },
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

      return true;
    }

    return true;
  }

  const IsUserRoute = (route: RouteRecordRaw) => {
    return route?.meta?.isUserRoute === true;
  }

  const IsTenantRoute = (route: RouteRecordRaw) => {
    return route?.meta?.isTenantRoute === true;
  }

  const IsRouteVisible = async (route: RouteRecordRaw) => {
    const isVisibleInMenu = await IsVisibleInMenu(route);
    const isUserRoute = IsUserRoute(route);
    const isTenantRoute = IsTenantRoute(route);

    return isVisibleInMenu && (isUserRoute || isTenantRoute);
  }

  const FilterMenuItems = async (routes: Array<RouteRecordRaw>): Promise<Array<IMenuOption>> => {
    const menuOptions: Array<IMenuOption> = [];
    
    for (const route of routes) {
      const isVisible: boolean = await IsRouteVisible(route);
  
      menuOptions.push({
        name: route.meta?.name?.toString() ?? "",
        routeName: route.name?.toString() ?? "",
        isParentRoute: route?.meta?.isParentRoute as boolean ?? false,
        visible: isVisible ? isVisible && (IsUserRoute(route) || IsTenantRoute(route)) : false && (IsUserRoute(route) || IsTenantRoute(route))
      });
    }

    return menuOptions;
  }

  const GetUserRoutes = async () => {
    const routes = useUserRoutes();
    displayState.value.siderMenuItems.userMenuOptions = await FilterMenuItems(routes.GetRoutes());
  }

  const GetTenantRoutes = async () => {
    const routes = useTenantRoutes();
    displayState.value.siderMenuItems.tenantMenuOptions = await FilterMenuItems(routes.GetRoutes());
  }

  const InitializeMenuOptions = async () => {
    await GetUserRoutes();
    await GetTenantRoutes();
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