import axios from "axios";
import { Configuration } from "../api";

function setupResponseInterceptor() {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status;
      const paginaAtual = window.location.pathname.split("/").pop();
      if (status === 401 && !["login", "register"].includes(paginaAtual!)) {
        window.location.href = "/login";
        return Promise.reject(error);
      }
      if (status === 403 && !["login", "register"].includes(paginaAtual!)) {
        window.location.href = "/home";
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
