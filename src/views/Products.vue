<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="mb-0">Products</h3>
      <button class="btn btn-success" @click="openCreate">New Product</button>
    </div>

    <div class="mb-3">
      <input
        v-model="search"
        class="form-control"
        placeholder="Search by SKU or Name…"
        aria-label="Search products"
      />
    </div>

    <div class="table-responsive">
      <table class="table table-hover align-middle">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Active</th>
            <th class="text-end"></th>
          </tr>
        </thead>

        <!-- Loading row -->
        <tbody v-if="loading">
          <tr>
            <td colspan="6" class="text-center py-5">
              <div class="spinner-border" role="status" aria-label="Loading"></div>
            </td>
          </tr>
        </tbody>

        <!-- Empty state -->
        <tbody v-else-if="!items.length">
          <tr>
            <td colspan="6" class="text-center text-muted py-4">No products found.</td>
          </tr>
        </tbody>

        <!-- Data -->
        <tbody v-else>
          <tr v-for="p in items" :key="p.id">
            <td class="fw-semibold">{{ p.sku }}</td>
            <td>{{ p.name }}</td>
            <td>{{ p.category || "—" }}</td>
            <td>{{ p.sales_price }}</td>
            <td>
              <span class="badge" :class="p.is_active ? 'bg-success' : 'bg-secondary'">
                {{ p.is_active ? "Yes" : "No" }}
              </span>
            </td>
            <td class="text-end">
              <button class="btn btn-sm btn-outline-primary me-2" @click="openEdit(p)">
                Edit
              </button>
              <button class="btn btn-sm btn-outline-danger" @click="confirmDelete(p)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modals -->
    <ProductModal ref="productModal" @saved="fetchList" />
    <ConfirmDialog ref="confirmDialog" />
  </div>
</template>

<script setup lang="ts">
import api from "@/api/http";
import type { Product } from "@/types/types";
import { ref, onMounted, watch } from "vue";
import ProductModal from "@/components/ProductModal.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";

const items = ref<Product[]>([]);
const search = ref("");
const loading = ref(false);

const productModal = ref<InstanceType<typeof ProductModal> | null>(null);
const confirmDialog = ref<InstanceType<typeof ConfirmDialog> | null>(null);

async function fetchList() {
  loading.value = true;
  try {
    const params: any = {};
    if (search.value.trim()) params.search = search.value.trim();
    const { data } = await api.get("/products/", { params });
    items.value = data.results || data;
  } finally {
    loading.value = false;
  }
}

function openCreate() {
  productModal.value?.open(null);
}
function openEdit(p: Product) {
  productModal.value?.open(p);
}

async function confirmDelete(p: Product) {
  const ok = await confirmDialog.value?.open({
    title: "Delete Product",
    message: `Are you sure you want to delete product ${p.sku}? This cannot be undone.`,
    confirmText: "Delete",
    variant: "danger",
  });
  if (ok) {
    await api.delete(`/products/${p.id}/`);
    await fetchList();
  }
}

// Debounced dynamic search
let timer: any = null;
watch(search, () => {
  clearTimeout(timer);
  timer = setTimeout(fetchList, 400);
});

onMounted(fetchList);
</script>
