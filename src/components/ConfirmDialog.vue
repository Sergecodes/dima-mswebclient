<template>
  <div class="modal fade" tabindex="-1" ref="modalEl">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header" :class="headerClass">
          <h5 class="modal-title text-light">{{ state.title || "Confirm" }}</h5>
          <button type="button" class="btn-close" @click="close(false)"></button>
        </div>
        <div class="modal-body">
          <p class="mb-0">{{ state.message || "Are you sure?" }}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline-secondary" @click="close(false)">Cancel</button>
          <button class="btn" :class="confirmBtnClass" @click="close(true)">
            {{ state.confirmText || "Confirm" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue";
import { Modal } from "bootstrap";

type Variant = "danger" | "primary";
interface DialogState {
  title?: string;
  message?: string;
  confirmText?: string;
  variant?: Variant;
}

const modalEl = ref<HTMLElement | null>(null);
let modal: Modal | null = null;

const state = reactive<DialogState>({});
let resolver: ((v: boolean) => void) | null = null;

const headerClass = computed(() =>
  state.variant === "danger" ? "bg-danger text-white" : "bg-primary text-white"
);
const confirmBtnClass = computed(() =>
  state.variant === "danger" ? "btn-danger" : "btn-primary"
);

function open(opts: DialogState): Promise<boolean> {
  Object.assign(state, {
    title: "Confirm",
    confirmText: "Confirm",
    variant: "primary",
    ...opts,
  });
  return new Promise<boolean>((resolve) => {
    resolver = resolve;
    modal?.show();
  });
}

function close(result: boolean) {
  resolver?.(result);
  resolver = null;
  modal?.hide();
}

onMounted(() => {
  if (modalEl.value) modal = new Modal(modalEl.value, { backdrop: "static" });
});

defineExpose({ open });
</script>
