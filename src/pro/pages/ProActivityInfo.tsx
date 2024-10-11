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
  type: string | string[];
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
  const [isCreator, setIsCreator] = useState<boolean>(false);
  const [creatorInfo, setCreatorInfo] = useState<any>(null);

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

      if (firstPictureId != null) {
        const urlImage = `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/getimage?imageName=${firstPictureId}`;
        const responseImage = await axios.get(urlImage, { responseType: "blob", ...config });
        const img = URL.createObjectURL(responseImage.data);
        setResponseImage(img);
      }

      const urlCreator = `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile?id=${activityDetails.creator}`;
      const responseCreator = await fetch(urlCreator, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = await responseCreator.json();
      setCreatorInfo(userData.user)

      const profileUrl = `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile`;
      const profileResponse = await axios.get(profileUrl, config);
      const profileDetails = profileResponse.data.user;

      if (activityDetails.creator == profileDetails._id) {
        setIsCreator(true)
      }

      console.log("creato", isCreator)
      console.log(profileDetails)

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
  const types = Array.isArray(state.type) ? state.type : (typeof state.type === 'string' ? state.type.split(',') : []);

  return (
    <div className="ActivityInfo-form-container">
      <nav className="MyAccount-breadcrumb">
        <Link to="/">Home</Link>/
        <Link to="/Pro-menu">Pro</Link>/
        <Link
          to="/Pro-profile"
          state={{ fromPage: "activités" }} // Utiliser state directement
        >
          Activités
        </Link>/
        <Link to="" className="active">{state.nom}</Link>
      </nav>
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
          {isCreator && (
            <>
              <Link to={`/pro-ModifyActivity/${id}`}>
                <button>Modifier</button>
              </Link>
              <button onClick={deleteActivity}>Supprimer</button>
            </>
          )}
        </div>
      </div>
      {creatorInfo && (
        <label className="ActivityInfo-column_20">
          Created by {creatorInfo.username} {creatorInfo.email}
        </label>
      )}
      <h2 className="ActivityInfo-big-title">{state.nom}</h2>
      <div className='ActivityInfo-image-conteneur'>
        <div className="ActivityInfo-image">
          {responseImage && <img src={responseImage} />}
        </div>
      </div>
      <div className="ActivityInfo-container-details">
        <h2 className="ActivityInfo-small-title">Détails de l'activité</h2>
        <div className="ActivityInfo-form-row">
          <div className="ActivityInfo-typetag_container">
            {types.map((type, index) => (
              <span key={index} className="ActivityInfo-typetag">
                {type}
                {index < types.length - 1}
              </span>
            ))}
          </div>
        </div>

        {/* ADRESSE */}
        <div className="ActivityInfo-form-row">
          <label className="ActivityInfo-label-full-new">
            Adresse
          </label>
          <input
            className="ActivityInfo-input-new"
            type="text"
            readOnly
            value={state.adresse}
          />
        </div>

        {/* DATE */}
        <div className="ActivityInfo-form-row">
          <label className="ActivityInfo-label-full-new">
            Date:
          </label>
          <input
            className="ActivityInfo-input-half-new"
            type="date"
            readOnly
            value={state.date}
          />
        </div>

        {/* HORAIRES */}
        <div className="ActivityInfo-form-row">
          <label className="ActivityInfo-label-half-new">
            Horaires Debut:
          </label>
          <input
            className="ActivityInfo-input-half-new"
            type="text"
            readOnly
            value={state.horairesStart}
          />
          <label className="ActivityInfo-label-half-new">
            Horaires Fin:
          </label>
          <input
            className="ActivityInfo-input-half-new"
            type="text"
            readOnly
            value={state.horairesEnd}
          />
        </div>

        <div className="ActivityInfo-separator"></div>
        <div className="ActivityInfo-form-row">
          <label className="ActivityInfo-label-half-new">
            Age minimum:
          </label>
          <input
            className="ActivityInfo-input-half-new"
            type="text"
            readOnly
            value={state.age}
          />
        </div>

        <div className="ActivityInfo-form-row">
          <label className="ActivityInfo-label-half-new">
            Activité payante:
          </label>
          <input
            className="ActivityInfo-input-radio-new"
            type="radio"
            readOnly
            checked={state.payante}
          />

          {state.payante && (
            <div style={{ width: '50%' }}> { }
              <div className="ActivityInfo-form-row">
                <label className="ActivityInfo-label-price-new">
                  Prix:
                </label>
                <input
                  className="ActivityInfo-input-price-new"
                  type="text"
                  readOnly
                  value={`${state.prix} €`}
                />
              </div>
            </div>
          )}
        </div>

        <div className="ActivityInfo-form-row">
          <label className="ActivityInfo-label-half-new">
            Adresse e-mail:
          </label>
          <input
            className="ActivityInfo-input-half-new"
            type="text"
            readOnly
            value={state.email}
          />
          <label className="ActivityInfo-label-half-new">
            Tél.:
          </label>
          <input
            className="ActivityInfo-input-half-new"
            type="text"
            readOnly
            value={state.telephone}
          />
        </div>
        <div className="ActivityInfo-separator"></div>
        <div className="ActivityInfo-form-row">
          <span className="ActivityInfo-label-red">Description de l'activité:</span>
        </div>
        <div className="ActivityInfo-form-row">
          <div className="ActivityInfo-description" style={{ width: '100%' }}>
            <input
              className="ActivityInfo-input"
              type="textarea"
              readOnly
              value={state.description}
            />
          </div>

        </div>
      </div>
      <div className="ActivityInfo-container-stats">
        <h2 className="ActivityInfo-small-title">Statistiques de l'activité</h2>
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
    </div >
  );
}

export default ActivityDetailsPage;
