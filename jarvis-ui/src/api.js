import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Node.js server address

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const addTask = async (task) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tasks`, task, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

export const updateTask = async (task) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/tasks/${task._id}`, task, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/tasks/${taskId}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const chatWithAI = async (message) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat`, { message }, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error chatting with AI:', error);
    throw error;
  }
};
