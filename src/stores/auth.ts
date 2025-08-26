import { defineStore } from "pinia";
import axios from "@/api/http";

type Tokens = { access: string; refresh: string };

function getTokens(): Tokens | null {
   const raw = localStorage.getItem("tokens");
   return raw ? JSON.parse(raw) as Tokens : null;
}
function setTokens(tokens: Tokens | null) {
   if (tokens) localStorage.setItem("tokens", JSON.stringify(tokens));
   else localStorage.removeItem("tokens");
}

export const useAuthStore = defineStore("auth", {
   state: () => ({
      tokens: getTokens() as Tokens | null,
   }),
   getters: {
      isAuthenticated: (s) => !!s.tokens?.access,
      accessToken: (s) => s.tokens?.access || "",
      refreshToken: (s) => s.tokens?.refresh || "",
   },
   actions: {
      async login(username: string, password: string) {
         const { data } = await axios.post("/token/", { username, password }, { skipAuthRefresh: true });
         this.tokens = data;
         setTokens(data);
      },
      async logout() {
         this.tokens = null;
         setTokens(null);
      },
      setAccessToken(access: string) {
         if (!this.tokens) return;
         this.tokens = { ...this.tokens, access };
         setTokens(this.tokens);
      },
   },
});
