<template>
  <div class="d-flex justify-center align-center w-100 h-100">
    <v-card class="pa-5" width="400">
      <v-card-title class="text-center">Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field label="Email" v-model="email" autocomplete="email" />
          <v-text-field
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPassword = !showPassword"
            autocomplete="current-password"
          />
          <p>
            Don't have an account?
            <span
              style="cursor: pointer"
              class="text-red"
              @click="this.$router.push({ name: 'Signup' })"
              >Sign In</span
            >
          </p>
          <div class="d-flex justify-center mt-5">
            <v-btn
              class="bg-red"
              type="submit"
              :loading="loading"
              :disabled="loading"
              v-if="!loading"
            >
              Login
            </v-btn>
            <v-progress-circular v-else indeterminate color="red" />
          </div>

          <div class="d-flex justify-center mt-3" v-if="loading"></div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import authApi from "../src/api/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      loading: false,
    };
  },

  methods: {
    async login() {
      this.loading = true;
      this.$http
        .post(authApi.login, {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.response);
          this.$router.push({ name: "Dashboard" });
          this.$setSnackbar("Login successful", "success");
        })
        .catch((error) => {
          this.$setSnackbar("Invalid credentials", "error");
          console.error("Login failed:", error);
        });
    },
  },
};
</script>
