import '../styles/ProParams.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useToast } from "@chakra-ui/react";

function ProParams() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const [tel, setTel] = useState('');
    const [mail, setMail] = useState('');
    const [sexe, setSexe] = useState('');

    const [style, setStyle] = useState('');

    const [isEditing, setIsEditing] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(
        localStorage.getItem('theme') === 'dark'
    );
    const [isAnonymous, setIsAnonymous] = useState(false);



    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        setIsEditing(false);
        await updateProfile();
    };

    const getProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const url = `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile`;
            const response = await axios.get(url, config);
            const profileDetails = response.data.user;

            const formattedBirthdate = new Date(profileDetails.birthdate).toISOString().slice(0, 10);

            setNom(profileDetails.username);
            setPrenom(profileDetails.username);
            setMail(profileDetails.email);
            setSexe(profileDetails.gender);
            setDateNaissance(formattedBirthdate);

            setStyle(profileDetails.style);
        } catch (error) {
            console.error(error);
        }
    };

    async function makePasswordResetRequest() {
        try {
            const email = mail
            const response = await fetch("https://x2025unbored786979363000.francecentral.cloudapp.azure.com/auth/askreset", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            if (response.status === 202) {
                toast({
                    title: "Succès !",
                    description: "Un mail vous à été envoyé pour changer votre mot de passe !",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                console.log("EMAIL SENT");
                return true;
            } else {
                toast({
                    title: "Erreur",
                    description: "Une erreur est survenue",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                console.error("EMAIL SEND ERROR:", await response.text());
                return false;
            }
        } catch (error) {
            console.error("Request error: ", error);
            return false;
        }
    }

    const toast = useToast();

    const updateProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            await axios.put('https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile/update', {
                username: nom,
                email: mail,
                gender: sexe,
                birthdate: dateNaissance,
            }, config);

            toast({
                title: "Succès !",
                description: "Votre compte à bien été mis à jour !",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Une erreur est survenue dans la mise à jour de votre compte",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            console.error(error);
        }
    };



    useEffect(() => {
        const currentTheme = isDarkTheme ? 'dark' : 'light';
        document.body.className = currentTheme;
        localStorage.setItem('theme', currentTheme);
    }, [isDarkTheme]);

    // Fonction pour basculer le thème
    const handleThemeToggle = () => {
        setIsDarkTheme((prevTheme) => !prevTheme);
    };

    const handleAnonymousToggle = () => {
        setIsAnonymous(!isAnonymous);
        // Logic for toggling anonymous mode
    };

    const [value, setValue] = useState(50); // Valeur initiale du slider

    const handleSliderChange = (event) => {
        setValue(event.target.value);
    };

    const [showPopup, setShowPopup] = useState(false);

    const handleDeleteClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleAccountDeactivation = () => {
        // Logic for account deactivation
        console.log('Compte désactivé');
        setShowPopup(false);
    };

    const handleAccountDeletion = () => {
        // Logic for account deletion
        console.log('Compte supprimé');
        setShowPopup(false);
    };



    useEffect(() => {
        getProfile();
    }, []);

    return (
        <div className="Params-page">
            <div className="Params-box">
                <div className="Params-row">
                    <nav className="Params-breadcrumb">
                        <Link to="/">Home</Link> /
                        <Link to="/Pro-menu">Pro</Link> /
                        <Link to="/Pro-profile" className="active">Paramètres</Link>
                    </nav>
                </div>
                <div className="Params-row">
                    <div className="Params-banner">Paramètres</div>
                </div>
                <div className="Params-scroll-box">

                    <hr className="Params-section-divider" />

                    <div className="Params-section">
                        <p>
                            Si vous souhaitez changer votre mot de passe, <a
                                href="#"
                                className="Params-link"
                                onClick={makePasswordResetRequest}
                            >
                                cliquez ici
                            </a>. Un e-mail vous sera envoyé afin de changer votre mot de passe.
                        </p>
                    </div>

                    <hr className="Params-section-divider" />

                    <div className="Params-DarkModeToggle-section">

                        <label className="Params-DarkModeToggle-switch">
                            <input
                                type="checkbox"
                                checked={isDarkTheme}
                                onChange={handleThemeToggle}
                            />
                            <span className="Params-DarkModeToggle-slider"></span>
                        </label>
                        <span>{isDarkTheme ? 'Mode sombre' : 'Mode clair'}</span>
                    </div>

                    <hr className="Params-section-divider" />

                    <div className="Params-section">
                        <button className="Params-button-orange" onClick={handleDeleteClick}>
                            Supprimer
                        </button>

                        {showPopup && (
                            <div className="Params-popup">
                                <button className="Params-button-close" onClick={handleClosePopup}>
                                    X
                                </button>
                                <div className="Params-popup-content">
                                    <p>Voulez-vous supprimer ou désactiver votre compte ?</p>

                                    <button className="Params-button-delete" onClick={handleAccountDeletion}>
                                        Supprimer le compte
                                    </button>
                                    <button className="Params-button-deactivate" onClick={handleAccountDeactivation}>
                                        Désactiver le compte
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <hr className="Params-section-divider" />

                    <div className="Params-section">

                        <label className="Params-switch">
                            <input type="checkbox" checked={isAnonymous} onChange={handleAnonymousToggle} />
                            <span className="Params-slider"></span>
                        </label>
                        <span>{isAnonymous ? 'Anonyme activé' : 'Anonyme désactivé'}</span>
                    </div>

                    <div className="Params-row-center">
                        {isEditing ? (
                            <button className="Params-edit-all-button" onClick={handleSaveClick}>
                                Sauvegarder
                            </button>
                        ) : (
                            <button className="Params-edit-all-button" onClick={handleEditClick}>
                                Modifier
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProParams;
