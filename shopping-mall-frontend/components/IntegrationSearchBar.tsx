"use client";

import { Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useRouter } from "next/navigation";

const IntegrationSearchBar = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    router.push(`/search?searchText=${searchText}`);
  };

  return (
    <>
      {/* 검색창 */}
      <Box sx={{ paddingY: 5, display: "flex", justifyContent: "center" }}>
        <TextField
          variant="outlined"
          placeholder="어떤 상품을 찾으세요?"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchText.trim() !== "") {
              handleSearch();
            }
          }}
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
            endAdornment: (
              <Box component="span" sx={{ marginLeft: 1 }}>
                <SearchIcon
                  onClick={() => {
                    if (searchText.trim() !== "") {
                      handleSearch();
                    }
                  }}
                  sx={{
                    cursor: "pointer",
                  }}
                />
              </Box>
            ),
          }}
        />
      </Box>
    </>
  );
};

export default IntegrationSearchBar;
