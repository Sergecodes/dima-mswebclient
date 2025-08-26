<template>
  <div class="modal fade" tabindex="-1" ref="modalEl">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">New Stock Move</h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            @click="hide()"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="save">
            <div class="row g-3">
              <div class="col-md-3">
                <label class="form-label">Type</label>
                <select v-model="type" class="form-select" required>
                  <option value="INBOUND">INBOUND</option>
                  <option value="OUTBOUND">OUTBOUND</option>
                  <option value="TRANSFER">TRANSFER</option>
                </select>
              </div>
              <div class="col-md-5">
                <label class="form-label">Product</label>
                <select v-model.number="product" class="form-select" required>
                  <option disabled value="">Select product</option>
                  <option v-for="p in products" :key="p.id" :value="p.id">
                    {{ p.sku }} — {{ p.name }}
                  </option>
                </select>
              </div>
              <div class="col-md-2">
                <label class="form-label">Quantity</label>
                <input
                  v-model="qty"
                  type="number"
                  min="0.01"
                  step="0.01"
                  class="form-control"
                  required
                />
              </div>
              <div class="col-md-6" v-if="type !== 'INBOUND'">
                <label class="form-label">From</label>
                <!-- inside v-if, so just require -->
                <select v-model.number="from_location" class="form-select" required>
                  <option disabled value="">Select source</option>
                  <option v-for="l in locations" :key="l.id" :value="l.id">
                    {{ l.code }} — {{ l.name }}
                  </option>
                </select>
              </div>
              <div class="col-md-6" v-if="type !== 'OUTBOUND'">
                <label class="form-label">To</label>
                <!-- inside v-if, so just require -->
                <select v-model.number="to_location" class="form-select" required>
                  <option disabled value="">Select destination</option>
                  <option v-for="l in locations" :key="l.id" :value="l.id">
                    {{ l.code }} — {{ l.name }}
                  </option>
                </select>
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
            <span v-if="!saving">Create</span>
            <span v-else class="spinner-border spinner-border-sm"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";
import api from "@/api/http";
import type { Product, Location, MoveType } from "@/types/types";

const emit = defineEmits<{ (e: "created"): void }>();

const modalEl = ref<HTMLElement | null>(null);
let modal: Modal | null = null;

const products = ref<Product[]>([]);
const locations = ref<Location[]>([]);

const type = ref<MoveType>("INBOUND");
const product = ref<number | "">("");
const qty = ref<any>("1");
const from_location = ref<number | "">("");
const to_location = ref<number | "">("");

const saving = ref(false);
const error = ref("");

function open() {
  error.value = "";
  type.value = "INBOUND";
  product.value = "";
  qty.value = "1";
  from_location.value = "";
  to_location.value = "";
  modal?.show();
}
function hide() {
  modal?.hide();
}

async function loadRefs() {
  const [p, l] = await Promise.all([
    api.get("/products/?ordering=sku"),
    api.get("/locations/?ordering=code"),
  ]);
  products.value = p.data.results || p.data;
  locations.value = l.data.results || l.data;
}

async function save() {
  saving.value = true;
  error.value = "";
  try {
    const payload: any = { type: type.value, product: product.value, qty: qty.value };
    if (type.value !== "INBOUND") payload.from_location = from_location.value || null;
    if (type.value !== "OUTBOUND") payload.to_location = to_location.value || null;
    await api.post("/stock-moves/", payload);
    emit("created");
    hide();
  } catch (e: any) {
    error.value = e?.response?.data?.detail || "Failed to create move";
  } finally {
    saving.value = false;
  }
}

onMounted(() => {
  if (modalEl.value) modal = new Modal(modalEl.value, { backdrop: "static" });
  loadRefs();
});
defineExpose({ open, hide });
</script>
