import React from 'react';
import Business from './Business';
import './BusinessList.css';

const BusinessList = ({ businesses }) => {
  // If no businesses are provided, show a message
  if (!businesses || businesses.length === 0) {
    return (
      <div className="BusinessList">
        <div className="no-results">
          <h2>Search for restaurants to get started!</h2>
          <p>Enter a search term and location above to find great places to eat.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="BusinessList">
      {businesses.map(business => (
        <Business 
          key={business.id}
          business={business}
        />
      ))}
    </div>
  );
};

export default BusinessList;