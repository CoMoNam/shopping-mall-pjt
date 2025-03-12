"use client";
import "../styles/globals.css";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import { Box, Menu, MenuItem, Tooltip } from "@mui/material";

import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { AuthRepository } from "@/repository/global/auth/AuthRepository";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Role } from "@/types/member/Role";
import { useRouter } from "next/navigation";

const LoginHeader = () => {
  const authRepository = new AuthRepository();
  const auth = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // 프로필 메뉴 열기
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // 프로필 메뉴 닫기
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logoutButtonClick = async () => {
    handleMenuClose();
    await authRepository.logoutMember();
  };

  const myInfoButtonClick = () => {
    handleMenuClose();
  };

  const sellerManageButtonClick = () => {
    handleMenuClose();
    router.push("/product");
  };
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
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "33.3%" }} />

        <Typography
          variant="h4" // 약간 더 눈에 띄는 크기
          sx={{
            fontWeight: 700,
            color: "black",
            cursor: "pointer",
            textAlign: "center",
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: 2,
            textTransform: "uppercase",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
            width: "33.3%", // 중앙 영역 고정
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
        <Box
          sx={{
            width: "33.3%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Link href={"/order"}>
            <Tooltip title="주문" arrow>
              <IconButton aria-label="order">
                <Badge
                  badgeContent={0}
                  showZero // content 가 0 이어도 ui 노출
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
                  badgeContent={0}
                  showZero
                  color="error"
                  className="custom-badge" // CSS 클래스를 적용
                >
                  <ShoppingCartIcon fontSize="large" />
                </Badge>
              </IconButton>
            </Tooltip>
          </Link>
          <IconButton aria-label="mypage" onClick={handleMenuOpen}>
            <Badge color="secondary" className="custom-badge">
              <AccountCircleIcon fontSize="large" />
            </Badge>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={myInfoButtonClick}>내 정보</MenuItem>
            {auth.user?.role !== Role.CUSTOMER && (
              <MenuItem onClick={sellerManageButtonClick}>판매관리</MenuItem>
            )}
            <MenuItem onClick={logoutButtonClick}>로그아웃</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default LoginHeader;
