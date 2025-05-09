import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [orgCode, setOrgCode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrgCode = localStorage.getItem('orgCode');
    if (storedOrgCode) {
      setOrgCode(storedOrgCode);
      // Here you would typically fetch event images based on orgCode
      console.log(`Fetching images for organization: ${storedOrgCode}`);
    } else {
      // If no orgCode is found, redirect back to landing page
      alert('Organization Code not found. Redirecting to Landing Page.');
      navigate('/landing');
    }
  }, [navigate]);

  // Placeholder for event images state and fetching logic
  const [eventImages, setEventImages] = useState([]); 
  // Placeholder for matched images state
  const [matchedImages, setMatchedImages] = useState([]);
  // Placeholder for selfie upload logic
  const [selfie, setSelfie] = useState(null);

  const handleSelfieUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelfie(URL.createObjectURL(event.target.files[0]));
      console.log('Selfie uploaded:', event.target.files[0].name);
      // Simulate finding matches: take the first two event images as matches
      if (eventImages.length > 0) {
        setMatchedImages(eventImages.slice(0, 2)); // Show first two event images as mock matches
        console.log('Mock matches found and set.');
      } else {
        // Fallback if eventImages isn't populated yet, or provide different mock data
        setMatchedImages([
            { id: 99, url: 'https://via.placeholder.com/300/CCCCCC/000000?Text=MatchedImage1', alt: 'Matched Image 1 (Fallback)' },
            { id: 98, url: 'https://via.placeholder.com/300/AAAAAA/000000?Text=MatchedImage2', alt: 'Matched Image 2 (Fallback)' },
        ]);
        console.log('Mock matches found using fallback data.');
      }
      console.log('Backend call would happen here to save match data to DynamoDB and Google Sheets.');
    }
  };

  // Mock event images (replace with actual data fetching later)
  useEffect(() => {
    if (orgCode) { // Only fetch if orgCode is available
        setEventImages([
            { id: 1, url: 'https://via.placeholder.com/300/FF0000/FFFFFF?Text=EventImage1', alt: 'Event Image 1' },
            { id: 2, url: 'https://via.placeholder.com/300/00FF00/FFFFFF?Text=EventImage2', alt: 'Event Image 2' },
            { id: 3, url: 'https://via.placeholder.com/300/0000FF/FFFFFF?Text=EventImage3', alt: 'Event Image 3' },
        ]);
    }
  }, [orgCode]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Face Segregation Dashboard</h1>
        {orgCode && (
          <p className="text-xl text-gray-600">Organization Code: <span className="font-semibold">{orgCode}</span></p>
        )}
      </header>

      {/* Section for Uploading Selfie */}
      <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Upload Your Selfie</h2>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleSelfieUpload} 
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
        {selfie && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Your uploaded selfie:</p>
            <img src={selfie} alt="Uploaded Selfie" className="max-w-xs h-auto rounded-md shadow" />
          </div>
        )}
      </section>

      {/* Section for Displaying Matched Photos */}
      <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Matched Photos</h2>
        {matchedImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {matchedImages.map(image => (
              <div key={`match-${image.id}`} className="overflow-hidden rounded-lg shadow-lg">
                <img src={image.url} alt={image.alt} className="w-full h-48 object-cover"/>
                {/* Optionally, display more info about the match here */}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No matches found yet. Upload your selfie to see results.</p>
        )}
      </section>
      
      {/* Section for Displaying All Event Images (Optional, or could be primary view before selfie) */}
      <section className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Event Images</h2>
        {eventImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {eventImages.map(image => (
                    <div key={image.id} className="overflow-hidden rounded-lg shadow-lg">
                        <img src={image.url} alt={image.alt} className="w-full h-48 object-cover"/>
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-gray-500">Loading event images or no images available for this organization.</p>
        )}
      </section>

    </div>
  );
}

export default Dashboard;