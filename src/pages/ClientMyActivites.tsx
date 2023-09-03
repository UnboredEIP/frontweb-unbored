import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/ClientMyActivites.css';
import logoGoogle from "../google.png";

interface ButtonProps {
  text: string;
  index: number;
  image: string;
}

function Button({ text, index, image }: ButtonProps) {
  const buttonStyle = {
    backgroundImage: `url(${image})`,
  };

  return (
    <Link to={`/client-MyActivites/${index + 1}`} className="MyActivities-button">
      <div className="MyActivities-image-container" style={buttonStyle}></div>
      <div className="MyActivities-button-label">{text}</div>
    </Link>
  );
}

function ClientMyActivities() {
  const topButtonData = [
    { label: 'Activité 1', image: logoGoogle },
    { label: 'Activité 2', image: logoGoogle },
    { label: 'Activité 3', image: logoGoogle },
    { label: 'Activité 4', image: logoGoogle },
    { label: 'Activité 5', image: logoGoogle },
    // Ajoutez plus d'entrées avec des labels et l'image logoGoogle si nécessaire
  ];

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
          {topButtonData.map(({ label, image }, index) => (
            <Button key={index} text={label} index={index} image={image} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClientMyActivities;
