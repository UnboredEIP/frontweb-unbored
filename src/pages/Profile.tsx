import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  Box,
  Heading,
  Avatar,
  Text,
  Stack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: '',
    profilePicture: '',
    followers: 0,
    following: 0,
    description: '',
    interests: [],
  });

  const [friendRequests, setFriendRequests] = useState<{ senderId: string; senderUsername: string }[]>([]);
  const [friendsList, setFriendsList] = useState<{ id: string; username: string }[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  const [responseImage, setResponseImage] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure(); // For friend requests modal
  const { isOpen: isFriendsListOpen, onOpen: onFriendsListOpen, onClose: onFriendsListClose } = useDisclosure(); // For friends list modal
  const navigate = useNavigate();

  useEffect(() => {
    const getProfileInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token === null) {
          navigate('/');
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const url = 'https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile';
        const response = await axios.get(url, config);
        const profileDetails = response.data.user;

        if (profileDetails.profilePhoto) {
          const firstPictureId = profileDetails.profilePhoto;
          const urlImage = `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/getimage?imageName=${firstPictureId}`;
          const responseImage = await axios.get(urlImage, { responseType: 'blob', ...config });

          const img = URL.createObjectURL(responseImage.data);
          setResponseImage(img);
        }

        // Update the user data with the initial details
        setUserData((prevState) => ({
          ...prevState,
          name: profileDetails.username,
          profilePicture: profileDetails.profilePhoto,
          following: profileDetails.reservations.length,
          description: '',
          interests: profileDetails.preferences,
        }));

        // Fetch the list of friends to update followers count
        fetchFriendsCount();
      } catch (error) {
        console.error(error);
      }
    };

    const fetchFriendsCount = async () => {
      try {
        const token = localStorage.getItem('token');
        const url = 'https://x2025unbored786979363000.francecentral.cloudapp.azure.com/friends';
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(url, config);
        const friends = response.data.friends; // Assuming the response contains an array of friends
        setUserData((prevState) => ({
          ...prevState,
          followers: friends.length, // Update the followers count
        }));
      } catch (error) {
        console.error('Error fetching friends count:', error);
      }
    };

    getProfileInfo();
  }, [navigate]);

  const fetchFriendRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = 'https://x2025unbored786979363000.francecentral.cloudapp.azure.com/friends/invitations';
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(url, config);
      const requests = response.data.invitations;

      // Now fetch each user's profile to get their username
      const updatedRequests = await Promise.all(
        requests.map(async (request: any) => {
          const profileUrl = `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile/get?id=${request._id}`;
          const profileResponse = await axios.get(profileUrl, config);
          const senderUsername = profileResponse.data.user.username;

          return {
            senderId: profileResponse.data.user._id,
            senderUsername, // Replace senderId with the actual username
          };
        })
      );

      setFriendRequests(updatedRequests);
    } catch (error) {
      console.error('Error fetching friend requests:', error);
    }
  };

  const fetchFriendsList = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = 'https://x2025unbored786979363000.francecentral.cloudapp.azure.com/friends';
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.get(url, config);
  
      // Assuming the response contains an array of friends
      const friends = response.data.friends; 
  
      // Check if friends is an array
      if (Array.isArray(friends)) {
        // Prepare an array to hold the friends list
        const friendsList = await Promise.all(friends.map(async (friend) => {
          // Construct the profile URL using the friend's _id
          const profileUrl = `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile/get?id=${friend._id}`;
          
          // Fetch the user's profile to get the username
          const profileResponse = await axios.get(profileUrl, config);
          const senderUsername = profileResponse.data.user.username;
  
          // Log the friend's ID and the username
          console.log(`Friend ID: ${friend._id}, Username: ${senderUsername}`);
  
          // Return the friend object with id and username
          return {
            id: friend._id,
            username: senderUsername,
          };
        }));
        
        // Update the state with the constructed friends list
        setFriendsList(friendsList);
      } else {
        console.error('Expected friends to be an array but got:', friends);
      }
    } catch (error) {
      console.error('Error fetching friends list:', error);
    }
  };
  
  const updateProfilePicture = async (file: File) => {
    try {
      const token = localStorage.getItem('token');
      const url_ = 'https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile/profilepicture';

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

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedAvatar(file);
      updateProfilePicture(file);
    }
  };

  const handleAvatarClick = () => {
    document.getElementById('avatarInput')?.click();
  };

  const handleFriendRequestClick = async () => {
    await fetchFriendRequests();
    onOpen(); // Open the modal to show the requests
  };

  const handleFollowersClick = async () => {
    await fetchFriendsList();
    onFriendsListOpen(); // Open the modal to show the friends list
  };

  const handleAcceptFriendRequest = async (senderId: string) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const url = `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/friends/accept?user_id=${senderId}`;

      // Call the accept API
      await axios.post(url, { user_id: senderId }, config);

      // After accepting, you can refresh the friend requests list
      fetchFriendRequests();
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const handleRejectFriendRequest = (senderId: string) => {
    // Do nothing for now when "Supprimer" is clicked.
    console.log('Supprimer clicked for senderId:', senderId);
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
        <Box onClick={handleFollowersClick} style={{ cursor: 'pointer' }}>
          <Text fontWeight="bold" fontSize="lg">
            {friendsList.length}
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

      {/* Friend Request Button */}
      <Button mt={4} colorScheme="teal" onClick={handleFriendRequestClick}>
        Voir les demandes d'amis
      </Button>

      {/* Modal for showing friend requests */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Demandes d'amis</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {friendRequests.length > 0 ? (
              <Stack>
                {friendRequests.map((request, index) => (
                  <Box key={index} p={4} borderWidth="1px" borderRadius="md">
                    <Text>{request.senderUsername}</Text>
                    <Stack direction="row" spacing={4}>
                      <Button
                        colorScheme="green"
                        onClick={() => handleAcceptFriendRequest(request.senderId)}
                      >
                        Confirmer
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => handleRejectFriendRequest(request.senderId)}
                      >
                        Supprimer
                      </Button>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            ) : (
              <Text>Aucune demande d'ami en attente.</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Modal for showing friends list */}
      <Modal isOpen={isFriendsListOpen} onClose={onFriendsListClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Liste d'amis</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {friendsList.length > 0 ? (
              <Stack>
                {friendsList.map((friend, index) => (
                  <Box key={index} p={4} borderWidth="1px" borderRadius="md">
                    <Link to={`/userprofil/${friend.id}`}>
                      <Text>{friend.username}</Text>
                    </Link>
                  </Box>
                ))}
              </Stack>
            ) : (
              <Text>Aucun ami dans la liste.</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProfilePage;
