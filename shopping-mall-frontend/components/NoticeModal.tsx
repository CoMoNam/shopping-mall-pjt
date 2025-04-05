import { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500, // 기존 400 → 500
  maxHeight: "80vh", // 화면 대비 너무 커지지 않도록
  overflowY: "auto", // 내용이 넘치면 스크롤
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function LoginNoticeModal() {
  const [open, setOpen] = useState(true);

  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="notice-title">
      <Box sx={style}>
        <Typography id="notice-title" variant="h6" component="h2" gutterBottom>
          🔔 안내사항
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          1. 이 사이트는 개발 테스트용입니다. <br />
          2. 회원가입 및 로그인은 자유롭게 가능하며, 미구현된 기능이 많습니다.{" "}
          <br />
          3.❗️현재 배포되어있는 VPS 서버 사양이 낮아서, 동작이 많이 느립니다
          ❗️
          <br />
          ➡️ ➡️ ➡️ <strong> 일부 기능이 느리거나 지연될 수 있습니다.</strong>
          <br />
          ➡️ ➡️ ➡️{" "}
          <strong>
            {" "}
            개발 및 최적화는 지속적으로 계속해서 진행 중입니다. 감사합니다!
          </strong>
          <br />
          4. 데이터는 주기적으로 초기화 되고 있습니다. <br />
          <br />
          5. 가볍게 바로 테스트 하실 분들은 아래 계정을 사용해주세요.👇
          <br />
          <br />
          🏠 판매자 이메일 / 비밀번호 <br />
          seller1@naver.com / 1234 <br />
          seller2@naver.com / 1234 <br />
          <br />
          🏠 사용자 이메일 / 비밀번호 <br />
          customer1@naver.com / 1234 <br />
          customer2@naver.com / 1234 <br />
          <br />
          🔍 상품검색은 키워드 ➡️ 컴퓨터 ⬅️ 로 하시면 샘플 데이터 제일 많습니다.
        </Typography>
        <Button
          variant="contained"
          fullWidth
          onClick={handleClose}
          sx={{
            mt: 2,
            backgroundColor: "black",
            color: "white",
            "&:hover": {
              backgroundColor: "#333", // 호버 시 살짝 더 밝게
            },
          }}
        >
          확인했습니다
        </Button>
      </Box>
    </Modal>
  );
}
