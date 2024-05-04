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

  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [responseImage, setResponseImage] = useState<string | null>(null);
  const navigate = useNavigate(); // useNavigate always called

  useEffect(() => {
    const getProfileInfo = async () => {
      try {
        const token = localStorage.getItem('token');   
        if (token === null) {
          //console.log("caca null")
          navigate("/");
        }
      
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const url = 'https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile';
        const response = await axios.get(url, config);
        const profileDetails = response.data.user;
        console.log("token de la  db: ")
        console.log(token)
        console.log(profileDetails);
        
        // Check if the user has a profile picture
        if (profileDetails.profilPhoto) {
          const firstPictureId = profileDetails.profilPhoto;
          const urlImage = `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/getimage?imageName=${firstPictureId}`;
          const responseImage = await axios.get(urlImage, { responseType: 'blob', ...config });

          const img = URL.createObjectURL(responseImage.data);
          setResponseImage(img);
        }

        setUserData({
          name: profileDetails.username,
          profilePicture: profileDetails.profilPhoto,
          followers: 0,
          following: 10,
          description: 'une description banale',
          interests: profileDetails.preferences,
        });
      } catch (error) {
        const token = localStorage.getItem('token');
        console.error('Token value: ');
        console.error(token);
        console.error(error);
      }
    };

    getProfileInfo();
  }, []);

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const avatarUrl = URL.createObjectURL(file);
      setSelectedAvatar(avatarUrl);
    }
    updateProfilePicture();
  };

  const handleAvatarClick = () => {
    // Trigger the file input click when the profile picture is clicked
    document.getElementById('avatarInput')?.click();
  };

  const updateProfilePicture = async () => {
    try {
      const token = localStorage.getItem('token');
    const formData = new FormData();
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const url = 'https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile';
        const response = await axios.get(url, config);
        const profileDetails = response.data.user;
        console.log("Information db ID: ")
        console.log(profileDetails)
        let firstPictureId = "";
        let PicUrl = "";
        // Check if the user has a profile picture
        if (profileDetails.profilPhoto) {
          firstPictureId = profileDetails.profilPhoto;
          PicUrl = "/getimage?id=" + firstPictureId
        }
    
    // Append the file directly, not the URI
    formData.append('file', selectedAvatar as File);

    const url_ = 'https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile/profilepicture';
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch(url_, {
        method: 'POST',
        headers: headers,
        body: formData,
      });


      // Assuming the server responds with JSON, you can parse the response
      const data = await response.json();

      // Handle the response data as needed
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
    //const picture = await axios.post(PicUrl, formData, config);
    //console.log(picture.status);
      // Optionally, you may want to fetch and update the user data after the picture update
      // Call getProfileInfo() or refetch the updated user details as needed
    } catch (error) {
      const token = localStorage.getItem('token');
      console.error('Error updating profile picture:', error);
    }
  };

  return (
    <Box p={4} textAlign="center">
      <Heading mb={4} fontSize="2xl">
        {userData.name}
      </Heading>

      {/* Display the selected avatar, user's profile picture, or a default avatar */}
      <label htmlFor="avatarInput" style={{ cursor: 'pointer' }}>
        <Avatar
          size="xl"
          src={selectedAvatar || responseImage || userData.profilePicture}
          mb={4}
          onClick={handleAvatarClick}
        />
      </label>

      {/* Input for choosing a new avatar */}
      <input
        id="avatarInput"
        type="file"
        accept="image/*"
        onChange={handleAvatarChange}
        style={{ display: 'none' }} // Hide the input element
      />

      {/* Rest of the code remains unchanged */}

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
