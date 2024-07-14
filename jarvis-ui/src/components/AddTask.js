import React, { useState } from 'react';
import { addTask } from '../api';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import moment from 'moment';

const AddTask = ({ fetchTasks }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [reminder, setReminder] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      alert("Task name is required");
      return;
    }
    if (!date || !time) {
      alert("Date and time are required");
      return;
    }

    const dateTime = new Date(date);
    const formattedTime = moment(time).format('HH:mm');
    const [hours, minutes] = formattedTime.split(':');
    dateTime.setHours(hours);
    dateTime.setMinutes(minutes);

    const task = { name, time: dateTime.toISOString(), reminder };
    try {
      await addTask(task);
      fetchTasks(); // Update the list
      setName('');
      setDate(null);
      setTime(null);
      setReminder(false);
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, backgroundColor: '#ffffff', padding: 3, borderRadius: 2, boxShadow: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Task Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={e => setName(e.target.value)}
              required
              sx={{ backgroundColor: '#f5f5f5', color: '#000000' }}
              InputLabelProps={{ style: { color: '#000000' } }}
              InputProps={{ style: { color: '#000000' } }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <DatePicker
              label="Select Date"
              value={date}
              onChange={newValue => setDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth sx={{ backgroundColor: '#f5f5f5', color: '#000000' }} />}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TimePicker
              label="Select Time"
              value={time}
              onChange={newValue => setTime(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth sx={{ backgroundColor: '#f5f5f5', color: '#000000' }} />}
            />
          </Grid>
          <Grid item xs={12} sm={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: '#bfbfbf', '&:hover': { backgroundColor: '#a6a6a6' }, color: '#000000' }}
              fullWidth
            >
              Add Task
            </Button>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={reminder} onChange={e => setReminder(e.target.checked)} />}
              label="Reminder"
              sx={{ color: '#000000' }}
            />
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default AddTask;
