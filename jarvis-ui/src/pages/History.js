import React, { useEffect, useState } from 'react';
import { Container, List, ListItem, ListItemText, Typography, Paper } from '@mui/material';
import axios from 'axios';

const History = () => {
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    const fetchInteractions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/interactions/history', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setInteractions(response.data);
      } catch (error) {
        console.error('Error fetching interactions:', error);
      }
    };

    fetchInteractions();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Interaction History
        </Typography>
        <List>
          {interactions.map((interaction, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={`User: ${interaction.message}`}
                secondary={`Assistant: ${interaction.response} | Timestamp: ${new Date(interaction.timestamp).toLocaleString()}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default History;
