import { defineStore } from "pinia";
import axios from "@/api/http";
function getTokens() {
    const raw = localStorage.getItem("tokens");
    return raw ? JSON.parse(raw) : null;
}
function setTokens(tokens) {
    if (tokens)
        localStorage.setItem("tokens", JSON.stringify(tokens));
    else
        localStorage.removeItem("tokens");
}
export const useAuthStore = defineStore("auth", {
    state: () => ({
        tokens: getTokens(),
    }),
    getters: {
        isAuthenticated: (s) => !!s.tokens?.access,
        accessToken: (s) => s.tokens?.access || "",
        refreshToken: (s) => s.tokens?.refresh || "",
    },
    actions: {
        async login(username, password) {
            const { data } = await axios.post("/token/", { username, password }, { skipAuthRefresh: true });
            this.tokens = data;
            setTokens(data);
        },
        async logout() {
            this.tokens = null;
            setTokens(null);
        },
        setAccessToken(access) {
            if (!this.tokens)
                return;
            this.tokens = { ...this.tokens, access };
            setTokens(this.tokens);
        },
    },
});
