import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/ProMyContract.css';

interface Activity {
    id: number;
    name: string;
}

interface ContractType {
    id: number;
    name: string;
    description: string;
}

const ProMyContract: React.FC = () => {
    const navigate = useNavigate();
    const [selectedActivity, setSelectedActivity] = useState('Activité 1');
    const [selectedContractType, setSelectedContractType] = useState('Mise en avant');

    const activities: Activity[] = [
        { id: 1, name: 'Activité 1' },
        { id: 2, name: 'Activité 2' },
        { id: 3, name: 'Activité 3' },
    ];

    const contractTypes: ContractType[] = [
        { id: 1, name: 'Mise en avant', description: 'Description de la mise en avant' },
        { id: 2, name: 'Paiement par Pros', description: 'Description du paiement par Pros' },
    ];

    return (
        <div className="MyContract-form-container">
            <div className="MyContract-back-button">
                <button onClick={() => navigate(-1)}>Retour</button>
            </div>
            <h2 className="MyContract-form-title">Votre contrat</h2>
            <div className="MyContract-form-row">
                <label className="MyContract-column_20">
                    Activité concernée:
                </label>
                <label className="MyContract-column_50">
                    <select value={selectedActivity} disabled className='MyContract-text-orange'>
                        {activities.map((activity) => (
                            <option key={activity.id} value={activity.name}>
                                {activity.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            {selectedActivity && (
                <div className="MyContract-form-row">
                    <label className="MyContract-column_20">
                        Type de contrat:
                    </label>
                    <label className="MyContract-column_50">
                        <select value={selectedContractType} disabled className='MyContract-text-orange'>
                            {contractTypes.map((contractType) => (
                                <option key={contractType.id} value={contractType.name}>
                                    {contractType.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            )}
            {selectedContractType && (
                <div>
                    <div className="MyContract-form-row">
                        <div className="MyContract-column_20">
                            <label>Description du contrat :</label>
                        </div>
                        <div className="MyContract-column_75">
                            <textarea
                                className="MyContract-textarea"
                                value={contractTypes.find((c) => c.name === selectedContractType)?.description}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="MyContract-separator"></div>
                    <div className="MyContract-center-button">
                        <Link to="/choose-contract">
                            <button type="button">Modifier</button>
                        </Link>
                    </div>
                </div>

            )}
        </div>
    );
}

export default ProMyContract;
