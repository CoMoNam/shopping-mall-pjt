"use client";

import "../../styles/globals.css";

import React, { useState } from "react";
import { ethers } from "ethers";
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
import { GiFox } from "react-icons/gi";
import { MemberRepository } from "@/repository/src/member/MemberRepository";
import { LoginRequestDto } from "@/types";
import { useRouter } from "next/navigation";
import { apiNodeClient } from "@/util/AxiosUtil";

const Login = () => {
  const router = useRouter();
  const memberRepository = new MemberRepository();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginButtonClick = async () => {
    const loginRequestDto: LoginRequestDto = {
      email: email,
      password: password,
    };
    await memberRepository.loginMember(loginRequestDto);
  };

  const walletLoginButtonClick = async (address: string) => {
    await memberRepository.walletLogin(address);
  };

  return (
    <Container maxWidth="sm" sx={{ paddingY: 15 }}>
      <Typography
        variant="h2" // 약간 더 눈에 띄는 크기
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
        <span
          style={{
            textDecoration: "none", // 밑줄 제거
            color: "inherit", // Typography 색상 상속
          }}
        >
          SIDEMALL4
        </span>
      </Typography>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                loginButtonClick();
              }
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                loginButtonClick();
              }
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
            onClick={() => loginButtonClick()}
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
              onClick={() => router.push("/join")}
            >
              회원가입 하러가기
            </Button>
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

          {/* 기타 로그인 버튼 */}
          <Button
            variant="contained"
            size="large"
            sx={{
              marginTop: 2,
              backgroundColor: "#f6851b", // 메타마스크 오렌지
              color: "white",
              "&:hover": {
                backgroundColor: "#e2761b",
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={async () => {
              if (typeof window !== "undefined" && window.ethereum) {
                try {
                  // 1. 지갑 연결 시작
                  const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                  });

                  if (!Array.isArray(accounts) || accounts.length === 0) {
                    console.warn("연결된 지갑이 없습니다.");
                    return;
                  }

                  const walletAddress = accounts[0];

                  // 2. 로그인 요청

                  // spring server 에 메시지 요청
                  const messageResponse = await apiNodeClient.post(
                    "/api/message",
                    {
                      address: walletAddress,
                    }
                  );
                  // 받아온 메시지
                  const message = messageResponse.data.message;

                  // 메시지 서명
                  const provider = new ethers.BrowserProvider(window.ethereum);
                  const signer = await provider.getSigner();
                  const signature = await signer.signMessage(message);

                  const verifySignature = await apiNodeClient.post(
                    "/api/verify",
                    {
                      address: walletAddress,
                      message: message,
                      signature,
                    }
                  );

                  const { valid } = await verifySignature.data;

                  if (!valid) {
                    alert("서명 검증 실패");
                    return;
                  }

                  await walletLoginButtonClick(walletAddress);
                } catch (error) {
                  console.error("MetaMask 로그인 오류:", error);
                }
              } else {
                alert("MetaMask가 설치되어 있지 않습니다.");
              }
            }}
          >
            <GiFox style={{ marginRight: 10 }} />
            메타마스크 로그인
          </Button>
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
