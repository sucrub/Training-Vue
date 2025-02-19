import { defineStore } from "pinia";
import { useToast } from "primevue/usetoast";

export const useAlertStore = defineStore("alert", () => {
  const toast = useToast();

  const success = (title, message) => {
    toast.add({
      severity: "success",
      summary: title,
      detail: message,
      life: 3000,
    });
  };

  const info = (title, message) => {
    toast.add({
      severity: "info",
      summary: title,
      detail: message,
      life: 3000,
    });
  };

  const warn = (title, message) => {
    toast.add({
      severity: "warn",
      summary: title,
      detail: message,
      life: 3000,
    });
  };

  const error = (title, message) => {
    toast.add({
      severity: "error",
      summary: title,
      detail: message,
      life: 3000,
    });
  };

  return { success, info, warn, error };
});
