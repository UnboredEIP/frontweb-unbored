import React, { Component, ChangeEvent } from 'react';
import '../styles/pages/ClientModifyActivity.css';
import activityImage from "../google.png";
import { Link } from 'react-router-dom';
import axios from "axios";

interface State {
  id_exemple: string;
  type: string[];
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
      id_exemple: '65182516d9b04cc2095252e2',
      type: ['sport'],
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

  handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    // Récupérez toutes les options sélectionnées
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);

    this.setState({
      type: selectedOptions
    });
  }

  ModifyActivity = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const {
        // id_exemple,
        type,
        nom,
        // horaires,
        // date,
        // lieuVille,
        // lieuRue,
        // lieuNumero,
        // description,
        // age,
        // payante,
        // prix,
        // email,
        // telephone,
      } = this.state;

      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.put(`http://20.216.143.86/event/editevent?id=${this.state.id_exemple}`, {
        // id_exemple,
        categories: type,
        name: nom,
        // horaires,
        // date,
        // lieuVille,
        // lieuRue,
        // lieuNumero,
        // description,
        // age,
        // payante,
        // prix,
        // email,
        // telephone,
      }, config);

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

  };

  render() {
    return (
      <div className="ModifyActivity-form-container">
        <div className="ModifyActivity-header">
          <Link to="/client-activityInfo">
            <button>Retour</button>
          </Link>
          <div className="ModifyActivity-buttons">
            <button onClick={this.ModifyActivity}>Sauvegarder</button>
          </div>
        </div>
        <h2 className="ModifyActivity-form-title">Bowling super cool</h2>
        <div className="ModifyActivity-image">
          <img src={activityImage} alt="Activité" />
        </div>
        <h2 className="ModifyActivity-form-title">Détails de l'activité</h2>
        <div className="ModifyActivity-form-row">
          <label className="ModifyActivity-column_20">
            id:
          </label>
          <label className="ModifyActivity-column_75">
            <input
              className="ModifyActivity-input"
              type="text"
              value={this.state.id_exemple}
              onChange={(e) => this.setState({ id_exemple: e.target.value })}
            />
          </label>
        </div>
        <br />
        <div className="ModifyActivity-form-row">
          <label className="ModifyActivity-column_20">
            Type d'activité:
          </label>
          <label className="ModifyActivity-column_75">
            <select
              className="ModifyActivity-input"
              name="type"
              multiple // Activez la sélection multiple
              value={this.state.type}
              onChange={this.handleSelectChange}
            >
              <option value="">Sélectionnez un secteur d'activité</option>
              <option value="sport">Sport</option>
              <option value="theatre">Théâtre</option>
              <option value="musique">Musique</option>
              <option value="art">Art</option>
              <option value="danse">Danse</option>
              <option value="cuisine">Cuisine</option>
              <option value="jeux">Jeux</option>
              <option value="nature">Nature</option>
              <option value="technologie">Technologie</option>
            </select>
          </label>
        </div>
        <br />
        <div className="ModifyActivity-form-row">
          <label className="ModifyActivity-column_20">
            Nom de l'activité:
          </label>
          <label className="ModifyActivity-column_75">
            <input
              className="ModifyActivity-input"
              type="text"
              value={this.state.nom}
              onChange={(e) => this.setState({ nom: e.target.value })}
            />
          </label>
        </div>
        <br />
        <div className="ModifyActivity-form-row">
          <label className="ModifyActivity-column_20">
            Horaires:
          </label>
          <label className="ModifyActivity-column_25">
            <input
              className="ModifyActivity-input"
              type="text"
              value={this.state.horaires}
              onChange={(e) => this.setState({ horaires: e.target.value })}
            />
          </label>
          <label className="ModifyActivity-column_10"></label>
          <label className="ModifyActivity-column_15">
            Date:
          </label>
          <label className="ModifyActivity-column_25">
            <input
              className="ModifyActivity-input"
              type="text"
              value={this.state.date}
              onChange={(e) => this.setState({ date: e.target.value })}
            />
          </label>
        </div>
        <div className="ModifyActivity-separator"></div>
        <div className="ModifyActivity-form-row">
          <label className="ModifyActivity-column_20">
            Lieu (Ville):
          </label>
          <label className="ModifyActivity-column_75">
            <input
              className="ModifyActivity-input"
              type="text"
              value={this.state.lieuVille}
              onChange={(e) => this.setState({ lieuVille: e.target.value })}
            />
          </label>
        </div>
        <br />
        <div className="ModifyActivity-form-row">
          <label className="ModifyActivity-column_20">
            Lieu (Rue):
          </label>
          <label className="ModifyActivity-column_75">
            <input
              className="ModifyActivity-input"
              type="text"
              value={this.state.lieuRue}
              onChange={(e) => this.setState({ lieuRue: e.target.value })}
            />
          </label>
        </div>
        <br />
        <div className="ModifyActivity-form-row">
          <label className="ModifyActivity-column_20">
            Lieu (Numéro):
          </label>
          <label className="ModifyActivity-column_75">
            <input
              className="ModifyActivity-input"
              type="text"
              value={this.state.lieuNumero}
              onChange={(e) => this.setState({ lieuNumero: e.target.value })}
            />
          </label>
        </div>
        <div className="ModifyActivity-separator"></div>
        <div className="ModifyActivity-form-row">
          <label className="ModifyActivity-column_20">
            Age conseillé:
          </label>
          <label className="ModifyActivity-column_75">
            <input
              className="ModifyActivity-input"
              type="text"
              value={this.state.age}
              onChange={(e) => this.setState({ age: e.target.value })}
            />
          </label>
        </div>
        <div className="ModifyActivity-form-row">
          <label className="ModifyActivity-column_20">
            Activité payante:
          </label>
          <label className="ModifyActivity-column_75">
            <input
              className="ModifyActivity-input"
              type="checkbox"
              checked={this.state.payante}
              onChange={(e) => this.setState({ payante: e.target.checked })}
            />
          </label>
        </div>
        {this.state.payante && (
          <div className="ModifyActivity-form-row">
            <label className="ModifyActivity-column_20">
              Prix:
            </label>
            <label className="ModifyActivity-column_75">
              <input
                className="ModifyActivity-input"
                type="text"

                value={`${this.state.prix} €`}
                onChange={(e) => this.setState({ prix: e.target.value })}
              />
            </label>
          </div>
        )}
        <div className="ModifyActivity-form-row">
          <label className="ModifyActivity-column_20">
            Adresse e-mail:
          </label>
          <label className="ModifyActivity-column_75">
            <input
              className="ModifyActivity-input"
              type="text"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </label>
        </div>
        <div className="ModifyActivity-form-row">
          <label className="ModifyActivity-column_20">
            Tél.:
          </label>
          <label className="ModifyActivity-column_75">
            <input
              className="ModifyActivity-input"
              type="text"
              value={this.state.telephone}
              onChange={(e) => this.setState({ telephone: e.target.value })}
            />
          </label>
        </div>
        <div className="ModifyActivity-separator"></div>
        <label>
          <span className="ModifyActivity-label-orange">Description de l'activité:</span>
          <div className="ModifyActivity-description">
            <input
              className="ModifyActivity-input"
              type="textarea"
              value={this.state.description}
              onChange={(e) => this.setState({ description: e.target.value })}
            />
          </div>
        </label>
      </div>
    );
  }
}

export default ActivityDetailsPage;
