<template>
  <div>
    <v-skeleton-loader v-if="loadingUser" type="card" class="mt-4" />
    <span v-else> {{ greeting }}, {{ userDetails?.user?.fullName }} </span>
  </div>

  <div>
    <v-skeleton-loader v-if="loadingUser" type="card" class="mt-4" />

    <herobar
      v-else
      :availableBalance="userDetails.totalBalance"
      :monthlyIncome="monthlyIncome"
      :monthlyExpense="monthlyExpense"
    />
  </div>
  <v-row>
    <v-col cols="12" sm="12" md="8">
      <DashboardBody />

      <div>
        <v-skeleton-loader v-if="loadingUser" type="table" class="mt-4" />
        <DashboardTable v-else :linkedAccounts="userDetails?.user?.accounts" />
      </div>
    </v-col>
    <v-col cols="12" sm="12" md="4">
      <TopExpenses class="mt-8" />
    </v-col>
  </v-row>
</template>

<script>
import user from "../src/api/user";
import herobar from "../src/components/Dashboard/herobar.vue";

import DashboardBody from "../src/components/Dashboard/DashboardBody.vue";
import DashboardTable from "../src/components/Dashboard/DashboardTable.vue";
import TopExpenses from "../src/components/common/TopExpenses.vue";

export default {
  components: {
    herobar,
    DashboardBody,
    DashboardTable,
    TopExpenses,
  },
  data() {
    return {
      availableBalance: 0,
      monthlyIncome: 0,
      monthlyExpense: 0,
      greeting: "",
      userDetails: {},
      loading: true,
      loadingUser: false,
      hideData: false,
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
        this.loadingUser = true;
        const response = await this.$http.get(user.getUser);
        this.userDetails = response.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.loadingUser = false;
      }
    },
  },
};
</script>
