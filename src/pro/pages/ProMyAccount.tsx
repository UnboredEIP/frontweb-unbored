
import '../styles/ProMyAccount.css'; // Utilisez les mêmes styles que ProProfile
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import React, { Component, ChangeEvent, useState, useEffect } from 'react';
import { useToast } from "@chakra-ui/react";

interface Field {
    label: string;
    value: string;
}

function ProMyAccount() {
    const [fields, setFields] = useState<Field[]>([
        { label: 'Nom', value: '' },
        { label: 'Mail', value: '' },
        { label: 'Sexe', value: '' },
        { label: 'Date de naissance', value: '' },
    ]);

    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        setIsEditing(false);

        await updateProfile();
    };

    const handleFieldChange = (index: number, newValue: string) => {
        const updatedFields = [...fields];
        updatedFields[index].value = newValue;
        setFields(updatedFields);
    };

    const navigate = useNavigate();

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

            console.log(profileDetails.birthdate)
            const formattedBirthdate = new Date(profileDetails.birthdate).toISOString().slice(0, 10);

            setFields([
                { label: 'Nom', value: profileDetails.username },
                { label: 'Mail', value: profileDetails.email },
                { label: 'Sexe', value: profileDetails.gender },
                { label: 'Date de naissance', value: formattedBirthdate },
            ]);

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

            const response = await axios.put('https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile/update', {
                username: fields.find(field => field.label === 'Nom')?.value,
                email: fields.find(field => field.label === 'Mail')?.value,
                gender: fields.find(field => field.label === 'Sexe')?.value,
                birthdate: fields.find(field => field.label === 'Date de naissance')?.value,
            }, config);

            toast({
                title: "Succès !",
                description: "Votre compte à bien été mis à jour ! ",
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
        <div className="MyAccount-button-box">
            <div className="MyAccount-back-button">
                <button onClick={() => navigate(-1)}>Retour</button>
            </div>
            <div className="MyAccount-banner">Mon Compte</div>
            <div className="MyAccount-row" style={{ width: '60%' }}>
                <div className="MyAccount-boxshadow-left-side ">
                    {/* <div className="MyAccount-banner">Infos Utilisateur</div> */}
                    {fields.map((field, index) => {
                        if (index % 2 === 0) {
                            const nextField = fields[index + 1];
                            return (
                                <div className="MyAccount-input-group" key={index}>
                                    <div className="MyAccount-label-column">
                                        <label>{field.label}</label>
                                    </div>
                                    {field.label === 'Sexe' ? (
                                        <div className="MyAccount-input-column">
                                            <select
                                                value={field.value}
                                                disabled={!isEditing}
                                                className={isEditing ? 'MyAccount-editable-field' : 'MyAccount-rounded-orange-border'}
                                                onChange={(e) => handleFieldChange(index, e.target.value)}
                                            >
                                                <option value="">Sélectionnez votre sexe</option>
                                                <option value="Homme">Homme</option>
                                                <option value="Femme">Femme</option>
                                                <option value="Autre">Autre</option>
                                            </select>
                                        </div>
                                    ) : (
                                        <div className="MyAccount-input-column">
                                            <input
                                                type={field.label === 'Date de naissance' ? 'date' : 'text'}
                                                value={field.value}
                                                readOnly={!isEditing}
                                                className={isEditing ? 'MyAccount-editable-field' : 'MyAccount-rounded-orange-border'}
                                                onChange={(e) => handleFieldChange(index, e.target.value)}
                                            />
                                        </div>
                                    )}
                                    {nextField && (
                                        <div className="MyAccount-label-column">
                                            <label>{nextField.label}</label>
                                        </div>
                                    )}
                                    {nextField && (
                                        <div className="MyAccount-input-column">
                                            <input
                                                type={nextField.label === 'Date de naissance' ? 'date' : 'text'}
                                                value={nextField.value}
                                                readOnly={!isEditing}
                                                className={isEditing ? 'MyAccount-editable-field' : 'MyAccount-rounded-orange-border'}
                                                onChange={(e) => handleFieldChange(index + 1, e.target.value)}
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        }
                        return null;
                    })}

                </div>
            </div>
            <div className="MyAccount-input-group center-content">
                {isEditing ? (
                    <button className="MyAccount-edit-all-button" onClick={handleSaveClick}>
                        Sauvegarder
                    </button>
                ) : (
                    <button className="MyAccount-edit-all-button" onClick={handleEditClick}>
                        Modifier Les Informations
                    </button>
                )}
            </div>
        </div>
    );
}

export default ProMyAccount;
