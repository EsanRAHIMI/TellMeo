import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import AddTask from '../components/AddTask';
import { fetchTasks } from '../api';
import { Container, Box } from '@mui/material';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasksData = async () => {
    try {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasksData();
  }, []);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <AddTask fetchTasks={fetchTasksData} />
        <TaskList tasks={tasks} fetchTasks={fetchTasksData} />
      </Box>
    </Container>
  );
};

export default Home;
