import { Link } from 'react-router-dom';
import '../styles/pages/ClientMyActivites.css';
import logoGoogle from "../google.png";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface ButtonProps {
  text: string;
  index: number;
  images: string[];
}

function Button({ text, activity }: ButtonProps) {
  const [imageBlob, setImageBlob] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const urlImage = `http://20.216.143.86/getimage?imageName=${activity.pictures[0].id}`;

        const response = await axios.get(urlImage, { responseType: "blob", ...config });
        const imageUrl = URL.createObjectURL(response.data);
        
        setImageBlob(imageUrl);
      } catch (error) {
        console.error('Erreur lors du chargement de l\'image :', error);
      }
    };

    if (activity.pictures.length > 0) {
      fetchImage();
    }
  }, [activity.pictures]);

  const buttonStyle = {
    backgroundImage: `url(${imageBlob || ''})`,
  };

  return (
    <Link to={`/client-activityInfo/${activity._id}`} className="MyActivities-button">
      <div className="MyActivities-image-container" style={buttonStyle}></div>
      <div className="MyActivities-button-label">{text}</div>
    </Link>
  );
}

function ClientMyActivities() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get('http://20.216.143.86/event/lists', config);
        setEvents(response.data.events);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="MyActivities-button-box">
      <div className="MyActivities-back-button">
        <Link to="/client-profile">
          <button>Retour</button>
        </Link>
      </div>
      <div className="MyActivities-banner">Mes Activités</div>
      <div className="MyActivities-scroll-box">
        <div className="MyActivities-button-container">
        {events.map((activity, index) => (
          <Button key={index} text={activity.name} activity={activity} images={activity.pictures.map(pic => pic.id)} />
        ))}

        </div>
      </div>
    </div>
  );
}

export default ClientMyActivities;