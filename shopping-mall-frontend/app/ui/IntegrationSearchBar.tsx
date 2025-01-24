import { Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const IntegrationSearchBar = () => {
  return (
    <>
      {/* 검색창 */}
      <Box sx={{ paddingY: 5, display: "flex", justifyContent: "center" }}>
        <TextField
          variant="outlined"
          placeholder="어떤 서비스가 필요하신가요?"
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
    </>
  );
};

export default IntegrationSearchBar;
