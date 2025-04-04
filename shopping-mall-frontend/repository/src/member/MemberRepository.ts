import { JoinRequestDto, LoginRequestDto } from "@/types";
import axios from "axios";
import Swal from "sweetalert2";
import "../../../styles/globals.css";
import { apiClient } from "@/util/AxiosUtil";

export class MemberRepository {
  private baseUrl = "/api/member";

  // 회원가입
  joinMember = async (joinRequestDto: JoinRequestDto): Promise<string> => {
    return await apiClient
      .post(`${this.baseUrl}/join`, joinRequestDto)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "회원가입 성공. 로그인 페이지로 이동합니다.",
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
        let responseErrorData = "알 수 없는 오류가 발생했습니다.";
        // Axios 에러 처리
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
          return error.response.data.join("\n"); // 서버의 에러 메시지를 반환
        }
      });
  };

  // 로그인 : 일반
  loginMember = async (loginRequestDto: LoginRequestDto): Promise<boolean> => {
    return await apiClient
      .post(`${this.baseUrl}/login`, loginRequestDto)
      .then((response) => {
        window.location.href = "/";
        return response.data;
      })
      .catch((error) => {
        let responseErrorData = "알 수 없는 오류가 발생했습니다.";

        if (axios.isAxiosError(error) && error.response) {
          if (Array.isArray(error.response.data)) {
            responseErrorData = error.response.data.join("<br>");
          } else {
            responseErrorData = error.response.data;
          }
          Swal.fire({
            icon: "error",
            html: responseErrorData,
            showConfirmButton: false,
            timer: 2000,
            customClass: {
              title: "swal-error-title",
            },
          });
          return responseErrorData;
        }
      });
  };

  // 로그인 : wallet
  walletLogin = async (address: string): Promise<boolean> => {
    return await apiClient
      .post(`${this.baseUrl}/wallet-login`, { address })
      .then((response) => {
        window.location.href = "/";
        return response.data;
      })
      .catch((error) => {
        let responseErrorData = "알 수 없는 오류가 발생했습니다.";

        if (axios.isAxiosError(error) && error.response) {
          if (Array.isArray(error.response.data)) {
            responseErrorData = error.response.data.join("<br>");
          } else {
            responseErrorData = error.response.data;
          }
          Swal.fire({
            icon: "error",
            html: responseErrorData,
            showConfirmButton: false,
            timer: 2000,
            customClass: {
              title: "swal-error-title",
            },
          });
          return responseErrorData;
        }
      });
  };
}
