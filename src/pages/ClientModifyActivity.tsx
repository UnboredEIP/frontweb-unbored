import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import '../styles/pages/ClientModifyActivity.css';
import activityImage from "../google.png";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";

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
  selectedFile: File | null;
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
    selectedFile: null,
  });

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);

    setState({
      ...state,
    });
  }

  const toast = useToast();

  const ModifyActivity = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const { type, nom } = state;

      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.put(`http://20.216.143.86/event/editevent?id=${id}`, {
        categories: type,
        name: nom,
      }, config);

      const pictureURl = `http://20.216.143.86/event/upload?id=${id}`

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
        selectedFile: null,
      });

      const urlImage = `http://20.216.143.86/getimage?imageName=${firstPictureId}`;
      const responseImage = await axios.get(urlImage, { responseType: "blob", ...config });

      const img = URL.createObjectURL(responseImage.data);

      setResponseImage(img);

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
          <button onClick={ModifyActivity}>Sauvegarder</button>
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
            value={state.nom}
            onChange={(e) => setState(prevState => ({ ...prevState, nom: e.target.value }))}
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
            value={state.horaires}
            onChange={(e) => setState(prevState => ({ ...prevState, horaires: e.target.value }))}
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
            value={state.date}
            onChange={(e) => setState(prevState => ({ ...prevState, date: e.target.value }))}
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
          Age conseillé:
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
            onChange={(e) => setState(prevState => ({ ...prevState, payante: e.target.checked }))}
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
      <label>
        <span className="ModifyActivity-label-orange">Description de l'activité:</span>
        <div className="ModifyActivity-description">
          <input
            className="ModifyActivity-input"
            type="textarea"
            value={state.description}
            onChange={(e) => setState(prevState => ({ ...prevState, description: e.target.value }))}
          />
        </div>
      </label>
    </div>
  );
}

export default ActivityDetailsPage;
