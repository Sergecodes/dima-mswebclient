<template>
  <div>
    <h3 class="mb-3">Inventory Levels</h3>

    <div class="row g-2">
      <div class="col-sm-4">
        <label class="form-label">Product (SKU)</label>
        <select v-model="productSku" class="form-select">
          <option value="">All</option>
          <option v-for="p in products" :key="p.id" :value="p.sku">
            {{ p.sku }} — {{ p.name }}
          </option>
        </select>
      </div>
      <div class="col-sm-4">
        <label class="form-label">Location (code)</label>
        <select v-model="locationCode" class="form-select">
          <option value="">All</option>
          <option v-for="l in locations" :key="l.id" :value="l.code">
            {{ l.code }} — {{ l.name }}
          </option>
        </select>
      </div>
      <div class="col-sm-4 d-flex align-items-end">
        <button class="btn btn-outline-primary me-2" @click="fetchList">Apply</button>
        <button class="btn btn-outline-secondary" @click="reset">Reset</button>
      </div>
    </div>

    <div class="table-responsive mt-3">
      <table class="table table-hover align-middle">
        <thead>
          <tr>
            <th>Product</th>
            <th>Location</th>
            <th>On Hand</th>
          </tr>
        </thead>

        <tbody v-if="loading">
          <tr>
            <td colspan="3" class="text-center py-5">
              <div class="spinner-border" role="status" aria-label="Loading"></div>
            </td>
          </tr>
        </tbody>

        <tbody v-else-if="!items.length">
          <tr>
            <td colspan="3" class="text-center text-muted py-4">No inventory data.</td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr v-for="lvl in items" :key="lvl.id">
            <td>{{ lvl.product_sku }} (#{{ lvl.product }})</td>
            <td>{{ lvl.location_code }} (#{{ lvl.location }})</td>
            <td class="fw-semibold">{{ lvl.on_hand }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import api from "@/api/http";
import type { InventoryLevel, Product, Location } from "@/types";
import { ref, onMounted } from "vue";

const items = ref<InventoryLevel[]>([]);
const products = ref<Product[]>([]);
const locations = ref<Location[]>([]);
const loading = ref(false);

const productSku = ref("");
const locationCode = ref("");

async function fetchRefs() {
  const [p, l] = await Promise.all([
    api.get("/products/?ordering=sku"),
    api.get("/locations/?ordering=code"),
  ]);
  products.value = p.data.results || p.data;
  locations.value = l.data.results || l.data;
}

async function fetchList() {
  loading.value = true;
  try {
    const params: any = {};
    if (productSku.value) params.product_sku = productSku.value;
    if (locationCode.value) params.location_code = locationCode.value;
    const { data } = await api.get("/inventory/levels/", { params });
    items.value = data.results || data;
  } finally {
    loading.value = false;
  }
}
function reset() {
  productSku.value = "";
  locationCode.value = "";
  fetchList();
}

onMounted(async () => {
  await fetchRefs();
  await fetchList();
});
</script>
