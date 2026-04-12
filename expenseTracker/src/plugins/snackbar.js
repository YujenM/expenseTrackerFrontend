import { reactive } from "vue";

const snackbarState = reactive({
  show: false,
  message: "",
  color: "error",
});

export default {
  install(app) {
    app.config.globalProperties.$setSnackbar = (message, color = "error") => {
      // here
      snackbarState.message = message;
      snackbarState.color = color;
      snackbarState.show = true;
    };

    app.provide("snackbar", snackbarState);
  },
};

export { snackbarState };
