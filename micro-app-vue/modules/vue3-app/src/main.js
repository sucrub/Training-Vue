import { h, createApp } from "vue";
import singleSpaVue from "single-spa-vue";
import App from "./App.vue";
import router from "./router.js";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "primeicons/primeicons.css";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Card from "primevue/card";
import Column from "primevue/column";
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App);
    },
    router,
  },
  handleInstance(app) {
    app.use(router);
    app.use(pinia);
    app.use(ConfirmationService);
    app.use(ToastService);
    app.use(PrimeVue, {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: "none",
        },
      },
    });
    app.component("Button", Button); // eslint-disable-line vue/multi-word-component-names
    app.component("DataTable", DataTable);
    app.component("Card", Card); // eslint-disable-line vue/multi-word-component-names
    app.component("Column", Column); // eslint-disable-line vue/multi-word-component-names
    app.component("ConfirmDialog", ConfirmDialog);
    app.component("Toast", Toast); // eslint-disable-line vue/multi-word-component-names
  },
  domElementGetter: () => document.getElementById("app"),
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
