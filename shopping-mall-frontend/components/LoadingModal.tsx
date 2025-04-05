"use client";
// vps wating
import { useEffect, useState } from "react";
import { Modal, Box, Typography, CircularProgress } from "@mui/material";
import { useLoading } from "./LoadingContext";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function LoadingModal() {
  const { isLoading } = useLoading();
  const [showModal, setShowModal] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        setShowModal(true);
      }, 500); // 0.5초 이상이면 모달 표시
      setTimer(timeout);
    } else {
      // 로딩 상태 끝났으면 모달 숨기고 타이머 클리어
      setShowModal(false);
      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }
    }
  }, [isLoading]);

  return (
    <Modal open={showModal} aria-labelledby="loading-modal-title">
      <Box sx={style}>
        <Typography id="loading-modal-title" variant="h6" gutterBottom>
          😭 저사양 VPS 서버에서 동작 중이라 페이지 이동이나 데이터 호출 속도가
          다소 느릴 수 있습니다.
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          💪 정식 서비스 땐 날아다니게 만들 자신 있습니다. 조금만 기다려 주세요
          🙇‍♀️
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress sx={{ color: "black" }} />
        </Box>
      </Box>
    </Modal>
  );
}
