import { apiClient, apiSsr } from "@/util/AxiosUtil";

export class SearchRepository {
  private baseUrl = "/api/elk/product";

  // 상품 elk 최초 데이터
  getElkProductList = async (
    cookie: string,
    searchText: string,
    page: number
  ) => {
    return await apiSsr(cookie)
      .get(`${this.baseUrl}`, {
        params: {
          searchText,
          page,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  };

  // 상품 elk 추가 데이터
  getMoreElkProductList = async (searchText: string, page: number) => {
    return await apiClient
      .get(`${this.baseUrl}`, {
        params: {
          searchText,
          page,
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
