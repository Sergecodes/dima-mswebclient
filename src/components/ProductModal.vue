<template>
  <div class="modal fade" tabindex="-1" ref="modalEl">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title text-light">{{ form.id ? "Edit Product" : "New Product" }}</h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            @click="hide()"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="save">
            <div class="row g-3">
              <div class="col-md-4">
                <label class="form-label">SKU</label>
                <input
                  v-model="form.sku"
                  class="form-control"
                  :readonly="!!form.id"
                  required
                />
              </div>
              <div class="col-md-8">
                <label class="form-label">Name</label>
                <input v-model="form.name" class="form-control" required />
              </div>
              <div class="col-md-4">
                <label class="form-label">Barcode</label>
                <input v-model="form.barcode" class="form-control" />
              </div>
              <div class="col-md-4">
                <label class="form-label">Category</label>
                <input v-model="form.category" class="form-control" />
              </div>
              <div class="col-md-2">
                <label class="form-label">Cost</label>
                <input
                  v-model="form.cost"
                  class="form-control"
                  type="number"
                  step="0.01"
                />
              </div>
              <div class="col-md-2">
                <label class="form-label">Sales Price</label>
                <input
                  v-model="form.sales_price"
                  class="form-control"
                  type="number"
                  step="0.01"
                />
              </div>
              <div class="col-md-2 form-check mt-4">
                <input
                  id="active"
                  v-model="form.is_active"
                  type="checkbox"
                  class="form-check-input"
                />
                <label for="active" class="form-check-label">Active</label>
              </div>
            </div>
            <p v-if="error" class="text-danger mt-2">{{ error }}</p>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline-secondary" :disabled="saving" @click="hide()">
            Close
          </button>
          <button class="btn btn-primary" :disabled="saving" @click="save">
            <span v-if="!saving">Save</span>
            <span v-else class="spinner-border spinner-border-sm"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { Modal } from "bootstrap";
import api from "@/api/http";
import type { Product } from "@/types";

const emit = defineEmits<{ (e: "saved"): void }>();

const modalEl = ref<HTMLElement | null>(null);
let modal: Modal | null = null;

const saving = ref(false);
const error = ref("");

const form = reactive<Partial<Product>>({
  id: undefined,
  sku: "",
  name: "",
  barcode: "",
  category: "",
  cost: "0",
  sales_price: "0",
  is_active: true,
});

function open(product?: Product | null) {
  if (product) Object.assign(form, product);
  else
    Object.assign(form, {
      id: undefined,
      sku: "",
      name: "",
      barcode: "",
      category: "",
      cost: "0",
      sales_price: "0",
      is_active: true,
    });
  error.value = "";
  modal?.show();
}
function hide() {
  modal?.hide();
}

async function save() {
  saving.value = true;
  error.value = "";
  try {
    if (form.id) await api.put(`/products/${form.id}/`, form);
    else await api.post(`/products/`, form);
    emit("saved");
    hide();
  } catch (e: any) {
    error.value = e?.response?.data?.detail || "Failed to save";
  } finally {
    saving.value = false;
  }
}

onMounted(() => {
  if (modalEl.value) modal = new Modal(modalEl.value, { backdrop: "static" });
});

defineExpose({ open, hide });
</script>
