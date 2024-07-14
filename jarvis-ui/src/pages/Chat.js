import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Container, TextField, Button, Box, List, ListItem, Paper, CircularProgress, IconButton } from '@mui/material';
import { chatWithAI } from '../api';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const chatEndRef = useRef(null);

  const recognition = useRef(null);
  const synth = window.speechSynthesis;

  const handleSend = useCallback(async (messageToSend = message) => {
    if (messageToSend.trim() === '') return;

    const userMessage = { role: 'user', content: messageToSend };
    setChatHistory((prevChatHistory) => [...prevChatHistory, userMessage]);
    setMessage(''); // Reset the input field immediately after sending the message

    setLoading(true);
    try {
      const res = await chatWithAI(messageToSend);
      const aiMessage = { role: 'ai', content: res.message };
      setChatHistory((prevChatHistory) => [...prevChatHistory, aiMessage]);

      // Use speech synthesis to speak the AI response
      const utterance = new SpeechSynthesisUtterance(res.message);
      synth.speak(utterance);
    } catch (error) {
      console.error('Error chatting with AI:', error);
    } finally {
      setLoading(false);
    }
  }, [message, synth]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognition.current = new window.webkitSpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
        setListening(false);
        handleSend(transcript);
      };

      recognition.current.onerror = (event) => {
        console.error('Speech recognition error', event);
        setListening(false);
      };
    } else {
      alert('Your browser does not support speech recognition. Please try a different browser.');
    }
  }, [handleSend]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const handleStartListening = () => {
    setListening(true);
    recognition.current.start();
  };

  const handleStopListening = () => {
    setListening(false);
    recognition.current.stop();
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  return (
    <Container maxWidth="md" sx={{ mt: 4, backgroundColor: '#f5f5f5', color: '#000000', height: '80vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
        <List>
          {chatHistory.map((chat, index) => (
            <ListItem key={index} sx={{ display: 'flex', justifyContent: chat.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <Paper
                elevation={3}
                sx={{
                  backgroundColor: chat.role === 'user' ? '#e0e0e0' : '#d1ffd6',
                  borderRadius: 2,
                  padding: 1,
                  maxWidth: '70%',
                  color: '#000000',
                  mb: 1
                }}
              >
                {chat.content}
              </Paper>
            </ListItem>
          ))}
          <div ref={chatEndRef} />
        </List>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          label="Type your message"
          variant="outlined"
          fullWidth
          margin="normal"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          sx={{ backgroundColor: '#ffffff', flexGrow: 1, mr: 2 }}
          InputLabelProps={{ style: { color: '#000000' } }}
        />
        <IconButton
          color={listening ? 'secondary' : 'primary'}
          onClick={listening ? handleStopListening : handleStartListening}
        >
          {listening ? <StopIcon /> : <MicIcon />}
        </IconButton>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#bfbfbf', '&:hover': { backgroundColor: '#a6a6a6' }, color: '#000000', height: '56px', mt: '8px' }}
          onClick={() => handleSend()}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Send'}
        </Button>
      </Box>
    </Container>
  );
};

export default Chat;
