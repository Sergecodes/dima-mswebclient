<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="mb-0">Stock Moves</h3>
      <button class="btn btn-success" @click="openCreate">New Move</button>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="row g-2">
          <div class="col-sm-3">
            <label class="form-label">Type</label>
            <select v-model="filters.type" class="form-select">
              <option value="">All</option>
              <option>INBOUND</option>
              <option>OUTBOUND</option>
              <option>TRANSFER</option>
            </select>
          </div>

          <div class="col-sm-3">
            <label class="form-label">Product (SKU)</label>
            <select v-model="filters.product_sku" class="form-select">
              <option value="">All</option>
              <option v-for="p in products" :key="p.id" :value="p.sku">
                {{ p.sku }} — {{ p.name }}
              </option>
            </select>
          </div>

          <div class="col-sm-3">
            <label class="form-label">From (code)</label>
            <select v-model="filters.from_code" class="form-select">
              <option value="">All</option>
              <option v-for="l in locations" :key="l.id" :value="l.code">
                {{ l.code }} — {{ l.name }}
              </option>
            </select>
          </div>

          <div class="col-sm-3">
            <label class="form-label">To (code)</label>
            <select v-model="filters.to_code" class="form-select">
              <option value="">All</option>
              <option v-for="l in locations" :key="l.id" :value="l.code">
                {{ l.code }} — {{ l.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="mt-3 d-flex gap-2">
          <button class="btn btn-outline-primary" @click="fetchList">Filter</button>
          <button class="btn btn-outline-secondary" @click="resetFilters">Reset</button>
        </div>
      </div>
    </div>

    <div class="table-responsive mt-3">
      <table class="table table-striped align-middle">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Product (SKU)</th>
            <th>Qty</th>
            <th>From</th>
            <th>To</th>
            <th></th>
          </tr>
        </thead>

        <tbody v-if="loading">
          <tr>
            <td colspan="7" class="text-center py-5">
              <div class="spinner-border" role="status" aria-label="Loading"></div>
            </td>
          </tr>
        </tbody>

        <tbody v-else-if="!items.length">
          <tr>
            <td colspan="7" class="text-center text-muted py-4">No moves to display.</td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr v-for="m in items" :key="m.id">
            <td>{{ new Date(m.timestamp).toLocaleString() }}</td>
            <td>
              <span class="badge bg-info">{{ m.type }}</span>
            </td>
            <td>{{ m.product_sku || "#" + m.product }}</td>
            <td>{{ m.qty }}</td>
            <td>{{ m.from_code || "—" }}</td>
            <td>{{ m.to_code || "—" }}</td>
            <td class="text-end">
              <button class="btn btn-sm btn-outline-danger" @click="confirmDelete(m.id)">
                Reverse/Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <StockMoveModal ref="modal" @created="fetchList" />
    <ConfirmDialog ref="confirmDialog" />
  </div>
</template>

<script setup lang="ts">
import api from "@/api/http";
import type { StockMove, Product, Location } from "@/types/types";
import { ref, onMounted } from "vue";
import StockMoveModal from "@/components/StockMoveModal.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";

const items = ref<StockMove[]>([]);
const products = ref<Product[]>([]);
const locations = ref<Location[]>([]);
const loading = ref(false);

// human-friendly filters
const filters = ref<{
  type: string;
  product_sku: string;
  from_code: string;
  to_code: string;
}>({
  type: "",
  product_sku: "",
  from_code: "",
  to_code: "",
});

const modal = ref<InstanceType<typeof StockMoveModal> | null>(null);
const confirmDialog = ref<InstanceType<typeof ConfirmDialog> | null>(null);

function openCreate() {
  modal.value?.open();
}
function resetFilters() {
  filters.value = { type: "", product_sku: "", from_code: "", to_code: "" };
  fetchList();
}

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
    if (filters.value.type) params.type = filters.value.type;
    if (filters.value.product_sku) params.product_sku = filters.value.product_sku;
    if (filters.value.from_code) params.from_code = filters.value.from_code;
    if (filters.value.to_code) params.to_code = filters.value.to_code;
    const { data } = await api.get("/stock-moves/", { params });
    items.value = data.results || data;
  } finally {
    loading.value = false;
  }
}

async function confirmDelete(id: number) {
  const ok = await confirmDialog.value?.open({
    title: "Reverse/Delete Move",
    message: "Reverse this stock move? This will update inventory.",
    confirmText: "Delete",
    variant: "danger",
  });
  if (ok) {
    await api.delete(`/stock-moves/${id}/`);
    await fetchList();
  }
}

onMounted(async () => {
  await fetchRefs();
  await fetchList();
});
</script>
