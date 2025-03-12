import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../../styles/globals.css";

interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "삼립 돌아온 로켓단 초코롤, 85g, 1개",
    price: "₩20,000",
    imageUrl: "/sample_product/product1.png",
    rating: 4.5,
    reviewCount: 120,
  },
  {
    id: 2,
    name: "백설 숯불갈비맛 후랑크, 120g, 1개",
    price: "₩30,000",
    imageUrl: "/sample_product/product2.png",
    rating: 3.8,
    reviewCount: 95,
  },
  {
    id: 3,
    name: "LG전자 디오스 오브제컬렉션 832L 양문형 냉장고 메탈",
    price: "₩25,000",
    imageUrl: "/sample_product/product3.png",
    rating: 4.2,
    reviewCount: 50,
  },
  {
    id: 4,
    name: "스마트 TV + 삼탠바이미 V1 이동식 거치대 세트",
    price: "₩15,000",
    imageUrl: "/sample_product/product4.png",
    rating: 4.8,
    reviewCount: 200,
  },
  {
    id: 5,
    name: "게이밍PC i5 13400F RTX4060 조립컴퓨터",
    price: "₩20,000",
    imageUrl: "/sample_product/product5.png",
    rating: 4.5,
    reviewCount: 120,
  },
  {
    id: 6,
    name: "베이직스 2024 베이직북 16 N-시리즈 N95",
    price: "₩30,000",
    imageUrl: "/sample_product/product6.png",
    rating: 3.8,
    reviewCount: 95,
  },
  {
    id: 7,
    name: "에어로케이 제주도 항공권 특가 항공권 제주 항공권",
    price: "₩25,000",
    imageUrl: "/sample_product/product7.png",
    rating: 4.2,
    reviewCount: 50,
  },
  {
    id: 8,
    name: "로얄리노 대용량 이불 옷 패브릭 정리함",
    price: "₩15,000",
    imageUrl: "/sample_product/product8.png",
    rating: 4.8,
    reviewCount: 200,
  },
];

const ProductList = () => {
  return (
    <>
      <Box sx={{ paddingX: "5%", paddingY: 1 }}>
        <Box sx={{ paddingY: 5, display: "flex", justifyContent: "left" }}>
          <TextField
            variant="outlined"
            placeholder="물품을 검색해보세요"
            sx={{
              width: "30%",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "black", // 기본 테두리 색상 (포커스 안될 때)
                },
                "&:hover fieldset": {
                  borderColor: "black", // hover 시 테두리 색상
                },
                "&.Mui-focused fieldset": {
                  borderColor: "black", // 포커스 시 테두리 색상
                },
              },
              "& .MuiInputLabel-root": {
                color: "black", // 기본 레이블 색상
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "black", // 포커스 상태에서 레이블 색상
              },
            }}
            InputProps={{
              startAdornment: (
                <Box component="span" sx={{ marginRight: 1 }}>
                  <SearchIcon />
                </Box>
              ),
            }}
          />
        </Box>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={2.4} key={product.id}>
              <Card
                sx={{
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    color: "inherit",
                    transform: "scale(1.1)",
                    animation: "shake 0.5s ease-in-out",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.imageUrl}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {product.price}
                  </Typography>
                  <Rating value={product.rating} readOnly />
                  <Typography variant="body2" color="textSecondary">
                    {product.reviewCount} 후기
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default ProductList;
