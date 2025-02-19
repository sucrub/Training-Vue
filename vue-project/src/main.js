import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "primeicons/primeicons.css";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
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
app.mount("#app");
