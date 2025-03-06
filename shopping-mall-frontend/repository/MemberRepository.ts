import { JoinRequestDto, LoginRequestDto } from "@/types/member";
import axios from "axios";
import Swal from "sweetalert2";
import "../styles/globals.css";

export class MemberRepository {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL + "/api/member";

  // 회원가입
  joinMember = (joinRequestDto: JoinRequestDto): Promise<string> => {
    return axios
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
            return new Promise((resolve) => {
              window.location.href = "/login";
              resolve(null);
            });
          },
        });
        return response.data; // 서버의 응답 데이터를 반환
      })
      .catch((error) => {
        let responseErrorData = "";
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

  // 로그인
  loginMember = (loginRequestDto: LoginRequestDto): Promise<string> => {
    return axios
      .post(`${this.baseUrl}/login`, loginRequestDto)
      .then((response) => {
        console.log("----성공----");
        console.log(response.data);
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
            icon: "error",
            html: responseErrorData,
            showConfirmButton: false,
            timer: 2000,
            customClass: {
              title: "swal-error-title",
            },
          });
          return error.response.data;
        }
      });
  };
}
