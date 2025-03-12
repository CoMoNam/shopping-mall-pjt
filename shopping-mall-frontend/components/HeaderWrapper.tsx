import { cookies } from "next/headers";
import Header from "./Header";
import { JwtRequestInfo, LoginUser } from "@/types";
import { AuthRepository } from "@/repository/global/auth/AuthRepository";

export default async function HeaderWrapper() {
  const authRepository = new AuthRepository();
  const cookieStore = await cookies();
  const jwtValue = cookieStore.get("jwt")?.value;
  const jwtInfo: JwtRequestInfo = {
    token: jwtValue,
  };

  let loginUser: LoginUser | null = null;

  if (jwtValue) {
    try {
      const response = await authRepository.getJwtInfo(jwtInfo);

      if (response && response.isLoggedIn) {
        loginUser = response;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return <Header user={loginUser} />;
}
