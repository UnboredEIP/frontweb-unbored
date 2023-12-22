import React, { Component, ChangeEvent } from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  position,
} from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import '../styles/pages/CreateActivityPage.css';
import axios from "axios";
import Select, { ActionMeta, MultiValue } from 'react-select';
import { Center } from 'chakra-ui';

interface State {
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
  selectedOption: { value: string; label: string } | null;
}

class CreateActivityPage extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      type: '', // Initialisez avec un tableau vide
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
      telephone: '',
      selectedOption: null,
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }


  options: readonly any[] = [
    { value: 'sport', label: 'Sport' },
    { value: 'theatre', label: 'Théâtre' },
    { value: 'musique', label: 'Musique' },
    { value: 'art', label: 'Art' },
    { value: 'danse', label: 'Danse' },
    { value: 'cuisine', label: 'Cuisine' },
    { value: 'jeux', label: 'Jeux' },
    { value: 'nature', label: 'Nature' },
    { value: 'technologie', label: 'Technologie' },
  ];

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

  handleSelectChange = (newValue: any, actionMeta: any) => {
    // console.log(this.options)
    console.log(newValue);
    // console.log(newValue);
    // const value = actionMeta.option
    // this.setState( { value } )
    // this.setState( );
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
      const response = await axios.post("http://20.216.143.86/event/createevent", {
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
        <div className="CreateActivity-container">
        <h2 className="CreateActivity-form-title">Créer une activité</h2>
        </div>
        <form onSubmit={this.handleSubmit}>

          {/* ROW 0 */}


          {/* ROW 1 */}
          <div className="CreateActivity-row">

            {/* GAUCHE 1*/}
            <div className="CreateActivity-left-side" style={{borderRight: '2px solid gray', marginRight: '5px'}}>
              {/* Type activité */}
              <div className="CreateActivity-form-row">
                <label className="CreateActivity-label-column_100">
                  Type d'activité:
                </label>
              </div>
              <div className="CreateActivity-form-row">
                <Select
                  className='selectYes'
                  isMulti
                  options={this.options}
                  onChange={this.handleSelectChange}
                  placeholder="Sélectionnez un secteur d'activité"
                />

              </div>
              {/* Nom activité */}
              <div className="CreateActivity-form-row">
                <label className="CreateActivity-label-column_100">
                  Nom de l'activité:
                </label>
              </div>
              <div className="CreateActivity-form-row">
                <label className="CreateActivity-column_75">
                  <input
                    className='CreateActivity-input'
                    name="nom"
                    value={this.state.nom}
                    onChange={this.handleInputChange}
                  />
                </label>
              </div>
              {/* ROW 1.1 */}
              <div className="CreateActivity-row">
                {/* GAUCHE 1.1*/}
                <div className="CreateActivity-left-side">
                  {/* Age conseillé */}
                  <div className="CreateActivity-form-row">
                    <label className="CreateActivity-label-column_100">
                      Age conseillé:
                    </label>
                  </div>
                  <div className="CreateActivity-form-row">
                    <label className="CreateActivity-column_75">
                      <input
                        className='CreateActivity-input'
                        name="age"
                        value={this.state.age}
                        onChange={this.handleInputChange}
                      />
                    </label>
                  </div>
                  {/* Activité payante */}
                  <div className="CreateActivity-form-row">
                    <label className="CreateActivity-label-column">
                      Activité payante:
                    </label>
                  </div>
                  <div className="CreateActivity-form-row">
                    <label className="CreateActivity-column_25">
                      <input
                        type="checkbox"
                        name="payante"
                        checked={this.state.payante}
                        onChange={this.handleInputChange}
                      />
                    </label>
                  </div>
                  {/* Tél */}
                  <div className="CreateActivity-form-row">
                    <label className="CreateActivity-label-column_100" >
                      Téléphone
                    </label>
                  </div>
                  <div className="CreateActivity-form-row">
                    <label className="CreateActivity-column_75">
                      <input
                        className='CreateActivity-input'
                        type="tel"
                        name="telephone"
                        value={this.state.telephone}
                        onChange={this.handleInputChange}
                      />
                    </label>
                  </div>
                </div>
                {/* DROITE 1.1*/}
                <div className="CreateActivity-right-side">
                  {/* Prix */}
                  {this.state.payante ? (
                    <>
                      <div className='CreateActivity-price-show'>

                      </div>
                      <div className="CreateActivity-price-form">
                        <label className="CreateActivity-label-column_25">
                          Prix:
                        </label>
                      </div>
                      <div className="CreateActivity-form-row">
                        <label className="CreateActivity-column_75">
                          <input
                            className="CreateActivity-input"
                            id="prix"
                            name="prix"
                            value={this.state.prix}
                            onChange={this.handleInputChange} />
                        </label>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='CreateActivity-price-empty' style={{ marginTop: '2px' }}>
                      </div>
                    </>
                  )}
                  {/* Email */}
                  <div className="CreateActivity-form-row">
                    <label className="CreateActivity-label-column_100" style={{ marginTop: '0px' }}>
                      Adresse e-mail:
                    </label>
                  </div>
                  <div className="CreateActivity-form-row">
                    <label className="CreateActivity-column_75">
                      <input
                        className='CreateActivity-input'
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>



            {/* DROITE 1 */}
            <div className="CreateActivity-right-side" >
              {/* Row 1 */}
              <div className="CreateActivity-row">
                {/* gauche 1.1 */}
                <div className="CreateActivity-left-side" style={{marginLeft: '10%'}}>
                  {/* Horaire */}
                  <div className="CreateActivity-form-row">
                    <label className="CreateActivity-label-column_100">
                      Horaires:
                    </label>

                  </div>
                  <div className="CreateActivity-form-row">
                    <label className="CreateActivity-column_75">
                      <input
                        className='CreateActivity-input'
                        name="horaires"
                        value={this.state.horaires}
                        onChange={this.handleInputChange}
                      />
                    </label>
                  </div>
                  {/* Lieu (Ville) */}
                  <div className="CreateActivity-form-row">
                    <label className="CreateActivity-label-column_100">
                      Lieu (Ville):
                    </label>
                  </div>
                  <div className="CreateActivity-form-row">
                    <label className="CreateActivity-column_75">
                      <input
                        className='CreateActivity-input'
                        name="lieuVille"
                        value={this.state.lieuVille}
                        onChange={this.handleInputChange}
                      />

                    </label>
                  </div>
                  {/* Lieu Numero */}
                  <div className="CreateActivity-form-row">
                    <label className="CreateActivity-label-column_100">
                      Lieu (Numéro):
                    </label>
                  </div>
                  <div className="CreateActivity-form-row">
                    <label className="CreateActivity-column_75">
                      <input
                        className='CreateActivity-input'
                        name="lieuNumero"
                        value={this.state.lieuNumero}
                        onChange={this.handleInputChange}
                      />
                    </label>
                  </div>
                </div>




                {/* droite 1.1*/}
                <div className="CreateActivity-right-side">
                  {/* Date */}
                  <div className="CreateActivity-form-row">
                    <label className="CreateActivity-label-column_100">
                      Date:
                    </label>
                  </div>
                  <div className="CreateActivity-form-row">
                    <label className="CreateActivity-column_75">
                      <input
                        className='CreateActivity-input'
                        name="date"
                        value={this.state.date}
                        onChange={this.handleInputChange}
                      />
                    </label>
                  </div>
                  {/* Lieu Rue */}
                  <div className="CreateActivity-form-row">
                    <label className="CreateActivity-label-column_100">
                      Lieu (Rue):
                    </label>
                  </div>
                  <div className="CreateActivity-form-row">
                    <label className="CreateActivity-column_75">
                      <input
                        className='CreateActivity-input'
                        name="lieuRue"
                        value={this.state.lieuRue}
                        onChange={this.handleInputChange}
                      />
                    </label>
                  </div>
                  {/* ESPACE */}
                </div>
              </div>
              {/* Photo */}
              <div className="CreateActivity-photo-uploader">
                <label className="CreateActivity-column_20">
                  Photo du lieu:
                </label>
                <div className="CreateActivity-image-upload">
                  <input type="file" name="image" />
                  <label className="CreateActivity-label-orange">Uploader une image</label>
                </div>
              </div>
            </div>
          </div>

          <div className="CreateActivity-separator"></div>

          {/* Description */}
          <div className="CreateActivity-row">
            <label className="CreateActivity-label-orange">
              Description de l'activité:
            </label>
          </div>
          <div className="CreateActivity-row">
            <textarea
              className='CreateActivity-input'
              name="description"
              value={this.state.description}
              onChange={this.handleInputChange}
            ></textarea>

          </div>
          {/* Bouton */}
          <div className="CreateActivity-row">
            {/* <div className="CreateActivity-center-button"> */}
            <label className="CreateActivity-column_100" style={{ marginTop: '10px' }}>
              <button type="submit">Créer</button>
            </label>
            {/* </div> */}
          </div>
        </form >
      </div >
    );
  }
}

export default CreateActivityPage;
