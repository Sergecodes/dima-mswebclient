<template>
  <div>
    <NavBar />
    <main class="container py-4">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
</script>
