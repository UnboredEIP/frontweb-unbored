import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/ClientProfile.css';

interface ButtonProps {
  text: string;
}

function Button({ text }: ButtonProps) {
  let toPath = '/';
  if (text === 'Mon compte') {
    toPath = '/client-myAccount';
  } else if (text === 'Activité') {
    toPath = '/client-myActivites';
  }
  else if (text === 'Contrat') {
    toPath = '/client-myContract';
  }

  return (
    <Link to={toPath}>
      <button className="button">
        {text}
      </button>
    </Link>
  );
}

function ClientProfile() {
  const topButtonLabels = ['Mon compte', 'Entreprise', 'Activité', 'Contrat', 'Historique'];
  const botButtonLabels = ['Transactions', 'Parametre', 'Outil', 'Aide', 'Déconnexion'];

  return (
    <div className="button-box">
      <div className="banner">Profile Client</div>
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
  );
}

export default ClientProfile;
