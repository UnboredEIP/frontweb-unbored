import React, { useState, useEffect } from 'react';
import { Box, Heading, Avatar, Text, Stack } from '@chakra-ui/react';
import axios from 'axios';

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: '',
    profilePicture: '',
    followers: 0,
    following: 0,
    description: '',
    interests: [],
  });

  useEffect(() => {
    const getProfileInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const url = 'http://20.216.143.86/profile';
        const response = await axios.get(url, config);
        const profileDetails = response.data.user;

        setUserData({
          name: profileDetails.username,
          profilePicture: profileDetails.profilePicture, // Update with the correct field from the backend
          followers: 100, // Update with the correct field from the backend
          following: 100, // Update with the correct field from the backend
          description: profileDetails.description, // Update with the correct field from the backend
          interests: profileDetails.interests, // Update with the correct field from the backend
        });
      } catch (error) {
        const token = localStorage.getItem('token');
        console.error("Token value: ");
        console.error(token);
        console.error(error);
      }
    };

    getProfileInfo();
  }, []);

  return (
    <Box p={4} textAlign="center">
      <Heading mb={4} fontSize="2xl">
        {userData.name}
      </Heading>
      <Avatar size="xl" src={userData.profilePicture} mb={4} />

      <Stack direction="row" spacing={4} mb={4} justifyContent="center">
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            {userData.followers}
          </Text>
          <Text fontSize="sm">Abonnés</Text>
        </Box>
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            {userData.following}
          </Text>
          <Text fontSize="sm">Abonnements</Text>
        </Box>
      </Stack>

      <Text mb={4} fontSize="md">
        {userData.description}
      </Text>

      <Heading size="md" mb={2}>
        Intérêts
      </Heading>
      <Stack direction="row" spacing={2} justifyContent="center">
        {userData.interests.map((interest, index) => (
          <Box key={index} bg="gray.200" p={2} borderRadius="md" fontSize="sm">
            {interest}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default ProfilePage;
