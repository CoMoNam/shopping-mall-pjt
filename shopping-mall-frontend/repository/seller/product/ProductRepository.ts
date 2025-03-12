import { ProductSaveDto } from "@/types";
import { apiClient } from "@/util/AxiosUtil";
import axios from "axios";
import Swal from "sweetalert2";

export class ProductRepository {
  private baseUrl = "/api/seller/product";

  // 상품등록
  save = async (productSaveDto: ProductSaveDto): Promise<string> => {
    return await apiClient
      .post(`${this.baseUrl}`, productSaveDto)
      .then((response) => {
        console.log("====>> ?? ::" + response.data);
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
}
