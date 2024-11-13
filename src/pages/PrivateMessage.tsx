import React, { useState, useEffect } from 'react';
import { Box, Text, Input, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

const getUserId = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = "https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile";
    const response = await axios.get(url, config);
    const userId = response.data.user._id;
    localStorage.setItem("userId", userId);

    return userId;
  } catch (error) {
    console.error("Error fetching user ID:", error);
    return null;
  }
};

const DMPage = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const [friendId, setFriendId] = useState(null); // State for friend ID
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      if (id) {
        setUserId(id);
      } else {
        console.log("User ID not found. Redirecting to home.");
        navigate('/');
      }
    };

    fetchUserId();
  }, [navigate]);

  useEffect(() => {
    if (userId && friendId) {
      const fetchMessages = async () => {
        const messagesData = await handleMessagesFetch(userId, friendId);
        if (messagesData) {
          setMessages(messagesData);
        }
      };

      fetchMessages();
    }
  }, [userId, friendId]);

  useEffect(() => {
    // Extract friendId from the current URL
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split('id2=');
    if (urlParts.length > 1) {
      setFriendId(urlParts[1].split('&')[0]);
    }
  }, []);

  const handleSendMessage = async () => {
    if (message.trim().length > 0) {
      try {
        const url = `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/chat/message`;
        const authToken = localStorage.getItem('token');

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            content: message,
            receiverId: friendId,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Message sent:', responseData);

        // Add the new message to the UI
        setMessages((prevMessages) => [...prevMessages, responseData]);
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleMessagesFetch = async (userId, friendId) => {
    try {
      const authToken = localStorage.getItem('token');

      const response = await fetch(
        `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/chat/conversation?id1=${userId}&id2=${friendId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const messagesData = await response.json();
      console.log('Fetched Messages Data:', messagesData);
      return messagesData;
    } catch (error) {
      console.error('Error fetching messages:', error);
      return null;
    }
  };

  const lastMessage = messages[messages.length - 1];

  return (
    <Box p={4} ml={80}> {/* Add padding to the left to avoid overlap with the sidebar */}
      {/* <Text fontSize="xl" mb={4}>
        DM with Friend ID: {friendId}
      </Text> */}

      {/* {lastMessage && (
        // <Text fontSize="md" mb={4}>
        //   Last message: {lastMessage.content}
        // </Text>
      )} */}

      <Box display="flex" flexDirection="column" gap={4} mt={4}>
        {messages.length === 0 ? (
          <Text>No messages yet. Start the conversation!</Text>
        ) : (
          messages.map((msg, index) => (
            <Box key={index} display="flex" flexDirection="column" alignItems={msg.senderId === userId ? 'flex-start' : 'flex-end'} mb={2}>
              <Box
                bg={msg.senderId === userId ? 'blue.500' : 'gray.300'}
                color={msg.senderId === userId ? 'white' : 'black'}
                borderRadius="md"
                padding="2"
                maxWidth="60%"
                wordBreak="break-word"
              >
                {msg.content}
              </Box>
              <Text fontSize="xs" color="gray" mt={1}>
                {format(new Date(msg.createdAt), 'HH:mm')}
              </Text>
            </Box>
          ))
        )}
      </Box>

      <Box display="flex" mt={4}>
        <Input
          flex="1"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          mr={2}
        />
        <Button colorScheme="teal" onClick={handleSendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default DMPage;
