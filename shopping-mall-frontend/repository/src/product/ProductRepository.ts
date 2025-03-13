import { ProductSaveDto } from "@/types";
import { apiClient } from "@/util/AxiosUtil";
import axios from "axios";
import Swal from "sweetalert2";

export class ProductRepository {
  private baseUrl = "/api/product";

  // 상품등록
  save = async (productSaveDto: ProductSaveDto): Promise<string> => {
    return await apiClient
      .post(`${this.baseUrl}`, productSaveDto)
      .then((response) => {
        return response.data; // 서버의 응답 데이터를 반환
      })
      .catch((error) => {
        let responseErrorData = "";
        if (axios.isAxiosError(error) && error.response) {
          if (Array.isArray(error.response.data)) {
            responseErrorData = error.response.data.join("<br>");
          } else {
            responseErrorData = error.response.data;
          }
          Swal.fire({
            // position: "top-end",
            icon: "error",
            html: responseErrorData,
            showConfirmButton: false,
            timer: 2000,
            customClass: {
              title: "swal-error-title", // 커스텀 클래스 추가
            },
          });
          return error.response.data;
        }
      });
  };

  // 내가 등록한 상품 조회
  getProductList = async (
    name: string,
    page: number,
    size: string | number
  ) => {
    return await apiClient
      .get(`${this.baseUrl}`, {
        params: { name, page, size },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  };
}
