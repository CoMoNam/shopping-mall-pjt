import { Role } from "../member/Role";

export interface LoginUser {
  id: number;
  email: string;
  nickname: string;
  role: Role;
  isLoggedIn: boolean;
}

export interface AuthState {
  user: LoginUser | null;
  isLoggedIn: boolean;
}

export interface JwtRequestInfo {
  token: string | undefined;
}

// export interface User {
//   id: number;
//   name: string;
//   email?: string;
// }
