import React from 'react';
import { useLocation } from 'react-router-dom';

const ActivityPage: React.FC = () => {
  const location = useLocation();
  const activity = location.state?.activity;

  console.log("Les activités");
  console.log(activity);
  if (!activity) {
    // Handle the case where activity information is not available
    return <div>Activity information not available.</div>;
  }

  return (
    <div style={{ textAlign: 'center', margin: '0 auto', maxWidth: '900px', marginLeft: '500px' }}>
      {/* Display profile picture */}
      {/* Display other information */}
      <div
        style={{
          border: '2px solid #808080', // Grey border
          borderRadius: '12px', // Rounded corners
          padding: '40px',
          marginBottom: '40px',
          display: 'inline-block',
        }}
      >
        <h2 style={{ fontWeight: 'bold', margin: '20px 0', fontSize: '24px' }}>{activity.name}</h2>
        <p style={{ fontWeight: 'bold', margin: '20px 0', fontSize: '18px' }}>{activity.categories[0]}</p>
        <p style={{ fontWeight: 'bold', margin: '20px 0', fontSize: '18px' }}>{activity.address}</p>
        
        <img
          src={`http://20.216.143.86/getimage?imageName=${activity.pictures[0].id}`}
          alt={`Profile for ${activity.name}`}
          style={{
            maxWidth: '600px', // Adjust the size as needed
            maxHeight: '600px', // Adjust the size as needed
            borderRadius: '12px', // Rounded corners
            marginBottom: '40px',
          }}
        />
        
      </div>
    </div>
  );
};

export default ActivityPage;
