import { apiSsr } from "@/util/AxiosUtil";

export class MainRepository {
  private baseUrl = "/api/main";

  // 최근 상품 목록
  getRecentProductList = async (cookie: string) => {
    return await apiSsr(cookie)
      .get(`${this.baseUrl}/recent`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  };
}
