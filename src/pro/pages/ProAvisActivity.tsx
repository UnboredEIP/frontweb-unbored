import React, { useState, useEffect, } from 'react';
import '../styles/ProAvisActivity.css';
import personIcon from "../../assets/icons/personIcon.png";
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const AvisActivityPage: React.FC = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [avisPos, setAvisPos] = useState<any[]>([]);
    const [avisNeg, setAvisNeg] = useState<any[]>([]);

    const [averageStars, setAverageStars] = useState<number>(0);
    const [nbStars, setNbStars] = useState<number>(0);

    const [nbFiveStars, setNbFiveStars] = useState<number>(0);
    const [nbFourStars, setNbFourStars] = useState<number>(0);
    const [nbThreeStars, setNbThreeStars] = useState<number>(0);
    const [nbTwoStars, setNbTwoStars] = useState<number>(0);
    const [nbOneStars, setNbOneStars] = useState<number>(0);

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

            const avisPosArray = [];
            const avisNegArray = [];

            let nbFiveStars = 0;
            let nbFourStars = 0;
            let nbThreeStars = 0;
            let nbTwoStars = 0;
            let nbOneStars = 0;

            let totalStars = 0; // Somme totale des étoiles

            for (let i = 0; i < activityDetails.rate.length; i++) {
                const stars = activityDetails.rate[i].stars;
                const starsInt = parseInt(stars, 10);
                totalStars += starsInt; // Ajouter les étoiles à la somme totale

                // Compter le nombre d'avis pour chaque nombre d'étoiles
                switch (starsInt) {
                    case 5:
                        nbFiveStars++;
                        break;
                    case 4:
                        nbFourStars++;
                        break;
                    case 3:
                        nbThreeStars++;
                        break;
                    case 2:
                        nbTwoStars++;
                        break;
                    case 1:
                        nbOneStars++;
                        break;
                    default:
                        break;
                }

                const urlParticipant = `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile?id=${activityDetails.rate[i].userId}`;
                const responseParticipant = await fetch(urlParticipant, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                const userData = await responseParticipant.json();
                // console.log("toto", userData)

                if (userData.user = null) {
                    userData.user.username = "Utilisateur Inconnu"
                }

                activityDetails.rate[i] = {
                    ...activityDetails.rate[i],
                    ...userData.user
                };

                console.log(activityDetails.rate[i])

                // Classification des avis positifs et négatifs
                if (starsInt >= 3) {
                    avisPosArray.push(activityDetails.rate[i]);
                } else {
                    avisNegArray.push(activityDetails.rate[i]);
                }

            }

            // Mise à jour des états avec les données calculées
            setAvisPos(avisPosArray);
            setAvisNeg(avisNegArray);

            let averageStarsInt = parseInt((totalStars / activityDetails.rate.length).toFixed(0), 10)
            setAverageStars(averageStarsInt); // Calcul de la moyenne
            //console.log(activityDetails.rate.length)
            setNbStars(activityDetails.rate.length); // Nombre total d'avis
            setNbFiveStars(nbFiveStars);
            setNbFourStars(nbFourStars);
            setNbThreeStars(nbThreeStars);
            setNbTwoStars(nbTwoStars);
            setNbOneStars(nbOneStars);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getParticipants();
    }, [id]);

    return (
        <div className="ProAvisActivity-form-container">

            <div className="ProAvisActivity-back-button">
                <button onClick={() => navigate(-1)}>Retour</button>
            </div>
            <h2 className="ActivityInfo-form-title">{eventName}</h2>
            <div className='ActivityInfo-image-conteneur'>
                <div className="ActivityInfo-image">
                    {responseImage && <img src={responseImage} />}
                </div>
            </div>
            <div className="ProAvisActivity-row">
                {/* GAUCHE*/}

                <div className="ProAvisActivity-boxshadow-left-side">
                    <div className="ProAvisActivity-container">
                        <h2 className="ProAvisActivity-form-title">Avis Positif</h2>
                    </div>
                    <div style={{ overflowX: 'auto', padding: '0 1%' }}>
                        {avisPos.map((avis, index) => (
                            <div key={index} className="ProAvisActivity-boxshadow-left-side">
                                <div className="ProAvisActivity-row">
                                    <div className="ProAvisActivity-form-row">
                                        <label className="ProAvisActivity-label-column_15">
                                            <img src={personIcon} alt="Activité" style={{ maxHeight: '50px' }} />
                                        </label>
                                        <label className="ProAvisActivity-label-column_75">
                                            {avis.username}
                                            <div className="ProAvisActivity-form-row">
                                                01/01/2001
                                            </div>
                                        </label>
                                        <label className="ProAvisActivity-note">
                                            {avis.stars}/5
                                        </label>
                                    </div>
                                </div>
                                <div className="ProAvisActivity-form-row">
                                    {avis.comments}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* drotie */}
                <div className="ProAvisActivity-boxshadow-right-side" >
                    <div className="ProAvisActivity-container">
                        <h2 className="ProAvisActivity-form-title">Avis Négatif</h2>
                    </div>
                    <div style={{ overflowX: 'auto', padding: '0 1%' }}>
                        {avisNeg.map((avis, index) => (
                            <div key={index} className="ProAvisActivity-boxshadow-left-side">
                                <div className="ProAvisActivity-row">
                                    <div className="ProAvisActivity-form-row">
                                        <label className="ProAvisActivity-label-column_15">
                                            <img src={personIcon} alt="Activité" style={{ maxHeight: '50px' }} />
                                        </label>
                                        <label className="ProAvisActivity-label-column_75">
                                            {avis.username}
                                            <div className="ProAvisActivity-form-row">
                                                01/01/2001
                                            </div>
                                        </label>
                                        <label className="ProAvisActivity-note">
                                            {avis.stars}/5
                                        </label>
                                    </div>
                                </div>
                                <div className="ProAvisActivity-form-row">
                                    {avis.comments}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <div className="ProAvisActivity-separator"></div>

            {/* Description */}
            <div className="ProAvisActivity-boxshadow-left-side">
                <div className="ProAvisActivity-container">
                    <div className="ProAvisActivity-note-globale">{averageStars}/5</div>
                    <div className="ProAvisActivity-form-nobox-title">Note globale</div>
                </div>
                <div className="ProAvisActivity-container">
                    Sur<span style={{ color: 'red', marginLeft: '5px', marginRight: '5px' }}>{nbStars}</span>avis
                </div>
                <div className="ProAvisActivity-row" style={{ paddingLeft: '10%' }}>
                    <label className="ProAvisActivity-note">5</label>
                    <label className="ProAvisActivity-column_75">
                        <div className="ProAvisActivity-redbar" style={{ width: `${(nbFiveStars / nbStars) * 100}%` }}></div>
                    </label>
                    <label className="ProAvisActivity-label-column_15">
                        {nbFiveStars}
                    </label>
                </div>
                <div className="ProAvisActivity-row" style={{ paddingLeft: '10%' }}>
                    <label className="ProAvisActivity-note">4</label>
                    <label className="ProAvisActivity-column_75">
                        <div className="ProAvisActivity-redbar" style={{ width: `${(nbFourStars / nbStars) * 100}%` }}></div>
                    </label>
                    <label className="ProAvisActivity-label-column_15">
                        {nbFourStars}
                    </label>
                </div>
                <div className="ProAvisActivity-row" style={{ paddingLeft: '10%' }}>
                    <label className="ProAvisActivity-note">3</label>
                    <label className="ProAvisActivity-column_75">
                        <div className="ProAvisActivity-redbar" style={{ width: `${(nbThreeStars / nbStars) * 100}%` }}></div>
                    </label>
                    <label className="ProAvisActivity-label-column_15">
                        {nbThreeStars}
                    </label>
                </div>
                <div className="ProAvisActivity-row" style={{ paddingLeft: '10%' }}>
                    <label className="ProAvisActivity-note">2</label>
                    <label className="ProAvisActivity-column_75">
                        <div className="ProAvisActivity-redbar" style={{ width: `${(nbTwoStars / nbStars) * 100}%` }}></div>
                    </label>
                    <label className="ProAvisActivity-label-column_15">
                        {nbTwoStars}
                    </label>
                </div>
                <div className="ProAvisActivity-row" style={{ paddingLeft: '10%' }}>
                    <label className="ProAvisActivity-note">1</label>
                    <label className="ProAvisActivity-column_75">
                        <div className="ProAvisActivity-redbar" style={{ width: `${(nbOneStars / nbStars) * 100}%` }}></div>
                    </label>
                    <label className="ProAvisActivity-label-column_15">
                        {nbOneStars}
                    </label>
                </div>

            </div>
        </div >
    );
}


export default AvisActivityPage;
