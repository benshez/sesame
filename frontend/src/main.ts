import "@/assets/style.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "@/router/";
import { widget } from "@/utilities/index";
import SuperTokens from "supertokens-web-js";
import ThirdParty from "supertokens-web-js/recipe/thirdparty";
import EmailPassword from "supertokens-web-js/recipe/emailpassword";
import Session from "supertokens-web-js/recipe/session";
import Multitenancy from "supertokens-web-js/recipe/multitenancy";

const pinia = createPinia();

const apiPort = import.meta.env.VUE_APP_API_PORT || 3001;
export const apiDomain = import.meta.env.VUE_APP_API_URL || `http://localhost:${apiPort}`;

SuperTokens.init({
  appInfo: {
    appName: "Sesame",
    apiDomain,
  },
  recipeList: [EmailPassword.init(), ThirdParty.init(), Session.init(),
  Multitenancy.init({
    override: {
      functions: (oI) => {
        return {
          ...oI,
          getTenantId: async () => {
            const tenantIdInStorage = localStorage.getItem("tenantId");
            return tenantIdInStorage === null ? undefined : tenantIdInStorage;
          },
        };
      },
    },
  })],
});


createApp(App)
  .provide("options", widget.GetWidgetOptions())
  .use(pinia)
  .use(router)
  .mount(`#${widget.GetAppMountId()}`);
