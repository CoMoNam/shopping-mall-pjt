// vps wating

import axios from "axios";
import { setIsGlobalLoading } from "@/lib/loadingGlobalSetter";

// csr -> springboot call
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 10000,
});

// ssr -> springboot call
export const apiSsrClient = (cookie: string) => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Cookie: cookie, // 쿠키를 헤더에 포함
    },
    withCredentials: true, // 쿠키를 서버로 보내기 위해 설정
  });
};

// csr -> express call
export const apiNodeClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NODE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  setIsGlobalLoading(true); // 로딩 시작
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    setTimeout(() => setIsGlobalLoading(false), 300); // 잠시 후 로딩 끝
    return response;
  },
  (error) => {
    setTimeout(() => setIsGlobalLoading(false), 300);
    return Promise.reject(error);
  }
);
