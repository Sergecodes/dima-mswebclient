<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="mb-0">Batch Stock Moves</h3>
      <button class="btn btn-success" @click="openCreate">New Batch Move</button>
    </div>

    <!-- error alert (delete / load failures, etc.) -->
    <div
      v-if="errorMsg"
      class="alert alert-warning alert-dismissible fade show"
      role="alert"
    >
      <strong>Action failed:</strong> {{ errorMsg }}
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        @click="errorMsg = ''"
      ></button>
    </div>

    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Recent Batches</h5>
        <div class="table-responsive">
          <table class="table table-striped align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Type</th>
                <th>From</th>
                <th>To</th>
                <th>Lines</th>
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

            <tbody v-else-if="!batches.length">
              <tr>
                <td colspan="7" class="text-center text-muted py-4">
                  No batch moves yet.
                </td>
              </tr>
            </tbody>

            <tbody v-else>
              <tr v-for="b in batches" :key="b.id">
                <td>{{ b.id }}</td>
                <td>{{ new Date(b.timestamp).toLocaleString() }}</td>
                <td>
                  <span class="badge bg-info">{{ b.type }}</span>
                </td>
                <td>{{ b.from_code || b.from_location || "—" }}</td>
                <td>{{ b.to_code || b.to_location || "—" }}</td>
                <td>
                  <ul class="mb-0">
                    <li v-for="ln in b.lines" :key="ln.id">
                      {{ ln.product_sku }} x {{ ln.qty }}
                    </li>
                  </ul>
                </td>
                <td class="text-end">
                  <button
                    class="btn btn-sm btn-outline-danger"
                    @click="confirmDelete(b.id)"
                  >
                    Reverse/Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <BatchMoveModal ref="modal" @created="fetchBatches" />
    <ConfirmDialog ref="confirmDialog" />
  </div>
</template>

<script setup lang="ts">
import api from "@/api/http";
import type { StockMoveBatch } from "@/types/types";
import { ref, onMounted } from "vue";
import BatchMoveModal from "@/components/BatchMoveModal.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";

const batches = ref<StockMoveBatch[]>([]);
const loading = ref(false);
const errorMsg = ref("");

const modal = ref<InstanceType<typeof BatchMoveModal> | null>(null);
const confirmDialog = ref<InstanceType<typeof ConfirmDialog> | null>(null);

function openCreate() {
  modal.value?.open();
}

async function fetchBatches() {
  loading.value = true;
  errorMsg.value = "";
  try {
    const { data } = await api.get("/stock-batches/?ordering=-timestamp");
    batches.value = data.results || data;
  } catch (e: any) {
    errorMsg.value = e?.response?.data?.detail || "Failed to load batches.";
  } finally {
    loading.value = false;
  }
}

async function confirmDelete(id: number) {
  const ok = await confirmDialog.value?.open({
    title: "Reverse/Delete Batch",
    message: "Reverse this batch move? This will update inventory.",
    confirmText: "Delete",
    variant: "danger",
  });
  if (!ok) return;

  try {
    await api.delete(`/stock-batches/${id}/`);
    await fetchBatches();
  } catch (e: any) {
    errorMsg.value = e?.response?.data?.detail || "Failed to delete this batch.";
  }
}

onMounted(fetchBatches);
</script>
