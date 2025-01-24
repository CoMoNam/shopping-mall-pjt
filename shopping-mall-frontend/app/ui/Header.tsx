"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";

// import Badge from "@mui/material/Badge";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { Box, Tooltip } from "@mui/material";

import "../globals.css";

import LoginIcon from "@mui/icons-material/Login";
import { Tooltip } from "@mui/material";

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
      <Toolbar>
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            color: "black",
            cursor: "pointer",
          }}
        >
          <Link
            href={"/"}
            style={{
              textDecoration: "none", // 기본 밑줄 제거
              color: "black", // 글씨 색상을 검은색으로 설정 (Typography와 동일)
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

        <Link href={"/login"}>
          <Tooltip title="로그인" arrow>
            <IconButton aria-label="login">
              <LoginIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
