# Giphy Explorer App

Giphy Explorer is a simple web application built with React and Material UI that allows users to explore trending GIFs on Giphy, search for GIFs, and view detailed information about each GIF.

## Getting Started

To run the app locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/vivo1310/giphy-explorer.git
   ```

2. Navigate to the project directory:

   ```bash
   cd giphy-explorer
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root of the project and add your Giphy API key:

   ```env
   VITE_GIPHY_API_KEY=YOUR_API_KEY
   ```

   Replace `YOUR_API_KEY` with your actual Giphy API key.

5. Run the app:

   ```bash
   npm run dev
   ```

   The app will be accessible at [http://localhost:5173](http://localhost:5173).

## Features

1. **View Trending GIFs:**
   - Users can view a list of trending GIFs sourced directly from Giphy's Trending endpoint.

2. **Search for GIFs:**
   - Utilize the search input box to discover GIFs based on specific queries. As users type, the app fetches and displays relevant GIFs from the Giphy API.

3. **Expand GIF Details:**
   - Click on a GIF to expand and view its details, including username and rating. The app provides a visually enhanced experience for users to explore GIFs more deeply.


## Thought Process and Considerations

### Infinite Scrolling

The implementation of infinite scrolling revolves around the decision-making process of when to trigger the `fetchGifs` function. This decision is based on calculating whether the user has reached the bottom of the GIF list. To manage this calculation, a custom hook called `useInfiniteScroll.js` has been created. This hook encapsulates the logic for detecting when the user has scrolled to the bottom and is utilized within a `useEffect` block.

```javascript
// Inside the useInfiniteScroll hook
useInfiniteScroll(() => {
    if (gifs.length < totalGifs) {
        // Prevent calling API when already fetched and displayed all available GIFs
        fetchGifs();
    }
}, [loading, error, gifs, totalGifs]);
```

### GIF Rendering and Rendered Renditions

To ensure an optimal user experience, the app incorporates best practices recommended by the Giphy API documentation. The `fixed_height` rendition is used when rendering out GIF images on the preview grid, providing a balance between quality and bandwidth considerations. 

```javascript
// Inside GifCard.jsx
<StyledCardMedia alt={gif.alt_text} src={gif.images.fixed_height.url} />
```

Once a user selects a GIF for detailed viewing, the app dynamically presents a higher resolution rendition. This would provide users with an even more immersive viewing experience, offering a clearer and more detailed representation of the selected GIF alongside its title, username, and rating.

### Masonry Component and Grid Layout

Given the nature of GIFs with varying sizes, the app utilizes the Masonry component to present a visually pleasing grid layout. Masonry adjusts the positioning of elements, accommodating different dimensions of GIFs seamlessly.

### Optimized API Calls

To enhance the app's performance, the implementation includes a mechanism to prevent unnecessary API calls when all available GIFs have been fetched and displayed. The total number of GIFs is tracked and utilized in the infinite scroll mechanism to determine whether additional calls are needed.

```javascript
// Inside the useInfiniteScroll hook
useInfiniteScroll(() => {
    if (gifs.length < totalGifs) {
        // Prevent calling API when already fetched and displayed all available GIFs
        fetchGifs();
    }
}, [loading, error, gifs, totalGifs]);
```

### Styling

The project follows a visually appealing design with the help of Material UI. The use of Material UI components ensures a consistent and responsive user interface.

## Screenshots

![trending gifs feature](src/assets/screenshots/trending.png?raw=true "Trending GIFs Feature")
---
![search gifs feature](src/assets/screenshots/search.png?raw=true "Search GIFs Feature")


## Contact Information

For any questions or inquiries related to this project, please contact Vi at vptv1310@gmail.com.

