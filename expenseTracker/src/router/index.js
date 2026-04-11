import { createRouter, createWebHistory } from "vue-router";

import MainLayout from "../layouts/MainLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";

import Dashboard from "../../pages/Dashboard.vue";
import HomePage from "../../pages/HomePage.vue";
import Login from "../../pages/Login.vue";

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
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
