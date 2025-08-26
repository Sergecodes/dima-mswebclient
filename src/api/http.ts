import Axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/stores/auth";

const api = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
});

// Attach Authorization
api.interceptors.request.use((config: InternalAxiosRequestConfig & { skipAuthRefresh?: boolean }) => {
  const auth = useAuthStore();
  if (auth?.isAuthenticated && config.headers) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`;
  }
  return config;
});

let isRefreshing = false;
let pending: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) { pending.push(cb); }
function onRefreshed(token: string) { pending.forEach((cb) => cb(token)); pending = []; }

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const auth = useAuthStore();
    const original = (error.config || {}) as AxiosRequestConfig & { _retry?: boolean; skipAuthRefresh?: boolean };

    if (!auth || original?.skipAuthRefresh) throw error;

    if (error.response?.status === 401 && !original._retry && auth.refreshToken) {
      original._retry = true;
      try {
        const { data } = await Axios.post(`${api.defaults.baseURL}/token/refresh/`, { refresh: auth.refreshToken });
        auth.setAccessToken(data.access);
        original.headers = { ...(original.headers || {}), Authorization: `Bearer ${data.access}` };
        return api(original);
      } catch (e) {
        auth.logout();
        throw e;
      }
    }
    throw error;
  }
);

export default api;
