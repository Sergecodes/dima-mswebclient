<template>
  <div>
    <h3 class="mb-3">Reorder Suggestions</h3>

    <div class="row g-2 align-items-end">
      <div class="col-sm-3">
        <label class="form-label">Window (days)</label>
        <input v-model.number="days" type="number" min="1" class="form-control" />
      </div>
      <div class="col-sm-3">
        <label class="form-label">Coverage (days)</label>
        <input v-model.number="coverage" type="number" min="1" class="form-control" />
      </div>
      <div class="col-sm-3">
        <label class="form-label">Min suggested qty</label>
        <input
          v-model.number="minQty"
          type="number"
          min="0"
          step="0.01"
          class="form-control"
        />
      </div>
      <div class="col-sm-3">
        <button class="btn btn-outline-primary" @click="fetchList">Refresh</button>
      </div>
    </div>

    <div class="table-responsive mt-3">
      <table class="table table-hover align-middle">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Name</th>
            <th>Avg Daily Demand</th>
            <th>On Hand</th>
            <th>Suggested Qty</th>
          </tr>
        </thead>

        <tbody v-if="loading">
          <tr>
            <td colspan="5" class="text-center py-5">
              <div class="spinner-border" role="status" aria-label="Loading"></div>
            </td>
          </tr>
        </tbody>

        <tbody v-else-if="!items.length">
          <tr>
            <td colspan="5" class="text-center text-muted py-4">
              No suggestions under current parameters.
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr v-for="row in items" :key="row.product">
            <td class="fw-semibold">{{ row.sku }}</td>
            <td>{{ row.name }}</td>
            <td>{{ row.avg_daily_demand }}</td>
            <td>{{ row.on_hand_total }}</td>
            <td class="fw-semibold">{{ row.suggested_qty }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import api from "@/api/http";
import { ref, onMounted } from "vue";

const items = ref<any[]>([]);
const days = ref(14);
const coverage = ref(7);
const minQty = ref(0);
const loading = ref(false);

async function fetchList() {
  loading.value = true;
  try {
    const params: any = {
      days: days.value,
      coverage_days: coverage.value,
      min_qty: minQty.value,
    };
    const { data } = await api.get("/inventory/reorder-suggestions/", { params });
    items.value = data;
  } finally {
    loading.value = false;
  }
}

onMounted(fetchList);
</script>
