"use client";

import { useEffect, useState, useRef } from "react";
import { ProductListDto } from "@/types";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { SearchRepository } from "@/repository/src/search/SearchRepository";

interface Props {
  elkProductList: ProductListDto[];
  searchValue: string;
}

const SearchResult = ({ elkProductList, searchValue }: Props) => {
  const [products, setProducts] = useState<ProductListDto[]>(elkProductList);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터 있는지

  useEffect(() => {
    setHasMounted(true); // hydration 이후 flag
  }, []);

  useEffect(() => {
    if (!hasMounted || !observerRef.current || isLoading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          const fetchMore = async () => {
            setIsLoading(true);
            const nextPage = page + 1;

            const searchRepository = new SearchRepository();
            const result = await searchRepository.getMoreElkProductList(
              searchValue,
              nextPage
            );

            if (result && result.length > 0) {
              setProducts((prev) => [...prev, ...result]);
              setPage(nextPage);
            } else {
              setHasMore(false); // 👉 더 이상 데이터 없음
            }

            setIsLoading(false);
          };

          fetchMore();
        }
      },
      {
        threshold: 0.3,
      }
    );

    const current = observerRef.current;
    observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasMounted, page, searchValue, isLoading, hasMore]);

  useEffect(() => {
    setProducts(elkProductList);
    setPage(0);
    setHasMore(true);
  }, [searchValue, elkProductList]);

  return (
    <Box sx={{ paddingX: "20%", paddingY: 3 }}>
      <Grid container spacing={3}>
        {products.length > 0 ? (
          products.map((product, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              {/* 기존 상품 카드 */}
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
                {/* 이미지 없을때 */}
                <Box
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
                </Box>
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
              sx={{
                height: "700px", // 💡 대략 8개의 카드 높이 합산한 공간
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
            : "상품이 없습니다 😎"}
        </Box>
      )}
    </Box>
  );
};

export default SearchResult;
