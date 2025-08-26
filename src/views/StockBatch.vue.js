import api from "@/api/http";
import { ref, onMounted } from "vue";
import BatchMoveModal from "@/components/BatchMoveModal.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
const batches = ref([]);
const loading = ref(false);
const modal = ref(null);
const confirmDialog = ref(null);
function openCreate() {
    modal.value?.open();
}
async function fetchBatches() {
    loading.value = true;
    try {
        const { data } = await api.get("/stock-batches/?ordering=-timestamp");
        batches.value = data.results || data;
    }
    finally {
        loading.value = false;
    }
}
async function confirmDelete(id) {
    const ok = await confirmDialog.value?.open({
        title: "Reverse/Delete Batch",
        message: "Reverse this batch move? This will update inventory.",
        confirmText: "Delete",
        variant: "danger",
    });
    if (ok) {
        await api.delete(`/stock-batches/${id}/`);
        await fetchBatches();
    }
}
onMounted(fetchBatches);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "d-flex justify-content-between align-items-center mb-3" },
});
__VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
    ...{ class: "mb-0" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.openCreate) },
    ...{ class: "btn btn-success" },
});
// @ts-ignore
[openCreate,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "card" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "card-body" },
});
__VLS_asFunctionalElement(__VLS_elements.h5, __VLS_elements.h5)({
    ...{ class: "card-title" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "table-responsive" },
});
__VLS_asFunctionalElement(__VLS_elements.table, __VLS_elements.table)({
    ...{ class: "table table-striped align-middle" },
});
__VLS_asFunctionalElement(__VLS_elements.thead, __VLS_elements.thead)({});
__VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
if (__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    __VLS_asFunctionalElement(__VLS_elements.tbody, __VLS_elements.tbody)({});
    __VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({});
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
        colspan: "7",
        ...{ class: "text-center py-5" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "spinner-border" },
        role: "status",
        'aria-label': "Loading",
    });
}
else if (!__VLS_ctx.batches.length) {
    // @ts-ignore
    [batches,];
    __VLS_asFunctionalElement(__VLS_elements.tbody, __VLS_elements.tbody)({});
    __VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({});
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
        colspan: "7",
        ...{ class: "text-center text-muted py-4" },
    });
}
else {
    __VLS_asFunctionalElement(__VLS_elements.tbody, __VLS_elements.tbody)({});
    for (const [b] of __VLS_getVForSourceType((__VLS_ctx.batches))) {
        // @ts-ignore
        [batches,];
        __VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({
            key: (b.id),
        });
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
        (b.id);
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
        (new Date(b.timestamp).toLocaleString());
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "badge bg-info" },
        });
        (b.type);
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
        (b.from_code || b.from_location || "—");
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
        (b.to_code || b.to_location || "—");
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
        __VLS_asFunctionalElement(__VLS_elements.ul, __VLS_elements.ul)({
            ...{ class: "mb-0" },
        });
        for (const [ln] of __VLS_getVForSourceType((b.lines))) {
            __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
                key: (ln.id),
            });
            (ln.product_sku);
            (ln.qty);
        }
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
            ...{ class: "text-end" },
        });
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!!(!__VLS_ctx.batches.length))
                        return;
                    __VLS_ctx.confirmDelete(b.id);
                    // @ts-ignore
                    [confirmDelete,];
                } },
            ...{ class: "btn btn-sm btn-outline-danger" },
        });
    }
}
/** @type {[typeof BatchMoveModal, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(BatchMoveModal, new BatchMoveModal({
    ...{ 'onCreated': {} },
    ref: "modal",
}));
const __VLS_1 = __VLS_0({
    ...{ 'onCreated': {} },
    ref: "modal",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
const __VLS_5 = ({ created: {} },
    { onCreated: (__VLS_ctx.fetchBatches) });
/** @type {typeof __VLS_ctx.modal} */ ;
var __VLS_6 = {};
// @ts-ignore
[fetchBatches, modal,];
var __VLS_2;
/** @type {[typeof ConfirmDialog, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(ConfirmDialog, new ConfirmDialog({
    ref: "confirmDialog",
}));
const __VLS_10 = __VLS_9({
    ref: "confirmDialog",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
/** @type {typeof __VLS_ctx.confirmDialog} */ ;
var __VLS_12 = {};
// @ts-ignore
[confirmDialog,];
var __VLS_11;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-content-between']} */ ;
/** @type {__VLS_StyleScopedClasses['align-items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-0']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-success']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-body']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['table-responsive']} */ ;
/** @type {__VLS_StyleScopedClasses['table']} */ ;
/** @type {__VLS_StyleScopedClasses['table-striped']} */ ;
/** @type {__VLS_StyleScopedClasses['align-middle']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['py-5']} */ ;
/** @type {__VLS_StyleScopedClasses['spinner-border']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['badge']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-info']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-0']} */ ;
/** @type {__VLS_StyleScopedClasses['text-end']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline-danger']} */ ;
// @ts-ignore
var __VLS_7 = __VLS_6, __VLS_13 = __VLS_12;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        BatchMoveModal: BatchMoveModal,
        ConfirmDialog: ConfirmDialog,
        batches: batches,
        loading: loading,
        modal: modal,
        confirmDialog: confirmDialog,
        openCreate: openCreate,
        fetchBatches: fetchBatches,
        confirmDelete: confirmDelete,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
