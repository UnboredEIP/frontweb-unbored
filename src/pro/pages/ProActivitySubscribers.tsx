import React, { useState, useEffect } from 'react';
import '../styles/ProActivitySubscribers.css';
import personIcon from "../../assets/icons/personIcon.png";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const ProActivitySubscribersPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [participants, setParticipants] = useState<any[]>([]); // Mettre à jour le type en fonction des données reçues

    const getParticipants = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const url = `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/events/show?id=${id}`;
            const response = await axios.get(url, config);
            const activityDetails = response.data.event;

            const participantsArray = [];

            for (let i = 0; i < activityDetails.participents.length; i++) {
                const participantId = activityDetails.participents[i];
                // console.log(participantId)
                const urlParticipant = `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile?id=${participantId}`;
                // const responseParticipant = await axios.get(urlParticipant, config);
                const responseParticipant = await fetch(urlParticipant, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  });
                  const data = await responseParticipant.json();
                participantsArray.push(data);
                console.log("toto", data)
            }

            setParticipants(participantsArray);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getParticipants();
    }, [id]);

    const chunkArray = (array: any[], chunkSize: number) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    };

    const participantPairs = chunkArray(participants, 2);

    return (
        <div className="ProActivitySubscribers-form-container">
            <div className="ProActivitySubscribers-back-button">
                <button onClick={() => navigate(-1)}>Retour</button>
            </div>
            <div className="ProActivitySubscribers-row">
                {/* GAUCHE*/}
                <div className="ProActivitySubscribers-left-side">
                    <div className="ProActivitySubscribers-container">
                        <h2 className="ProActivitySubscribers-form-title">Personnes inscrites</h2>
                    </div>
                    <div className="ProActivitySubscribers-container">
                        <span style={{ color: 'red' }}>{participants.length} Participants</span>
                    </div>
                    {participantPairs.map((pair, pairIndex) => (
                        <div key={pairIndex} className="ProActivitySubscribers-form-row">
                            {pair.map((participant, index) => (
                                <div key={index} className="ProActivitySubscribers-boxshadow-left-side">
                                    <div className="ProActivitySubscribers-row">
                                        <div className="ProActivitySubscribers-form-row">
                                            <label className="ProActivitySubscribers-label-column_15">
                                                <img src={personIcon} alt="Activité" style={{ maxHeight: '50px' }} />
                                            </label>
                                            <label className="ProActivitySubscribers-label-column_75">
                                                {participant.user.username}

                                                <div className="ProActivitySubscribers-form-row">
                                                    {participant.user.email}
                                                </div>
                                                <div className="ProActivitySubscribers-form-row">
                                                    {participant.user.birthdate ? participant.user.birthdate.split("T")[0] : ""}
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default ProActivitySubscribersPage;
