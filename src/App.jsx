import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { Masonry } from "@mui/lab";
import GifCard from "./components/GifCard";
import GifMasonry from "./components/GifMasonry";
import SearchBar from "./components/SearchBar";
import { fetchTrendingGifs, searchGifs } from "./services/giphyService";
import useInfiniteScroll from "./hooks/useInfiniteScroll";

import "./App.css";
import trendingUp from "./assets/trending-up.svg";
import giphyIcon from "./assets/giphy-icon.png";
import searchIcon from "./assets/search.svg";

function App() {
  const SEARCH_RESULT_TEXT = [searchIcon, "SEARCH RESULTS"];
  const TRENDING_TEXT = [trendingUp, "TRENDING"];
  const [titleText, setTitleText] = useState(TRENDING_TEXT);
  const [gifs, setGifs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalGifs, setTotalGifs] = useState(0);

  const fetchGifs = async () => {
    try {
      setLoading(true);
      setError(null);
      const offset = gifs.length; // Calculate offset based on number of gifs
      const response = searchQuery
        ? await searchGifs(searchQuery, offset)
        : await fetchTrendingGifs(offset);
      const total = response.pagination.total_count; // Calculate total number of gifs
      setTotalGifs(total); // Update total number of gifs
      setGifs((prevGifs) => [...prevGifs, ...response.data]);
    } catch (err) {
      setError("Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // DISPLAY TRENDING GIF
  useEffect(() => {
    fetchGifs();
  }, []); // Fetch trending GIFs on component mount

  useInfiniteScroll(() => {
    if (gifs.length < totalGifs && !loading && !error) {
      fetchGifs();
    }
  }, [loading, error, gifs, totalGifs, searchQuery]);

  // SEARCH GIFS
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchButtonClicked = (event) => {
    setTitleText(SEARCH_RESULT_TEXT);
    setGifs([]); // Reset gifs list when performing a new search
    fetchGifs(); // Trigger searchGifs function when user type
  };

  const renderTitleText = ([icon, text]) => {
    return (
      <>
        <img src={icon} alt={text} width="40px" />
        <Typography sx={{ fontWeight: "700", fontSize: "1.5rem" }}>
          {text}
        </Typography>
      </>
    );
  };

  return (
    <Box className="container">
      <img src={giphyIcon} alt="giphy icon" />
      <Typography sx={{ fontWeight: "800", fontSize: "2rem" }}>
        EXPLORER
      </Typography>
      <SearchBar
        value={searchQuery}
        onChange={handleSearchInputChange}
        onSearch={handleSearchButtonClicked}
      />
      <Box className="titleText">{renderTitleText(titleText)}</Box>
      <GifMasonry gifs={gifs} />
      {loading && (
        <div style={{ textAlign: "center", padding: "16px" }}>
          <CircularProgress />
        </div>
      )}
      {error && (
        <Typography
          variant="body1"
          color="error"
          style={{ textAlign: "center", padding: "16px" }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default App;
