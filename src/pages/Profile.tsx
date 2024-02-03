import React, { useEffect, useState } from 'react';
import { Box, Heading, Avatar, Text, Stack } from '@chakra-ui/react';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('/profile'); // Replace with your actual API endpoint
        const data = await response.json();

        // Update the state with the fetched data
        setUserData(data);
        console.log('userData:', data);

      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
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
