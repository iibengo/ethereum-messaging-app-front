import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import ElIcons from "@element-plus/icons-vue/global";
import store from "./store";

declare global {
  interface Window {
    ethereum: any;
  }
}

createApp(App)
  .use(store)
  .use(ElementPlus)
  .use(ElIcons)
  .use(router)
  .mount("#app");
