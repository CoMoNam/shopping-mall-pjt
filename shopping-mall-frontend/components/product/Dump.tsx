import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography,
  CircularProgress,
} from "@mui/material";

interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
}

// Simulated all product data
const allProducts: Product[] = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1, // Unique ID
  name: `상품 ${index + 1}`,
  price: `₩${(index + 1) * 1000}`,
  imageUrl: `/sample_product/product${(index % 10) + 1}.png`,
  rating: parseFloat((Math.random() * 5).toFixed(1)),
  reviewCount: Math.floor(Math.random() * 500),
}));

const Dump = () => {
  const [products, setProducts] = useState<Product[]>([]); // Current visible products
  const [page, setPage] = useState<number>(1); // Current page number
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const itemsPerPage = 10; // Items per page

  useEffect(() => {
    // Initial data load
    loadMoreProducts();
  }, []);

  const loadMoreProducts = () => {
    if (loading) return; // Prevent duplicate requests
    if ((page - 1) * itemsPerPage >= allProducts.length) return; // No more data
    setLoading(true);

    setTimeout(() => {
      const startIndex = (page - 1) * itemsPerPage;
      const newProducts = allProducts.slice(
        startIndex,
        startIndex + itemsPerPage
      );
      setProducts((prev) => [...prev, ...newProducts]); // Append new data
      setPage((prev) => prev + 1);
      setLoading(false);
    }, 1000); // Simulated delay for loading
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    // Detect when scroll reaches the bottom (slight tolerance for floating-point mismatches)
    if (scrollHeight - scrollTop - clientHeight <= 1 && !loading) {
      loadMoreProducts();
    }
  };

  return (
    <Box
      sx={{ paddingX: "5%", paddingY: 10, height: "80vh", overflow: "auto" }}
      onScroll={handleScroll} // Detect scroll events
    >
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={2.3} key={product.id}>
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

      {/* Loading spinner */}
      {loading && (
        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {/* End of list message */}
      {!loading && products.length >= allProducts.length && (
        <Typography sx={{ textAlign: "center", marginTop: 2 }}>
          모든 상품을 불러왔습니다.
        </Typography>
      )}
    </Box>
  );
};

export default Dump;
