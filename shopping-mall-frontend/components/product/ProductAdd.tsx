"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Alert,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import Image from "next/image";
import { Category, ProductSaveDto } from "@/types";
import { ProductRepository } from "@/repository/src/product/ProductRepository";
import Swal from "sweetalert2";
import "../../styles/globals.css";
import { CategoryRepository } from "@/repository/src/category/CategoryRepository";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const ProductAdd = () => {
  const productRepository = new ProductRepository();

  const [image, setImage] = useState<File | null>(null); // 업로드된 이미지 파일 상태
  const [preview, setPreview] = useState<string | null>(null); // 미리보기 URL 상태
  const [error, setError] = useState<string | null>(null); // 에러 메시지 상태

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">(0);
  const [quantity, setQuantity] = useState<number | "">(0);
  const [description, setDescription] = useState<string>("");

  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [category, setCategory] = useState<string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // 선택된 파일

    // 파일 유효성 검사
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError("파일 크기는 5MB를 초과할 수 없습니다.");
        return;
      }
      setError(null); // 에러 초기화
      setImage(file);
      setPreview(URL.createObjectURL(file)); // 미리보기 URL 생성
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null); // 미리보기 URL 삭제
    setError(null); // 에러 초기화
  };

  const productSave = async () => {
    const product: ProductSaveDto = {
      name: name,
      description: description,
      price: price,
      quantity: quantity,
      categoryName: category,
    };

    const result = await productRepository.save(product);
    if (result != null && result === "transaction is successfully completed") {
      Swal.fire({
        title: "상품이 등록되었습니다.",
        showConfirmButton: true,
        customClass: {
          title: "swal-confirm-title", // 제목 커스텀 클래스
          confirmButton: "swal-ok-button", // OK 버튼 커스텀 클래스
        },
      });

      // 저장시 내용 초기화
      setName("");
      setPrice(0);
      setQuantity(0);
      setDescription("");
      setCategory("");
    }
  };

  useEffect(() => {
    const callGetCategoryList = async () => {
      const categoryRepository = new CategoryRepository();
      setCategoryList(await categoryRepository.getCategoryList());
    };
    callGetCategoryList();
  }, []);

  console.log(image);

  return (
    <Container maxWidth="xl" sx={{ paddingY: 1, marginTop: 8 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3, // 점선 박스와 다른 요소 간 간격 조정
          padding: 2,
          marginTop: 4, // 박스가 위 요소와 떨어지도록 설정
          border: "1px dashed #ccc",
          borderRadius: "12px", // 더 둥글게 변경
          textAlign: "center",
          maxWidth: "500px", // 박스 크기를 늘림
          margin: "0 auto",
        }}
      >
        <Typography variant="h6" color="textSecondary">
          이미지 업로드
        </Typography>

        {/* 파일 업로드 에러 메시지 */}
        {error && (
          <Alert severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        )}

        {preview ? (
          <Box sx={{ textAlign: "center" }}>
            <Image
              src={preview} // Blob URL
              alt="미리보기"
              width="200"
              height="200"
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
            <Button
              variant="outlined"
              color="error"
              sx={{ marginTop: 2 }}
              onClick={handleRemoveImage}
            >
              이미지 제거
            </Button>
          </Box>
        ) : (
          <Button
            variant="contained"
            component="label"
            sx={{ backgroundColor: "black" }}
          >
            이미지 선택
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>
        )}
      </Box>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          paddingY: 10,
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="상품명"
            type="text"
            variant="outlined"
            className="textField"
            InputLabelProps={{
              shrink: true,
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            displayEmpty
            sx={{
              width: "180px",
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "black", // 포커스 시 검은색 테두리
              },
            }}
          >
            <MenuItem value="" disabled>
              카테고리 선택
            </MenuItem>
            {Array.isArray(categoryList) &&
              categoryList.map((i) => (
                <MenuItem key={i.id} value={i.name}>
                  {i.name}
                </MenuItem>
              ))}
          </Select>

          <TextField
            label="판매가격"
            type="text"
            variant="outlined"
            className="textField"
            InputLabelProps={{
              shrink: true,
            }}
            value={price}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setPrice(value === "" ? 0 : Number(value));
              }
            }}
            sx={{ maxWidth: "150px" }}
          />
          <TextField
            label="재고수량"
            type="text"
            variant="outlined"
            className="textField"
            InputLabelProps={{
              shrink: true,
            }}
            value={quantity}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                // Allow only digits
                setQuantity(value === "" ? 0 : Number(value));
              }
            }}
            sx={{ maxWidth: "150px" }}
          />
        </Box>

        {/* 상품 상세 설명 */}
        <TextField
          label="상품 상세 설명"
          type="text"
          variant="outlined"
          className="textField"
          multiline
          rows={15}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        />

        <Button
          variant="contained"
          size="large"
          sx={{
            // marginTop: 10,
            backgroundColor: "#000000",
            color: "white",
            "&:hover": {
              backgroundColor: "#1a1a1a",
            },
          }}
          onClick={productSave}
        >
          상품등록
        </Button>
      </Box>
    </Container>
  );
};

export default ProductAdd;
