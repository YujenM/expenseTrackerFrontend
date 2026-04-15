<template>
  <v-card class="pa-4">
    <div class="d-flex justify-space-between">
      <div>
        <div v-if="loading">
          <v-skeleton-loader type="text" />
        </div>

        <span v-else class="tex">
          {{ greeting }}, {{ userDetails.user.fullName }}
        </span>
      </div>

      <v-btn class="" icon @click="hideData = !hideData">
        <v-icon>
          {{ hideData ? "mdi-eye-off" : "mdi-eye" }}

        </v-icon>
      </v-btn>
    </div>

    <div class="mt-3">
      <strong>Total: </strong>
      <span>
        {{ hideData ? "XXXX" : "Rs. " + userDetails.totalBalance }}
        <!-- here -->
      </span>
    </div>

    <v-card class="mt-4">
      <div v-if="loading">
        <v-skeleton-loader type="table" />
      </div>

      <div v-else>
        <v-data-table
          :headers="headers"
          :items="userDetails.user.accounts"
          class="elevation-1"
          hide-default-footer
        >
          <template v-slot:item.provider="{ item }">
            <v-avatar size="40">
              <img
                :src="item.provider.logo_url"
                alt="logo"
                style="width: 100%; height: 100%; object-fit: contain"
              />
            </v-avatar>
          </template>

          <template v-slot:item.balance="{ item }">
            {{ hideData ? "XXXX" : "Rs. " + item.balance }}
          </template>
        </v-data-table>
      </div>
    </v-card>
  </v-card>
</template>

<script>
import user from "../src/api/user";

export default {
  data() {
    return {
      greeting: "",
      userDetails: {},
      loading: true,
      hideData: false, // here
      headers: [
        { title: "Account", value: "account_name" },
        { title: "Provider", value: "provider" },
        { title: "Balance", value: "balance" },
      ],
    };
  },

  mounted() {
    this.setGreeting();
    this.getUserDetails();
  },

  methods: {
    setGreeting() {
      const hour = new Date().getHours();

      if (hour < 12) {
        this.greeting = "Good Morning";
      } else if (hour < 18) {
        this.greeting = "Good Afternoon";
      } else {
        this.greeting = "Good Evening";
      }
    },

    async getUserDetails() {
      try {
        const response = await this.$http.get(user.getUser);
        this.userDetails = response.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
