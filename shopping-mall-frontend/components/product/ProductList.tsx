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
import Swal from "sweetalert2";

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

  // 수정시 사용되는 데이터
  const [modifyPrice, setModifyPrice] = useState(0);
  const [addProductQuantity, setAddProductQuantity] = useState(0);

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
    setAddProductQuantity(0);
    setModifyPrice(0);
  };

  const modifyButtonClick = async () => {
    const productRepository = new ProductRepository();
    const product: ProductListDto = {
      id: selectedProduct!.id,
      name: selectedProduct!.name,
      description: selectedProduct!.description,
      price: modifyPrice, // 실제로 바뀔내용
      quantity: selectedProduct!.quantity + addProductQuantity, // 실제로 바뀔내용
      totalScore: selectedProduct!.totalScore,
      reviewCnt: selectedProduct!.reviewCnt,
      rating: selectedProduct!.rating,
      sellerId: selectedProduct!.sellerId,
      categoryName: selectedProduct!.categoryName,
    };

    const result = await productRepository.update(product);
    if (result != null && result === "transaction is successfully completed") {
      Swal.fire({
        title: "상품이 수정되었습니다.",
        showConfirmButton: true,
        customClass: {
          title: "swal-confirm-title", // 제목 커스텀 클래스
          confirmButton: "swal-ok-button", // OK 버튼 커스텀 클래스
        },
      });
      handleCloseModal();
    }
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
          sx={{}}
          maxWidth="sm"
          fullWidth={true}
        >
          <DialogTitle>제품 상세</DialogTitle>
          <DialogContent>
            {selectedProduct && (
              <>
                <Typography variant="h6">{selectedProduct.name}</Typography>
                <Typography variant="body1" color="textSecondary">
                  {selectedProduct.description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 2,
                  }}
                >
                  <Box>
                    {/* 기존 가격 (조건부로 취소선 표시) */}
                    <Typography
                      variant="h6"
                      sx={{
                        textDecoration:
                          modifyPrice > 0 ? "line-through" : "none",
                        color: modifyPrice > 0 ? "gray" : "inherit",
                      }}
                    >
                      가격: {selectedProduct.price.toLocaleString("ko-KR")}원
                    </Typography>

                    {/* 수정된 가격이 존재할 때는 새로운 가격도 함께 보여주기 */}
                    {modifyPrice > 0 && (
                      <Typography variant="h6" sx={{ color: "red" }}>
                        ➝ 수정가: {modifyPrice.toLocaleString("ko-KR")}원
                      </Typography>
                    )}
                  </Box>

                  <TextField
                    label="가격수정"
                    type="text"
                    variant="outlined"
                    className="textField"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={modifyPrice}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        setModifyPrice(value === "" ? 0 : Number(value));
                      }
                    }}
                    sx={{ maxWidth: "200px", ml: 2 }}
                  />
                </Box>

                <Typography variant="body2" color="textSecondary">
                  리뷰: {selectedProduct.reviewCnt} 개 | 평점:{" "}
                  {selectedProduct.rating}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 2,
                  }}
                >
                  <Box>
                    {/* 기존 재고 표시: 재고추가 값이 0 이상이면 취소선 처리 */}
                    <Typography
                      variant="body2"
                      color="error"
                      sx={{
                        marginTop: 1,
                        textDecoration:
                          addProductQuantity > 0 ? "line-through" : "none",
                        color: addProductQuantity > 0 ? "gray" : "error.main",
                      }}
                    >
                      재고: {selectedProduct.quantity}
                    </Typography>

                    {/* 재고추가 값이 있을 때 추가로 보여주기 */}
                    {addProductQuantity > 0 && (
                      <Typography variant="body2" sx={{ color: "red" }}>
                        ➝ 추가재고포함:{" "}
                        {selectedProduct.quantity + addProductQuantity} 개
                      </Typography>
                    )}
                  </Box>

                  <TextField
                    label="재고추가"
                    type="text"
                    variant="outlined"
                    className="textField"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={addProductQuantity}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        setAddProductQuantity(value === "" ? 0 : Number(value));
                      }
                    }}
                    sx={{ maxWidth: "200px", ml: 2 }}
                  />
                </Box>
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
