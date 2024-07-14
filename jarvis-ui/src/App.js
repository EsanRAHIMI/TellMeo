import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Box, Fab, CssBaseline } from '@mui/material';
import HomeIcon from '@mui/icons-material/AddTask';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChatIcon from '@mui/icons-material/RecordVoiceOver';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  return token ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <CssBaseline />
        <Header />
        <Box sx={{ flexGrow: 1, position: 'relative', minHeight: '100vh', paddingTop: '64px', backgroundColor: '#f5f5f5', color: '#000000' }}>
          <Routes>
            <Route path="/" element={<PrivateRoute element={<Home />} />} />
            <Route path="/calendar" element={<PrivateRoute element={<Calendar />} />} />
            <Route path="/chat" element={<PrivateRoute element={<Chat />} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Box sx={{ position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 2 }}>
            <Fab 
              sx={{ backgroundColor: '#bfbfbf', '&:hover': { backgroundColor: '#a6a6a6' }, color: '#000000' }} 
              aria-label="calendar" 
              component={Link} 
              to="/calendar"
            >
              <CalendarTodayIcon />
            </Fab>
            <Fab 
              sx={{ backgroundColor: '#bfbfbf', '&:hover': { backgroundColor: '#a6a6a6' }, color: '#000000' }} 
              aria-label="home" 
              component={Link} 
              to="/"
            >
              <HomeIcon />
            </Fab>
            <Fab 
              sx={{ backgroundColor: '#bfbfbf', '&:hover': { backgroundColor: '#a6a6a6' }, color: '#000000' }} 
              aria-label="chat" 
              component={Link} 
              to="/chat"
            >
              <ChatIcon />
            </Fab>
          </Box>
        </Box>
      </Router>
    </AuthProvider>
  );
}

export default App;
