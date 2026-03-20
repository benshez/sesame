import { defineStore, } from "pinia";

export const useDisplayStore = defineStore("auth", {
  state: () => ({
    loaderShowingState: false as boolean,
    sidebarShowingState: false as boolean,
    menuShowingState: false as  boolean,
    profileListShowingState: false as  boolean,
    darkModeState: false as boolean
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
    }
  },
  getters: {
    loaderShowing: (state) => state.loaderShowingState,
    sidebarShowing: (state) => state.sidebarShowingState,
    menuShowing: (state) => state.menuShowingState,
    profileListShowing: (state) => state.profileListShowingState,
    darkMode: (state) => state.darkModeState
  }
})