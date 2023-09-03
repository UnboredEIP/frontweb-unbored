import React, { Component, ChangeEvent } from 'react';
import '../styles/pages/ClientActivityInfo.css';
import activityImage from "../google.png";
import { Link } from 'react-router-dom';
import axios from "axios";

interface State {
  id_exemple: number;
  type: string;
  nom: string;
  horaires: string;
  date: string;
  lieuVille: string;
  lieuRue: string;
  lieuNumero: string;
  description: string;
  age: string;
  payante: boolean;
  prix: string;
  email: string;
  telephone: string;
}

class ActivityDetailsPage extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      id_exemple: 1,
      type: 'sport',
      nom: 'Activité de sport',
      horaires: '10h00 - 12h00',
      date: '2023-09-01',
      lieuVille: 'Villeville',
      lieuRue: 'Rue de l\'activité',
      lieuNumero: '123',
      description: 'Une activité sportive amusante pour tous les âges',
      age: '6+',
      payante: true,
      prix: '10',
      email: 'contact@example.com',
      telephone: '123-456-7890',
    };
  }

  DeleteActivity = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/event/deleteActivity", {
        id_exemple: this.state.id_exemple, // Utilisez this.state.id_exemple
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div className="ActivityInfo-form-container">
        <div className="ActivityInfo-header">
          <Link to="/client-profile">
            <button>Retour</button>
          </Link>
          <div className="ActivityInfo-buttons">
          <Link to="/client-modifyActivity">
            <button>Modifier</button>
            </Link>
            <button onClick={this.DeleteActivity}>Supprimer</button>
          </div>
        </div>
        <h2 className="ActivityInfo-form-title">Bowling super cool</h2>
        <div className="ActivityInfo-image">
          <img src={activityImage} alt="Activité" />
        </div>
        <h2 className="ActivityInfo-form-title">Détails de l'activité</h2>
        <div className="ActivityInfo-form-row">
          <label className="ActivityInfo-column_20">
            Type d'activité:
          </label>
          <label className="ActivityInfo-column_75">
            <input
              className="ActivityInfo-input"
              type="text"
              readOnly
              value={this.state.type}
            />
          </label>
        </div>
        <br />
        <div className="ActivityInfo-form-row">
          <label className="ActivityInfo-column_20">
            Nom de l'activité:
          </label>
          <label className="ActivityInfo-column_75">
            <input
              className="ActivityInfo-input"
              type="text"
              readOnly
              value={this.state.nom}
            />
          </label>
        </div>
        <br />
        <div className="ActivityInfo-form-row">
          <label className="ActivityInfo-column_20">
            Horaires:
          </label>
          <label className="ActivityInfo-column_25">
            <input
              className="ActivityInfo-input"
              type="text"
              readOnly
              value={this.state.horaires}
            />
          </label>
          <label className="ActivityInfo-column_10"></label>
          <label className="ActivityInfo-column_15">
            Date:
          </label>
          <label className="ActivityInfo-column_25">
            <input
              className="ActivityInfo-input"
              type="text"
              readOnly
              value={this.state.date}
            />
          </label>
        </div>
        <div className="ActivityInfo-separator"></div>
        <div className="ActivityInfo-form-row">
          <label className="ActivityInfo-column_20">
            Lieu (Ville):
          </label>
          <label className="ActivityInfo-column_75">
            <input
              className="ActivityInfo-input"
              type="text"
              readOnly
              value={this.state.lieuVille}
            />
          </label>
        </div>
        <br />
        <div className="ActivityInfo-form-row">
          <label className="ActivityInfo-column_20">
            Lieu (Rue):
          </label>
          <label className="ActivityInfo-column_75">
            <input
              className="ActivityInfo-input"
              type="text"
              readOnly
              value={this.state.lieuRue}
            />
          </label>
        </div>
        <br />
        <div className="ActivityInfo-form-row">
          <label className="ActivityInfo-column_20">
            Lieu (Numéro):
          </label>
          <label className="ActivityInfo-column_75">
            <input
              className="ActivityInfo-input"
              type="text"
              readOnly
              value={this.state.lieuNumero}
            />
          </label>
        </div>
        <div className="ActivityInfo-separator"></div>
        <div className="ActivityInfo-form-row">
          <label className="ActivityInfo-column_20">
            Age conseillé:
          </label>
          <label className="ActivityInfo-column_75">
            <input
              className="ActivityInfo-input"
              type="text"
              readOnly
              value={this.state.age}
            />
          </label>
        </div>
        <div className="ActivityInfo-form-row">
          <label className="ActivityInfo-column_20">
            Activité payante:
          </label>
          <label className="ActivityInfo-column_75">
            <input
              className="ActivityInfo-input"
              type="text"
              readOnly
              value={this.state.payante ? 'Oui' : 'Non'}
            />

          </label>
        </div>
        {this.state.payante && (
          <div className="ActivityInfo-form-row">
            <label className="ActivityInfo-column_20">
              Prix:
            </label>
            <label className="ActivityInfo-column_75">
              <input
                className="ActivityInfo-input"
                type="text"
                readOnly
                value={`${this.state.prix} €`}
              />
            </label>
          </div>
        )}
        <div className="ActivityInfo-form-row">
          <label className="ActivityInfo-column_20">
            Adresse e-mail:
          </label>
          <label className="ActivityInfo-column_75">
            <input
              className="ActivityInfo-input"
              type="text"
              readOnly
              value={this.state.email}
            />
          </label>
        </div>
        <div className="ActivityInfo-form-row">
          <label className="ActivityInfo-column_20">
            Tél.:
          </label>
          <label className="ActivityInfo-column_75">
            <input
              className="ActivityInfo-input"
              type="text"
              readOnly
              value={this.state.telephone}
            />
          </label>
        </div>
        <div className="ActivityInfo-separator"></div>
        <label>
          <span className="ActivityInfo-label-orange">Description de l'activité:</span>
          <div className="ActivityInfo-description">
            <input
              className="ActivityInfo-input"
              type="textarea"
              readOnly
              value={this.state.description}
            />
          </div>
        </label>
        <h2 className="ActivityInfo-form-title">Statistiques de l'activité</h2>
        <div className="ActivityInfo-form-row">
          <label className="ActivityInfo-column_20">
            Tranche d'âge cible:
          </label>
          <label className="ActivityInfo-column_75">
            <input
              className="ActivityInfo-input"
              type="text"
              readOnly
              value={this.state.age}
            />
          </label>
        </div>
        <div className="ActivityInfo-form-row">
          <label className="ActivityInfo-column_20">
            Recette générée ce mois-ci:
          </label>
          <label className="ActivityInfo-column_75">
            <input
              className="ActivityInfo-input"
              type="text"
              readOnly
              value="2000 €"  // Vous pouvez afficher la vraie valeur ici
            />
          </label>
        </div>
        <div className="ActivityInfo-form-row">
          <label className="ActivityInfo-column_20">
            Recette générée cette semaine:
          </label>
          <label className="ActivityInfo-column_75">
            <input
              className="ActivityInfo-input"
              type="text"
              readOnly
              value="500 €"  // Vous pouvez afficher la vraie valeur ici
            />
          </label>
        </div>
        <div className="ActivityInfo-form-row">
          <label className="ActivityInfo-column_20">
            Taux de fréquentation:
          </label>
          <label className="ActivityInfo-column_75">
            <input
              className="ActivityInfo-input"
              type="text"
              readOnly
              value="80%"  // Vous pouvez afficher le vrai taux ici
            />
          </label>
        </div>
      </div>
    );
  }
}

export default ActivityDetailsPage;
