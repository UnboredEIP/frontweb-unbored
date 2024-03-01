import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ActivityPage: React.FC = () => {
  const location = useLocation();
  const activity = location.state?.activity;
  const [userRating, setUserRating] = useState<number | null>(null);
  const [userComment, setUserComment] = useState<string>("");

  // Calculate the average rating
  const averageRating = activity.rate.reduce((sum, r) => sum + parseInt(r.stars), 0) / activity.rate.length;

  const handleUserRatingSubmit = async () => {
    // Perform the API call to allow the user to rate the event
    if (userRating === null) {
      // Handle the case where the user has not selected a rating
      console.error('Please select a rating before submitting.');
      return;
    }

    try {
      const response = await fetch(`/event/rate?id=${activity.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating: userRating.toString(),
          comment: userComment,
        }),
      });

      if (response.ok) {
        // Handle success, maybe show a success message
        console.log('User rated the event successfully!');
        // Optionally, you can update the UI to reflect the new rating immediately
      } else {
        // Handle error, print the status error
        console.error('Failed to rate the event. Status:', response.status);
      }
    } catch (error) {
      console.error('Error while rating the event', error);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          style={{
            cursor: 'pointer',
            fontSize: '24px',
            color: i <= rating ? 'gold' : 'gray',
          }}
          onClick={() => setUserRating(i)}
        >
          &#9733; {/* Unicode character for a solid star */}
        </span>
      );
    }
    return stars;
  };

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

        {/* Display the average rating */}
        <div>
          <p>Average Rating: {renderStars(averageRating)}</p>
        </div>

        {/* Add the rating form for the user */}
        <div>
          <label htmlFor="userRating">Your Rating: </label>
          {renderStars(userRating || 0)}
        </div>
        <div>
          <label htmlFor="userComment">Your Comment:</label>
          <textarea
            id="userComment"
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            style={{ width: '100%', minHeight: '100px', padding: '8px', fontSize: '16px' }}
          />
        </div>
        <button onClick={handleUserRatingSubmit}>Submit Your Rating</button>
      </div>
    </div>
  );
};

export default ActivityPage;
