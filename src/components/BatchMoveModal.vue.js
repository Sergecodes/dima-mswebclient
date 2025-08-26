import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";
import api from "@/api/http";
const emit = defineEmits();
const modalEl = ref(null);
let modal = null;
const products = ref([]);
const locations = ref([]);
const type = ref("INBOUND");
const from_location = ref("");
const to_location = ref("");
const lines = ref([
    { product: undefined, qty: "1" },
]);
const saving = ref(false);
const error = ref("");
function addLine() {
    lines.value.push({ product: undefined, qty: "1" });
}
function remove(i) {
    lines.value.splice(i, 1);
}
function open() {
    error.value = "";
    type.value = "INBOUND";
    from_location.value = "";
    to_location.value = "";
    lines.value = [{ product: undefined, qty: "1" }];
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
        const payload = {
            type: type.value,
            from_location: type.value !== "INBOUND" ? from_location.value || null : null,
            to_location: type.value !== "OUTBOUND" ? to_location.value || null : null,
            lines: lines.value.map((ln) => ({ product: ln.product, qty: ln.qty })),
        };
        await api.post("/stock-batches/", payload);
        emit("created");
        hide();
    }
    catch (e) {
        error.value = e?.response?.data?.detail || "Failed to create batch";
    }
    finally {
        saving.value = false;
    }
}
onMounted(() => {
    if (modalEl.value)
        modal = new Modal(modalEl.value, { backdrop: "static" });
    loadRefs();
});
const __VLS_exposed = { open, hide };
defineExpose(__VLS_exposed);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "modal fade" },
    tabindex: "-1",
    ref: "modalEl",
});
/** @type {typeof __VLS_ctx.modalEl} */ ;
// @ts-ignore
[modalEl,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "modal-dialog modal-xl" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "modal-content" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "modal-header bg-primary text-white" },
});
__VLS_asFunctionalElement(__VLS_elements.h5, __VLS_elements.h5)({
    ...{ class: "modal-title" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.hide();
            // @ts-ignore
            [hide,];
        } },
    type: "button",
    ...{ class: "btn-close btn-close-white" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "modal-body" },
});
__VLS_asFunctionalElement(__VLS_elements.form, __VLS_elements.form)({
    ...{ onSubmit: (__VLS_ctx.save) },
});
// @ts-ignore
[save,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "row g-3 mb-3" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "col-md-3" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "form-label" },
});
__VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
    value: (__VLS_ctx.type),
    ...{ class: "form-select" },
    required: true,
});
// @ts-ignore
[type,];
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "INBOUND",
});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "OUTBOUND",
});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "TRANSFER",
});
if (__VLS_ctx.type !== 'INBOUND') {
    // @ts-ignore
    [type,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "col-md-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        ...{ class: "form-label" },
    });
    __VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
        value: (__VLS_ctx.from_location),
        ...{ class: "form-select" },
        required: true,
    });
    // @ts-ignore
    [from_location,];
    __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
        disabled: true,
        value: "",
    });
    for (const [l] of __VLS_getVForSourceType((__VLS_ctx.locations))) {
        // @ts-ignore
        [locations,];
        __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
            key: (l.id),
            value: (l.id),
        });
        (l.code);
        (l.name);
    }
}
if (__VLS_ctx.type !== 'OUTBOUND') {
    // @ts-ignore
    [type,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "col-md-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        ...{ class: "form-label" },
    });
    __VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
        value: (__VLS_ctx.to_location),
        ...{ class: "form-select" },
        required: true,
    });
    // @ts-ignore
    [to_location,];
    __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
        disabled: true,
        value: "",
    });
    for (const [l] of __VLS_getVForSourceType((__VLS_ctx.locations))) {
        // @ts-ignore
        [locations,];
        __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
            key: (l.id),
            value: (l.id),
        });
        (l.code);
        (l.name);
    }
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "table-responsive" },
});
__VLS_asFunctionalElement(__VLS_elements.table, __VLS_elements.table)({
    ...{ class: "table align-middle" },
});
__VLS_asFunctionalElement(__VLS_elements.thead, __VLS_elements.thead)({});
__VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_elements.tbody, __VLS_elements.tbody)({});
for (const [ln, idx] of __VLS_getVForSourceType((__VLS_ctx.lines))) {
    // @ts-ignore
    [lines,];
    __VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({
        key: (idx),
    });
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
    __VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
        value: (ln.product),
        ...{ class: "form-select" },
        required: true,
    });
    __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
        disabled: true,
        value: "",
    });
    for (const [p] of __VLS_getVForSourceType((__VLS_ctx.products))) {
        // @ts-ignore
        [products,];
        __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
            key: (p.id),
            value: (p.id),
        });
        (p.sku);
        (p.name);
    }
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
    __VLS_asFunctionalElement(__VLS_elements.input)({
        type: "number",
        min: "0.01",
        step: "0.01",
        ...{ class: "form-control" },
        required: true,
    });
    (ln.qty);
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
        ...{ class: "text-end" },
    });
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.remove(idx);
                // @ts-ignore
                [remove,];
            } },
        type: "button",
        ...{ class: "btn btn-sm btn-outline-danger" },
    });
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "d-flex gap-2" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.addLine) },
    type: "button",
    ...{ class: "btn btn-outline-primary" },
});
// @ts-ignore
[addLine,];
if (__VLS_ctx.error) {
    // @ts-ignore
    [error,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-danger mt-3" },
    });
    (__VLS_ctx.error);
    // @ts-ignore
    [error,];
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "modal-footer" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.hide();
            // @ts-ignore
            [hide,];
        } },
    ...{ class: "btn btn-outline-secondary" },
    disabled: (__VLS_ctx.saving),
});
// @ts-ignore
[saving,];
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.save) },
    ...{ class: "btn btn-primary" },
    disabled: (__VLS_ctx.saving),
});
// @ts-ignore
[save, saving,];
if (!__VLS_ctx.saving) {
    // @ts-ignore
    [saving,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
}
else {
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "spinner-border spinner-border-sm" },
    });
}
/** @type {__VLS_StyleScopedClasses['modal']} */ ;
/** @type {__VLS_StyleScopedClasses['fade']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-dialog']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-content']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-header']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-title']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-close']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-close-white']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-body']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['g-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['col-md-3']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-select']} */ ;
/** @type {__VLS_StyleScopedClasses['col-md-4']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-select']} */ ;
/** @type {__VLS_StyleScopedClasses['col-md-4']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-select']} */ ;
/** @type {__VLS_StyleScopedClasses['table-responsive']} */ ;
/** @type {__VLS_StyleScopedClasses['table']} */ ;
/** @type {__VLS_StyleScopedClasses['align-middle']} */ ;
/** @type {__VLS_StyleScopedClasses['form-select']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['text-end']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline-danger']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-danger']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['spinner-border']} */ ;
/** @type {__VLS_StyleScopedClasses['spinner-border-sm']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        modalEl: modalEl,
        products: products,
        locations: locations,
        type: type,
        from_location: from_location,
        to_location: to_location,
        lines: lines,
        saving: saving,
        error: error,
        addLine: addLine,
        remove: remove,
        hide: hide,
        save: save,
    }),
    __typeEmits: {},
});
export default (await import('vue')).defineComponent({
    setup: () => (__VLS_exposed),
    __typeEmits: {},
});
; /* PartiallyEnd: #4569/main.vue */
