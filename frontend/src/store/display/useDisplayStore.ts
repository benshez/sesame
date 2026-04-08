import { defineStore, } from "pinia";

export const useDisplayStore = defineStore("auth", {
  state: () => ({
    loaderShowingState: false as boolean,
    sidebarShowingState: false as boolean,
    menuShowingState: false as  boolean,
    profileListShowingState: false as  boolean,
    darkModeState: false as boolean,
    hasSessionState: false as boolean,
    authActionTextState: "Sign In" as string
  }),
  actions: {
    UpdateLoaderShowingState(show: boolean) {
      this.$state.loaderShowingState = show;
    },
    UpdateSidebarShowingState(show: boolean) {
      this.$state.sidebarShowingState = show;
    },
    UpdateMenuShowingState(show: boolean) {
      this.$state.menuShowingState = show;
    },
    UpdateProfileShowingState(show: boolean) {
      this.$state.profileListShowingState = show;
    },    
    UpdateDarkModeState(show: boolean) {
      this.$state.darkModeState = show;
    },    
    UpdateHasSessionState(show: boolean) {
      this.$state.hasSessionState = show;
    },
    UpdateActionTextState(text: string) {
      this.$state.authActionTextState = text;
    }  
  },
  getters: {
    loaderShowing: (state) => state.loaderShowingState,
    sidebarShowing: (state) => state.sidebarShowingState,
    menuShowing: (state) => state.menuShowingState,
    profileListShowing: (state) => state.profileListShowingState,
    darkMode: (state) => state.darkModeState,
    hasSession: (state) => state.hasSessionState,
    authActionText: (state) => state.authActionTextState
  }
})