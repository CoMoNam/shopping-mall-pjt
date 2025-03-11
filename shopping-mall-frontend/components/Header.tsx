"use client";

import { useDispatch } from "react-redux";
import { logout, setLogin } from "@/store/authSlice";
import LoginHeader from "./LoginHeader";
import { LoginUser } from "@/types";
import { usePathname } from "next/navigation";

interface HeaderProps {
  user?: LoginUser | null;
}

const Header = ({ user }: HeaderProps) => {
  const pathname = usePathname(); // 현재 경로 가져오기
  const hideHeaderFooter = pathname === "/login" || pathname === "/join"; // 숨길 경로 조건
  const dispatch = useDispatch();

  if (user) {
    dispatch(setLogin({ isLoggedIn: true, user }));
  } else {
    dispatch(logout());
  }

  return (
    <>
      {user && !hideHeaderFooter && (
        <>
          <LoginHeader />
        </>
      )}
    </>
  );
};

export default Header;
