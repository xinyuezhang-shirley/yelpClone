# Ravenous - Restaurant Finder

A React-based restaurant search application that integrates with the Yelp API to find and display restaurant information.

## Features

- Search for restaurants by term and location
- Sort results by Best Match, Highest Rated, or Most Reviewed
- Responsive design that works on desktop and mobile
- Real-time search results from Yelp API
- Loading states and error handling

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Get Yelp API Key
1. Go to [Yelp Developers](https://www.yelp.com/developers)
2. Create an account and register your application
3. Get your API key from the dashboard

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```bash
VITE_YELP_API_KEY=your_yelp_api_key_here
```

Replace `your_yelp_api_key_here` with your actual Yelp API key.

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

1. Enter a search term (e.g., "pizza", "sushi", "coffee")
2. Enter a location (e.g., "New York", "San Francisco", "10001")
3. Select a sort option (Best Match, Highest Rated, Most Reviewed)
4. Click "Let's Go" to search
5. View the results below

## Project Structure

```
src/
├── components/
│   ├── Business.jsx      # Individual business card
│   ├── Business.css      # Business card styling
│   ├── BusinessList.jsx  # List of businesses
│   ├── BusinessList.css  # Business list styling
│   ├── SearchBar.jsx     # Search interface
│   └── SearchBar.css     # Search bar styling
├── utils/
│   └── Yelp.js          # Yelp API integration
├── App.jsx              # Main application component
└── App.css              # Application styling
```

## API Integration

The application uses the Yelp Fusion API v3 to fetch restaurant data. The `Yelp.js` module handles:

- API authentication
- Search requests
- Response processing
- Error handling
- Data transformation

## Technologies Used

- React 18
- Vite
- Yelp Fusion API
- CSS3 with Flexbox
- Modern JavaScript (ES6+)
