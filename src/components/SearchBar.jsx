import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ searchYelp }) => {
  const [searchParams, setSearchParams] = useState({
    term: '',
    location: '',
    sortBy: 'best_match'
  });

  const sortByOptions = {
    'Best Match': 'best_match',
    'Highest Rated': 'rating',
    'Most Reviewed': 'review_count'
  };

  const handleSortByChange = (sortByOption) => {
    setSearchParams(prev => ({
      ...prev,
      sortBy: sortByOption
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchYelp(searchParams.term, searchParams.location, searchParams.sortBy);
  };

  const renderSortByOptions = () => {
    return Object.keys(sortByOptions).map(sortByOption => {
      let sortByOptionValue = sortByOptions[sortByOption];
      return (
        <li 
          key={sortByOptionValue}
          className={searchParams.sortBy === sortByOptionValue ? 'active' : ''}
          onClick={() => handleSortByChange(sortByOptionValue)}
        >
          {sortByOption}
        </li>
      );
    });
  };

  return (
    <div className="SearchBar">
      <div className="SearchBar-sort-options">
        <ul>
          {renderSortByOptions()}
        </ul>
      </div>
      <div className="SearchBar-fields">
        <div className="SearchBar-field">
          <input
            name="term"
            placeholder="Search Businesses"
            value={searchParams.term}
            onChange={handleInputChange}
          />
        </div>
        <div className="SearchBar-field">
          <input
            name="location"
            placeholder="Where?"
            value={searchParams.location}
            onChange={handleInputChange}
          />
        </div>
        <div className="SearchBar-submit">
          <button onClick={handleSearch}>Let's Go</button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;