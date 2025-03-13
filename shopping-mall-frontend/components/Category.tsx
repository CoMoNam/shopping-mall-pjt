"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CheckroomSharpIcon from "@mui/icons-material/CheckroomSharp";
import FaceIcon from "@mui/icons-material/Face";
import FoodIcon from "@mui/icons-material/Restaurant";
import LocalLaundryServiceSharpIcon from "@mui/icons-material/LocalLaundryServiceSharp";
import LiveTvSharpIcon from "@mui/icons-material/LiveTvSharp";
import LaptopIcon from "@mui/icons-material/Laptop";
import SportsTennisSharpIcon from "@mui/icons-material/SportsTennisSharp";
import AirplanemodeActiveSharpIcon from "@mui/icons-material/AirplanemodeActiveSharp";
import HomeIcon from "@mui/icons-material/Home";
import CarIcon from "@mui/icons-material/DirectionsCar";
import PhoneAndroidSharpIcon from "@mui/icons-material/PhoneAndroidSharp";
import CategoryIcon from "@mui/icons-material/Category";
import { Typography } from "@mui/material";

const categories = [
  { name: "패션의류/잡화", icon: <CheckroomSharpIcon /> },
  { name: "뷰티", icon: <FaceIcon /> },
  { name: "식품", icon: <FoodIcon /> },
  { name: "주방용품", icon: <LocalLaundryServiceSharpIcon /> },
  { name: "가전제품", icon: <LiveTvSharpIcon /> },
  { name: "컴퓨터/노트북", icon: <LaptopIcon /> },
  { name: "스포츠", icon: <SportsTennisSharpIcon /> },
  { name: "여행", icon: <AirplanemodeActiveSharpIcon /> },
  { name: "홈인테리어", icon: <HomeIcon /> },
  { name: "자동차용품", icon: <CarIcon /> },
  { name: "전자제품", icon: <PhoneAndroidSharpIcon /> },
  { name: "기타", icon: <CategoryIcon /> },
];

const Category = () => {
  // const iconMap: Record<string, () => JSX.Element> = {
  //   car: () => <CarIcon />,
  //   home: () => <HomeIcon />,
  //   dog: () => <DogIcon />,
  // };

  // const IconComponent = iconMap[iconNameFromDB] || (() => <DefaultIcon />);
  // return <IconComponent />;
  return (
    <Box sx={{ paddingX: "20%", paddingY: 3 }}>
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={4} sm={3} md={2} key={category.name}>
            <Box
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
              <Typography variant="h2">{category.icon}</Typography>
              <Typography variant="body1">{category.name}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Category;
