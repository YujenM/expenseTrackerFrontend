import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
    userMonthlyBudget: null,
  }),

  actions: {
    setUser(user) {
      this.user = user;
    },
    setToken(token) {
      this.token = token;
      this.isAuthenticated = !!token;
    },
    setUserMonthlyBudget(budget) {
      this.userMonthlyBudget = budget;
    },
    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      this.userMonthlyBudget = null;
    },
  },
});
