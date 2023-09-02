import React from 'react';
import '../styles/pages/CreateActivityPage.css';

class CreateActivityPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
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

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // Ajoutez ici le code pour traiter les données du formulaire
    console.log(this.state); // Affiche les valeurs du formulaire dans la console
  }

  render() {
    return (
      <div className="form-container">
        <h2 className="form-title">Créer une activité</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <label className="column_20">
              Type d'activité:
            </label>
            <label className="column_75">
              <select
                name="type"
                value={this.state.type}
                onChange={this.handleInputChange}
                className='text-orange'
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
          <div className="form-row">
            <label className="column_20">
              Nom de l'activité:
            </label>
            <label className="column_75">
              <input
                className='text-orange'
                name="nom"
                value={this.state.nom}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <br />
          <div className="form-row">
            <label className="column_20">
              Horaires:
            </label>
            <label className="column_25">
              <input
                className='text-orange'
                name="horaires"
                value={this.state.horaires}
                onChange={this.handleInputChange}
              />
            </label>
            <label className="column_10"></label>
            <label className="column_15">
              Date:
            </label>
            <label className="column_25">
              <input
                className='text-orange'
                name="date"
                value={this.state.date}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div className="separator"></div>
          <div className="form-row">
            <label className="column_20">
              Lieu (Ville):
            </label>
            <label className="column_25">
              <input
                className='text-orange'
                name="lieuVille"
                value={this.state.lieuVille}
                onChange={this.handleInputChange}
              />
            </label>

          </div>
          <div className="form-row">
            <label className="column_20">
              Lieu (Rue):
            </label>
            <label className="column_25">
              <input
                className='text-orange'
                name="lieuRue"
                value={this.state.lieuRue}
                onChange={this.handleInputChange}
              />
            </label>
            <label className="column_20"></label>
            <div className="image-upload">
              <input type="file" name="image" />
              <label className="label-orange">Uploader une image</label>
            </div>
          </div>
          <div className="form-row">
            <label className="column_20">
              Lieu (Numéro):
            </label>
            <label className="column_25">
              <input
                className='text-orange'
                name="lieuNumero"
                value={this.state.lieuNumero}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div className="separator"></div>
          <div className="form-row">
            <label className="column_20">
              Age conseillé:
            </label>
            <label className="column_25">
              <input
                className='text-orange'
                name="age"
                value={this.state.age}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div className="form-row">
            <label className="column_20">
              Activité payante:
            </label>
            <label className="column_25">
              <input
                type="checkbox"
                name="payante"
                checked={this.state.payante}
                onChange={this.handleInputChange}
              />
            </label>
            <label className="column_10"></label>
            {this.state.payante && (
              <><label className="column_15">
                Prix:
              </label>
                <label className="column_25">
                  <input
                    className="text-orange"
                    id="prix"
                    name="prix"
                    value={this.state.prix}
                    onChange={this.handleInputChange} />
                </label></>
            )}

          </div>
          <div className="form-row">
            <label className="column_20">
              Adresse e-mail:
            </label>
            <label className="column_25">
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </label>
            <label className="column_10"></label>
            <label className="column_15">
              Tél.:
            </label>
            <label className="column_25">
              <input
                type="tel"
                name="telephone"
                value={this.state.telephone}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div className="separator"></div>
          <label className="label-orange">
            Description de l'activité:
            <textarea
              name="description"
              value={this.state.description}
              onChange={this.handleInputChange}
            ></textarea>
          </label>
          <div className="center-button">
            <button type="submit">Créer</button>
          </div>

        </form>
      </div>
    );
  }
}

export default CreateActivityPage;
