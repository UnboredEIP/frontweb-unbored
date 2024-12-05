import React, { useState, useEffect } from 'react';
import '../styles/ProActivitySubscribers.css';
import personIcon from "../../assets/icons/personIcon.png";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import Avatar from '../component/displayAvatar';
import removeIcon from "../../assets/icons/remove.png";

const ProActivitySubscribersPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [participants, setParticipants] = useState<any[]>([]);
    const [eventName, setEventName] = useState<string>('');
    const [responseImage, setResponseImage] = useState<string | null>(null);



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

            const firstPictureId = activityDetails.pictures.length > 0
                ? activityDetails.pictures[0].id
                : null;

            setEventName(activityDetails.name)

            if (firstPictureId != null) {
                const urlImage = `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/getimage?imageName=${firstPictureId}`;
                const responseImage = await axios.get(urlImage, { responseType: "blob", ...config });

                const img = URL.createObjectURL(responseImage.data);

                setResponseImage(img);
            }

            const participantsArray = [];

            for (let i = 0; i < activityDetails.participents.length; i++) {
                const participantId = activityDetails.participents[i].user;
                // console.log(participantId)
                const urlParticipant = `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile/get?id=${participantId}`;
                // const responseParticipant = await axios.get(urlParticipant, config);
                const responseParticipant = await fetch(urlParticipant, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await responseParticipant.json();
                if (data.user != null) {
                    participantsArray.push(data);
                }
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

    const handleRemoveParticipant = async (participant: { username: any; _id: any; }) => {
        try {
            console.log(`Suppression de l'utilisateur ${participant.username} (id: ${participant._id}) de l'activité ${id}`);

            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json', // Définir le type de contenu pour envoyer des données en JSON
                },
            };

            const url = `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/events/delete/user`;

            // Le corps de la requête POST contient l'ID du participant et celui de l'activité
            const data = {
                userList: [participant._id],
                eventId: id,
            };

            // Envoi de la requête POST avec axios
            const response = await axios.put(url, data, config);
            const result = response.data;

            window.location.reload();

            console.log(`Participant ${participant.username} supprimé avec succès de l'activité ${id}.`);
        } catch (error) {
            console.error('Erreur lors de la suppression du participant :', error);
        }
    };


    const participantPairs = chunkArray(participants, 2);

    return (
        <div className="ProActivitySubscribers-form-container">
            <nav className="ProActivitySubscribers-breadcrumb">
                <Link to="/">Home</Link>/
                <Link to="/Pro-menu">Pro</Link>/
                <Link
                    to="/Pro-profile"
                    state={{ fromPage: "activités" }} // Utiliser state directement
                >
                    Activités
                </Link>/
                <Link to={`/Pro-activityInfo/${id}`}>{eventName}</Link>/
                <Link to="" className="active">Participants</Link>
            </nav>
            <div className="ProActivitySubscribers-row">
                {/* GAUCHE*/}
                <div className="ProActivitySubscribers-left-side">
                    <h2 className="ActivityInfo-form-title">{eventName}</h2>
                    <div className='ActivityInfo-image-conteneur'>
                        <div className="ActivityInfo-image">
                            {responseImage && <img src={responseImage} />}
                        </div>
                    </div>
                    <div className="ProActivitySubscribers-container">
                        <h2 className="ProActivitySubscribers-form-title">Personnes inscrites</h2>
                    </div>
                    <div className="ProActivitySubscribers-container">
                        <span style={{ color: 'red' }}>{participants.length} Participants</span>
                    </div>
                    <div className="ProAvisActivity-boxshadow-left-side" style={{ overflowX: 'auto', padding: '0 1%' }}>
                        {participantPairs.map((pair, pairIndex) => (
                            <div key={pairIndex} className="ProActivitySubscribers-form-row">
                                {pair.map((participant, index) => (
                                    <div key={index} className="ProActivitySubscribers-boxshadow-left-side">
                                        <div className="ProActivitySubscribers-row">
                                            <div className="ProActivitySubscribers-form-row">
                                                <label className="ProActivitySubscribers-label-column_15">
                                                    <Avatar avatarData={participant.user.style} size={0.3} />
                                                </label>
                                                <label className="ProActivitySubscribers-label-column_50">
                                                    {participant.user.username}

                                                    <div className="ProActivitySubscribers-form-row">
                                                        {participant.user.email}
                                                    </div>
                                                    <div className="ProActivitySubscribers-form-row">
                                                        {participant.user.reservations &&
                                                            participant.user.reservations.find(reservation => reservation.id === id)?.joinedAt &&
                                                            new Date(participant.user.reservations.find(reservation => reservation.id === id).joinedAt)
                                                                .toLocaleDateString('fr-FR', {
                                                                    day: '2-digit',
                                                                    month: '2-digit',
                                                                    year: '2-digit',
                                                                }) || ""}
                                                    </div>

                                                </label>
                                                <label className="ProActivitySubscribers-label-column_15">
                                                    <img
                                                        src={removeIcon}
                                                        alt="Remove Icon"
                                                        style={{ width: '50%', cursor: 'pointer' }} // Ajoute le curseur cliquable
                                                        onClick={() => handleRemoveParticipant(participant.user)}
                                                    />

                                                </label>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ProActivitySubscribersPage;
