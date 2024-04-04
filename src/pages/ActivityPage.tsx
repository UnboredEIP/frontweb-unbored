import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import fs from 'fs'; // Import the fs module
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ActivityPage: React.FC = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<any>(null);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [userComment, setUserComment] = useState<string>("");
  const navigate = useNavigate(); // useNavigate always called

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token === null) {
          //console.log("caca null")
          navigate("/");
        }

        const response = await fetch(`http://20.216.143.86/events/show?id=${id}`,{
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setActivity(data);
        } else {
          console.error('Failed to fetch activity details. Status:', response.status);
        }
      } catch (error) {
        console.error('Error while fetching activity details', error);
      }
    };

    fetchActivity();
  }, [id]);

  //console.log("toto");
  //console.log(activity);
  
  const toast = useToast();

  const BadRate = () => {
    toast({
      title: "Rate",
      description: "Echec de la notation",
      duration: 5000,
      isClosable: true,
      colorScheme: "red",
    });
  };

  const GoodRate = () => {
    toast({
      title: "Rate",
      description: "Notation réussie",
      duration: 5000,
      isClosable: true,
      colorScheme: "green",
    });
  };

  const NoCommentRate = () => {
    toast({
      title: "Rate",
      description: "Ajoutez un commentaire",
      duration: 5000,
      isClosable: true,
      colorScheme: "red",
    });
  };
  
  const NoRate = () => {
    toast({
      title: "Rate",
      description: "Ajoutez une note",
      duration: 5000,
      isClosable: true,
      colorScheme: "red",
    });
  };

  const AlreadyInCalendar = () => {
    toast({
      title: "Calendrier",
      description: "L'activité est déja dans le calendrier",
      duration: 5000,
      isClosable: true,
      colorScheme: "yellow",
    });
  };
  
  const AddedInCalendar = () => {
    toast({
      title: "Calendrier",
      description: "L'activité a été ajouté dans le calendrier",
      duration: 5000,
      isClosable: true,
      colorScheme: "green",
    });
  };
  
  if (!activity) {
    // Render loading state or any other content while fetching data
    return <div>Loading...</div>;
  }

  // Calculate the average rating

  const addToTimeline = (eventData: any) => {
    try {
      const timelineData = localStorage.getItem('timelineData');
      const timelineArray = timelineData ? JSON.parse(timelineData) : [];
  
      // Check if the event is already in the timeline
      const isEventAlreadyAdded = timelineArray.some((event) => event._id === eventData._id);
  
      if (!isEventAlreadyAdded) {
        // Add the new event data to the timeline
        timelineArray.push(eventData);
  
        // Write the updated timeline data back to localStorage
        localStorage.setItem('timelineData', JSON.stringify(timelineArray));
        AddedInCalendar();
        //localStorage.removeItem('timelineData');
        //console.log('Event added to timeline successfully!');
      } else {
        //console.log('Event is already in the timeline.');
        AlreadyInCalendar();
      }
    } catch (error) {
      //console.error('Error while adding event to timeline', error);
    }
  };

  
  const addToCalendar = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://20.216.143.86/event/add', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({events : [activity.event._id]}), // assuming the endpoint expects an array of events
      });
      console.log("Data: " , activity.event._id);
      
      addToTimeline(activity.event);
      if (response.ok) {
        //console.log('Event added to the calendar successfully!');
        // Optionally, you can provide feedback to the user
      } else {
        //console.error('Failed to add the event to the calendar. Status:', response.status);
      }
    } catch (error) {
      //console.error('Error while adding the event to the calendar', error);
    }
  };
  
  const averageRating =
  activity.event && activity.event.rate && activity.event.rate.length > 0
    ? activity.event.rate.reduce((sum, r) => sum + parseInt(r.stars), 0) / activity.event.rate.length
    : 0;

  const aaverageRating = 0;
  const handleUserRatingSubmit = async () => {
    // Perform the API call to allow the user to rate the event
    if (userRating === null) {
      // Handle the case where the user has not selected a rating
      console.error('Please select a rating before submitting.');
      NoRate();
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://20.216.143.86/event/rate?id=${activity.event._id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stars: userRating.toString(),
          comments: userComment,
        }),
      });
      console.log(activity.rate);
      if (response.ok) {
        // Handle success, maybe show a success message
        console.log('User rated the event successfully!');
        GoodRate();
        // Optionally, you can update the UI to reflect the new rating immediately
      } else {
        // Handle error, print the status error
        if (userComment.length === 0) {
          NoCommentRate();
        }
        else {
          BadRate()
        }
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

  //console.log("Les activités");
  //console.log(activity);
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
        <h2 style={{ fontWeight: 'bold', margin: '20px 0', fontSize: '24px' }}>{activity.event.name}</h2>
        <p style={{ fontWeight: 'bold', margin: '20px 0', fontSize: '18px' }}>{activity.event.categories[0]}</p>
        <p style={{ fontWeight: 'bold', margin: '20px 0', fontSize: '18px' }}>{activity.event.address}</p>
        <p style={{ fontWeight: 'bold', margin: '20px 0', fontSize: '18px' }}>
          {activity.event.date && activity.event.date.includes("T") ? activity.event.date.split("T")[0] : activity.event.date}
        </p>
        <img
          src={`http://20.216.143.86/getimage?imageName=${activity.event.pictures[0].id}`}
          alt={`Profile for ${activity.name}`}
          style={{
            maxWidth: '600px', // Adjust the size as needed
            maxHeight: '600px', // Adjust the size as needed
            borderRadius: '12px', // Rounded corners
            marginBottom: '40px',
            marginLeft: '35px'
          }}
        />

        {/* Display the average rating */}
        <div>
        <p style={{ margin: '20px 0' }}>Note moyenne: {renderStars(averageRating)}</p>
        </div>

        {/* Add the rating form for the user */}
        <div>
        <label htmlFor="userRating" style={{ margin: '20px 0' }}>Ta note: </label>
          {renderStars(userRating || 0)}
        </div>
        <div>
        <p style={{ margin: '20px 0' }}> </p>
        <label htmlFor="userComment" style={{ margin: '20px 0' }}>Ton commentaire:</label>
          <textarea
            id="userComment"
            value={userComment}
            placeholder='Ajoute un commentaire'
            onChange={(e) => setUserComment(e.target.value)}
            style={{ width: '100%', minHeight: '100px', padding: '8px', fontSize: '16px' }}
          />
        </div>
        <button onClick={handleUserRatingSubmit}>Envoie ta note</button>

        <div style={{ marginTop: '20px' }}>
          <button onClick={addToCalendar}>Ajoute cette activité à ton calendrier</button>
        </div>

      </div>
    </div>
  );
};

export default ActivityPage;