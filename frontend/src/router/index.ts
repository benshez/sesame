import { createRouter, createWebHistory } from "vue-router";
import { useDisplayStore } from "@/store"
import HomeView from "../views/HomeView.vue";
import Session from "supertokens-web-js/recipe/session";
import { configuration } from "@/utilities";
import { useRoutes } from "@/router/useRoutes";

const title = configuration.AppTitle;
const routes = useRoutes();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes.GetRoutes()
});

const DEFAULT_TITLE = "";

router.beforeEach((to, from) => {
  document.title = to.meta.title as string || DEFAULT_TITLE;
  const displayStore = useDisplayStore();
  displayStore.UpdateLoaderShowingState(true);
  setTimeout(() => { }, 150)
})

router.afterEach((to, from) => {
  const displayStore = useDisplayStore();
  setTimeout(() => {
    displayStore.UpdateLoaderShowingState(false);
  }, 150)
})

export default router;
