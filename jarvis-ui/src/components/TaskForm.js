import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { DateTimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const TaskForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [time, setTime] = useState(new Date());

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, time });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Task Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <DateTimePicker
          label="Task Time"
          value={time}
          onChange={setTime}
          renderInput={(params) => <TextField {...params} required />}
        />
        <Button type="submit" variant="contained" color="primary">Add Task</Button>
      </Box>
    </LocalizationProvider>
  );
};

export default TaskForm;
