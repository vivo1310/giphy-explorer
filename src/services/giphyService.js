const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

export const fetchTrendingGifs = async (offset = 0) => {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=10&offset=${offset}`
  );
  const parsedResponse = await response.json();
  return parsedResponse;
};

export const searchGifs = async (query, offset = 0) => {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=10&offset=${offset}`
  );
  const parsedResponse = await response.json();
  return parsedResponse;
};
