import React, { useRef, useState, useEffect } from 'react';
import '../pages/CreatePrivateActivity.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import Select from 'react-select';
import { useToast } from "@chakra-ui/react";

interface State {
  type: string;
  nom: string;
  horairesStart: string;
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

interface Props {
  prefilledData?: State; // Make it optional, in case it's not passed
}

const CreatePrivateActivityPage: React.FC<Props> = ({ prefilledData }) => {
  const location = useLocation();  // Use useLocation to get passed state
  const navigate = useNavigate();
  const toast = useToast();

  // Get the event data from the location state or fallback to prefilledData if not available
  const currentEvent = (location.state && location.state.event) ? location.state.event : prefilledData || ({} as State);
  
  const parseDateAndTime = (isoString: string) => {
    if (!isoString) return { date: '', time: '' };
    const [date, timeWithTimezone] = isoString.split('T');
    const time = timeWithTimezone?.slice(0, 5); // Get the "HH:MM" part, ignoring the timezone
    return { date, time };
  };

  const { date: prefilledDate, time: prefilledTime } = parseDateAndTime(currentEvent.date_start || '');

  const [state, setState] = useState<State>({
    type: "externe", // Hardcode the type to "externe"
    nom: currentEvent.title || '',
    horairesStart: prefilledTime || '',
    date: prefilledDate || '',
    lieuVille: currentEvent.url || '',
    lieuRue: currentEvent.address_street || '',
    lieuNumero: currentEvent.lieuNumero || '',
    description: currentEvent.lead_text || '',
    age: currentEvent.audience || '',
    payante: currentEvent.payante || false,
    prix: currentEvent.price_type || '',
    email: currentEvent.email || '',
    telephone: currentEvent.telephone || '',
    selectedOption: currentEvent.selectedOption || [],
    selectedFile: currentEvent.cover_url || null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview
  const imagePreviewRef = useRef<HTMLImageElement>(null);

  const options: readonly any[] = [
    { value: 'Sport', label: 'Sport' },
    { value: 'Théâtre', label: 'Théâtre' },
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
  
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];
      setState((prevState) => ({ ...prevState, selectedFile }));
  
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Set the image preview here
      };
      reader.readAsDataURL(selectedFile);
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

  const handleSelectChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions.map((option: any) => option.value);
    setState((prevState) => ({ ...prevState, selectedOption: selectedValues }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

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

      // Set the end date to match the start date (no separate input for end date)
      const theDateEnd = theDateStart;

      const eventInfo = {
        start_date: theDateStart,
        end_date: theDateEnd,
        name: state.nom,
        address: currentEvent.url,
        description: state.description,
        categories: state.type,
      };

      const response = await fetch(
        "https://x2025unbored786979363000.francecentral.cloudapp.azure.com/events/create/private",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(eventInfo),
        }
      );

      toast({
        title: "Succès !",
        description: "Votre activité a bien été créée",
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

  useEffect(() => {
    // Set the image preview based on currentEvent.cover_url
    setImagePreview(currentEvent.cover_url || null);
  }, [currentEvent.cover_url]);

  return (
    <div className="CreateActivity-form-container">
      <div className="CreateActivity-back-button">
        <button onClick={() => navigate(-1)}>Retour</button>
      </div>
      <form onSubmit={handleSubmit}>

        {/* ROW 0 */}

        {/* ROW 1 */}
        <div className="CreateActivity-row">

          {/* GAUCHE 1*/}
          <div className="CreateActivity-left-side" style={{ borderRight: '2px solid gray', marginRight: '5px' }}>
            {/* Nom activité */}
            <div className="CreateActivity-form-row">
              <label className="CreateActivity-label-column_100">
                Nom de l'activité:
              </label>
            </div>
            <div className="CreateActivity-form-row">
              <input
                className="CreateActivity-input-text-column_100"
                type="text"
                name="nom"
                value={state.nom}
                onChange={handleInputChange}
              />
            </div>

            {/* ROW 2 */}
            <div className="CreateActivity-form-row">
              <label className="CreateActivity-label-column_50">
                Date:
              </label>
              <label className="CreateActivity-label-column_50">
                Heure de début:
              </label>
            </div>
            <div className="CreateActivity-form-row">
              <input
                className="CreateActivity-input-text-column_50"
                type="date"
                name="date"
                value={state.date}
                onChange={handleInputChange}
              />
              <input
                className="CreateActivity-input-text-column_50"
                type="time"
                name="horairesStart"
                value={state.horairesStart}
                onChange={handleInputChange}
              />
            </div>

            {/* ROW 3 */}
            <div className="CreateActivity-form-row">
            </div>
            <div className="CreateActivity-form-row">
            </div>

            {/* ROW 4 */}
            <div className="CreateActivity-form-row">
              <label className="CreateActivity-label-column_100">
                Description de l'activité:
              </label>
            </div>
            <div className="CreateActivity-form-row">
              <textarea
                className="CreateActivity-input-text-column_100"
                name="description"
                value={state.description}
                onChange={handleInputChange}
                rows={5}
              />
            </div>
          </div>

          {/* DROITE 1*/}
          <div className="CreateActivity-right-side">

            <div className="CreateActivity-form-row">
            </div>

            <div className="CreateActivity-form-row">
            </div>
        
            {/* Age */}
            <div className="CreateActivity-form-row">
              <label className="CreateActivity-label-column_100">
                Age minimum:
              </label>
            </div>
            <div className="CreateActivity-form-row">
              <input
                className="CreateActivity-input-text-column_100"
                type="text"
                name="age"
                value={state.age}
                onChange={handleInputChange}
              />
            </div>

            {/* Prix */}
            {state.payante && (
              <div className="CreateActivity-form-row">
                <label className="CreateActivity-label-column_100">
                  Prix de l'activité:
                </label>
              </div>
            )}
            {state.payante && (
              <div className="CreateActivity-form-row">
              </div>
            )}

            {/* Image */}
            <div className="CreateActivity-form-row">
              <label className="CreateActivity-label-column_100">
                Image de l'activité:
              </label>
            </div>
            <div className="CreateActivity-form-row">
            </div>
          </div>
        </div>

        {/* SUBMIT */}
        <div className="CreateActivity-form-row">
          <button className="CreateActivity-submit-button" type="submit">
            Créer l'activité
          </button>
        </div>

      </form>
    </div>
  );
};

export default CreatePrivateActivityPage;
