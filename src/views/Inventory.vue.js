import api from "@/api/http";
import { ref, onMounted } from "vue";
const items = ref([]);
const products = ref([]);
const locations = ref([]);
const loading = ref(false);
const productSku = ref("");
const locationCode = ref("");
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
        if (productSku.value)
            params.product_sku = productSku.value;
        if (locationCode.value)
            params.location_code = locationCode.value;
        const { data } = await api.get("/inventory/levels/", { params });
        items.value = data.results || data;
    }
    finally {
        loading.value = false;
    }
}
function reset() {
    productSku.value = "";
    locationCode.value = "";
    fetchList();
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
__VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
    ...{ class: "mb-3" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "row g-2" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "col-sm-4" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "form-label" },
});
__VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
    value: (__VLS_ctx.productSku),
    ...{ class: "form-select" },
});
// @ts-ignore
[productSku,];
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
    ...{ class: "col-sm-4" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "form-label" },
});
__VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
    value: (__VLS_ctx.locationCode),
    ...{ class: "form-select" },
});
// @ts-ignore
[locationCode,];
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
    ...{ class: "col-sm-4 d-flex align-items-end" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.fetchList) },
    ...{ class: "btn btn-outline-primary me-2" },
});
// @ts-ignore
[fetchList,];
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.reset) },
    ...{ class: "btn btn-outline-secondary" },
});
// @ts-ignore
[reset,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "table-responsive mt-3" },
});
__VLS_asFunctionalElement(__VLS_elements.table, __VLS_elements.table)({
    ...{ class: "table table-hover align-middle" },
});
__VLS_asFunctionalElement(__VLS_elements.thead, __VLS_elements.thead)({});
__VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
if (__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    __VLS_asFunctionalElement(__VLS_elements.tbody, __VLS_elements.tbody)({});
    __VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({});
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
        colspan: "3",
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
        colspan: "3",
        ...{ class: "text-center text-muted py-4" },
    });
}
else {
    __VLS_asFunctionalElement(__VLS_elements.tbody, __VLS_elements.tbody)({});
    for (const [lvl] of __VLS_getVForSourceType((__VLS_ctx.items))) {
        // @ts-ignore
        [items,];
        __VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({
            key: (lvl.id),
        });
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
        (lvl.product_sku);
        (lvl.product);
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
        (lvl.location_code);
        (lvl.location);
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
            ...{ class: "fw-semibold" },
        });
        (lvl.on_hand);
    }
}
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['g-2']} */ ;
/** @type {__VLS_StyleScopedClasses['col-sm-4']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-select']} */ ;
/** @type {__VLS_StyleScopedClasses['col-sm-4']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-select']} */ ;
/** @type {__VLS_StyleScopedClasses['col-sm-4']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-items-end']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['me-2']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['table-responsive']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['table']} */ ;
/** @type {__VLS_StyleScopedClasses['table-hover']} */ ;
/** @type {__VLS_StyleScopedClasses['align-middle']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['py-5']} */ ;
/** @type {__VLS_StyleScopedClasses['spinner-border']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['fw-semibold']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        items: items,
        products: products,
        locations: locations,
        loading: loading,
        productSku: productSku,
        locationCode: locationCode,
        fetchList: fetchList,
        reset: reset,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
