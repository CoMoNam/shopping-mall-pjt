import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Pagination,
  Rating,
  Select,
  MenuItem,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ProductRepository } from "@/repository/src/product/ProductRepository";
import { ProductListDto } from "@/types";
import "../../styles/globals.css";

const ProductList = () => {
  const [productList, setProductList] = useState<ProductListDto[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState<string | number>(10);
  const [totalPages, setTotalPages] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const prevSearchKeyword = useRef<string | null>(null);

  const [openModal, setOpenModal] = useState(false); // 모달 열기 상태
  const [selectedProduct, setSelectedProduct] = useState<ProductListDto | null>(
    null
  ); // 선택된 제품 정보

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value - 1);
  };

  useEffect(() => {
    const getProductList = async () => {
      const productRepository = new ProductRepository();
      const response = await productRepository.getProductList(
        searchKeyword,
        page,
        size
      );
      setProductList(response.content);
      setTotalPages(response.totalPages);
      setLoading(false);
    };

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    if (prevSearchKeyword.current !== searchKeyword) {
      setPage(0);
    }

    if (searchKeyword) {
      setLoading(true);
      const timeout = setTimeout(() => {
        getProductList();
      }, 1500);
      setTypingTimeout(timeout);
    } else {
      getProductList();
    }

    prevSearchKeyword.current = searchKeyword;
  }, [searchKeyword, page, size]);

  const handleProductClick = (product: ProductListDto) => {
    setSelectedProduct(product);
    setOpenModal(true); // 제품 클릭 시 모달 열기
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };

  const modifyButtonClick = () => {
    handleCloseModal();
  };

  return (
    <>
      <Box sx={{ paddingX: "5%", paddingY: 1, width: "100%" }}>
        <Box
          sx={{
            paddingY: 5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="물품을 검색해보세요"
            sx={{
              width: "50%",
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

          <Box
            sx={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
          >
            <Pagination
              count={totalPages}
              defaultPage={1}
              page={page + 1}
              onChange={handlePageChange}
              sx={{ marginRight: 2 }}
            />
            <Select
              value={size}
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

        {loading ? (
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
        ) : (
          <Grid container spacing={2}>
            {productList.map((product) => (
              <Grid item xs={12} sm={6} md={2.4} key={product.id}>
                <Card
                  sx={{
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease-in-out",
                    height: "390px",
                  }}
                  onClick={() => handleProductClick(product)} // 제품 클릭 시 모달 띄우기
                >
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
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ height: "30px" }}
                    >
                      {product.price.toLocaleString("ko-KR")}
                    </Typography>
                    <Rating value={product.rating} readOnly />
                    <Typography variant="body2" color="textSecondary">
                      {product.reviewCnt} 후기
                    </Typography>
                    <Typography variant="body2" color="error">
                      {product.quantity} 재고
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* 모달 */}
        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          sx={{ "& .MuiDialog-paper": { width: "1000px" } }}
        >
          <DialogTitle>제품 상세</DialogTitle>
          <DialogContent>
            {selectedProduct && (
              <>
                <Typography variant="h6">{selectedProduct.name}</Typography>
                <Typography variant="body1" color="textSecondary">
                  {selectedProduct.description}
                </Typography>
                <Typography variant="h6" sx={{ marginTop: 2 }}>
                  가격: {selectedProduct.price.toLocaleString("ko-KR")}원
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  리뷰: {selectedProduct.reviewCnt} 개 | 평점:{" "}
                  {selectedProduct.rating}
                </Typography>
                <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
                  재고: {selectedProduct.quantity}
                </Typography>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button sx={{ color: "black" }} onClick={handleCloseModal}>
              취소
            </Button>
            <Button sx={{ color: "black" }} onClick={modifyButtonClick}>
              수정
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default ProductList;
