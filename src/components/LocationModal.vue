<template>
  <div class="modal fade" tabindex="-1" ref="modalEl">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title text-light">
            {{ form.id ? "Edit Location" : "New Location" }}
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            @click="hide()"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="save">
            <div class="mb-3">
              <label class="form-label">Code</label>
              <input
                v-model="form.code"
                class="form-control"
                :readonly="!!form.id"
                required
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input v-model="form.name" class="form-control" required />
            </div>
            <p v-if="error" class="text-danger mt-2">{{ error }}</p>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline-secondary" :disabled="saving" @click="hide()">
            Close
          </button>
          <button class="btn btn-primary" :disabled="saving" @click="save">
            <span v-if="!saving">Save</span
            ><span v-else class="spinner-border spinner-border-sm"></span>
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
import type { Location } from "@/types/types";

const emit = defineEmits<{ (e: "saved"): void }>();

const modalEl = ref<HTMLElement | null>(null);
let modal: Modal | null = null;

const saving = ref(false);
const error = ref("");
const form = reactive<Partial<Location>>({ id: undefined, code: "", name: "" });

function open(loc?: Location | null) {
  if (loc) Object.assign(form, loc);
  else Object.assign(form, { id: undefined, code: "", name: "" });
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
    if (form.id) await api.put(`/locations/${form.id}/`, form);
    else await api.post(`/locations/`, form);
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
