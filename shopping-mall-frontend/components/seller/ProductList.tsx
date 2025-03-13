"use client";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress, // MUI 로딩 스피너
  Grid,
  MenuItem,
  Pagination,
  Rating,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../../styles/globals.css";
import { useEffect, useRef, useState } from "react";
import { ProductRepository } from "@/repository/src/product/ProductRepository";
import { ProductListDto } from "@/types";

const ProductList = () => {
  const [productList, setProductList] = useState<ProductListDto[]>([]);
  const [page, setPage] = useState(0); // 현재 페이지 (0부터 시작)
  const [size, setSize] = useState<string | number>(10); // 한 번에 가져올 데이터 개수
  const [totalPages, setTotalPages] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  ); // Timeout 저장
  const [loading, setLoading] = useState(false); // 로딩 상태
  const prevSearchKeyword = useRef<string | null>(null); // 이전 검색어를 저장하는 ref

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value - 1); // Pagination은 1부터 시작하므로 -1 해줌
  };

  useEffect(() => {
    const getProductList = async () => {
      const productRepository = new ProductRepository();
      const response = await productRepository.getProductList(
        searchKeyword,
        page,
        size
      );
      setProductList(response.content); // 결과를 상태에 저장
      setTotalPages(response.totalPages); // 페이지 수 업데이트
      setLoading(false); // 로딩 종료
    };

    if (typingTimeout) {
      clearTimeout(typingTimeout); // 이전 타이머 클리어
    }

    // **searchKeyword가 변할 때만 페이지를 초기화**
    if (prevSearchKeyword.current !== searchKeyword) {
      setPage(0); // 페이지 초기화
    }

    if (searchKeyword) {
      setLoading(true); // 로딩 시작
      const timeout = setTimeout(() => {
        getProductList();
      }, 1500);
      setTypingTimeout(timeout); // 새로운 타이머 저장
    } else {
      getProductList();
    }

    // 현재 searchKeyword를 ref에 저장
    prevSearchKeyword.current = searchKeyword;
  }, [searchKeyword, page, size]);

  return (
    <>
      <Box sx={{ paddingX: "5%", paddingY: 1, width: "100%" }}>
        <Box
          sx={{
            paddingY: 5,
            display: "flex",
            justifyContent: "space-between", // 좌우 정렬
            alignItems: "center",
          }}
        >
          {/* 검색 필드 */}
          <TextField
            variant="outlined"
            placeholder="물품을 검색해보세요"
            sx={{
              width: "50%", // 검색창 넓이 증가
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "black",
                },
                "&:hover fieldset": {
                  borderColor: "black",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "black",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <Box component="span" sx={{ marginRight: 1 }}>
                  <SearchIcon />
                </Box>
              ),
            }}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />

          {/* 페이징 UI */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "auto", // 오른쪽으로 붙이기
            }}
          >
            <Pagination
              count={totalPages}
              defaultPage={1}
              page={page + 1}
              onChange={handlePageChange}
              sx={{ marginRight: 2 }} // 페이징 간 여백
            />
            <Select
              value={size} // 현재 페이지 크기
              sx={{ width: 150 }}
              size="small"
              onChange={(e) => setSize(e.target.value)}
            >
              <MenuItem value={10}>10개씩 보기</MenuItem>
              <MenuItem value={20}>20개씩 보기</MenuItem>
              <MenuItem value={30}>30개씩 보기</MenuItem>
            </Select>
          </Box>
        </Box>

        {/* 로딩 상태일 때 로딩 스피너 표시 */}
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px", // 로딩 화면 높이 설정
            }}
          >
            <CircularProgress /> {/* 원형 로딩 스피너 */}
          </Box>
        ) : (
          <Grid container spacing={2}>
            {productList?.map((product) => (
              <Grid item xs={12} sm={6} md={2.4} key={product.id}>
                <Card
                  sx={{
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease-in-out",
                    height: "380px",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image="/ready_image.jpg"
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        overflow: "hidden", // 넘치는 텍스트 숨기기
                        textOverflow: "ellipsis", // 줄임표 표시
                        display: "-webkit-box", // flex 기반의 박스 모델
                        WebkitLineClamp: 2, // 최대 두 줄 표시
                        WebkitBoxOrient: "vertical", // 수직 정렬 설정
                        height: "70px",
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        height: "30px",
                      }}
                    >
                      {product.price.toLocaleString("ko-KR")}
                    </Typography>
                    <Rating value={product.rating} readOnly />
                    <Typography variant="body2" color="textSecondary">
                      {product.reviewCnt} 후기
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default ProductList;
