import { JwtRequestInfo, LoginUser } from "@/types";
import { apiClient } from "@/util/AxiosUtil";

export class AuthRepository {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL + "/api/auth";

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
}
