// Try to get API key from environment, fallback to hardcoded for testing
const apiKey = import.meta.env.VITE_YELP_API_KEY || 
               process.env.REACT_APP_YELP_API_KEY || 
               'pdPjgl62eTyUpPaspyrbgDp_O9S_hBwlx6n0i_oHI6d-ai6Nn9lyv59t4AFwZW3PlS9qvmPLVUavwxGE0Xxyb_5BsyQzsGkPYmT77QKu7GtA5UAo12QUPhuP7ANraHYx';

// Debug logging
//console.log('API Key available:', !!apiKey);
//console.log('API Key length:', apiKey ? apiKey.length : 0);
//console.log('API Key source:', import.meta.env.VITE_YELP_API_KEY ? 'VITE env' : 
           //process.env.REACT_APP_YELP_API_KEY ? 'REACT_APP env' : 'hardcoded');

const Yelp = {
  async search(term, location, sortBy) {
    console.log('Searching with:', { term, location, sortBy });
    console.log('Using API key:', apiKey ? `${apiKey.substring(0, 10)}...` : 'No API key');
    
    const baseUrl = `https://api.yelp.com/v3/businesses/search?term=${encodeURIComponent(term)}&location=${encodeURIComponent(location)}&sort_by=${sortBy}`;
    
    // Try direct API call first
    try {
      console.log('Trying direct API call...');
      const response = await fetch(baseUrl, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Direct API Response status:', response.status);
      
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log('Direct API Response:', jsonResponse);
        
        if (jsonResponse.businesses) {
          console.log('Found businesses:', jsonResponse.businesses.length);
          return jsonResponse.businesses.map(business => ({
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories[0]?.title || 'Restaurant',
            rating: business.rating,
            reviewCount: business.review_count,
          }));
        }
      } else {
        console.log('Direct API failed, trying CORS proxy...');
        throw new Error('Direct API failed');
      }
    } catch (directError) {
      console.log('Direct API error:', directError.message);
      
      // Try with CORS proxy
      try {
        console.log('Trying CORS proxy...');
        const proxyUrl = `https://cors-anywhere.herokuapp.com/${baseUrl}`;
        
        const response = await fetch(proxyUrl, {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        });
        
        console.log('Proxy Response status:', response.status);
        
        if (response.ok) {
          const jsonResponse = await response.json();
          console.log('Proxy API Response:', jsonResponse);
          
          if (jsonResponse.businesses) {
            console.log('Found businesses via proxy:', jsonResponse.businesses.length);
            return jsonResponse.businesses.map(business => ({
              id: business.id,
              imageSrc: business.image_url,
              name: business.name,
              address: business.location.address1,
              city: business.location.city,
              state: business.location.state,
              zipCode: business.location.zip_code,
              category: business.categories[0]?.title || 'Restaurant',
              rating: business.rating,
              reviewCount: business.review_count,
            }));
          }
        } else {
          throw new Error(`Proxy API failed: ${response.status} - ${response.statusText}`);
        }
      } catch (proxyError) {
        console.error('Both direct and proxy API calls failed:', proxyError);
        
        // Try alternative proxy
        try {
          console.log('Trying alternative proxy...');
          const altProxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(baseUrl)}`;
          
          const response = await fetch(altProxyUrl, {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
          });
          
          console.log('Alternative Proxy Response status:', response.status);
          
          if (response.ok) {
            const jsonResponse = await response.json();
            console.log('Alternative Proxy API Response:', jsonResponse);
            
            if (jsonResponse.businesses) {
              console.log('Found businesses via alternative proxy:', jsonResponse.businesses.length);
              return jsonResponse.businesses.map(business => ({
                id: business.id,
                imageSrc: business.image_url,
                name: business.name,
                address: business.location.address1,
                city: business.location.city,
                state: business.location.state,
                zipCode: business.location.zip_code,
                category: business.categories[0]?.title || 'Restaurant',
                rating: business.rating,
                reviewCount: business.review_count,
              }));
            }
          }
        } catch (altProxyError) {
          console.error('All proxy attempts failed:', altProxyError);
        }
        
        throw proxyError;
      }
    }
    
    console.log('No businesses found, returning fallback data');
    return this.getFallbackData();
  },

  getFallbackData() {
    console.log('Returning fallback sample data');
    return [
      {
        id: 'sample-1',
        imageSrc: 'https://content.codecademy.com/programs/react/ravenous/pizza.jpg',
        name: 'MarginOtto Pizzeria (Sample)',
        address: '1010 Paddington Way',
        city: 'Flavortown',
        state: 'NY',
        zipCode: '10101',
        category: 'Italian',
        rating: 4.5,
        reviewCount: 90
      },
      {
        id: 'sample-2',
        imageSrc: 'https://content.codecademy.com/programs/react/ravenous/burger.jpg',
        name: 'Burger Palace (Sample)',
        address: '123 Main Street',
        city: 'Foodville',
        state: 'CA',
        zipCode: '90210',
        category: 'American',
        rating: 4.2,
        reviewCount: 75
      }
    ];
  }
};

export default Yelp; 