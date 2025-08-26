<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="mb-0">Locations</h3>
      <button class="btn btn-success" @click="openCreate">New Location</button>
    </div>

    <div class="mb-3">
      <input
        v-model="search"
        class="form-control"
        placeholder="Search by code or name…"
      />
    </div>

    <div class="table-responsive">
      <table class="table table-hover align-middle">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th class="text-end"></th>
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
            <td colspan="3" class="text-center text-muted py-4">No locations found.</td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr v-for="l in items" :key="l.id">
            <td class="fw-semibold">{{ l.code }}</td>
            <td>{{ l.name }}</td>
            <td class="text-end">
              <button class="btn btn-sm btn-outline-primary me-2" @click="openEdit(l)">
                Edit
              </button>
              <button class="btn btn-sm btn-outline-danger" @click="confirmDelete(l)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <LocationModal ref="modal" @saved="fetchList" />
    <ConfirmDialog ref="confirmDialog" />
  </div>
</template>

<script setup lang="ts">
import api from "@/api/http";
import type { Location } from "@/types";
import { ref, onMounted, watch } from "vue";
import LocationModal from "@/components/LocationModal.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";

const items = ref<Location[]>([]);
const search = ref("");
const loading = ref(false);

const modal = ref<InstanceType<typeof LocationModal> | null>(null);
const confirmDialog = ref<InstanceType<typeof ConfirmDialog> | null>(null);

async function fetchList() {
  loading.value = true;
  try {
    const params: any = {};
    if (search.value.trim()) params.search = search.value.trim();
    const { data } = await api.get("/locations/", { params });
    items.value = data.results || data;
  } finally {
    loading.value = false;
  }
}

function openCreate() {
  modal.value?.open(null);
}
function openEdit(l: Location) {
  modal.value?.open(l);
}

async function confirmDelete(l: Location) {
  const ok = await confirmDialog.value?.open({
    title: "Delete Location",
    message: `Delete location ${l.code}? This cannot be undone.`,
    confirmText: "Delete",
    variant: "danger",
  });
  if (ok) {
    await api.delete(`/locations/${l.id}/`);
    await fetchList();
  }
}

// Debounced search
let t: any = null;
watch(search, () => {
  clearTimeout(t);
  t = setTimeout(fetchList, 400);
});

onMounted(fetchList);
</script>
