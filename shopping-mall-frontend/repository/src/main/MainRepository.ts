import { apiSsrClient } from "@/util/AxiosUtil";
import { AxiosError } from "axios";

export class MainRepository {
  private baseUrl = "/api/main";

  // 최근 상품 목록
  getRecentProductList = async (cookie: string) => {
    try {
      const response = await apiSsrClient(cookie).get(`${this.baseUrl}/recent`);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;

      if (axiosError.response && axiosError.response.data) {
        return axiosError.response.data;
      } else {
        return {
          message: "Unknown error occurred",
          detail: axiosError.message,
        };
      }
    }
  };
}
