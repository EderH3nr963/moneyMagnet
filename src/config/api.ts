import axios from "axios";
import { Configuration } from "../api";

function setupResponseInterceptor() {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status;
      if (status === 401) {
        window.location.href = "/";
        return Promise.reject(error);
      }
      if (status === 403) {
        window.location.href = "/login";
        return Promise.reject(error);
      }
      return Promise.reject(error);
    },
  );
}

setupResponseInterceptor();

export function getApiConfig(): Configuration {
  return new Configuration({
    basePath: import.meta.env.VITE_API_BASE_URI,
    accessToken: () => localStorage.getItem("token") ?? "",
  });
}

export const apiConfig = getApiConfig();
