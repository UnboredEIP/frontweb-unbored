import React, { useRef, useState } from 'react';
import '../styles/ProCreateActivityPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useToast } from "@chakra-ui/react";

interface State {
  type: string;
  nom: string;
  horairesStart: string;
  horairesEnd: string;
  date: Date | null;
  lieuVille: string;
  lieuRue: string;
  lieuNumero: string;
  description: string;
  age: string;
  payante: boolean;
  prix: string;
  email: string;
  telephone: string;
  selectedFile: File | null;
  selectedOption: string[];
}

const CreateActivityPage: React.FC = () => {
  const [state, setState] = useState<State>({
    type: '',
    nom: '',
    horairesStart: '',
    horairesEnd: '',
    date: null,
    lieuVille: '',
    lieuRue: '',
    lieuNumero: '',
    description: '',
    age: '',
    payante: false,
    prix: '',
    email: '',
    telephone: '',
    selectedOption: [],
    selectedFile: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imagePreviewRef = useRef<HTMLImageElement>(null);
  const toast = useToast();

  const options: readonly any[] = [
    { value: 'Sport', label: 'Sport' },
    { value: 'Théàtre', label: 'Théâtre' },
    { value: 'Musique', label: 'Musique' },
    { value: 'Art', label: 'Art' },
    { value: 'Danse', label: 'Danse' },
    { value: 'Cuisine', label: 'Cuisine' },
    { value: 'Jeux', label: 'Jeux' },
    { value: 'Nature', label: 'Nature' },
    { value: 'Technologie', label: 'Technologie' },
    { value: 'Soirée', label: 'Soirée' },
  ];

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

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = event.target;
    const name = target.name;
    let value: string | boolean = target.value;

    if (target.type === 'checkbox') {
      value = (target as HTMLInputElement).checked;
    }

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedOptions: any, actionMeta: any) => {
    const selectedValues = selectedOptions.map((option: any) => option.value);
    setState((prevState) => ({ ...prevState, selectedOption: selectedValues }));
    console.log(state.selectedOption);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (!state.nom || !state.lieuRue || !state.lieuNumero || !state.lieuVille || !state.selectedOption || !state.date
      || !state.horairesStart || !state.horairesEnd || (state.payante == true && (parseInt(state.prix, 10) <= 0 || !state.prix)) || !state.telephone 
      || !state.email || !state.age || !state.description) {
      toast({
        title: "Erreur",
        description: "Certains champs clés ne sont pas remplis",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log("Veuillez remplir tous les champs.");
      return; // Empêcher le formulaire de se soumettre
    }

    try {
      const lieu = `${state.lieuRue} ${state.lieuNumero} ${state.lieuVille}`;
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

      const response = await axios.post('https://x2025unbored786979363000.francecentral.cloudapp.azure.com/events/create', {
        name: state.nom,
        address: lieu,
        categories: state.selectedOption,
        start_date: theDateStart,
        end_date: theDateEnd,
        age: state.age,
        price: state.prix,
        phone: state.telephone,
        email: state.email,
        description: state.description
      }, config);

      const eventId = response.data.event._id;
      const pictureURl = 'https://x2025unbored786979363000.francecentral.cloudapp.azure.com/event/upload?id=' + eventId;

      if (state.selectedFile) {
        const formData = new FormData();
        formData.append('file', state.selectedFile);

        const picture = await axios.post(pictureURl, formData, config);
        console.log(picture.status);
      } else {
        console.error('Aucun fichier sélectionné.');
      }

      toast({
        title: "Succès !",
        description: "Votre activité à bien été crée",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

    } catch (error) {
      toast({
        title: "Erreur",
        description: "Un problème est survenu dans la création de votre activité",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="CreateActivity-form-container">
      <div className="CreateActivity-back-button">
        <button onClick={() => navigate(-1)}>Retour</button>
      </div>
      <div className="CreateActivity-container">
        <h2 className="CreateActivity-form-title">Créer une activité</h2>
      </div>
      <form onSubmit={handleSubmit}>

        {/* ROW 0 */}


        {/* ROW 1 */}
        <div className="CreateActivity-row">

          {/* GAUCHE 1*/}
          <div className="CreateActivity-left-side" style={{ borderRight: '2px solid gray', marginRight: '5px' }}>
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
                options={options}
                onChange={handleSelectChange}
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
                  value={state.nom}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            {/* ROW 1.1 */}
            <div className="CreateActivity-row">
              {/* GAUCHE 1.1*/}
              <div className="CreateActivity-left-side">
                {/* Age minimum */}
                <div className="CreateActivity-form-row">
                  <label className="CreateActivity-label-column_100">
                    Age Minimum:
                  </label>
                </div>
                <div className="CreateActivity-form-row">
                  <label className="CreateActivity-column_75">
                    <input
                      className='CreateActivity-input'
                      name="age"
                      value={state.age}
                      onChange={handleInputChange}
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
                      checked={state.payante}
                      onChange={handleInputChange}
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
                      value={state.telephone}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
              </div>
              {/* DROITE 1.1*/}
              <div className="CreateActivity-right-side">
                {/* Prix */}
                {state.payante ? (
                  <>
                    <div className='CreateActivity-price-show'>

                    </div>
                    <div className="CreateActivity-price-form">
                      <label className="CreateActivity-label-column_25">
                        Prix (€):
                      </label>
                    </div>
                    <div className="CreateActivity-form-row">
                      <label className="CreateActivity-column_75">
                        <input
                          type="text" pattern="[0-9]*"
                          className="CreateActivity-input"
                          id="prix"
                          name="prix"
                          value={state.prix}
                          onChange={handleInputChange}
                        />
                      </label>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ marginTop: '149px' }}>
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
                      value={state.email}
                      onChange={handleInputChange}
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
              <div className="CreateActivity-left-side" style={{ marginLeft: '10%' }}>
                {/* Date */}
                <div className="CreateActivity-form-row">
                  <label className="CreateActivity-label-column_100">
                    Date:
                  </label>
                </div>
                <div className="CreateActivity-form-row">
                  <label className="CreateActivity-column_75">
                    <input
                      type="date"
                      className='CreateActivity-input'
                      name="date"
                      value={state.date instanceof Date ? state.date.toISOString().split('T')[0] : (state.date || '')} // Vérifie si state.date est un objet Date
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                {/* Horaire */}
                <div className="CreateActivity-form-row">
                  <label className="CreateActivity-label-column_100">
                    Horaires Debut:
                  </label>
                </div>
                <div className="CreateActivity-form-row">
                  <label className="CreateActivity-column_75">
                    <input
                      type="time"
                      className='CreateActivity-input'
                      name="horairesStart"
                      value={state.horairesStart}
                      onChange={handleInputChange}
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
                      value={state.lieuVille}
                      onChange={handleInputChange}
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
                      value={state.lieuNumero}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
              </div>

              {/* droite 1.1*/}
              <div className="CreateActivity-right-side">
                <div style={{ marginTop: '80px' }}>
                </div>

                {/* Horaire */}
                <div className="CreateActivity-form-row">
                  <label className="CreateActivity-label-column_100">
                    Horaires Fin:
                  </label>
                </div>
                <div className="CreateActivity-form-row">
                  <label className="CreateActivity-column_75">
                    <input
                      type="time"
                      className='CreateActivity-input'
                      name="horairesEnd"
                      value={state.horairesEnd}
                      onChange={handleInputChange}
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
                      value={state.lieuRue}
                      onChange={handleInputChange}
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
            value={state.description}
            onChange={handleInputChange}
          ></textarea>

        </div>
        {/* Bouton */}
        <div className="CreateActivity-row">
          {/* <div className="CreateActivity-center-button"> */}
          <label className="CreateActivity-column_100" style={{ marginTop: '10px' }}>
            <div className="CreateActivity-container">
              <div className="CreateActivity-form-button">
                <button type="submit">Créer</button>
              </div>
            </div>
          </label>
          {/* </div> */}
        </div>
      </form >
    </div >
  );
}

export default CreateActivityPage;
