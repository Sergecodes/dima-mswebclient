import api from "@/api/http";
import { ref, onMounted, watch } from "vue";
import ProductModal from "@/components/ProductModal.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
const items = ref([]);
const search = ref("");
const loading = ref(false);
const productModal = ref(null);
const confirmDialog = ref(null);
async function fetchList() {
    loading.value = true;
    try {
        const params = {};
        if (search.value.trim())
            params.search = search.value.trim();
        const { data } = await api.get("/products/", { params });
        items.value = data.results || data;
    }
    finally {
        loading.value = false;
    }
}
function openCreate() {
    productModal.value?.open(null);
}
function openEdit(p) {
    productModal.value?.open(p);
}
async function confirmDelete(p) {
    const ok = await confirmDialog.value?.open({
        title: "Delete Product",
        message: `Are you sure you want to delete product ${p.sku}? This cannot be undone.`,
        confirmText: "Delete",
        variant: "danger",
    });
    if (ok) {
        await api.delete(`/products/${p.id}/`);
        await fetchList();
    }
}
// Debounced dynamic search
let timer = null;
watch(search, () => {
    clearTimeout(timer);
    timer = setTimeout(fetchList, 400);
});
onMounted(fetchList);
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
    ...{ class: "mb-3" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    ...{ class: "form-control" },
    placeholder: "Search by SKU or Name…",
    'aria-label': "Search products",
});
(__VLS_ctx.search);
// @ts-ignore
[search,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "table-responsive" },
});
__VLS_asFunctionalElement(__VLS_elements.table, __VLS_elements.table)({
    ...{ class: "table table-hover align-middle" },
});
__VLS_asFunctionalElement(__VLS_elements.thead, __VLS_elements.thead)({});
__VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({
    ...{ class: "text-end" },
});
if (__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    __VLS_asFunctionalElement(__VLS_elements.tbody, __VLS_elements.tbody)({});
    __VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({});
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
        colspan: "6",
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
        colspan: "6",
        ...{ class: "text-center text-muted py-4" },
    });
}
else {
    __VLS_asFunctionalElement(__VLS_elements.tbody, __VLS_elements.tbody)({});
    for (const [p] of __VLS_getVForSourceType((__VLS_ctx.items))) {
        // @ts-ignore
        [items,];
        __VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({
            key: (p.id),
        });
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
            ...{ class: "fw-semibold" },
        });
        (p.sku);
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
        (p.name);
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
        (p.category || "—");
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
        (p.sales_price);
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "badge" },
            ...{ class: (p.is_active ? 'bg-success' : 'bg-secondary') },
        });
        (p.is_active ? "Yes" : "No");
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
            ...{ class: "text-end" },
        });
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!!(!__VLS_ctx.items.length))
                        return;
                    __VLS_ctx.openEdit(p);
                    // @ts-ignore
                    [openEdit,];
                } },
            ...{ class: "btn btn-sm btn-outline-primary me-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!!(!__VLS_ctx.items.length))
                        return;
                    __VLS_ctx.confirmDelete(p);
                    // @ts-ignore
                    [confirmDelete,];
                } },
            ...{ class: "btn btn-sm btn-outline-danger" },
        });
    }
}
/** @type {[typeof ProductModal, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(ProductModal, new ProductModal({
    ...{ 'onSaved': {} },
    ref: "productModal",
}));
const __VLS_1 = __VLS_0({
    ...{ 'onSaved': {} },
    ref: "productModal",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
const __VLS_5 = ({ saved: {} },
    { onSaved: (__VLS_ctx.fetchList) });
/** @type {typeof __VLS_ctx.productModal} */ ;
var __VLS_6 = {};
// @ts-ignore
[fetchList, productModal,];
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
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['table-responsive']} */ ;
/** @type {__VLS_StyleScopedClasses['table']} */ ;
/** @type {__VLS_StyleScopedClasses['table-hover']} */ ;
/** @type {__VLS_StyleScopedClasses['align-middle']} */ ;
/** @type {__VLS_StyleScopedClasses['text-end']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['py-5']} */ ;
/** @type {__VLS_StyleScopedClasses['spinner-border']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['fw-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['badge']} */ ;
/** @type {__VLS_StyleScopedClasses['text-end']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['me-2']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline-danger']} */ ;
// @ts-ignore
var __VLS_7 = __VLS_6, __VLS_13 = __VLS_12;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        ProductModal: ProductModal,
        ConfirmDialog: ConfirmDialog,
        items: items,
        search: search,
        loading: loading,
        productModal: productModal,
        confirmDialog: confirmDialog,
        fetchList: fetchList,
        openCreate: openCreate,
        openEdit: openEdit,
        confirmDelete: confirmDelete,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
