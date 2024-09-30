const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const cron = require('node-cron');
const path = require('path');
const OpenAI = require('openai');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const interactionRoutes = require('./routes/interactions'); //Ensure this is added
const { protect } = require('./middleware/auth');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

app.use('/api/auth', authRoutes);
app.use('/api/interactions', interactionRoutes); // Ensure this is added

const taskSchema = new mongoose.Schema({
  name: String,
  time: Date,
  reminder: Boolean,
});
const Task = mongoose.model('Task', taskSchema);

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/oauth2callback'
);

app.get('/logout', (req, res) => {
  oauth2Client.setCredentials(null);
  res.send('Tokens cleared, please authenticate again.');
});

app.get('/auth', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar']
  });
  res.redirect(authUrl);
});

app.get('/oauth2callback', async (req, res, next) => {
  const code = req.query.code;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    console.log('Tokens acquired:', tokens);
    res.send('Authentication successful!');
  } catch (err) {
    next(err);
  }
});

app.get('/events', protect, async (req, res, next) => {
  if (!oauth2Client.credentials || !oauth2Client.credentials.access_token) {
    return res.status(401).send('No access token, please authenticate first.');
  }

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  try {
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime'
    });
    const events = response.data.items;
    const sortedEvents = events.sort((a, b) => new Date(a.start.dateTime || a.start.date) - new Date(b.start.dateTime || b.start.date));
    console.log('Sorted events:', sortedEvents);
    res.send(sortedEvents);
  } catch (err) {
    next(err);
  }
});

app.post('/tasks', protect, async (req, res, next) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.send(task);
  } catch (err) {
    next(err);
  }
});

app.get('/tasks', protect, async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ time: 1 });
    res.send(tasks);
  } catch (err) {
    next(err);
  }
});

app.put('/tasks/:id', protect, async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(task);
  } catch (err) {
    next(err);
  }
});

app.delete('/tasks/:id', protect, async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.send(task);
  } catch (err) {
    next(err);
  }
});

cron.schedule('0 * * * *', async () => {
  const now = new Date();
  const tasks = await Task.find({ reminder: true });
  tasks.forEach(task => {
    const taskTime = new Date(task.time);
    if (now >= taskTime) {
      console.log(`Reminder: ${task.name} at ${taskTime}`);
      task.reminder = false;
      task.save();
    }
  });
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION_ID,
  project: process.env.OPENAI_PROJECT_ID,
});

app.post('/chat', protect, async (req, res, next) => {
  const userMessage = req.body.message;
  console.log('Received message:', userMessage);

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userMessage }],
    });
    console.log('OpenAI API response:', response);

    const botMessage = response.choices[0].message.content;
    res.send({ message: botMessage });
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
