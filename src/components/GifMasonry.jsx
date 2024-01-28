import React from "react";
import { Masonry } from "@mui/lab";
import GifCard from "./GifCard";

const GifMasonry = ({ gifs }) => {
  return (
    <Masonry columns={4} spacing={2}>
      {gifs.map((gif) => (
        <GifCard key={gif.id} gif={gif} />
      ))}
    </Masonry>
  );
};

export default GifMasonry;
