import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // JWT 쿠키 확인
  const cookie = req.cookies.get("jwt");
  // 현재경로확인
  const currentPath = req.nextUrl.pathname;

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
