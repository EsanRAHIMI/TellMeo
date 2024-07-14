import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List, ListItem, ListItemText } from '@mui/material';

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3000/events', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const sortedEvents = response.data.sort((a, b) => new Date(a.start.dateTime || a.start.date) - new Date(b.start.dateTime || b.start.date));
        setEvents(sortedEvents);
      } catch (error) {
        console.error('There was an error fetching the events!', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4, backgroundColor: '#f5f5f5', color: '#000000' }}>
      <List>
        {events.map(event => (
          <ListItem key={event.id} divider>
            <ListItemText
              primary={event.summary}
              secondary={`Date: ${new Date(event.start.dateTime || event.start.date).toLocaleString()}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Calendar;
