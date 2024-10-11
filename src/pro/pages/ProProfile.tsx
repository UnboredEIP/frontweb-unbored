import React, { useState, useEffect } from 'react';
import ProMyAccount from './ProMyAccount';
import ProMyActivites from './ProMyActivites';
import ProMyContract from './ProMyContract';
import ManageAvatar from '../../pages/ManageAvatar';
import { useLocation } from 'react-router-dom';
import '../styles/ProProfile.css';

interface ButtonProps {
  text: string;
  onClick: () => void;
  isSelected: boolean; // Ajout d'une prop pour indiquer si le bouton est sélectionné
}

function Button({ text, onClick, isSelected }: ButtonProps) {
  return (
    <button
      className={`proProfile-button ${isSelected ? 'proProfile-button-selected' : ''}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

function ProProfile() {
  const [selectedPage, setSelectedPage] = useState<string>(''); // State to store which content to display
  const location = useLocation();
  const fromPage = location.state?.fromPage;

  // Initialiser selectedPage lors du premier rendu
  useEffect(() => {
    if (fromPage) {
      setSelectedPage(fromPage.charAt(0).toUpperCase() + fromPage.slice(1)); // Capitaliser le premier caractère
    } else {
      setSelectedPage('Profil'); // Valeur par défaut
    }
  }, [fromPage]);

  const buttonLabels = ['Profil', 'Activités', 'Avatar', 'Contrats', 'Parametres'];

  const renderContent = () => {
    switch (selectedPage) {
      case 'Profil':
        return <ProMyAccount />;
      case 'Activités':
        return <ProMyActivites />;
      case 'Contrats':
        return <ProMyContract />;
      case 'Avatar':
        return <ManageAvatar />;
      case 'Parametres':
        return <div>Bientôt</div>;
      default:
        return <div>Page non trouvée</div>;
    }
  };

  return (
    <div className="proProfile-container">
      <div className="proProfile-button-container-left">
        {buttonLabels.map((label, index) => (
          <Button
            key={index}
            text={label}
            onClick={() => setSelectedPage(label)}
            isSelected={selectedPage === label} // Passer l'état de sélection du bouton
          />
        ))}
      </div>
      <div className="proProfile-centered-box">
        <div className="proProfile-content-box">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default ProProfile;
