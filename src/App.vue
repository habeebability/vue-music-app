<template>
  <div class>
    <Header />

    <!-- <RouterView /> -->
    <router-view v-slot="{Component}">
      <transition name="fade" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>

    <!-- Player -->
    <AppPlayer />

    <!-- app auth -->
    <Auth />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import AppPlayer from "./components/Player.vue";
import Auth from "./components/Auth.vue";
import { mapWritableState } from "pinia";
import useUserStore from "@/stores/user";
import { auth } from "./includes/firebase";

export default {
  name: "App",
  components: {
    Header,
    AppPlayer,
    Auth,
  },
  computed: {
    ...mapWritableState(useUserStore, ["userLoggedIn"]),
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true;
    }
  },
};
</script>

<style>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.5s linear;
}
.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}
</style>
