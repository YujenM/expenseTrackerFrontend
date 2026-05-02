import { createRouter, createWebHistory } from "vue-router";

import MainLayout from "../layouts/MainLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";

import Dashboard from "../../pages/Dashboard.vue";
import HomePage from "../../pages/HomePage.vue";
import Login from "../../pages/Login.vue";
import Signup from "../../pages/Signup.vue";
import AddProvider from "../../pages/AddProvider.vue";
import Income from "../../pages/Income.vue";
import Expense from "../../pages/Expense.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        redirect: "home",
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "home",
        name: "Home",
        component: HomePage,
      },
      {
        path: "add-provider",
        name: "AddProvider",
        component: AddProvider,
      },
      {
        path: "income",
        name: "Income",
        component: Income,
      },
      {
        path: "expense",
        name: "Expense",
        component: Expense,
      },
    ],
  },
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        path: "",
        redirect: "/auth/login",
      },
      {
        path: "login",
        name: "Login",
        component: Login,
      },
      {
        path: "signup",
        name: "Signup",
        component: Signup,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  const token = localStorage.getItem("token");

  if (to.path.startsWith("/auth")) {
    return true;
  }

  if (!token) {
    return { name: "Login" };
  }

  return true;
});

export default router;
