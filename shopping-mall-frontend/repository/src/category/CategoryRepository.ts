import { apiClient } from "@/util/AxiosUtil";

export class CategoryRepository {
  private baseUrl = "/api/category";

  // 내가 등록한 상품 조회
  getCategoryList = async () => {
    return await apiClient
      .get(`${this.baseUrl}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  };
}
