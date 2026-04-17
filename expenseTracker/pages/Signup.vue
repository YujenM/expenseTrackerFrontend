<template>
  <div class="d-flex justify-center align-center w-100 h-100">
    <v-card class="pa-5" width="400">
      <v-card-title class="text-center">Signup</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="signup">
          <v-text-field
            label="Full Name"
            v-model="fullName"
            autocomplete="name"
          />
          <v-text-field label="Email" v-model="email" autocomplete="email" />
          <v-text-field
            type="number"
            label="Phone Number"
            v-model="phone"
            autocomplete="tel"
          />

          <v-text-field
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPassword = !showPassword"
            autocomplete="current-password"
          />

          <p>
            Already have an account?
            <span
              style="cursor: pointer"
              class="text-red"
              @click="this.$router.push({ name: 'Login' })"
              >Log In</span
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
              Sign In
            </v-btn>
            <v-progress-circular v-else indeterminate color="red" />
          </div>
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
      fullName: "",
      phone: "",
      email: "",
      password: "",
      showPassword: false,
      loading: false,
    };
  },

  methods: {
    async signup() {
      this.loading = true;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.$setSnackbar("Invalid email format", "error");
        return;
      }
      if (this.password.length < 10) {
        this.$setSnackbar("Password must be at least 10 characters", "error");
        return;
      }

      this.$http
        .post(authApi.signup, {
          fullName: this.fullName,
          phone: this.phone,
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.response);

          this.$setSnackbar("Signup successful", "success");

          this.$router.push({ name: "Login" });
        })
        .catch((error) => {
          const msg = error.response?.data?.message || "Signup failed";

          this.$setSnackbar(msg, "error");
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
