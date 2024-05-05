import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const FavoriteActivitiesPage: React.FC = () => {
  const [favoriteActivities, setFavoriteActivities] = useState<any[]>([]);
  const navigate = useNavigate(); // useNavigate always called
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<any>(null);
  const [userData, setUserData] = useState({
    favorites: [],
  });
  const [activities, setActivities] = useState<Event[]>([]); // New state for activity details


  useEffect(() => {
    getProfileInfo();
  }, []);

  const getProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token === null) {
        navigate("/");
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const url = "https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile";
      const response = await axios.get(url, config);
      const profileDetails = response.data.user;
    
      if (profileDetails.profilePhoto) {
        const firstPictureId = profileDetails.profilePhoto;
        const urlImage = `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/getimage?imageName=${firstPictureId}`;
        const responseImage = await axios.get(urlImage, { responseType: "blob", ...config });
  
        const img = URL.createObjectURL(responseImage.data);
        // Set profile picture in your state if needed
      }

      if (Array.isArray(profileDetails.favorites)) {
        setUserData({
          favoriteActivities: profileDetails.favorites,
        });
      } else {
        console.error("Profile details favorites is not an array:", profileDetails.favorites);
      }
      // Define activitiesPromise here
      const activitiesPromise = profileDetails.favorites.map(async (reservation: Event, index: number) => {
        const token = localStorage.getItem("token");
        const activityResponse = await fetch(`https://x2025unbored786979363000.francecentral.cloudapp.azure.com/events/show?id=${profileDetails.favorites[index]}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (activityResponse.ok) {
          const activityData = await activityResponse.json();
          return activityData;
        } else {
          console.error('Failed to fetch activity details. Status:', activityResponse.status);
          return null;
        }
      });
      const activitiesData = await Promise.all(activitiesPromise);
      console.log("Activities info :  ", activitiesData);
      setActivities(activitiesData.filter(activity => activity !== null));
    } catch (error) {
      const token = localStorage.getItem("token");
      console.error(error);
    }
  };
  
  
  const handleActivityClick = (activity: any) => {
    // Navigate to the activity page for the selected activity
    navigate(`/activity/${activity.event._id}`);
  };
  
  //console.log("Toooooto " , activities , activities.length);

  return (
    <div style={{ textAlign: 'center', margin: '0 auto', maxWidth: '600px' }}>
      <h1>Activités favorites</h1>
      <div style={{ fontSize: "26px" }}>
        {activities.length === 0 ? (
          <p>Tu n'as pas d'activités en favori.</p>
        ) : (
          <ul>
            {activities.map((activity, index) => (
              <li key={index}>
                <button onClick={() => handleActivityClick(activity)} style={{ fontSize: '40px' }}>
                  {activity.event.name}
                </button>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {activity.event.pictures.map((picture, picIndex) => (
                    <img
                      key={picIndex}
                      src={`https://x2025unbored786979363000.francecentral.cloudapp.azure.com/getimage?imageName=${picture.id}`}
                      alt={`Picture ${picIndex + 1} for ${activity.name}`}
                      style={{
                        maxWidth: '600px', // Adjust the size as needed
                        maxHeight: '600px', // Adjust the size as needed
                        borderRadius: '12px', // Rounded corners
                        marginBottom: '40px',
                        marginLeft: '35px'
                      }}
                    />
                  ))}
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
