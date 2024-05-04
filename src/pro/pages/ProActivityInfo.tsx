import React, { Component, ChangeEvent, useState, useEffect } from 'react';
import '../styles/ProActivityInfo.css';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";
import personIcon from "../../assets/icons/personIcon.png";
import { partial } from 'lodash';


interface State {
  id_exemple: string;
  type: string;
  nom: string;
  horairesStart: string;
  horairesEnd: string;
  date: string;
  adresse: string;
  description: string;
  age: string;
  payante: boolean;
  prix: string;
  email: string;
  telephone: string;
  participants: string[]
}

const ActivityDetailsPage: React.FC = () => {
  const [state, setState] = useState<State>({
    id_exemple: '',
    type: '',
    nom: '',
    horairesStart: '',
    horairesEnd: '',
    date: '',
    adresse: '',
    description: '',
    age: '',
    payante: false,
    prix: '',
    email: '',
    telephone: '',
    participants: [],
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
      const url = `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/events/show?id=${id}`;
      const response = await axios.get(url, config);
      const activityDetails = response.data.event;

      const firstPictureId = activityDetails.pictures.length > 0
        ? activityDetails.pictures[0].id
        : null;

      const dateObject = new Date(activityDetails.start_date);
      const formattedDate = dateObject.toISOString().split('T')[0];

      const start = activityDetails.start_date.split('T')[1].substring(0, 5);
      const end = activityDetails.end_date.split('T')[1].substring(0, 5);

      setState({
        id_exemple: activityDetails._id,
        type: activityDetails.categories,
        nom: activityDetails.name,
        horairesStart: start,
        horairesEnd: end,
        date: formattedDate,
        adresse: activityDetails.address,
        description: activityDetails.description,
        age: activityDetails.age,
        payante: activityDetails.price,
        prix: activityDetails.price,
        email: activityDetails.email,
        telephone: activityDetails.phone,
        participants: activityDetails.participents
      });

      console.log("toto")
      console.log(activityDetails.participents.length)

      const urlImage = `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/getimage?imageName=${firstPictureId}`;
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

  const toast = useToast();

  const deleteActivity = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const url = `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/events/delete?id=${state.id_exemple}`;
      const response = await axios.delete(url, config);
      console.log(response.data);
      toast({
        title: "Succès !",
        description: "Votre activité à correctement été supprimée",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Un problème est survenu dans la suppression de votre activité",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="ActivityInfo-form-container">
      <button className="ActivityInfo-Button" onClick={() => navigate(-1)}>Retour</button>
      <div className="ActivityInfo-container">
        <div className="ActivityInfo-header">
          <div className="ActivityInfo-left-side">
            <div className="ActivityInfo-form-row">
              <Link to={`/Pro-myAvis/${id}`}>
                <button className="ActivityInfo-Button" style={{ marginRight: '10px' }}>Avis</button>
              </Link>
              <div className="ActivityInfo-form-row" style={{ marginTop: '5px' }}>
                <Link to={`/Pro-activitySubscribers/${id}`}>
                  <img src={personIcon} alt="Nombre de participants" width="30" height="20" />
                </Link>
                <span style={{ color: 'red' }}>{state.participants.length}</span>
              </div>
            </div>
          </div>
          <div className="ActivityInfo-buttons">
            <Link to={`/pro-ModifyActivity/${id}`}>
              <button>Modifier</button>
            </Link>
            <button onClick={deleteActivity}>Supprimer</button>
          </div>
        </div>
        <h2 className="ActivityInfo-form-title">{state.nom}</h2>
        <div className='ActivityInfo-image-conteneur'>
          <div className="ActivityInfo-image">
            {responseImage && <img src={responseImage} />}
          </div>
        </div>
        <h2 className="ActivityInfo-form-title">Détails de l'activité</h2>
        {/* <div className="ActivityInfo-form-row">
          <label className="ActivityInfo-column_20">
            id:
          </label>
          <label className="ActivityInfo-column_75">
            <input
              className="ActivityInfo-input"
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
            Date:
          </label>
          <label className="ActivityInfo-column_25">
            <input
              className="ActivityInfo-input"
              type="date"
              readOnly
              value={state.date}
            />
          </label>
        </div>
        <div className="ActivityInfo-form-row">
          <label className="ActivityInfo-column_20">
            Horaires Debut:
          </label>
          <label className="ActivityInfo-column_25">
            <input
              className="ActivityInfo-input"
              type="text"
              readOnly
              value={state.horairesStart}
            />
          </label>
          <label className="ActivityInfo-column_5"></label>
          <label className="ActivityInfo-column_20">
            Horaires Fin:
          </label>
          <label className="ActivityInfo-column_25">
            <input
              className="ActivityInfo-input"
              type="text"
              readOnly
              value={state.horairesEnd}
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
            Age minimum:
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
