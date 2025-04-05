"use client";

import { useEffect, useState, useRef } from "react";
import { ProductListDto } from "@/types";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { SearchRepository } from "@/repository/src/search/SearchRepository";

interface Props {
  searchValue: string;
}

const SearchResult = ({ searchValue }: Props) => {
  const [products, setProducts] = useState<ProductListDto[]>([]);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  // ✅ 최초 검색어 변경 시 → 리스트 리셋 + page 0 초기화
  useEffect(() => {
    const fetchInitial = async () => {
      setLoading(true);
      setProducts([]);
      setPage(0);
      setHasMore(true);

      const searchRepository = new SearchRepository();
      const result = await searchRepository.getCsrElkProductList(
        searchValue,
        0
      );

      // 최소 0.5초 대기
      setTimeout(() => {
        setProducts(result);
        setLoading(false);
        if (!result || result.length === 0) setHasMore(false);
      }, 500);
    };

    fetchInitial();
  }, [searchValue]);

  // ✅ 무한스크롤 감지
  useEffect(() => {
    if (!observerRef.current || isLoading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          const fetchMore = async () => {
            setIsLoading(true);
            const nextPage = page + 1;

            const searchRepository = new SearchRepository();
            const result = await searchRepository.getCsrElkProductList(
              searchValue,
              nextPage
            );

            if (result && result.length > 0) {
              setProducts((prev) => [...prev, ...result]);
              setPage(nextPage);
            } else {
              setHasMore(false);
            }

            setIsLoading(false);
          };

          fetchMore();
        }
      },
      { threshold: 0.3 }
    );

    const current = observerRef.current;
    observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [observerRef, isLoading, hasMore, page, searchValue]);

  return (
    <Box sx={{ paddingX: "20%", paddingY: 3 }}>
      {loading ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
            }}
          >
            <Typography
              sx={{
                color: "black",
                fontWeight: 500,
                fontSize: "20px",
                marginRight: 5,
              }}
            >
              찾는 중...
            </Typography>
            <CircularProgress sx={{ color: "black" }} />
          </Box>
          <Box ref={observerRef} sx={{ display: "none" }} />
        </>
      ) : (
        <>
          <Grid container spacing={3}>
            {products.length > 0 ? (
              products.map((product, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    sx={{
                      position: "relative",
                      textAlign: "center",
                      cursor: "pointer",
                      height: "360px",
                      overflow: "hidden",
                      "&:hover img": {
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    {/* <Box
                      sx={{
                        overflow: "hidden",
                        height: "200px",
                        position: "relative",
                        backgroundColor: "black",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "200px",
                        background: "rgba(0,0,0,0.4)",
                        color: "white",
                        zIndex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "20px",
                        fontWeight: "bold",
                        pointerEvents: "none",
                      }}
                    >
                      이미지 준비중
                    </Box> */}
                    <CardMedia
                      component="img"
                      height="200"
                      image={`https://picsum.photos/300/200?random=${Math.floor(
                        Math.random() * 1000
                      )}`}
                      alt={product.name}
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          height: "70px",
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {product.price.toLocaleString("ko-KR")}원
                      </Typography>
                      <Rating value={product.rating} readOnly />
                      <Typography variant="body2" color="textSecondary">
                        {product.reviewCnt} 후기
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Card
                  elevation={0}
                  sx={{
                    height: "700px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h5" sx={{ color: "#888", mb: 1 }}>
                    찾으시는 상품이 없습니다.
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#aaa" }}>
                    검색어를 다시 입력해보세요.
                  </Typography>
                </Card>
              </Grid>
            )}
          </Grid>

          {/* 무한 스크롤 감지 영역 */}
          {products.length > 0 && (
            <Box
              ref={observerRef}
              sx={{
                textAlign: "center",
                py: 3,
                mt: 5,
                color: "gray",
                fontSize: "16px",
                backgroundColor: "#f3f3f3",
                width: "100%",
              }}
            >
              {isLoading
                ? "불러오는 중..."
                : hasMore
                ? "스크롤을 내려주세요 👇"
                : "더이상 상품이 없습니다 😎"}
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default SearchResult;
