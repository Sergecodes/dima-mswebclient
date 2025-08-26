<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <div class="card shadow-sm">
        <div class="card-body">
          <h5 class="card-title mb-3">Sign in</h5>
          <form @submit.prevent="submit">
            <div class="mb-3">
              <label class="form-label">Username</label>
              <input v-model="username" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input v-model="password" type="password" class="form-control" required />
            </div>
            <button class="btn btn-primary w-100" :disabled="loading">
              <span v-if="!loading">Login</span>
              <span v-else class="spinner-border spinner-border-sm"></span>
            </button>
            <p v-if="error" class="text-danger mt-3">{{ error }}</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");
const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

async function submit() {
  loading.value = true;
  error.value = "";
  try {
    await auth.login(username.value, password.value);
    const next = (route.query.next as string) || "/products";
    router.replace(next);
  } catch (e: any) {
    error.value = e?.response?.data?.detail || "Invalid credentials";
  } finally {
    loading.value = false;
  }
}
</script>
