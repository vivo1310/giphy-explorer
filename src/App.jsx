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
import { fetchTrendingGifs, searchGifs } from "./services/giphyService";
import "./App.css";
import trendingUp from "./assets/trending-up.svg";
import giphyIcon from "./assets/giphy-icon.png";
import useInfiniteScroll from "./hooks/useInfiniteScroll";

function App() {
  const [gifs, setGifs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalGifs, setTotalGifs] = useState(0);

  const fetchGifs = async () => {
    try {
      setLoading(true);
      const offset = gifs.length; // Calculate offset based on number of gifs
      const response = searchQuery
        ? await searchGifs(searchQuery, offset)
        : await fetchTrendingGifs(offset);
      const total = response.pagination.total_count; // Calculate total number of gifs
      setTotalGifs(total); // Update total number of gifs

      setGifs((prevGifs) => [...prevGifs, ...response.data]);
      setOffset((prevOffset) => prevOffset + 10); // Assuming you want to load 10 more items
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
    if (gifs.length < totalGifs && !loading) {
      fetchGifs();
    }
  }, [loading, error, gifs, totalGifs, searchQuery]);

  // SEARCH GIFS
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchButtonClicked = (event) => {
    setGifs([]); // Reset gifs list when performing a new search
    fetchGifs(); // Trigger searchGifs function when user type
  };

  return (
    <Box className="container">
      <img src={giphyIcon} alt="giphy icon" />
      <Typography sx={{ fontWeight: "800", fontSize: "2rem" }}>
        EXPLORER
      </Typography>
      <Box className="searchBox">
        <TextField
          placeholder="Search for GIFs"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <Button
          size="large"
          sx={{ backgroundColor: "black" }}
          variant="contained"
          onClick={handleSearchButtonClicked}
        >
          Search
        </Button>
      </Box>
      <Box className="titleText">
        <img src={trendingUp} alt="trending up icon" width="40px" />
        <Typography sx={{ fontWeight: "700", fontSize: "1.5rem" }}>
          {searchQuery ? "SEARCH RESULTS" : "TRENDING"}
        </Typography>
      </Box>
      <Masonry columns={4} spacing={2}>
        {gifs.map((gif) => (
          <GifCard gif={gif} />
        ))}
        {loading && (
          <div style={{ textAlign: "center", padding: "16px" }}>
            <CircularProgress />
          </div>
        )}
      </Masonry>
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
