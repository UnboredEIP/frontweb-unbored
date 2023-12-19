import React from 'react';
import { Box, Heading, Avatar, Text, Stack } from '@chakra-ui/react';

const ProfilePage = () => {
  const userData = {
    name: 'Nom de l\'utilisateur pour test',
    profilePicture: 'lien_vers_la_photo.jpg',
    followers: 1000,
    following: 500,
    events: 10,
    description: 'Je ne sais pas quoi dire',
    interests: ['Intérêt 1', 'Intérêt 2', 'Intérêt 3'],
  };

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
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            {userData.events}
          </Text>
          <Text fontSize="sm">Évènements</Text>
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
