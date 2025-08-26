import api from "@/api/http";
import { ref, onMounted } from "vue";
import StockMoveModal from "@/components/StockMoveModal.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
const items = ref([]);
const products = ref([]);
const locations = ref([]);
const loading = ref(false);
// human-friendly filters
const filters = ref({
    type: "",
    product_sku: "",
    from_code: "",
    to_code: "",
});
const modal = ref(null);
const confirmDialog = ref(null);
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
        const params = {};
        if (filters.value.type)
            params.type = filters.value.type;
        if (filters.value.product_sku)
            params.product_sku = filters.value.product_sku;
        if (filters.value.from_code)
            params.from_code = filters.value.from_code;
        if (filters.value.to_code)
            params.to_code = filters.value.to_code;
        const { data } = await api.get("/stock-moves/", { params });
        items.value = data.results || data;
    }
    finally {
        loading.value = false;
    }
}
async function confirmDelete(id) {
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
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "row g-2" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "col-sm-3" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "form-label" },
});
__VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
    value: (__VLS_ctx.filters.type),
    ...{ class: "form-select" },
});
// @ts-ignore
[filters,];
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "",
});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "col-sm-3" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "form-label" },
});
__VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
    value: (__VLS_ctx.filters.product_sku),
    ...{ class: "form-select" },
});
// @ts-ignore
[filters,];
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "",
});
for (const [p] of __VLS_getVForSourceType((__VLS_ctx.products))) {
    // @ts-ignore
    [products,];
    __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
        key: (p.id),
        value: (p.sku),
    });
    (p.sku);
    (p.name);
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "col-sm-3" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "form-label" },
});
__VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
    value: (__VLS_ctx.filters.from_code),
    ...{ class: "form-select" },
});
// @ts-ignore
[filters,];
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "",
});
for (const [l] of __VLS_getVForSourceType((__VLS_ctx.locations))) {
    // @ts-ignore
    [locations,];
    __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
        key: (l.id),
        value: (l.code),
    });
    (l.code);
    (l.name);
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "col-sm-3" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "form-label" },
});
__VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
    value: (__VLS_ctx.filters.to_code),
    ...{ class: "form-select" },
});
// @ts-ignore
[filters,];
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "",
});
for (const [l] of __VLS_getVForSourceType((__VLS_ctx.locations))) {
    // @ts-ignore
    [locations,];
    __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
        key: (l.id),
        value: (l.code),
    });
    (l.code);
    (l.name);
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "mt-3 d-flex gap-2" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.fetchList) },
    ...{ class: "btn btn-outline-primary" },
});
// @ts-ignore
[fetchList,];
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.resetFilters) },
    ...{ class: "btn btn-outline-secondary" },
});
// @ts-ignore
[resetFilters,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "table-responsive mt-3" },
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
else if (!__VLS_ctx.items.length) {
    // @ts-ignore
    [items,];
    __VLS_asFunctionalElement(__VLS_elements.tbody, __VLS_elements.tbody)({});
    __VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({});
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
        colspan: "7",
        ...{ class: "text-center text-muted py-4" },
    });
}
else {
    __VLS_asFunctionalElement(__VLS_elements.tbody, __VLS_elements.tbody)({});
    for (const [m] of __VLS_getVForSourceType((__VLS_ctx.items))) {
        // @ts-ignore
        [items,];
        __VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({
            key: (m.id),
        });
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
        (new Date(m.timestamp).toLocaleString());
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "badge bg-info" },
        });
        (m.type);
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
        (m.product_sku || "#" + m.product);
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
        (m.qty);
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
        (m.from_code || "—");
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
        (m.to_code || "—");
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
            ...{ class: "text-end" },
        });
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!!(!__VLS_ctx.items.length))
                        return;
                    __VLS_ctx.confirmDelete(m.id);
                    // @ts-ignore
                    [confirmDelete,];
                } },
            ...{ class: "btn btn-sm btn-outline-danger" },
        });
    }
}
/** @type {[typeof StockMoveModal, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(StockMoveModal, new StockMoveModal({
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
    { onCreated: (__VLS_ctx.fetchList) });
/** @type {typeof __VLS_ctx.modal} */ ;
var __VLS_6 = {};
// @ts-ignore
[fetchList, modal,];
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
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['g-2']} */ ;
/** @type {__VLS_StyleScopedClasses['col-sm-3']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-select']} */ ;
/** @type {__VLS_StyleScopedClasses['col-sm-3']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-select']} */ ;
/** @type {__VLS_StyleScopedClasses['col-sm-3']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-select']} */ ;
/** @type {__VLS_StyleScopedClasses['col-sm-3']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-select']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['table-responsive']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
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
/** @type {__VLS_StyleScopedClasses['text-end']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline-danger']} */ ;
// @ts-ignore
var __VLS_7 = __VLS_6, __VLS_13 = __VLS_12;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        StockMoveModal: StockMoveModal,
        ConfirmDialog: ConfirmDialog,
        items: items,
        products: products,
        locations: locations,
        loading: loading,
        filters: filters,
        modal: modal,
        confirmDialog: confirmDialog,
        openCreate: openCreate,
        resetFilters: resetFilters,
        fetchList: fetchList,
        confirmDelete: confirmDelete,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
