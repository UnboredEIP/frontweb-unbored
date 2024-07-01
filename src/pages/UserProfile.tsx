import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Box, Heading, Avatar, Text, Stack } from '@chakra-ui/react';

interface ProfileParams {
  id: string;
}

const UserProfile: React.FC = () => {
  //const { id } = useParams();
  const location = useLocation();
  const fullUrl = `${window.location.origin}${location.pathname}`;
  const pathSegments = fullUrl.split('/');
  const id = pathSegments[pathSegments.length - 1];

  //const { id } = useParams<ProfileParams>();  // Extracts id from the URL
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [responseImage, setResponseImage] = useState<string | null>(null);


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(
          `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile/get?id=${id}`, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const profileDetails = response.data.user;

        // Fetch profile picture
        if (profileDetails.profilePhoto) {
          const urlImage = `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/getimage?imageName=${profileDetails.profilePhoto}`;
          const responseImage = await axios.get(urlImage, { responseType: 'blob', headers: { Authorization: `Bearer ${token}` } });
          const img = URL.createObjectURL(responseImage.data);
          setResponseImage(img);
        }

        setProfile(profileDetails);
      } catch (error) {
        console.error('Error fetching user profile', error);
        setError('Error fetching user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id]);  // `id` dependency ensures the effect runs when `id` changes

  const handleAddFriend = async () => {
    try {
      await axios.post(
        `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/friends/invite?user_id=${profile._id}`, 
        null, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      // Optionally, you can update the profile state or show a success message
    } catch (error) {
      console.error('Error inviting friend', error);
      // Handle error state or display an error message
    }
  };

  if (loading) {
    return <div style={styles.container}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.container}>Error: {error}</div>;
  }

  if (!profile) {
    return <div style={styles.container}>No profile found.</div>;
  }

  return (
    <Box p={4} textAlign="center">
      <Heading mb={4} fontSize="2xl">
        Profile of {profile.username}
      </Heading>

      <Avatar size="xl" src={responseImage || `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/getimage?imageName=${profile.profilePhoto}`} mb={4} />

      <Stack direction="row" spacing={4} mb={4} justifyContent="center">
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            {profile.friends.length}
          </Text>
          <Text fontSize="sm">Abonnés</Text>
        </Box>
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            {profile.reservations.length}
          </Text>
          <Text fontSize="sm">Nombre d'activité faite</Text>
        </Box>
      </Stack>

      <Heading size="md" mb={2}>
        Intérêts
      </Heading>
      <Stack direction="row" spacing={2} justifyContent="center">
        {profile.preferences?.map((interest: string, index: number) => (
          <Box key={index} bg="gray.200" p={2} borderRadius="md" fontSize="sm">
            {interest}
          </Box>
        ))}
      </Stack>
      <br />
      <br />
      <br />
  
      <button onClick={handleAddFriend}>Add Friend</button>
    </Box>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',  // Ensures the content is centered vertically on the page
    flexDirection: 'column',  // Centers items in a column format
  },
};

export default UserProfile;
