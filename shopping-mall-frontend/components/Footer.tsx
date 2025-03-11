"use client";

import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  // const pathname = usePathname(); // 현재 경로 가져오기
  // const hideHeaderFooter = pathname === "/login" || pathname === "/join"; // 숨길 경로 조건

  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: 2,
        backgroundColor: "grey.900",
        color: "white",
        marginTop: "auto",
        textAlign: "center",
      }}
    >
      <Typography variant="body2" sx={{ marginBottom: 1 }}>
        &copy; {new Date().getFullYear()} SIDEMALL. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
