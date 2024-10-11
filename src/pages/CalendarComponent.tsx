import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate

const localizer = momentLocalizer(moment);

interface Event {
  _id: string;
  name: string;
  start: string;
  end: string;
  date: string;
  hour: string;
  imageUrl: string;
  catégorie: string;
}

const CalendarComponent: React.FC = () => {
  const [timelineData, setTimelineData] = useState<Event[]>([]);
  const [activities, setActivities] = useState<Event[]>([]); // New state for activity details
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch initial timeline data
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://x2025unbored786979363000.francecentral.cloudapp.azure.com/event', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const reservations = data.reservations;
        setTimelineData(reservations);

        // Fetch activity details for each reservation
        
        const fetchActivityDetails = async () => {
          const activitiesPromise = reservations.map(async (reservation: Event, index: number) => { // Add index and its type here
            try {
              const activityResponse = await fetch(`https://x2025unbored786979363000.francecentral.cloudapp.azure.com/events/show?id=${reservations[index]}`,{ // Use index here
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
                //  '("caca");
                console.error('Failed to fetch activity details. Status:', activityResponse.status);
                return null;
              }
            } catch (error) {
              console.error('Error while fetching activity details', error);
              return null;
            }
          });
          const activitiesData = await Promise.all(activitiesPromise);
          
          //console.log("popo " , activitiesData);
          setActivities(activitiesData.filter(activity => activity !== null));
        };

        fetchActivityDetails();

      } catch (error) {
        console.error('Error while fetching timeline data', error);
        // Optionally, handle the error, show a message, etc.
      }
    };

    fetchData();
  }, []);

  //const handleEventClick = (event: any) => {
  //  navigate(`/activity/${event._id}`);
  //};

  if (!timelineData) {
    return <div>Loading...</div>;
  }

  
  //console.log("activities " , activities[0].event.end_date);
  //console.log("caca");
  const adaptedEvents = activities.map((activity, index) => ({
    ...activity,
    start: new Date(activities[index].event.start_date),
    end: new Date(activities[index].event.end_date),
    title: activities[index].event.name,
  }));
  
  const handleEventClick = (activity: any) => {
    //console.log("Activities send " , activity.event._id);
    console.log("Infffoooooo " , activity)
    if (activity.event._id != null) {
      navigate(`/activity/${activity.event._id}`);
    } else {
      console.error("Activity not found or missing data");
      // Handle the error as per your application's logic
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100vh', paddingRight: '20%' }}>
      <Calendar
        localizer={localizer}
        events={adaptedEvents}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day']}
        style={{ width: '80%' }}
        onSelectEvent={(event, e) => handleEventClick(event, e)}
        />
    </div>
  );
};

export default CalendarComponent;
