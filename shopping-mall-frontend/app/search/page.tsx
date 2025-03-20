"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// ✅ ssr: false → 완전히 CSR 처리
const SearchPage = dynamic(() => import("@/components/search/SearchPage"), {
  ssr: false,
});

export default function SearchWrapper() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
            fontSize: "20px",
          }}
        ></div>
      }
    >
      <SearchPage />
    </Suspense>
  );
}
