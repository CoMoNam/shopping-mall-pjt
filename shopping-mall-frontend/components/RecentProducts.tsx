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
interface RecentProductsProps {
  recentProductList: ProductListDto[];
}
const RecentProducts: React.FC<RecentProductsProps> = ({
  recentProductList,
}) => {
  return (
    <>
      <Box sx={{ paddingX: "20%", paddingY: 15 }}>
        <Grid container spacing={2}>
          {Array.isArray(recentProductList) &&
            recentProductList.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
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
                    height: "360px",
                  }}
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
                    <Typography variant="body2" color="textSecondary">
                      {product.price}
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
      </Box>
    </>
  );
};

export default RecentProducts;
