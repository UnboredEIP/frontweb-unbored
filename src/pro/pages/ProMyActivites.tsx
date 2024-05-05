import { Link } from 'react-router-dom';
import '../styles/ProMyActivites.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Picture {
 id: string;
}

interface Activity {
 name: string;
 _id: string;
 pictures: Picture[];
}

interface ButtonProps {
 text: string;
 activity: Activity;
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

        const urlImage = `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/getimage?imageName=${activity.pictures[0].id}`;

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
    <Link to={`/Pro-activityInfo/${activity._id}`} className="MyActivities-button">
      <div className="MyActivities-image-container" style={buttonStyle}></div>
      <div className="MyActivities-button-label">{text}</div>
    </Link>
 );
}

function ProMyActivities() {
 const [events, setEvents] = useState<Activity[]>([]);

 useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get('https://x2025unbored786979363000.francecentral.cloudapp.azure.com/events/lists', config);
        setEvents(response.data.events);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
 }, []);

 const navigate = useNavigate();

 return (
    <div className="MyActivities-button-box">
      <div className="MyActivities-back-button">
        <button onClick={() => navigate(-1)}>Retour</button>
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

export default ProMyActivities;
