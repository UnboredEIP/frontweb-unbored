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
  const [searchTerm, setSearchTerm] = useState<string>('');

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

  // Fonction pour diviser les événements en sous-tableaux de 4 éléments
  const chunkArray = (array: Activity[], chunkSize: number) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  // Fonction pour filtrer les événements en fonction du terme de recherche
  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Diviser les événements filtrés en groupes de 4
  const eventChunks = chunkArray(filteredEvents, 4);

  // Fonction handleChange pour mettre à jour le terme de recherche
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="MyActivities-button-box">
      <div className="MyActivities-back-button">
        <nav className="MyActivities-breadcrumb">
          <Link to="/">Home</Link>/
          <Link to="/Pro-menu">Pro</Link>/
          <Link to="" className="active">Activités</Link>
        </nav>
      </div>

      <div className="MyActivities-banner">Activités</div>
      <div className="MyActivities-searchbar">
        <input
          type="text"
          placeholder="Rechercher..."
          className="MyActivities-search-input"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      <div className="MyActivities-scroll-box">
        {eventChunks.map((chunk, index) => (
          <div className="My-activities-row" key={index}>
            {chunk.map((activity, idx) => (
              <Button key={idx} text={activity.name} activity={activity} images={activity.pictures.map(pic => pic.id)} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProMyActivities;
