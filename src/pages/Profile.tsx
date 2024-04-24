import React, { useState, useEffect, ChangeEvent } from 'react';
import { Box, Heading, Avatar, Text, Stack } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: '',
    profilePicture: '',
    followers: 0,
    following: 0,
    description: '',
    interests: [],
  });

  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  const [responseImage, setResponseImage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfileInfo = async () => {
      try {
        const token = localStorage.getItem('token');   
        if (token === null) {
          navigate("/");
        }
      
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const url = 'http://20.216.143.86/profile';
        const response = await axios.get(url, config);
        const profileDetails = response.data.user;
        
        console.log("Info PPs " , profileDetails.profilePhoto);

        if (profileDetails.profilePhoto) {
          const firstPictureId = profileDetails.profilePhoto;
          const urlImage = `http://20.216.143.86/getimage?imageName=${firstPictureId}`;
          const responseImage = await axios.get(urlImage, { responseType: 'blob', ...config });

          const img = URL.createObjectURL(responseImage.data);
          setResponseImage(img);
        }

        setUserData({
          name: profileDetails.username,
          profilePicture: profileDetails.profilePhoto,
          followers: 0,
          following: 10,
          description: 'une description banale',
          interests: profileDetails.preferences,
        });
      } catch (error) {
        const token = localStorage.getItem('token');
        console.error('Token value: ', token);
        console.error(error);
      }
    };

    getProfileInfo();
  }, []);

  const updateProfilePicture = async (file: File) => {
    try {
      const token = localStorage.getItem('token');
      const url_ = 'http://20.216.143.86/profile/profilepicture';
      
      const headers = {
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      };

      const formDataToSend = new FormData();
      formDataToSend.append('file', file, file.name);

      const response = await fetch(url_, {
        method: 'POST',
        headers: headers,
        body: formDataToSend,
      });

      console.log("Data to send: " , file, file.name);
      const responseData = await response.json();

      // Handle the response data as needed
      console.log(responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedAvatar(file);
      updateProfilePicture(file); // Call updateProfilePicture after setting the selected avatar
    }
  };

  const handleAvatarClick = () => {
    document.getElementById('avatarInput')?.click();
  };

  return (
    <Box p={4} textAlign="center">
      <Heading mb={4} fontSize="2xl">
        {userData.name}
      </Heading>

      <label htmlFor="avatarInput" style={{ cursor: 'pointer' }}>
        <Avatar
          size="xl"
          src={selectedAvatar ? URL.createObjectURL(selectedAvatar) : responseImage || userData.profilePicture}
          mb={4}
          onClick={handleAvatarClick}
        />
      </label>

      <input
        id="avatarInput"
        type="file"
        accept="image/*"
        onChange={handleAvatarChange}
        style={{ display: 'none' }}
      />

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
          <Text fontSize="sm">Nombre d'activité faite</Text>
        </Box>
      </Stack>

      <Text mb={4} fontSize="md">
        {userData.description}
      </Text>

      <Heading size="md" mb={2}>
        Intérêts
      </Heading>
      <Stack direction="row" spacing={2} justifyContent="center">
        {userData.interests?.map((interest, index) => (
          <Box key={index} bg="gray.200" p={2} borderRadius="md" fontSize="sm">
            {interest}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default ProfilePage;
