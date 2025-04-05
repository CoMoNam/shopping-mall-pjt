"use client";

import { useRouter } from "next/navigation";
import { Button, Box, Typography } from "@mui/material";

export default function NotFound() {
  const router = useRouter();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 4,
      }}
    >
      <Typography variant="h3" gutterBottom>
        😢 페이지를 찾을 수 없습니다.
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        존재하지 않는 경로이거나, 이동한 페이지가 삭제되었을 수 있습니다.
      </Typography>
      <Button
        variant="contained"
        onClick={() => router.push("/")}
        sx={{
          backgroundColor: "black",
          "&:hover": { backgroundColor: "#333" },
        }}
      >
        홈으로 돌아가기
      </Button>
    </Box>
  );
}
