import React, { Component, ChangeEvent, FormEvent } from 'react';
import '../styles/pages/CreateActivityPage.css';
import axios from "axios";

interface State {
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

class CreateActivityPage extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      type: [], // Initialisez avec un tableau vide
      nom: '',
      horaires: '',
      date: '',
      lieuVille: '',
      lieuRue: '',
      lieuNumero: '',
      description: '',
      age: '',
      payante: false,
      prix: '',
      email: '',
      telephone: ''
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = event.target;
    const name = target.name;
    let value: string | boolean = target.value;
  
    if (target.type === 'checkbox') {
      value = (target as HTMLInputElement).checked;
    }
  
    // Créez un objet temporaire pour mettre à jour l'état
    const updatedState = {
      ...this.state,
      [name]: value
    };
  
    // Mettez à jour l'état avec l'objet temporaire
    this.setState(updatedState);
  }
  
  handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = event.target.options;
    const selectedOptions: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedOptions.push(options[i].value);
      }
    }
    this.setState({
      type: selectedOptions,
    });
  }


  handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    try {
      const lieu = `${this.state.lieuRue} ${this.state.lieuNumero} ${this.state.lieuVille}`;
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.post("http://localhost:3000/event/createevent", {
        name: this.state.nom,
        address: lieu,
        categories: this.state.type,
      }, config);
      console.log(response.status);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div className="CreateActivity-form-container">
        <h2 className="CreateActivity-form-title">Créer une activité</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="CreateActivity-form-row">
            <label className="CreateActivity-column_20">
              Type d'activité:
            </label>
            <label className="CreateActivity-column_75">
              <select
                name="type"
                value={this.state.type}
                onChange={this.handleSelectChange}
                className='text-orange'
                multiple
                size={5}
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
          <div className="CreateActivity-form-row">
            <label className="CreateActivity-column_20">
              Nom de l'activité:
            </label>
            <label className="CreateActivity-column_75">
              <input
                className='text-orange'
                name="nom"
                value={this.state.nom}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <br />
          <div className="CreateActivity-form-row">
            <label className="CreateActivity-column_20">
              Horaires:
            </label>
            <label className="CreateActivity-column_25">
              <input
                className='text-orange'
                name="horaires"
                value={this.state.horaires}
                onChange={this.handleInputChange}
              />
            </label>
            <label className="CreateActivity-column_10"></label>
            <label className="CreateActivity-column_15">
              Date:
            </label>
            <label className="CreateActivity-column_25">
              <input
                className='text-orange'
                name="date"
                value={this.state.date}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div className="CreateActivity-separator"></div>
          <div className="CreateActivity-form-row">
            <label className="CreateActivity-column_20">
              Lieu (Ville):
            </label>
            <label className="CreateActivity-column_25">
              <input
                className='text-orange'
                name="lieuVille"
                value={this.state.lieuVille}
                onChange={this.handleInputChange}
              />

            </label>
            <label className="CreateActivity-column_20"></label>
            <label className="CreateActivity-column_20">
              Photo du lieu:
            </label>

          </div>
          <div className="CreateActivity-form-row">
            <label className="CreateActivity-column_20">
              Lieu (Rue):
            </label>
            <label className="CreateActivity-column_25">
              <input
                className='text-orange'
                name="lieuRue"
                value={this.state.lieuRue}
                onChange={this.handleInputChange}
              />
            </label>
            <label className="CreateActivity-column_20"></label>
            <div className="CreateActivity-image-upload">
              <input type="file" name="image" />
              <label className="CreateActivity-label-orange">Uploader une image</label>
            </div>
          </div>
          <div className="CreateActivity-form-row">
            <label className="CreateActivity-column_20">
              Lieu (Numéro):
            </label>
            <label className="CreateActivity-column_25">
              <input
                className='text-orange'
                name="lieuNumero"
                value={this.state.lieuNumero}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div className="CreateActivity-separator"></div>
          <div className="CreateActivity-form-row">
            <label className="CreateActivity-column_20">
              Age conseillé:
            </label>
            <label className="CreateActivity-column_25">
              <input
                className='text-orange'
                name="age"
                value={this.state.age}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div className="CreateActivity-form-row">
            <label className="CreateActivity-column_20">
              Activité payante:
            </label>
            <label className="CreateActivity-column_25">
              <input
                type="checkbox"
                name="payante"
                checked={this.state.payante}
                onChange={this.handleInputChange}
              />
            </label>
            <label className="CreateActivity-column_10"></label>
            {this.state.payante && (
              <><label className="CreateActivity-column_15">
                Prix:
              </label>
                <label className="CreateActivity-column_25">
                  <input
                    className="CreateActivity-text-orange"
                    id="prix"
                    name="prix"
                    value={this.state.prix}
                    onChange={this.handleInputChange} />
                </label></>
            )}

          </div>
          <div className="CreateActivity-form-row">
            <label className="CreateActivity-column_20">
              Adresse e-mail:
            </label>
            <label className="CreateActivity-column_25">
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </label>
            <label className="CreateActivity-column_10"></label>
            <label className="CreateActivity-column_15">
              Tél.:
            </label>
            <label className="CreateActivity-column_25">
              <input
                type="tel"
                name="telephone"
                value={this.state.telephone}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div className="CreateActivity-separator"></div>
          <label className="CreateActivity-label-orange">
            Description de l'activité:
            <textarea
              name="description"
              value={this.state.description}
              onChange={this.handleInputChange}
            ></textarea>
          </label>
          <div className="CreateActivity-center-button">
            <button type="submit">Créer</button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateActivityPage;
