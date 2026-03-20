import "@/assets/style.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "@/router/";
import { widget } from "@/utilities/index";
import { initSuperTokensWebJS } from "./config";

const pinia = createPinia();

initSuperTokensWebJS();

createApp(App)
  .provide("options", widget.GetWidgetOptions())
  .use(pinia)
  .use(router)
  .mount(`#${widget.GetAppMountId()}`);
