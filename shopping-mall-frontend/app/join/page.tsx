"use client";

import "../globals.css";

import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const Join = () => {
  // 상태 관리: 전체 동의, 개별 항목의 동의 상태
  const [allAgree, setAllAgree] = useState(false);
  const [agreements, setAgreements] = useState({
    over14: false,
    termsOfService: false,
    privacyPolicy: false,
    marketingConsent: false,
    notifications: false,
  });
  // 상태 관리: 비밀번호 관리
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");

  // 전체 동의/선택 관리
  const handleAllAgreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setAllAgree(checked);
    setAgreements({
      over14: checked,
      termsOfService: checked,
      privacyPolicy: checked,
      marketingConsent: checked,
      notifications: checked,
    });
  };

  // 개별 항목 동의 관리
  const handleAgreementChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = event.target;
    setAgreements((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
    if (event.target.value !== password) {
      setPasswordError(true);
      setPasswordHelperText("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordError(false);
      setPasswordHelperText("");
    }
  };

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
          {/* 기존 TextFields */}
          <TextField
            label="이메일"
            type="text"
            variant="outlined"
            className="textField"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="사용자이름"
            type="text"
            variant="outlined"
            className="textField"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="활동명"
            type="text"
            variant="outlined"
            className="textField"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="비밀번호 설정"
            type="password"
            className="textField"
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="비밀번호 재설정"
            type="password"
            className="textField"
            variant="outlined"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            fullWidth
            error={passwordError}
            helperText={passwordHelperText}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="메인주소"
            type="text"
            variant="outlined"
            className="textField"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="상세주소"
            type="text"
            variant="outlined"
            className="textField"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="주소 추가사항"
            type="text"
            variant="outlined"
            className="textField"
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* 약관 동의 */}
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allAgree}
                    onChange={handleAllAgreeChange}
                    sx={{
                      "&.Mui-checked": {
                        color: "black", // 체크박스를 선택했을 때 색상 변경
                      },
                    }}
                  />
                }
                label="전체 동의"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    color: "black", // 텍스트 색상 고정
                  },
                }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreements.over14}
                    onChange={handleAgreementChange}
                    name="over14"
                    sx={{
                      "&.Mui-checked": {
                        color: "black", // 체크박스를 선택했을 때 색상 변경
                      },
                    }}
                  />
                }
                label="만 14세 이상입니다(필수)"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    color: "black", // 텍스트 색상 고정
                  },
                }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreements.termsOfService}
                    onChange={handleAgreementChange}
                    name="termsOfService"
                    sx={{
                      "&.Mui-checked": {
                        color: "black", // 체크박스를 선택했을 때 색상 변경
                      },
                    }}
                  />
                }
                label="이용약관(필수)"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    color: "black", // 텍스트 색상 고정
                  },
                }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreements.privacyPolicy}
                    onChange={handleAgreementChange}
                    name="privacyPolicy"
                    sx={{
                      "&.Mui-checked": {
                        color: "black", // 체크박스를 선택했을 때 색상 변경
                      },
                    }}
                  />
                }
                label="개인정보수집 및 이용동의(필수)"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    color: "black", // 텍스트 색상 고정
                  },
                }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreements.marketingConsent}
                    onChange={handleAgreementChange}
                    name="marketingConsent"
                    sx={{
                      "&.Mui-checked": {
                        color: "black", // 체크박스를 선택했을 때 색상 변경
                      },
                    }}
                  />
                }
                label="개인정보 마케팅 활용 동의(선택)"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    color: "black", // 텍스트 색상 고정
                  },
                }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreements.notifications}
                    onChange={handleAgreementChange}
                    name="notifications"
                    sx={{
                      "&.Mui-checked": {
                        color: "black", // 체크박스를 선택했을 때 색상 변경
                      },
                    }}
                  />
                }
                label="이벤트, 쿠폰, 특가 알림 메일 및 SMS 등 수신(선택)"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    color: "black", // 텍스트 색상 고정
                  },
                }}
              />
            </FormGroup>
          </FormControl>

          <Button
            variant="contained"
            size="large"
            sx={{
              marginTop: 2,
              backgroundColor: "#000000",
              color: "white",
              "&:hover": {
                backgroundColor: "#1a1a1a",
              },
            }}
          >
            회원가입
          </Button>

          {/* 아이디가 있으신가요? 로그인 하러가기 텍스트 */}
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              textAlign: "center",
              marginTop: 1,
              fontSize: "0.875rem",
            }}
          >
            아이디가 있으신가요?{" "}
            <Link href={"/login"} style={{ color: "inherit" }}>
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
                로그인 하러가기
              </Button>
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Join;
