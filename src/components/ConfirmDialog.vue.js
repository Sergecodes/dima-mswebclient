import { ref, reactive, onMounted, computed } from "vue";
import { Modal } from "bootstrap";
const modalEl = ref(null);
let modal = null;
const state = reactive({});
let resolver = null;
const headerClass = computed(() => state.variant === "danger" ? "bg-danger text-white" : "bg-primary text-white");
const confirmBtnClass = computed(() => state.variant === "danger" ? "btn-danger" : "btn-primary");
function open(opts) {
    Object.assign(state, {
        title: "Confirm",
        confirmText: "Confirm",
        variant: "primary",
        ...opts,
    });
    return new Promise((resolve) => {
        resolver = resolve;
        modal?.show();
    });
}
function close(result) {
    resolver?.(result);
    resolver = null;
    modal?.hide();
}
onMounted(() => {
    if (modalEl.value)
        modal = new Modal(modalEl.value, { backdrop: "static" });
});
const __VLS_exposed = { open };
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
    ...{ class: "modal-dialog" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "modal-content" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "modal-header" },
    ...{ class: (__VLS_ctx.headerClass) },
});
// @ts-ignore
[headerClass,];
__VLS_asFunctionalElement(__VLS_elements.h5, __VLS_elements.h5)({
    ...{ class: "modal-title text-light" },
});
(__VLS_ctx.state.title || "Confirm");
// @ts-ignore
[state,];
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.close(false);
            // @ts-ignore
            [close,];
        } },
    type: "button",
    ...{ class: "btn-close" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "modal-body" },
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "mb-0" },
});
(__VLS_ctx.state.message || "Are you sure?");
// @ts-ignore
[state,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "modal-footer" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.close(false);
            // @ts-ignore
            [close,];
        } },
    ...{ class: "btn btn-outline-secondary" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.close(true);
            // @ts-ignore
            [close,];
        } },
    ...{ class: "btn" },
    ...{ class: (__VLS_ctx.confirmBtnClass) },
});
// @ts-ignore
[confirmBtnClass,];
(__VLS_ctx.state.confirmText || "Confirm");
// @ts-ignore
[state,];
/** @type {__VLS_StyleScopedClasses['modal']} */ ;
/** @type {__VLS_StyleScopedClasses['fade']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-dialog']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-content']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-header']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-title']} */ ;
/** @type {__VLS_StyleScopedClasses['text-light']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-close']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-body']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-0']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        modalEl: modalEl,
        state: state,
        headerClass: headerClass,
        confirmBtnClass: confirmBtnClass,
        close: close,
    }),
});
export default (await import('vue')).defineComponent({
    setup: () => (__VLS_exposed),
});
; /* PartiallyEnd: #4569/main.vue */
