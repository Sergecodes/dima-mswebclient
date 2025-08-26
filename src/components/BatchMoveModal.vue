<template>
  <div class="modal fade" tabindex="-1" ref="modalEl">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">New Batch Move</h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            @click="hide()"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="save">
            <div class="row g-3 mb-3">
              <div class="col-md-3">
                <label class="form-label">Type</label>
                <select v-model="type" class="form-select" required>
                  <option value="INBOUND">INBOUND</option>
                  <option value="OUTBOUND">OUTBOUND</option>
                  <option value="TRANSFER">TRANSFER</option>
                </select>
              </div>
              <div class="col-md-4" v-if="type !== 'INBOUND'">
                <label class="form-label">From</label>
                <!-- already inside v-if, so just require -->
                <select v-model.number="from_location" class="form-select" required>
                  <option disabled value="">Select source</option>
                  <option v-for="l in locations" :key="l.id" :value="l.id">
                    {{ l.code }} — {{ l.name }}
                  </option>
                </select>
              </div>
              <div class="col-md-4" v-if="type !== 'OUTBOUND'">
                <label class="form-label">To</label>
                <!-- already inside v-if, so just require -->
                <select v-model.number="to_location" class="form-select" required>
                  <option disabled value="">Select destination</option>
                  <option v-for="l in locations" :key="l.id" :value="l.id">
                    {{ l.code }} — {{ l.name }}
                  </option>
                </select>
              </div>
            </div>

            <div class="table-responsive">
              <table class="table align-middle">
                <thead>
                  <tr>
                    <th style="width: 55%">Product</th>
                    <th style="width: 20%">Qty</th>
                    <th style="width: 10%"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(ln, idx) in lines" :key="idx">
                    <td>
                      <select v-model.number="ln.product" class="form-select" required>
                        <option disabled value="">Select product</option>
                        <option v-for="p in products" :key="p.id" :value="p.id">
                          {{ p.sku }} — {{ p.name }}
                        </option>
                      </select>
                    </td>
                    <td>
                      <input
                        v-model="ln.qty"
                        type="number"
                        min="0.01"
                        step="0.01"
                        class="form-control"
                        required
                      />
                    </td>
                    <td class="text-end">
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-danger"
                        @click="remove(idx)"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="d-flex gap-2">
              <button type="button" class="btn btn-outline-primary" @click="addLine">
                Add line
              </button>
            </div>

            <p v-if="error" class="text-danger mt-3">{{ error }}</p>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline-secondary" :disabled="saving" @click="hide()">
            Close
          </button>
          <button class="btn btn-primary" :disabled="saving" @click="save">
            <span v-if="!saving">Create Batch</span>
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
import type { Product, Location, StockMoveLine, MoveType } from "@/types/types";

const emit = defineEmits<{ (e: "created"): void }>();

const modalEl = ref<HTMLElement | null>(null);
let modal: Modal | null = null;

const products = ref<Product[]>([]);
const locations = ref<Location[]>([]);

const type = ref<MoveType>("INBOUND");
const from_location = ref<number | "">("");
const to_location = ref<number | "">("");
const lines = ref<StockMoveLine[]>([
  { product: (undefined as unknown) as number, qty: "1" },
]);

const saving = ref(false);
const error = ref("");

function addLine() {
  lines.value.push({ product: (undefined as unknown) as number, qty: "1" });
}
function remove(i: number) {
  lines.value.splice(i, 1);
}

function open() {
  error.value = "";
  type.value = "INBOUND";
  from_location.value = "";
  to_location.value = "";
  lines.value = [{ product: undefined as any, qty: "1" }];
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
    const payload: any = {
      type: type.value,
      from_location: type.value !== "INBOUND" ? from_location.value || null : null,
      to_location: type.value !== "OUTBOUND" ? to_location.value || null : null,
      lines: lines.value.map((ln) => ({ product: ln.product, qty: ln.qty })),
    };
    await api.post("/stock-batches/", payload);
    emit("created");
    hide();
  } catch (e: any) {
    error.value = e?.response?.data?.detail || "Failed to create batch";
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
