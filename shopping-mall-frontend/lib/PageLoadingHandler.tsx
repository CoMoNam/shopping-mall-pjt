"use client";
// vps wating
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLoading } from "../components/LoadingContext";

export default function PageLoadingHandler() {
  const pathname = usePathname();
  const { setIsLoading } = useLoading();

  useEffect(() => {
    setIsLoading(true);

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500); // 500ms 동안 로딩 상태 유지

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null; // UI 출력은 없음
}
