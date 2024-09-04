import { useAuthStore } from "@/stores/auth";
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

export const AXIOS_INSTANCE = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

AXIOS_INSTANCE.interceptors.request.use(
  async (config: any) => {
    const token = useAuthStore?.getState()?.token?.accessToken;

    if (config?.url?.includes("/login")) return config;
    config.headers = {
      Authorization: `bearer ${token}`,
    };
    return config;
  },
  (error) => {
    console.log("🚀 ~ file: index.ts:17 ~ error:", error);
    Promise.reject(error);
  }
);

const refreshAuthLogic = (failedRequest: any) => {
  useAuthStore.setState({
    user: null,
    token: null,
  });
  return Promise.reject(failedRequest);
};

// Instantiate the interceptor
createAuthRefreshInterceptor(AXIOS_INSTANCE, refreshAuthLogic, {
  statusCodes: [401, 403],
});
