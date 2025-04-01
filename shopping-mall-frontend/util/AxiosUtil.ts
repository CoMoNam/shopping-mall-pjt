import axios from "axios";

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
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});
