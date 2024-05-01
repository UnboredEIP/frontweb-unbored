import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const FavoriteActivitiesPage: React.FC = () => {
  const [favoriteActivities, setFavoriteActivities] = useState<any[]>([]);
  const navigate = useNavigate(); // useNavigate always called

  useEffect(() => {
    // Retrieve favorite activities from localStorage
    localStorage.removeItem('favoriteActivities');
    const storedFavoriteActivities = localStorage.getItem('favoriteActivities');
    if (storedFavoriteActivities) {
      setFavoriteActivities(JSON.parse(storedFavoriteActivities));
    }
  }, []);


  const handleActivityClick = (activity: any) => {
    // Navigate to the activity page for the selected activity
    navigate(`/activity/${activity._id}`);
  };

  return (
    <div style={{ textAlign: 'center', margin: '0 auto', maxWidth: '600px' }}>
      <h1>Activitée favorites</h1>
      <div style={{ fontSize: "26px" }}>
        {favoriteActivities.length === 0 ? (
          <p>Tu n'as pas d'activitée en favori. </p>
        ) : (
          <ul>
            {favoriteActivities.map((activity, index) => (
              <li key={index}>
                <button onClick={() => handleActivityClick(activity)} style={{ fontSize: '40px' }}>
                  {activity.name}
                </button>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={`https://x2025unbored786979363000.francecentral.cloudapp.azure.com/getimage?imageName=${activity.pictures[0].id}`}
                    alt={`Profile for ${activity.name}`}
                    style={{
                      maxWidth: '600px', // Adjust the size as needed
                      maxHeight: '600px', // Adjust the size as needed
                      borderRadius: '12px', // Rounded corners
                      marginBottom: '40px',
                      marginLeft: '35px'
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FavoriteActivitiesPage;
