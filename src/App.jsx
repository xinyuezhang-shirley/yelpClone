import React, { useState } from 'react'
import './App.css'
import BusinessList from './components/BusinessList'
import SearchBar from './components/SearchBar'
import Yelp from './utils/Yelp'

function App() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchYelp = async (term, location, sortBy) => {
    setLoading(true);
    setError(null);
    
    try {
      const businesses = await Yelp.search(term, location, sortBy);
      setBusinesses(businesses);
    } catch (err) {
      setError('Failed to fetch businesses. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Ravenous - Restaurant Finder</h1>
      <SearchBar searchYelp={searchYelp} />
      {loading && <div className="loading">Searching for restaurants...</div>}
      {error && <div className="error">{error}</div>}
      <BusinessList businesses={businesses} />
    </div>
  )
}

export default App
