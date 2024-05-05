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
  const [adaptedEvents, setAdaptedEvents] = useState<any[]>([]);
  const [activity, setActivity] = useState<any>(null); // State for activity details
  const navigate = useNavigate();

  // Function to fetch activity details
  const fetchActivity = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate("/");
        return;
      }

      const response = await fetch(`https://x2025unbored786979363000.francecentral.cloudapp.azure.com/events/show?id=${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log("caca lunaire");
      if (response.ok) {
        const data = await response.json();
        console.log("Data ", data);
        setActivity(data);

        const newEvent = {
          ...data,
          start: new Date(data.start),
          end: new Date(data.end),
          title: data.name,
        };
        // Append new event to adaptedEvents
        //setAdaptedEvents(prevEvents => [...prevEvents, newEvent]);
        //
        
        const eventData: Event[] = await response.json();
        console.log("vent " , eventData);
        const adaptedEventsData = [];
        for (let i = 0; i < eventData.length; i++) {
          const event = eventData[i];
          adaptedEventsData.push({
            ...event,
            start: new Date(event.date),
            end: new Date(event.date),
            title: event.name,
          });
        }
        setAdaptedEvents(adaptedEventsData);
        //
        return { start: new Date(data.start), end: new Date(data.end) }; // Return start and end times
      } else {
        console.error('Failed to fetch activity details. Status:', response.status);
      }
    } catch (error) {
      console.error('Error while fetching activity details', error);
    }
  };

  const handleEventClick = async (id: string) => {
    // Fetch activity details and update adaptedEvents
    const { start, end } = await fetchActivity(id);
    navigate(`/activity/${id}`, { state: { start, end, eventData: activity } });
  };

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
        
      } catch (error) {
        console.error('Error while fetching timeline data', error);
        // Optionally, handle the error, show a message, etc.
      }
    };

    fetchData();
  }, []);

  if (!adaptedEvents) {
    return <div>Loading...</div>;
  }

  console.log("Adapted Event " , adaptedEvents);
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100vh', paddingRight: '20%' }}>
      <Calendar
        localizer={localizer}
        events={adaptedEvents}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day']}
        style={{ width: '80%' }}
        onSelectEvent={(event: Event) => handleEventClick(event._id)}
      />
    </div>
  );
};

export default CalendarComponent;
