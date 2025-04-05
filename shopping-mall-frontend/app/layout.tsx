// vps wating

import { Metadata } from "next";
import "../styles/globals.css";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import HeaderWrapper from "@/components/HeaderWrapper";
import LoadingModal from "@/components/LoadingModal";
import { LoadingProvider } from "@/components/LoadingContext";
import PageLoadingHandler from "@/lib/PageLoadingHandler";

export const metadata: Metadata = {
  title: "SIDEMALL",
  description: "모든 상품판매를 담당하는 사이트 프로젝트",
  icons: {
    icon: "/sidemall-favicon.ico", // favicon 경로
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body className="body">
        <div className="main-container">
          <Providers>
            <HeaderWrapper />
            <LoadingProvider>
              <PageLoadingHandler />
              <main>{children}</main>
              <LoadingModal />
            </LoadingProvider>
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
