"use client";

import "../globals.css";

import React from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Paper,
  Typography,
} from "@mui/material";
import { FaGoogle } from "react-icons/fa";
import { SiKakao } from "react-icons/si";
import Link from "next/link";

const Login = () => {
  return (
    <Container maxWidth="sm" sx={{ paddingY: 15 }}>
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          marginTop: 8,
          backgroundColor: "background.paper",
        }}
      >
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="이메일"
            variant="outlined"
            className="textField" // CSS 클래스 적용
            InputLabelProps={{
              shrink: true, // 레이블을 항상 축소된 상태로 유지
            }}
          />
          <TextField
            label="비밀번호"
            type="password"
            variant="outlined"
            className="textField"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Button
            variant="contained"
            size="large"
            sx={{
              marginTop: 2,
              backgroundColor: "#000000",
              color: "white",
              "&:hover": {
                backgroundColor: "#1a1a1a", // hover 시 색상 변경
              },
            }}
          >
            로그인
          </Button>

          {/* 아이디가 없으신가요? 회원가입 하러가기 텍스트 */}
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              textAlign: "center",
              marginTop: 1,
              fontSize: "0.875rem",
            }}
          >
            아이디가 없으신가요?{" "}
            <Link href={"/join"} style={{ color: "inherit" }}>
              <Button
                variant="text"
                sx={{
                  textTransform: "none",
                  color: "inherit",
                  fontSize: "inherit",
                  padding: 0,
                  textDecoration: "underline",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "black",
                  },
                }}
              >
                회원가입 하러가기
              </Button>
            </Link>
          </Typography>

          {/* 비밀번호를 잊으셨나요? 비밀번호 찾기 하러가기 텍스트 */}
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              textAlign: "center",
              marginTop: 1,
              fontSize: "0.875rem",
            }}
          >
            비밀번호를 잊으셨나요?{" "}
            <Button
              variant="text"
              sx={{
                textTransform: "none",
                color: "inherit",
                fontSize: "inherit",
                padding: 0,
                textDecoration: "underline",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "black",
                },
              }}
            >
              비밀번호 찾기
            </Button>
          </Typography>

          {/* 구글, 카카오 로그인 버튼 */}
          <Button
            variant="contained"
            size="large"
            sx={{
              marginTop: 2,
              backgroundColor: "#4285F4", // 구글 파란색
              color: "white",
              "&:hover": {
                backgroundColor: "#357AE8",
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaGoogle style={{ marginRight: 10 }} />
            구글 로그인
          </Button>

          <Button
            variant="contained"
            size="large"
            sx={{
              marginTop: 2,
              backgroundColor: "#FFCD00", // 카카오 노란색
              color: "black",
              "&:hover": {
                backgroundColor: "#F7C100",
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SiKakao style={{ marginRight: 10 }} />
            카카오 로그인
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
