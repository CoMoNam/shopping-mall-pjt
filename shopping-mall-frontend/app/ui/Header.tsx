"use client";
import "../globals.css";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import { Box, Tooltip } from "@mui/material";

// import Badge from "@mui/material/Badge";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import LoginIcon from "@mui/icons-material/Login";

const Header = () => {
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

        {/* 아이콘 버튼들 오른쪽 정렬 */}
        {/* <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Link href={"/order"}>
            <Tooltip title="주문" arrow>
              <IconButton aria-label="order">
                <Badge
                  badgeContent={4}
                  color="error"
                  className="custom-badge" // CSS 클래스를 적용
                >
                  <LocalShippingIcon fontSize="large" />
                </Badge>
              </IconButton>
            </Tooltip>
          </Link>
          <Link href={"/cart"}>
            <Tooltip title="장바구니" arrow>
              <IconButton aria-label="cart">
                <Badge
                  badgeContent={10}
                  color="error"
                  className="custom-badge" // CSS 클래스를 적용
                >
                  <ShoppingCartIcon fontSize="large" />
                </Badge>
              </IconButton>
            </Tooltip>
          </Link>
          <IconButton aria-label="mypage">
            <Badge color="secondary" className="custom-badge">
              <AccountCircleIcon fontSize="large" />
            </Badge>
          </IconButton>
        </Box> */}

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

export default Header;
