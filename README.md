# Giphy Explorer App

Giphy Explorer is a simple web application built with React and Ant Design that allows users to explore trending GIFs on Giphy, search for GIFs, and view detailed information about each GIF.

## Features

- View a list of trending GIFs on Giphy.
- Search for GIFs and see a list of results.
- Expand a GIF to view its details, including username and rating.

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

## Usage

- Upon running the app, you'll see a section displaying trending GIFs.
- Use the search bar to search for GIFs.
- Click on a GIF to expand and view its details, including username and rating.
