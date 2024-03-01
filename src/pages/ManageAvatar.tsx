import React, { useState } from 'react';
import '../styles/pages/ProAvisActivity.css';
import activityImage from "../google.png";
import body from "../assets/avatars/body.svg"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AvisActivityPage: React.FC = () => {

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Vêtements"); // État pour suivre l'onglet actif

  // Fonction pour changer l'onglet actif
  const changeTab = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="ProAvisActivity-form-container">
      <div className="ProAvisActivity-back-button">
        <button onClick={() => navigate(-1)}>Retour</button>
      </div>
      <div className="ProAvisActivity-row">
        {/* GAUCHE*/}
        <div className="ProAvisActivity-boxshadow-left-side">
          <div className="ProAvisActivity-container">
            <h2 className="ProAvisActivity-form-title">Prévisualisation</h2>
          </div>
          <img src={body} alt="Avatar" />
        </div>
        {/* drotie */}
        <div className="ProAvisActivity-boxshadow-right-side" >
          <div className="ProAvisActivity-container">
            {/* Onglets cliquables */}
            <div className="tabs">
              <div
                className={activeTab === "Couleurs" ? "active" : ""}
                onClick={() => changeTab("Couleurs")}
              >
                Couleurs
              </div>
              <div
                className={activeTab === "Vêtements" ? "active" : ""}
                onClick={() => changeTab("Vêtements")}
              >
                Vêtements
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ProAvisActivity-separator"></div>

      {/* Description */}
      <div className="ProAvisActivity-boxshadow-left-side">
        <div className="ProAvisActivity-container">
          <h2 className="ProAvisActivity-form-title">{activeTab}</h2> {/* Titre dynamique en fonction de l'onglet actif */}
        </div>
      </div>
    </div >
  );
}

export default AvisActivityPage;
