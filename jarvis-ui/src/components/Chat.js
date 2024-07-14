import React from 'react';
import { List, ListItem, ListItemText, IconButton, Checkbox, Box, Modal, TextField, Button, Grid, FormControlLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import moment from 'moment';
import { updateTask, deleteTask } from '../api';

const TaskList = ({ tasks, fetchTasks }) => {
  const [selectedTask, setSelectedTask] = React.useState(null);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [editName, setEditName] = React.useState('');
  const [editDate, setEditDate] = React.useState(null);
  const [editTime, setEditTime] = React.useState(null);
  const [editReminder, setEditReminder] = React.useState(false);

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setEditName(task.name);
    const taskDate = new Date(task.time);
    setEditDate(taskDate);
    setEditTime(taskDate);
    setEditReminder(task.reminder);
    setEditModalOpen(true);
  };

  const handleSave = async () => {
    if (!editDate || !editTime) {
      console.error("Date or time is invalid");
      return;
    }

    const dateTime = new Date(editDate);
    const formattedTime = moment(editTime).format('HH:mm');
    const [hours, minutes] = formattedTime.split(':');
    dateTime.setHours(hours);
    dateTime.setMinutes(minutes);

    if (!isNaN(dateTime.getTime())) {
      const updatedTask = { ...selectedTask, name: editName, time: dateTime.toISOString(), reminder: editReminder };
      await updateTask(updatedTask);
      setEditModalOpen(false);
      fetchTasks(); // فراخوانی fetchTasks برای به‌روزرسانی لیست
    } else {
      console.error("Invalid time value");
    }
  };

  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
    fetchTasks(); // فراخوانی fetchTasks برای به‌روزرسانی لیست
  };

  return (
    <Box sx={{ mt: 3 }}>
      <List>
        {tasks.map(task => (
          <ListItem key={task._id} sx={{ backgroundColor: '#f5f5f5', marginBottom: 1, borderRadius: 1 }}>
            <ListItemText
              primary={task.name}
              secondary={`Task Time: ${new Date(task.time).toLocaleString()}${task.reminder ? ' (Reminder set)' : ''}`}
              sx={{ color: '#000000' }}
            />
            <Checkbox checked={task.reminder} disabled />
            <IconButton onClick={() => handleEditClick(task)} sx={{ color: '#000000' }}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(task._id)} sx={{ color: '#000000' }}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Modal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        aria-labelledby="edit-task-modal"
        aria-describedby="edit-task-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Task Name"
                  variant="outlined"
                  fullWidth
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  sx={{ backgroundColor: '#f5f5f5', color: '#000000' }}
                  InputLabelProps={{ style: { color: '#000000' } }}
                  InputProps={{ style: { color: '#000000' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Select Date"
                  value={editDate}
                  onChange={newValue => setEditDate(newValue)}
                  slots={{ textField: TextField }}

                  slotProps={{ textField: { fullWidth: true, sx: { backgroundColor: '#f5f5f5', color: '#000000' } } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TimePicker
                  label="Select Time"
                  value={editTime}
                  onChange={newValue => setEditTime(newValue)}
                  slots={{ textField: TextField }}
                  slotProps={{ textField: { fullWidth: true, sx: { backgroundColor: '#f5f5f5', color: '#000000' } } }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox checked={editReminder} onChange={e => setEditReminder(e.target.checked)} />}
                  label="Reminder"
                  sx={{ color: '#000000' }}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  sx={{ backgroundColor: '#bfbfbf', '&:hover': { backgroundColor: '#a6a6a6' }, color: '#000000' }}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </LocalizationProvider>
        </Box>
      </Modal>
    </Box>
  );
};

export default TaskList;
