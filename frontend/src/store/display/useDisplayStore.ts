import { ref } from "vue";
import { defineStore, } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useDisplayStore = defineStore("auth", () => {
  const displayState = ref(useLocalStorage("sesame.display.state", {
    loaderShowing: false,
    sidebarShowing: false,
    menuShowing: false,
    profileListShowing: false,
    darkMode: false,
    hasSession: false,
    authActionText: "Sign In",
    canAddMapMarker: false,
    canCalculateMapDistance: false,
    canClearMap: false,
  }));

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
    UpdateCanClearMap
  }
})