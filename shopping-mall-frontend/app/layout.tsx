import Footer from "../components/Footer";
import Header from "../components/Header";
import { Metadata } from "next";
import "../styles/globals.css";

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
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
