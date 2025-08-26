import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter, RouterLink } from "vue-router";
const auth = useAuthStore();
const router = useRouter();
const authed = computed(() => auth.isAuthenticated);
async function logout() {
    auth.logout();
    router.push({ name: "login" });
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.nav, __VLS_elements.nav)({
    ...{ class: "navbar navbar-expand-lg navbar-dark bg-primary" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "container" },
});
const __VLS_0 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
RouterLink;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "navbar-brand fw-bold" },
    to: "/",
}));
const __VLS_2 = __VLS_1({
    ...{ class: "navbar-brand fw-bold" },
    to: "/",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
var __VLS_3;
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ class: "navbar-toggler" },
    type: "button",
    'data-bs-toggle': "collapse",
    'data-bs-target': "#nav",
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "navbar-toggler-icon" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    id: "nav",
    ...{ class: "collapse navbar-collapse" },
});
if (__VLS_ctx.authed) {
    // @ts-ignore
    [authed,];
    __VLS_asFunctionalElement(__VLS_elements.ul, __VLS_elements.ul)({
        ...{ class: "navbar-nav me-auto mb-2 mb-lg-0" },
    });
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "nav-item" },
    });
    const __VLS_5 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        ...{ class: "nav-link" },
        to: "/products",
    }));
    const __VLS_7 = __VLS_6({
        ...{ class: "nav-link" },
        to: "/products",
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    const { default: __VLS_9 } = __VLS_8.slots;
    var __VLS_8;
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "nav-item" },
    });
    const __VLS_10 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
        ...{ class: "nav-link" },
        to: "/locations",
    }));
    const __VLS_12 = __VLS_11({
        ...{ class: "nav-link" },
        to: "/locations",
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    const { default: __VLS_14 } = __VLS_13.slots;
    var __VLS_13;
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "nav-item" },
    });
    const __VLS_15 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
        ...{ class: "nav-link" },
        to: "/stock-moves",
    }));
    const __VLS_17 = __VLS_16({
        ...{ class: "nav-link" },
        to: "/stock-moves",
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    const { default: __VLS_19 } = __VLS_18.slots;
    var __VLS_18;
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "nav-item" },
    });
    const __VLS_20 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        ...{ class: "nav-link" },
        to: "/inventory",
    }));
    const __VLS_22 = __VLS_21({
        ...{ class: "nav-link" },
        to: "/inventory",
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    const { default: __VLS_24 } = __VLS_23.slots;
    var __VLS_23;
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "nav-item" },
    });
    const __VLS_25 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
        ...{ class: "nav-link" },
        to: "/stock-batch",
    }));
    const __VLS_27 = __VLS_26({
        ...{ class: "nav-link" },
        to: "/stock-batch",
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    const { default: __VLS_29 } = __VLS_28.slots;
    var __VLS_28;
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "nav-item" },
    });
    const __VLS_30 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
        ...{ class: "nav-link" },
        to: "/reorder",
    }));
    const __VLS_32 = __VLS_31({
        ...{ class: "nav-link" },
        to: "/reorder",
    }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    const { default: __VLS_34 } = __VLS_33.slots;
    var __VLS_33;
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "d-flex" },
});
if (!__VLS_ctx.authed) {
    // @ts-ignore
    [authed,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
}
else {
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (__VLS_ctx.logout) },
        ...{ class: "btn btn-outline-light" },
    });
    // @ts-ignore
    [logout,];
}
/** @type {__VLS_StyleScopedClasses['navbar']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-expand-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-dark']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-brand']} */ ;
/** @type {__VLS_StyleScopedClasses['fw-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-toggler']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-toggler-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['collapse']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-collapse']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['me-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-lg-0']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-item']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-item']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-item']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-item']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-item']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-item']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline-light']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        RouterLink: RouterLink,
        authed: authed,
        logout: logout,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
