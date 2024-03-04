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
  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
       
      if (token === null) {
        //console.log("caca null")
        navigate("/");
      }
      
      
      const timelineDataStr = localStorage.getItem('timelineData');
      const parsedTimelineData = timelineDataStr ? JSON.parse(timelineDataStr) : [];
      console.log('Timeline Data:', parsedTimelineData);
      setTimelineData(parsedTimelineData);
    } catch (error) {
      console.error('Error while fetching timeline data', error);
    }
  }, []);

  const navigate = useNavigate(); // useNavigate always called

  const handleEventClick = (event: any) => {
    // Navigate to the /activity/:id route using the event.id
    navigate(`/activity/${event._id}`);
  };

  if (!timelineData) {
    // If timelineData is still undefined, render a loading state or return null
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
