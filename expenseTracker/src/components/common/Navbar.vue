<template>
  <div class="layout">
    <!-- Sidebar -->
    <aside :class="['sidebar', { 'sidebar-open': isSidebarOpen }]">
      <v-btn icon @click="closeSidebar" class="close-btn">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <div class="px-2 py-2 mt-2 d-flex flex-column fill-height pa-4">
        <div class="sidebar-title">
          <h2 class="nav-title text-red-darken-1 mb-3">Expense Tracker</h2>
        </div>
        <nav>
          <ul class="ml-0">
            <li v-for="item in navItem" :key="item.id" class="nav-li mt-5">
              <router-link :to="item.path" class="router-li" exact>
                <v-icon>{{ item.icon }}</v-icon>
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </nav>
        <v-spacer></v-spacer>
        <div class="mb-10">
          <v-btn
            class="w-100 logout-btn py-4 h-25"
            block
            color="red darken-1"
            @click="logout"
          >
            Logout
          </v-btn>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="main-content">
      <v-icon
        class="toggle-btn"
        style="height: 56px; border-radius: 10px"
        @click="toggleSidebar"
        >mdi-menu</v-icon
      >
      <slot />
    </div>
  </div>
</template>

<script>
import navItem from "../../assets/json/navbar";
import router from "../../router";

export default {
  name: "SideNav",
  data() {
    return {
      isSidebarOpen: true,
      navItem,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    closeSidebar() {
      this.isSidebarOpen = false;
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push({
        name: "Login",
      });
      this.$setSnackbar("Logout successful", "success");
    },
  },
};
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* Sidebar */
.sidebar {
  width: 300px;
  background-color: white;
  padding: 1rem;
  transition: transform 0.3s ease;
  z-index: 1000;
  transform: translateX(-100%);
}
.sidebar.sidebar-open {
  transform: translateX(0);
}
ul {
  margin: 0;
  padding: 0;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  display: none;
}

.main-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.toggle-btn {
  display: none;
  margin-bottom: 1rem;
}

.nav-li {
  list-style: none;
  width: 100%;
}

.router-li {
  display: block;
  text-decoration: none !important;
  color: #616161;
  font-size: 1.2rem;
  padding: 0.5rem;
  width: 100%;
  box-sizing: border-box;
  border-radius: 15px;
}

.router-li:hover {
  color: #f5f5f5;
  background-color: #d32f2f;
}

/* Active Link Styling */
::v-deep(.router-li.router-link-exact-active) {
  color: #f5f5f5;
  background-color: #d32f2f;
  border-radius: 15px;
}

/* Show toggle button only on small screens */
@media (max-width: 768px) {
  .close-btn {
    display: block;
  }

  .toggle-btn {
    display: inline-block;
  }

  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    height: 100%;
  }

  .main-content {
    padding: 1rem;
  }
}
</style>
