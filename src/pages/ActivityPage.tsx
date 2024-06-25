import React, { useState, useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ActivityPage: React.FC = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<any>(null);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [userComment, setUserComment] = useState<string>("");
  const [showParticipants, setShowParticipants] = useState(false);
  const [participantsWithProfiles, setParticipantsWithProfiles] = useState<any[]>([]);
  const [uniqueParticipantsLength, setUniqueParticipantsLength] = useState<number>(0);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token === null) {
          navigate("/");
        }

        const response = await fetch(`https://x2025unbored786979363000.francecentral.cloudapp.azure.com/events/show?id=${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setActivity(data);

          // Calculate unique participants length
          const uniqueIds = new Set(data.event.participents.map((participant: any) => participant.id));
          setUniqueParticipantsLength(uniqueIds.size);
        } else {
          console.error('Failed to fetch activity details. Status:', response.status);
        }
      } catch (error) {
        console.error('Error while fetching activity details', error);
      }
    };

    fetchActivity();
  }, [id, navigate]);

  // Helper functions for toast notifications
  const BadRate = () => toast({ title: "Rate", description: "Echec de la notation", duration: 5000, isClosable: true, colorScheme: "red" });
  const GoodRate = () => toast({ title: "Rate", description: "Notation réussie", duration: 5000, isClosable: true, colorScheme: "green" });
  const NoCommentRate = () => toast({ title: "Rate", description: "Ajoutez un commentaire", duration: 5000, isClosable: true, colorScheme: "red" });
  const NoRate = () => toast({ title: "Rate", description: "Ajoutez une note", duration: 5000, isClosable: true, colorScheme: "red" });
  const AlreadyInCalendar = () => toast({ title: "Calendrier", description: "L'activité est déjà dans le calendrier", duration: 5000, isClosable: true, colorScheme: "yellow" });
  const ActivityFav = () => toast({ title: "Activity", description: "L'activité a été ajoutée en favori", duration: 5000, isClosable: true, colorScheme: "green" });
  const ActivityAlreadyFav = () => toast({ title: "Activity", description: "L'activité est déjà en favori", duration: 5000, isClosable: true, colorScheme: "yellow" });
  const AddedInCalendar = () => toast({ title: "Calendrier", description: "L'activité a été ajoutée dans le calendrier", duration: 5000, isClosable: true, colorScheme: "green" });

  if (!activity) {
    return <div>Loading...</div>;
  }

  const addToTimeline = (eventData: any) => {
    try {
      const timelineData = localStorage.getItem('timelineData');
      const timelineArray = timelineData ? JSON.parse(timelineData) : [];

      const isEventAlreadyAdded = timelineArray.some((event) => event._id === eventData._id);

      if (!isEventAlreadyAdded) {
        timelineArray.push(eventData);
        localStorage.setItem('timelineData', JSON.stringify(timelineArray));
        AddedInCalendar();
      } else {
        AlreadyInCalendar();
      }
    } catch (error) {
      console.error('Error while adding event to timeline', error);
    }
  };

  const addToCalendar = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://x2025unbored786979363000.francecentral.cloudapp.azure.com/event/add', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ events: [activity.event._id] }),
      });
      console.log("Data: ", activity);
      if (response.ok) {
        console.log('Event added to the calendar successfully!');
      } else {
        console.error('Failed to add the event to the calendar. Status:', response.status);
      }
    } catch (error) {
      console.error('Error while adding the event to the calendar', error);
    }
  };

  const averageRating =
    activity.event && activity.event.rate && activity.event.rate.length > 0
      ? activity.event.rate.reduce((sum, r) => sum + parseInt(r.stars), 0) / activity.event.rate.length
      : 0;

  const handleUserRatingSubmit = async () => {
    if (userRating === null) {
      console.error('Please select a rating before submitting.');
      NoRate();
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://x2025unbored786979363000.francecentral.cloudapp.azure.com/event/rate?id=${activity.event._id}`, {
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
      if (response.ok) {
        console.log('User rated the event successfully!');
        GoodRate();
      } else {
        if (userComment.length === 0) {
          NoCommentRate();
        } else {
          BadRate();
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
          &#9733;
        </span>
      );
    }
    return stars;
  };

  const addToFavorites = () => {
    try {
      const favoriteActivities = localStorage.getItem('favoriteActivities');
      const favoriteActivitiesArray = favoriteActivities ? JSON.parse(favoriteActivities) : [];

      if (activity && activity.event && activity.event._id) {
        const activityId = activity.event._id;

        const isActivityAlreadyAdded = favoriteActivitiesArray.some((activity) => activity._id === activityId);

        if (!isActivityAlreadyAdded) {
          favoriteActivitiesArray.push(activity.event);
          localStorage.setItem('favoriteActivities', JSON.stringify(favoriteActivitiesArray));
          console.log('Activity added to favorites successfully!');
          ActivityFav();
        } else {
          console.log('Activity is already in favorites.');
          ActivityAlreadyFav();
        }
      } else {
        console.error('Activity, activity.event, or activity.event._id is undefined.');
      }
    } catch (error) {
      console.error('Error while adding activity to favorites', error);
    }
  };

  const months = {
    '01': 'janvier',
    '02': 'février',
    '03': 'mars',
    '04': 'avril',
    '05': 'mai',
    '06': 'juin',
    '07': 'juillet',
    '08': 'août',
    '09': 'septembre',
    '10': 'octobre',
    '11': 'novembre',
    '12': 'décembre'
  };

  const stardate_ = activity.event.start_date.split("T")[0];
  const splitdate_ = stardate_.split("-");
  const year = splitdate_[0];
  const month = splitdate_[1];
  const day = splitdate_[2];
  const current_start_date = day + " " + months[month] + " " + year;

  const handleToggleParticipants = async () => {
    setShowParticipants(!showParticipants);
    if (!showParticipants && participantsWithProfiles.length === 0) {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      const participantsWithProfiles = [];
      const uniqueIds = new Set();

      for (let participant of activity.event.participents) {
        try {
          const response = await axios.get(`https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile?id=${participant.id}`, config);
          const profile = response.data.user;

          if (!uniqueIds.has(profile._id)) {
            uniqueIds.add(profile._id);
            participantsWithProfiles.push({ ...participant, profileDetails: profile });
          }
        } catch (error) {
          console.error('Error fetching participant profile', error);
          if (!uniqueIds.has(participant.id)) {
            uniqueIds.add(participant.id);
            participantsWithProfiles.push(participant);
          }
        }
      }

      setParticipantsWithProfiles(participantsWithProfiles);
      console.log('Participants with profiles:', participantsWithProfiles);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '20px' }}>
      <div style={{ flex: 2, textAlign: 'center', marginRight: '20px', border: '2px solid #808080', borderRadius: '12px', padding: '40px', maxWidth: '900px' }}>
        <h2 style={{ fontWeight: 'bold', margin: '20px 0', fontSize: '24px' }}>{activity.event.name}</h2>
        <p style={{ fontWeight: 'bold', margin: '20px 0', fontSize: '18px' }}>{activity.event.categories[0]}</p>
        <p style={{ fontWeight: 'bold', margin: '20px 0', fontSize: '18px' }}>{activity.event.address}</p>
        <p style={{ fontWeight: 'bold', margin: '20px 0', fontSize: '18px' }}>Début: {current_start_date + " à " + activity.event.start_date.split("T")[1].substring(0, 8)}</p>
        <p style={{ fontWeight: 'bold', margin: '20px 0', fontSize: '18px' }}>Fin: {current_start_date + " à " + activity.event.end_date.split("T")[1].substring(0, 8)}</p>
        <p 
          style={{ fontWeight: 'bold', margin: '20px 0', fontSize: '18px', cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} 
          onClick={handleToggleParticipants}
        >
          Nombre de participants: {uniqueParticipantsLength}
        </p>
        {showParticipants && (
          <div style={{ textAlign: 'left', marginTop: '20px', border: '1px solid #808080', borderRadius: '12px', padding: '20px', backgroundColor: '#f9f9f9' }}>
            <h3 style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '10px' }}>Participants:</h3>
            <ul>
              {participantsWithProfiles.map((participant, index) => (
                <li key={index} style={{ fontSize: '16px', margin: '10px 0' }}>
                  <Link to={`/userprofil/${participant.profileDetails ? participant.profileDetails._id : 'unknown'}`}>
                    {participant.profileDetails ? participant.profileDetails.username : 'Utilisateur inconnu'}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src={`https://x2025unbored786979363000.francecentral.cloudapp.azure.com/getimage?imageName=${activity.event.pictures[0].id}`}
            alt={`Profile for ${activity.name}`}
            style={{ maxWidth: '600px', maxHeight: '600px', borderRadius: '12px', marginBottom: '40px' }}
          />
        </div>

        <div>
          <p style={{ margin: '20px 0' }}>Note moyenne: {renderStars(averageRating)}</p>
        </div>

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

        <div style={{ marginTop: '20px' }}>
          <button onClick={addToFavorites}>Ajoute cette activité à tes favoris</button>
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;
