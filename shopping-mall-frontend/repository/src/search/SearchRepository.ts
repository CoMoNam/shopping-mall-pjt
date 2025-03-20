import { apiSsr } from "@/util/AxiosUtil";

export class SearchRepository {
  private baseUrl = "/api/elk/product";

  // 상품 elk 서치
  getElkProductList = async (cookie: string, searchText: string) => {
    return await apiSsr(cookie)
      .get(`${this.baseUrl}`, {
        params: {
          searchText,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  };
}
