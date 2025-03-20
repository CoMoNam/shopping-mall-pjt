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

  const getRandomImageById = (id: number) => {
    const pseudoRandom = (id * 997) % 1000;
    return `https://picsum.photos/300/200?random=${pseudoRandom}`;
  };

  useEffect(() => {
    setHasMounted(true); // hydration 이후 flag
  }, []);

  useEffect(() => {
    if (!hasMounted || !observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          console.log("✅ 스크롤 감지됨!");

          const fetchMore = async () => {
            const nextPage = page + 1;

            const searchRepository = new SearchRepository();
            const result = await searchRepository.getMoreElkProductList(
              searchValue,
              nextPage
            );

            // ✅ result가 존재할 때만 추가
            if (result && result.length > 0) {
              setProducts((prev) => [...prev, ...result]);
              setPage(nextPage); // 나중에 업데이트
            }
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
  }, [hasMounted, page, searchValue]);

  return (
    <Box sx={{ paddingX: "20%", paddingY: 3 }}>
      <Grid container spacing={3}>
        {products.map((product, index) => (
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
              <Box
                sx={{
                  overflow: "hidden",
                  height: "200px",
                  position: "relative",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={getRandomImageById(product.id)}
                  alt={product.name}
                  sx={{ transition: "transform 0.3s ease-in-out" }}
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
        ))}
      </Grid>

      {/* 📌 무한 스크롤 감지 영역: 리스트 끝에 위치 */}
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
        스크롤을 내려주세요 👇
      </Box>
    </Box>
  );
};

export default SearchResult;
