import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/ClientMyAccount.css'; // Utilisez les mêmes styles que ClientProfile

interface Field {
    label: string;
    value: string;
}

const myAccountFields: Field[] = [
    { label: 'Nom', value: 'Doe' },
    { label: 'Prénom', value: 'John' },
    { label: 'Date de naissance', value: '01/01/1990' },
    { label: 'Adresse', value: '123 Rue Example' },
    { label: 'Code postale', value: '12345' },
    { label: 'Ville', value: 'Ville Example' },
    { label: 'Pays', value: 'Pays Example' },
    { label: 'E-mail', value: 'john@example.com' },
    { label: 'Numéro de téléphone', value: '123-456-7890' },
];


function ClientMyAccount() {
    const [fields, setFields] = useState(myAccountFields);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
    };

    const handleFieldChange = (index: number, newValue: string) => {
        const updatedFields = [...fields];
        updatedFields[index].value = newValue;
        setFields(updatedFields);
    };

    return (
        <div className="MyAccount-button-box">
            <div className="MyAccount-back-button">
                <Link to="/client-profile">
                    <button>Retour</button>
                </Link>
            </div>
            <div className="MyAccount-banner">Mon Compte</div>
            <div className="MyAccount-input-container">
                {fields.map((field, index) => {
                    if (index % 2 === 0) {
                        const nextField = fields[index + 1];
                        return (
                            <div className="MyAccount-input-group" key={index}>
                                <div className="MyAccount-label-column">
                                    <label>{field.label}</label>
                                </div>
                                <div className="MyAccount-input-column">
                                    <input
                                        type="text"
                                        value={field.value}
                                        readOnly={!isEditing}
                                        className={isEditing ? 'MyAccount-editable-field' : 'MyAccount-rounded-orange-border'}
                                        onChange={(e) => handleFieldChange(index, e.target.value)}
                                    />
                                </div>
                                {nextField && (
                                    <div className="MyAccount-label-column">
                                        <label>{nextField.label}</label>
                                    </div>
                                )}
                                {nextField && (
                                    <div className="MyAccount-input-column">
                                        <input
                                            type="text"
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
        </div>
    );
}

export default ClientMyAccount;
