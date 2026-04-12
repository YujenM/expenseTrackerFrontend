<template>
  <v-app>
    <router-view />
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      location="top right"
      timeout="3000"
    >
      {{ snackbar.message }}
    </v-snackbar>
  </v-app>
</template>

<script>
import { inject } from "vue";

export default {
  setup() {
    const snackbar = inject("snackbar"); 
    return { snackbar };
  },
};
</script>
