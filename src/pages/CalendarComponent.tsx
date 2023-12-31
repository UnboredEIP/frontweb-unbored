// CalendarComponent.tsx
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import the default styles

const localizer = momentLocalizer(moment);

interface Event {
  id: number;
  title: string;
  start: string;
  end: string;
  date: string;
  hour: string;
  imageUrl: string;
  catégorie: string;
}

interface CalendarComponentProps {
  events: Event[];
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ events }) => {
  const adaptedEvents = events.map(event => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100vh', paddingRight: '20%' }}>
      <Calendar
        localizer={localizer}
        events={adaptedEvents}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day']}
        style={{ width: '80%' }} // Adjust the width as needed
      />
    </div>
  );
};

export default CalendarComponent;
