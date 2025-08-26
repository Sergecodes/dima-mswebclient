import { ref, reactive, onMounted } from "vue";
import { Modal } from "bootstrap";
import api from "@/api/http";
const emit = defineEmits();
const modalEl = ref(null);
let modal = null;
const saving = ref(false);
const error = ref("");
const form = reactive({
    id: undefined,
    sku: "",
    name: "",
    barcode: "",
    category: "",
    cost: "0",
    sales_price: "0",
    is_active: true,
});
function open(product) {
    if (product)
        Object.assign(form, product);
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
        if (form.id)
            await api.put(`/products/${form.id}/`, form);
        else
            await api.post(`/products/`, form);
        emit("saved");
        hide();
    }
    catch (e) {
        error.value = e?.response?.data?.detail || "Failed to save";
    }
    finally {
        saving.value = false;
    }
}
onMounted(() => {
    if (modalEl.value)
        modal = new Modal(modalEl.value, { backdrop: "static" });
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
    ...{ class: "modal-dialog modal-lg" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "modal-content" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "modal-header bg-primary text-white" },
});
__VLS_asFunctionalElement(__VLS_elements.h5, __VLS_elements.h5)({
    ...{ class: "modal-title text-light" },
});
(__VLS_ctx.form.id ? "Edit Product" : "New Product");
// @ts-ignore
[form,];
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
    ...{ class: "row g-3" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "col-md-4" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "form-label" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    ...{ class: "form-control" },
    readonly: (!!__VLS_ctx.form.id),
    required: true,
});
(__VLS_ctx.form.sku);
// @ts-ignore
[form, form,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "col-md-8" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "form-label" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    ...{ class: "form-control" },
    required: true,
});
(__VLS_ctx.form.name);
// @ts-ignore
[form,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "col-md-4" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "form-label" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    ...{ class: "form-control" },
});
(__VLS_ctx.form.barcode);
// @ts-ignore
[form,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "col-md-4" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "form-label" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    ...{ class: "form-control" },
});
(__VLS_ctx.form.category);
// @ts-ignore
[form,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "col-md-2" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "form-label" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    ...{ class: "form-control" },
    type: "number",
    step: "0.01",
});
(__VLS_ctx.form.cost);
// @ts-ignore
[form,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "col-md-2" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "form-label" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    ...{ class: "form-control" },
    type: "number",
    step: "0.01",
});
(__VLS_ctx.form.sales_price);
// @ts-ignore
[form,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "col-md-2 form-check mt-4" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    id: "active",
    type: "checkbox",
    ...{ class: "form-check-input" },
});
(__VLS_ctx.form.is_active);
// @ts-ignore
[form,];
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    for: "active",
    ...{ class: "form-check-label" },
});
if (__VLS_ctx.error) {
    // @ts-ignore
    [error,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-danger mt-2" },
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
/** @type {__VLS_StyleScopedClasses['modal-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-content']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-header']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-title']} */ ;
/** @type {__VLS_StyleScopedClasses['text-light']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-close']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-close-white']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-body']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['g-3']} */ ;
/** @type {__VLS_StyleScopedClasses['col-md-4']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['col-md-8']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['col-md-4']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['col-md-4']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['col-md-2']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['col-md-2']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['col-md-2']} */ ;
/** @type {__VLS_StyleScopedClasses['form-check']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['form-check-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-check-label']} */ ;
/** @type {__VLS_StyleScopedClasses['text-danger']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
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
        saving: saving,
        error: error,
        form: form,
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
