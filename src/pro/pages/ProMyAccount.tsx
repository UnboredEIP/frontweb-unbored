import '../styles/ProMyAccount.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useToast } from "@chakra-ui/react";
import Avatar from '../component/displayAvatar';

function ProMyAccount() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const [tel, setTel] = useState('');
    const [mail, setMail] = useState('');
    const [sexe, setSexe] = useState('');

    const [style, setStyle] = useState('');
    const [isEditing, setIsEditing] = useState(false);



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
        getProfile();
    }, []);

    return (
        <div className="MyAccount-page">
            <div className="MyAccount-box">
                <div className="MyAccount-row">
                    <nav className="MyAccount-breadcrumb">
                        <Link to="/">Home</Link>/
                        <Link to="/Pro-menu">Pro</Link>/
                        <Link to="/Pro-profile" className="active">Profil</Link>
                    </nav>
                </div>
                <div className="MyAccount-row">
                    <div className="MyAccount-banner">Profil</div>
                </div>
                <div className="MyAccount-scroll-box">
                    <div className="MyAccount-row-center">
                        <div className="MyAccount-box-avatar">
                            <Avatar
                                avatarData={style}
                                size={1} // Par exemple, 50% de la taille du conteneur parent
                            />

                        </div>
                    </div>
                    <div className="MyAccount-row">
                        <label className="MyAccount-label-50">Nom</label>
                        <label className='MyAccount-label-50'>Prénom</label>
                    </div>
                    <div className="MyAccount-row">
                        <input
                            type="text"
                            value={nom}
                            readOnly={!isEditing}
                            onChange={(e) => setNom(e.target.value)}
                            className={isEditing ? 'MyAccount-edit-input-50' : 'MyAccount-input-50'}
                        />
                        <input
                            type="text"
                            value={prenom}
                            readOnly={!isEditing}
                            onChange={(e) => setPrenom(e.target.value)}
                            className={isEditing ? 'MyAccount-edit-input-50' : 'MyAccount-input-50'}
                        />
                    </div>
                    <div className="MyAccount-row">
                        <label className="MyAccount-label-50">Date de naissance</label>
                        <label className="MyAccount-label-50">Tél</label>
                    </div>
                    <div className="MyAccount-row">
                        <input
                            type="date"
                            value={dateNaissance}
                            readOnly={!isEditing}
                            onChange={(e) => setDateNaissance(e.target.value)}
                            className={isEditing ? 'MyAccount-edit-input-50' : 'MyAccount-input-50'}
                        />
                        <input
                            type="text"
                            value={tel}
                            readOnly={!isEditing}
                            onChange={(e) => setTel(e.target.value)}
                            className={isEditing ? 'MyAccount-edit-input-50' : 'MyAccount-input-50'}
                        />
                    </div>

                    <div className="MyAccount-row">
                        <label className="MyAccount-label-100">Mail</label>
                    </div>
                    <div className="MyAccount-row">
                        <input
                            type="text"
                            value={mail}
                            readOnly={!isEditing}
                            onChange={(e) => setMail(e.target.value)}
                            className={isEditing ? 'MyAccount-edit-input-100' : 'MyAccount-input-100'}
                        />
                    </div>


                    <div className="MyAccount-row">
                        <label className="MyAccount-label-50">Sexe</label>
                    </div>
                    <div className="MyAccount-row">
                        <input
                            type="text"
                            value={sexe}
                            readOnly={!isEditing}
                            onChange={(e) => setSexe(e.target.value)}
                            className={isEditing ? 'MyAccount-edit-input-50' : 'MyAccount-input-50'}
                        />
                    </div>

                    <div className="MyAccount-row-center">
                        {isEditing ? (
                            <button className="MyAccount-edit-all-button" onClick={handleSaveClick}>
                                Sauvegarder
                            </button>
                        ) : (
                            <button className="MyAccount-edit-all-button" onClick={handleEditClick}>
                                Modifier
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProMyAccount;
