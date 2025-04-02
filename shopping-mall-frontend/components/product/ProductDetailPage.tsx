"use client";

import { Box, Grid, Typography, Button, Stack } from "@mui/material";

export default function ProductDetailPage() {
  return (
    <Box sx={{ paddingX: "20%", paddingY: 20 }}>
      <Grid container spacing={8}>
        {/* 좌측: 상품 이미지 */}
        <Grid item xs={6}>
          <Box sx={{ position: "relative", width: "100%", height: 400 }}>
            {/* 실제 이미지 대신 빈 박스 */}
            <Box
              sx={{
                width: "100%",
                height: "100%",
                backgroundColor: "black",
              }}
            />
            {/* 이미지 준비중 오버레이 */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "20px",
                fontWeight: "bold",
                pointerEvents: "none",
              }}
            >
              이미지 준비중
            </Box>
          </Box>
        </Grid>

        {/* 우측: 설명 및 버튼 */}
        <Grid
          item
          xs={6}
          container
          direction="column"
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="h5" gutterBottom>
              상품명
            </Typography>
            <Typography variant="body1">
              상품에 대한 자세한 설명을 여기에 작성합니다.
              <br />
              가격, 재고, 특징 등을 표시할 수 있습니다.
            </Typography>
          </Box>

          {/* 우측 하단 버튼 영역 */}
          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            <Button variant="outlined" color="primary">
              장바구니 담기
            </Button>
            <Button variant="outlined" color="error">
              찜하기
            </Button>
            <Button variant="contained" color="success">
              구매하기
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
