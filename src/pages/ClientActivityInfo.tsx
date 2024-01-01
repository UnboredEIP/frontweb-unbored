import React, { Component, ChangeEvent, useState, useEffect } from 'react';
import '../styles/pages/ClientActivityInfo.css';
import activityImage from "../google.png";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";

interface State {
  id_exemple: string;
  type: string;
  nom: string;
  horaires: string;
  date: string;
  adresse: string;
  description: string;
  age: string;
  payante: boolean;
  prix: string;
  email: string;
  telephone: string;
}

const ActivityDetailsPage: React.FC = () => {
  const [state, setState] = useState<State>({
    id_exemple: '',
    type: '',
    nom: '',
    horaires: '',
    date: '',
    adresse: '',
    description: '',
    age: '',
    payante: false,
    prix: '',
    email: '',
    telephone: '',
  });

  const { id } = useParams();
  const [responseImage, setResponseImage] = useState<string | null>(null);

  const getActivity = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log('ID from useParams:', id);
      const url = `http://20.216.143.86/event/show?id=${id}`;
      const response = await axios.get(url, config);
      const activityDetails = response.data.event;

      const firstPictureId = activityDetails.pictures.length > 0
        ? activityDetails.pictures[0].id
        : null;

      setState({
        id_exemple: activityDetails._id,
        type: activityDetails.categories,
        nom: activityDetails.name,
        horaires: activityDetails.horaires,
        date: activityDetails.date,
        adresse: activityDetails.address,
        description: activityDetails.description,
        age: activityDetails.age,
        payante: activityDetails.payante,
        prix: activityDetails.prix,
        email: activityDetails.email,
        telephone: activityDetails.telephone,
      });

      const urlImage = `http://20.216.143.86/getimage?imageName=${firstPictureId}`;
      const responseImage = await axios.get(urlImage, { responseType: "blob", ...config });

      const img = URL.createObjectURL(responseImage.data);

      setResponseImage(img);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getActivity();
  }, [id]); // Include 'id' as a dependency so useEffect re-runs when 'id' changes

  const deleteActivity = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const url = `http://20.216.143.86/event/deleteevent?id=${state.id_exemple}`;
      const response = await axios.delete(url, config);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="ActivityInfo-form-container">
      <div className="ActivityInfo-container">
        <div className="ActivityInfo-header">
          <Link to="/client-profile">
            <button>Retour</button>
          </Link>
          <Link to="/client-myAvis">
            <button>Avis</button>
          </Link>
          <div className="ActivityInfo-buttons">
            <Link to="/client-modifyActivity">
              <button>Modifier</button>
            </Link>
            <button onClick={deleteActivity}>Supprimer</button>
          </div>
        </div>
        <h2 className="ActivityInfo-form-title">Bowling super cool</h2>
        <div className='ActivityInfo-image-conteneur'>
          <div className="ActivityInfo-image">
            {responseImage && <img src={responseImage} />}
          </div>
        </div>
        <h2 className="ActivityInfo-form-title">Détails de l'activité</h2>
        {/* <div className="ModifyActivity-form-row">
          <label className="ModifyActivity-column_20">
            id:
          </label>
          <label className="ModifyActivity-column_75">
            <input
              className="ModifyActivity-input"
              type="text"
              value={state.id_exemple}
              onChange={(e) => setState({ ...state, id_exemple: e.target.value })}
            />
          </label>
        </div> */}
        <br />
        <div className="ActivityInfo-form-row">
          <label className="ActivityInfo-column_20">
            Type d'activité:
          </label>
          <label className="ActivityInfo-column_75">
            <input
              className="ActivityInfo-input"
              type="text"
              readOnly
              value={state.type}
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
              value={state.nom}
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
              value={state.horaires}
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
              value={state.date}
            />
          </label>
        </div>
        <div className="ActivityInfo-separator"></div>
        <div className="ActivityInfo-form-row">
          <label className="ActivityInfo-column_20">
            Adresse:
          </label>
          <label className="ActivityInfo-column_75">
            <input
              className="ActivityInfo-input"
              type="text"
              readOnly
              value={state.adresse}
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
              value={state.age}
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
              value={state.payante ? 'Oui' : 'Non'}
            />

          </label>
        </div>
        {state.payante && (
          <div className="ActivityInfo-form-row">
            <label className="ActivityInfo-column_20">
              Prix:
            </label>
            <label className="ActivityInfo-column_75">
              <input
                className="ActivityInfo-input"
                type="text"
                readOnly
                value={`${state.prix} €`}
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
              value={state.email}
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
              value={state.telephone}
            />
          </label>
        </div>
        <div className="ActivityInfo-separator"></div>
        <label>
          <span className="ActivityInfo-label-red">Description de l'activité:</span>
          <div className="ActivityInfo-description">
            <input
              className="ActivityInfo-input"
              type="textarea"
              readOnly
              value={state.description}
            />
          </div>
        </label>
      </div>
      <div className="ActivityInfo-container">
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
              value={state.age}
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
    </div>
  );
}

export default ActivityDetailsPage;
