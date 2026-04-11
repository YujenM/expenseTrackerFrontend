<template>
  <v-app class="bg-grey-lighten-3">
    <SideNav>
      <router-view />
    </SideNav>
  </v-app>
</template>

<script>
import SideNav from "../components/common/Navbar.vue";
export default {
  components: {
    SideNav,
  },
};
</script>
