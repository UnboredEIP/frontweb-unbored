import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface ProfileParams {
  id: string;
}

const UserProfile: React.FC = () => {
  const { id } = useParams<ProfileParams>();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile?id=${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProfile(response.data.user);
      } catch (error) {
        console.error('Error fetching user profile', error);
        setError('Error fetching user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id]);

  const handleAddFriend = async () => {
    try {
      await axios.post(`https://x2025unbored786979363000.francecentral.cloudapp.azure.com/friends/invite?user_id=${profile._id}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
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
    <div style={styles.container}>
      <h2>Profile of {profile.username}</h2>
      <p>ID: {profile._id}</p>
      <p>Username: {profile.username}</p>
      <button onClick={handleAddFriend}>Add Friend</button>
      {/* Display additional profile details as needed */}
    </div>
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
