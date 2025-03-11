"use client";
import "../styles/globals.css";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import { Box, Tooltip } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

const LogoutHeader = () => {
  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{
        borderBottom: "1px solid #ddd",
        paddingX: "20%",
        backgroundColor: "#ffffff",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h4" // 약간 더 눈에 띄는 크기
          sx={{
            fontWeight: 700, // Bold한 느낌을 강조
            color: "black", // 기본 색상
            cursor: "pointer",
            textAlign: "center",
            flexGrow: 1, // 중앙 정렬
            fontFamily: "'Poppins', sans-serif", // 세련된 로고용 폰트
            letterSpacing: 2, // 글자 간격을 넓게 조정해 고급스러운 느낌
            textTransform: "uppercase", // 대문자로 변환
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)", // 약간의 그림자 효과 추가
          }}
        >
          <Link
            href={"/"}
            style={{
              textDecoration: "none", // 밑줄 제거
              color: "inherit", // Typography 색상 상속
            }}
          >
            SIDEMALL
          </Link>
        </Typography>
        <Box>
          <Link href={"/login"}>
            <Tooltip title="로그인" arrow>
              <IconButton aria-label="login">
                <LoginIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default LogoutHeader;
