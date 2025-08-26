<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <RouterLink class="navbar-brand fw-bold" to="/">DIMA WMS</RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#nav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="nav" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="authed">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/products">Products</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/locations">Locations</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/stock-moves">Stock Moves</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/inventory">Inventory</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/stock-batch">Batch Move</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/reorder">Reorder</RouterLink>
          </li>
        </ul>
        <div class="d-flex">
          <!-- <RouterLink v-if="!authed" class="btn btn-outline-light" to="/login"
            >Login</RouterLink
          > -->
          <span v-if="!authed"></span>
          <button v-else class="btn btn-outline-light" @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter, RouterLink } from "vue-router";

const auth = useAuthStore();
const router = useRouter();
const authed = computed(() => auth.isAuthenticated);

async function logout() {
  auth.logout();
  router.push({ name: "login" });
}
</script>
