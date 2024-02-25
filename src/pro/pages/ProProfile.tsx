import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/ProProfile.css';

interface ButtonProps {
  text: string;
}

function Button({ text }: ButtonProps) {
  let toPath = '/';
  if (text === 'Mon compte') {
    toPath = '/Pro-myAccount';
  } else if (text === 'Activité') {
    toPath = '/Pro-myActivites';
  }
  else if (text === 'Contrat') {
    toPath = '/Pro-myContract';
  }

  return (
    <Link to={toPath}>
      <button className="button">
        {text}
      </button>
    </Link>
  );
}

function ProProfile() {
  const topButtonLabels = ['Mon compte', 'Entreprise', 'Activité', 'Contrat', 'Historique'];
  const botButtonLabels = ['Transactions', 'Parametre', 'Outil', 'Aide', 'Déconnexion'];
  const navigate = useNavigate();

  return (
    <div className="button-box">
      <div className="Profile-back-button">
        <Link to="/Pro-menu">
          <button>Retour</button>
        </Link>
      </div>
      <div className="centered-box">
        <div className="banner">Profil</div>
        <div className="button-container">
          {topButtonLabels.map((label, index) => (
            <Button key={index} text={label} />
          ))}
        </div>
        <div className="button-container">
          {botButtonLabels.map((label, index) => (
            <Button key={index} text={label} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProProfile;
