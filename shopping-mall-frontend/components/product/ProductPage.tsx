"use client";

import { Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
import ProductList from "./ProductList";
import ProductAdd from "./ProductAdd";

export default function ProductPage() {
  const menuList: string[] = ["판매목록", "상품등록", "판매현황"];
  const [selected, setSelected] = useState<string | null>(menuList[0]); // 선택된 항목 상태

  const handleSelection = (item: string) => {
    setSelected(item); // 선택된 항목 저장
  };

  return (
    <>
      <Box sx={{ display: "flex", paddingY: 3 }}>
        {/* 왼쪽 네비게이션바 */}
        <Box
          sx={{
            width: "15%", // 네비게이션바의 너비
            padding: 2,
            borderRight: "1px solid #ddd", // 네비게이션 구분선
          }}
        >
          <Typography
            variant="h4"
            sx={{ marginBottom: 10, textAlign: "center" }}
          >
            판매관리
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {menuList.map((item) => (
              <Box
                key={item}
                onClick={() => handleSelection(item)} // 클릭 시 상태 업데이트
                sx={{
                  cursor: "pointer",
                  padding: 5,
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  backgroundColor:
                    selected === item ? "#f0f0f0" : "transparent", // 선택된 항목 스타일
                  borderRadius: selected === item ? "4px" : "none",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                    borderRadius: "4px",
                  },
                }}
              >
                <Typography sx={{ fontSize: "1.2rem" }}>{item}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* 오른쪽 콘텐츠 영역 */}
        <Box sx={{ width: "85%", paddingX: 1 }}>
          <Grid container spacing={3}>
            {selected === menuList[0] && <ProductList />}
            {selected === menuList[1] && <ProductAdd />}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
