import React, { useEffect, useState } from 'react';
import { Box, Heading, Avatar, Text, Stack } from '@chakra-ui/react';
import axios from "axios";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
          const config = {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          };
          const url = `http://20.216.143.86/profile`;
          const response = await axios.get(url, config);
          const profileDetails = response.data.user;
          console.log('userData:', profileDetails);

      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    const userData = {
      name: 'Nom de l\'utilisateur pour test',
      profilePicture: 'lien_vers_la_photo.jpg',
      followers: 1000,
      following: 500,
      events: 10,
      description: 'Je ne sais pas quoi dire',
      interests: ['Intérêt 1', 'Intérêt 2', 'Intérêt 3'],
    };

    fetchData();
  }, []);

  if (!userData) {
    // Render loading state or return null while data is being fetched
    return null;
  }

  return (
    <h1>toto</h1>
  );
    // <Box p={4} textAlign="center">
    //   <Heading mb={4} fontSize="2xl">
    //     {userData.name}
    //   </Heading>
    //   <Avatar size="xl" src={userData.profilePicture} mb={4} />

    //   <Stack direction="row" spacing={4} mb={4} justifyContent="center">
    //     <Box>
    //       <Text fontWeight="bold" fontSize="lg">
    //         {userData.followers}
    //       </Text>
    //       <Text fontSize="sm">Abonnés</Text>
    //     </Box>
    //     <Box>
    //       <Text fontWeight="bold" fontSize="lg">
    //         {userData.following}
    //       </Text>
    //       <Text fontSize="sm">Abonnements</Text>
    //     </Box>
    //     <Box>
    //       <Text fontWeight="bold" fontSize="lg">
    //         {userData.events}
    //       </Text>
    //       <Text fontSize="sm">Évènements</Text>
    //     </Box>
    //   </Stack>

    //   <Text mb={4} fontSize="md">
    //     {userData.description}
    //   </Text>

    //   <Heading size="md" mb={2}>
    //     Intérêts
    //   </Heading>
    //   <Stack direction="row" spacing={2} justifyContent="center">
    //     {userData.interests.map((interest, index) => (
    //       <Box key={index} bg="gray.200" p={2} borderRadius="md" fontSize="sm">
    //         {interest}
    //       </Box>
    //     ))}
    //   </Stack>
    // </Box>
  // );
};

export default ProfilePage;
