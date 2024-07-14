import React, { useContext, useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Menu, MenuItem, IconButton, Fab } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AddTaskIcon from '@mui/icons-material/AddTask';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import AccountCircle from '@mui/icons-material/AccountCircle';
import moment from 'moment';
import 'moment/locale/fa';
import momentJalaali from 'moment-jalaali';
import { AuthContext } from '../context/AuthContext';

momentJalaali.loadPersian({ dialect: 'persian-modern', usePersianDigits: false });

const Header = () => {
  const { username, updateUsername } = useContext(AuthContext);
  const [currentDateTime, setCurrentDateTime] = useState(moment());
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(moment());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    updateUsername();
    navigate('/login');
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#404040', zIndex: 1300 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#bfbfbf' }}>
            TELL MEO
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
            <Typography variant="body1" sx={{ marginRight: 2, color: '#bfbfbf' }}>
              Gregorian: {currentDateTime.format('YYYY/MM/DD')}
            </Typography>
            <Typography variant="body1" sx={{ marginRight: 2, color: '#bfbfbf' }}>
              Jalali: {momentJalaali(currentDateTime).format('jYYYY/jMM/jDD')}
            </Typography>
            <Typography variant="body1" sx={{ color: '#bfbfbf' }}>
              Time: {currentDateTime.format('HH:mm:ss')}
            </Typography>
          </Box>
          {username ? (
            <>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
              >
                <AccountCircle />
                <Typography variant="body1" sx={{ marginLeft: 1, color: '#bfbfbf' }}>
                  {username}
                </Typography>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 2, zIndex: 1300 }}>
        <Fab 
          sx={{ backgroundColor: '#bfbfbf', '&:hover': { backgroundColor: '#a6a6a6' }, color: '#000000' }} 
          aria-label="tasks" 
          component={Link} 
          to="/"
        >
          <AddTaskIcon />
        </Fab>
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
          aria-label="chat" 
          component={Link} 
          to="/chat"
        >
          <RecordVoiceOverIcon />
        </Fab>
      </Box>
    </>
  );
};

export default Header;
