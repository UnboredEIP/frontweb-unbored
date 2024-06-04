import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import '../styles/ProModifyActivity.css';
import activityImage from "../google.png";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";

interface State {
  id_exemple: string;
  type: string[];
  nom: string;
  horairesStart: string;
  horairesEnd: string;
  date: Date | null;
  adresse: string;
  description: string;
  age: string;
  payante: boolean;
  prix: string;
  email: string;
  telephone: string;
  selectedFile: File | null;
}

const ActivityDetailsPage: React.FC = () => {
  const [state, setState] = useState<State>({
    id_exemple: '',
    type: [],
    nom: '',
    horairesStart: '',
    horairesEnd: '',
    date: null,
    adresse: '',
    description: '',
    age: '',
    payante: false,
    prix: '',
    email: '',
    telephone: '',
    selectedFile: null,
  });

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);

    setState({
      ...state,
      type: selectedOptions  // Mettre à jour l'état avec les options sélectionnées
    });
  }

  const toast = useToast();

  const ModifyActivity = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!state.nom || !state.adresse || !state.date
      || !state.horairesStart || !state.horairesEnd || (state.payante && (parseInt(state.prix, 10) <= 0 || !state.prix)) || !state.telephone
      || !state.email || !state.age || !state.description) {

      toast({
        title: "Erreur",
        description: "Certains champs clés ne sont pas remplis",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      console.log("Veuillez remplir tous les champs.");

      if (!state.nom) console.log("Le champ Nom n'est pas rempli.");
      if (!state.adresse) console.log("Le champ Adresse n'est pas rempli.");
      if (!state.date) console.log("Le champ Date n'est pas rempli.");
      if (!state.horairesStart) console.log("Le champ Horaires de début n'est pas rempli.");
      if (!state.horairesEnd) console.log("Le champ Horaires de fin n'est pas rempli.");
      if (state.payante && (parseInt(state.prix, 10) <= 0 || !state.prix)) {
        console.log("Le champ Prix n'est pas rempli ou est invalide.");
      }
      if (!state.telephone) console.log("Le champ Téléphone n'est pas rempli.");
      if (!state.email) console.log("Le champ Email n'est pas rempli.");
      if (!state.age) console.log("Le champ Age n'est pas rempli.");
      if (!state.description) console.log("Le champ Description n'est pas rempli.");

      return; // Empêcher le formulaire de se soumettre
    }


    try {
      const { type, nom, adresse, date } = state;

      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const [hoursStrStart, minutesStrStart] = state.horairesStart.split(':');
      const hoursStart = parseInt(hoursStrStart, 10);
      const minutesStart = parseInt(minutesStrStart, 10);
      let theDateStart = null;

      if (state.date != null) {
        theDateStart = new Date(state.date);
        theDateStart.setUTCHours(hoursStart);
        theDateStart.setUTCMinutes(minutesStart);
      }

      const [hoursStrEnd, minutesStrEnd] = state.horairesEnd.split(':');
      const hoursEnd = parseInt(hoursStrEnd, 10);
      const minutesEnd = parseInt(minutesStrEnd, 10);
      let theDateEnd = null;

      if (state.date != null) {
        theDateEnd = new Date(state.date);
        theDateEnd.setUTCHours(hoursEnd);
        theDateEnd.setUTCMinutes(minutesEnd);
      }

      if (theDateStart != null && theDateEnd != null) {
        if (theDateStart.getTime() >= theDateEnd.getTime()) {
          toast({
            title: "Erreur",
            description: "L'horaire de fin doit être supérieur à celle de début",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          return;
        }
      }

      const response = await axios.put(`https://x2025unbored786979363000.francecentral.cloudapp.azure.com/events/edit?id=${id}`, {
        categories: type,
        name: nom,
        address: adresse,
        start_date: theDateStart,
        end_date: theDateEnd,
        age: state.age,
        price: state.prix,
        phone: state.telephone,
        email: state.email,
        description: state.description
      }, config);

      const pictureURl = `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/event/upload?id=${id}`

      if (state.selectedFile) {
        const formData = new FormData();
        formData.append('file', state.selectedFile);

        const picture = await axios.post(pictureURl, formData, config);
        console.log(picture.status);
      } else {
        console.error('Aucun fichier sélectionné.');
      }

      console.log(response.data);
      toast({
        title: "Succès !",
        description: "Votre activité à correctement été modifiée",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Un problème est survenu dans la modification de votre activité",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  const navigate = useNavigate();

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

      const start = activityDetails.start_date.split('T')[1].substring(0, 5);
      const end = activityDetails.end_date.split('T')[1].substring(0, 5);

      setState({
        id_exemple: activityDetails._id,
        type: activityDetails.categories,
        nom: activityDetails.name,
        horairesStart: start,
        horairesEnd: end,
        date: new Date(activityDetails.start_date),
        adresse: activityDetails.address,
        description: activityDetails.description,
        age: activityDetails.age,
        payante: activityDetails.price,
        prix: activityDetails.price,
        email: activityDetails.email,
        telephone: activityDetails.phone,
        selectedFile: null,
      });

      if (state.prix !== '') {
        setState(prevState => ({
          ...prevState, // Copier toutes les propriétés existantes de l'état
          payante: true // Mettre à jour la propriété payante
        }));
      }
      if (firstPictureId != null) {
        const urlImage = `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/getimage?imageName=${firstPictureId}`;
        const responseImage = await axios.get(urlImage, { responseType: "blob", ...config });

        const img = URL.createObjectURL(responseImage.data);

        setResponseImage(img);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imagePreviewRef = useRef<HTMLImageElement>(null);

  const handleFileSelect = () => {
    const fileInput = fileInputRef.current;
    const imagePreview = imagePreviewRef.current;

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];
      setState((prevState) => ({ ...prevState, selectedFile }));

      console.log(selectedFile);

      if (imagePreview) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (imagePreview) imagePreview.src = reader.result as string;
        };
        reader.readAsDataURL(selectedFile);
      }
    }
  };

  useEffect(() => {
    getActivity();
  }, [id]);

  return (
    <div className="ModifyActivity-form-container">
      <div className="ModifyActivity-header">
        <button onClick={() => navigate(-1)}>Retour</button>
        <div className="ModifyActivity-buttons">
          <button onClick={ModifyActivity} style={{ width: '150px' }}>Sauvegarder</button>
        </div>
      </div>
      <h2 className="ModifyActivity-form-title">{state.nom}</h2>
      <div className='ActivityInfo-image-conteneur'>
        <div className="ActivityInfo-image">
          {responseImage && <img src={responseImage} />}
        </div>
      </div>
      <div className="CreateActivity-photo-uploader">
        <label className="CreateActivity-column_20">
          Changer de photo:
        </label>
        <div>
          <input
            type="file"
            name="image"
            ref={fileInputRef}
            onChange={handleFileSelect}
          />
        </div>

        <img
          ref={imagePreviewRef}
          alt="Image Preview"
          style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }}
        />
      </div>
      <h2 className="ModifyActivity-form-title">Détails de l'activité</h2>
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
            value={state.type}
            onChange={handleSelectChange}
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
            <option value="Food">Food</option>
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
            value={state.nom}
            onChange={(e) => setState(prevState => ({ ...prevState, nom: e.target.value }))}
          />
        </label>
      </div>
      <br />
      <div className="ModifyActivity-form-row">
        <label className="ModifyActivity-column_20">
          Date:
        </label>
        <label className="ModifyActivity-column_25">
          <input
            className="ModifyActivity-input"
            type="date"
            value={state.date instanceof Date ? state.date.toISOString().split('T')[0] : (state.date || '')}
            onChange={(e) => {
              const newDate = new Date(e.target.value); // Convertir la valeur de la chaîne en objet Date
              setState(prevState => ({ ...prevState, date: newDate }));
            }}
          />
        </label>
      </div>
      <div className="ModifyActivity-form-row">
        <label className="ModifyActivity-column_20">
          Horaires Début:
        </label>
        <label className="ModifyActivity-column_25">
          <input
            className="ModifyActivity-input"
            type="time"
            value={state.horairesStart}
            onChange={(e) => setState(prevState => ({ ...prevState, horairesStart: e.target.value }))}
          />
        </label>
        <label className="ModifyActivity-column_5"></label>
        <label className="ModifyActivity-column_20">
          Horaires Fin:
        </label>
        <label className="ModifyActivity-column_25">
          <input
            className="ModifyActivity-input"
            type="time"
            value={state.horairesEnd}
            onChange={(e) => setState(prevState => ({ ...prevState, horairesEnd: e.target.value }))}
          />
        </label>
      </div>
      <div className="ModifyActivity-separator"></div>
      <div className="ModifyActivity-form-row">
        <label className="ModifyActivity-column_20">
          Adresse :
        </label>
        <label className="ModifyActivity-column_75">
          <input
            className="ModifyActivity-input"
            type="text"
            value={state.adresse}
            onChange={(e) => setState(prevState => ({ ...prevState, adresse: e.target.value }))}
          />
        </label>
      </div>
      <div className="ModifyActivity-separator"></div>
      <div className="ModifyActivity-form-row">
        <label className="ModifyActivity-column_20">
          Age minimum:
        </label>
        <label className="ModifyActivity-column_75">
          <input
            className="ModifyActivity-input"
            type="text"
            value={state.age}
            onChange={(e) => setState(prevState => ({ ...prevState, age: e.target.value }))}
          />
        </label>
      </div>
      <div className="ModifyActivity-form-row">
        <label className="ModifyActivity-column_20">
          Activité payante:
        </label>
        <label className="ModifyActivity-column_10">
          <input
            className="ModifyActivity-input"
            type="checkbox"
            checked={state.payante}
            onChange={(e) => {
              const isChecked = e.target.checked;
              setState(prevState => ({
                ...prevState,
                payante: isChecked,
                prix: isChecked ? prevState.prix : ''
              }));
            }}
          />


        </label>
      </div>
      {state.payante && (
        <div className="ModifyActivity-form-row">
          <label className="ModifyActivity-column_20">
            Prix:
          </label>
          <label className="ModifyActivity-column_75">
            <input
              className="ModifyActivity-input"
              type="text"

              value={`${state.prix}`}
              onChange={(e) => setState(prevState => ({ ...prevState, prix: e.target.value }))}
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
            value={state.email}
            onChange={(e) => setState(prevState => ({ ...prevState, email: e.target.value }))}
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
            value={state.telephone}
            onChange={(e) => setState(prevState => ({ ...prevState, telephone: e.target.value }))}
          />
        </label>
      </div>
      <div className="ModifyActivity-separator"></div>
      <div className="ModifyActivity-form-row">

        <span className="ModifyActivity-label-orange">Description de l'activité:</span>
      </div>
      <div className="ModifyActivity-form-row">
        <div className="ModifyActivity-description" style={{ width: '100%' }}>
          <input
            className="ModifyActivity-input"
            type="textarea"
            value={state.description}
            onChange={(e) => setState(prevState => ({ ...prevState, description: e.target.value }))}
          />
        </div>

      </div>
    </div>
  );
}

export default ActivityDetailsPage;
