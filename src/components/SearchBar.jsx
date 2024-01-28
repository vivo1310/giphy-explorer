import React from "react";
import { Box, TextField, Button } from "@mui/material";

const SearchBar = ({ value, onChange, onSearch }) => {
  return (
    <Box
      sx={{
        width: "80%",
        textAlign: "center",
      }}
    >
      <TextField
        placeholder="Search for GIFs"
        variant="outlined"
        fullWidth
        margin="normal"
        value={value}
        onChange={onChange}
      />
      <Button
        size="large"
        sx={{ backgroundColor: "black" }}
        variant="contained"
        onClick={onSearch}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
