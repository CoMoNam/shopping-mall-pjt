import { JwtRequestInfo, LoginUser } from "@/types";
import { apiClient } from "@/util/AxiosUtil";
import axios from "axios";
import Swal from "sweetalert2";

export class AuthRepository {
  private baseUrl = "/api/auth";

  getJwtInfo = async (jwtRequestInfo: JwtRequestInfo): Promise<LoginUser> => {
    return await apiClient
      .post(`${this.baseUrl}/get_token_info`, jwtRequestInfo)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  // 로그아웃
  logoutMember = async (): Promise<string> => {
    return await apiClient
      .post(`${this.baseUrl}/logout`)
      .then((response) => {
        Swal.fire({
          title: "로그아웃 되었습니다. 로그인 페이지로 이동합니다.",
          showConfirmButton: true,
          customClass: {
            title: "swal-confirm-title", // 제목 커스텀 클래스
            confirmButton: "swal-ok-button", // OK 버튼 커스텀 클래스
          },
          preConfirm: () => {
            window.location.href = "/login";
          },
        });
        return response.data; // 서버의 응답 데이터를 반환
      })
      .catch((error) => {
        // Axios 에러 처리
        if (axios.isAxiosError(error) && error.response) {
          Swal.fire({
            // position: "top-end",
            icon: "error",
            title: "시스템 오류 발생",
            showConfirmButton: false,
            timer: 2000,
            customClass: {
              title: "swal-error-title", // 커스텀 클래스 추가
            },
          });
          return error.response.data; // 서버의 에러 메시지를 반환
        }
      });
  };
}
