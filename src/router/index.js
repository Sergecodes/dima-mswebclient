import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
const Login = () => import("@/views/Login.vue");
const Products = () => import("@/views/Products.vue");
const Locations = () => import("@/views/Locations.vue");
const StockMoves = () => import("@/views/StockMoves.vue");
const Inventory = () => import("@/views/Inventory.vue");
const StockBatch = () => import("@/views/StockBatch.vue");
const Reorder = () => import("@/views/ReorderSuggestions.vue");
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/login", name: "login", component: Login, meta: { public: true } },
        { path: "/", redirect: "/products" },
        { path: "/products", name: "products", component: Products },
        { path: "/locations", name: "locations", component: Locations },
        { path: "/stock-moves", name: "stock-moves", component: StockMoves },
        { path: "/inventory", name: "inventory", component: Inventory },
        { path: "/stock-batch", name: "stock-batch", component: StockBatch },
        { path: "/reorder", name: "reorder", component: Reorder },
    ],
});
router.beforeEach((to) => {
    const auth = useAuthStore();
    if (!to.meta.public && !auth.isAuthenticated) {
        return { name: "login", query: { next: to.fullPath } };
    }
    return true;
});
export default router;
