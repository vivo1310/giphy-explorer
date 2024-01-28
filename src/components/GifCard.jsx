import React from "react";
import { Box, Popover, Typography, Card, styled } from "@mui/material";

const StyledCard = styled(Card)({
  cursor: "pointer",
});

const StyledCardMedia = styled("img")({
  width: "100%",
});

const StyledPopover = styled(Popover)(({ theme }) => ({
  "& .MuiPaper-root": {
    padding: theme.spacing(2),
  },
}));

const GifCard = ({ gif }) => {
  // State for Popover
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Popover for GIF details
  const handleGifClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleGifClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box key={gif.id}>
      <StyledCard onClick={handleGifClick}>
        <StyledCardMedia alt={gif.alt_text} src={gif.images.fixed_height.url} />
      </StyledCard>
      <StyledPopover
        id={gif.id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleGifClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div>
          <Typography variant="button">{gif.title}</Typography>
          <Typography variant="subtitle1">{gif.username}</Typography>
          <Typography variant="subtitle1">
            {`${gif.rating.toUpperCase()} rated` || "N/A"}
          </Typography>
        </div>
      </StyledPopover>
    </Box>
  );
};

export default GifCard;
