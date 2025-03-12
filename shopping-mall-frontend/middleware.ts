import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // 비로그인 ONLY 경로
  const noAuthPages = ["/login", "/join"];
  // 현재경로확인
  const currentPath = req.nextUrl.pathname;

  // JWT 쿠키 확인
  const cookie = req.cookies.get("jwt");

  if (cookie && noAuthPages.includes(currentPath)) {
    // 로그인 상태라면 메인 페이지로 리다이렉트
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 정적 파일 요청 제외 (예: 이미지, CSS, JS, 폰트 등)
  const isStaticFile =
    /\.(png|jpg|jpeg|gif|svg|webp|css|js|ico|woff|woff2|ttf|eot)$/.test(
      currentPath
    );

  if (isStaticFile) {
    return NextResponse.next(); // 정적 파일은 요청 그대로 진행
  }

  if (currentPath.startsWith("/login") || currentPath.startsWith("/join")) {
    return NextResponse.next();
  }

  // 쿠키가 없으면 로그인 페이지로 리디렉션
  if (!cookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 쿠키가 있으면 요청 계속 진행
  return NextResponse.next();
}
