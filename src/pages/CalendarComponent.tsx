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

        console.log("caca sur patte  " , response.json());
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

  const handleEventClick = (event: any) => {
    navigate(`/activity/${event._id}`);
  };

  if (!timelineData) {
    return <div>Loading...</div>;
  }

  const adaptedEvents = timelineData.map(event => ({
    ...event,
    start: new Date(event.date),
    end: new Date(event.date),
    title: event.name,
  }));

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100vh', paddingRight: '20%' }}>
      <Calendar
        localizer={localizer}
        events={adaptedEvents}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day']}
        style={{ width: '80%' }}
        onSelectEvent={handleEventClick}
      />
    </div>
  );
};

export default CalendarComponent;
