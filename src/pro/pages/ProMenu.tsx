import React, { useEffect, useState } from 'react';
import '../styles/ProMenu.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Define Button component
interface ButtonProps {
    text: string;
}

const Button: React.FC<ButtonProps> = ({ text }) => {
    let toPath = '/';
    if (text === 'Créer une activité') {
        toPath = '/create-activity';
    } else if (text === 'Profil') {
        toPath = '/Pro-profile';
    } else if (text === 'Voir contrat') {
        toPath = '/Pro-myContract';
    }

    return (
        <Link to={toPath}>
            <button className="ProMenu-button">
                {text}
            </button>
        </Link>
    );
};

// Define ProMenuPage component
const ProMenuPage: React.FC = () => {
    const [nearestActivity, setNearestActivity] = useState<any>(null);
    const [averageStars, setAverageStars] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const topButtonLabels = ['Créer une activité', 'Voir contrat', 'Profil'];

    // Function to fetch activities and set nearest activity
    const fetchActivities = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token is missing');
            }
    
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
    
            const url = `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/events/lists`;
            const response = await axios.get(url, config);
            const activities = response.data.events;
    
            const profileUrl = `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile`;
            const profileResponse = await axios.get(profileUrl, config);
            const profileDetails = profileResponse.data.user;
    
            if (!activities || activities.length === 0) {
                throw new Error('No activities found');
            }
    
            // Get today's date
            const today = new Date();
    
            // Filter activities to only include those created by the current user
            const userActivities = activities.filter(activity => activity.creator === profileDetails._id);
    
            if (userActivities.length === 0) {
                console.log("No activities found for this user.");
                return;
            }
    
            // Find the activity with the closest end_date to today
            const closestActivity = userActivities.reduce((closest, current) => {
                const currentEndDate = new Date(current.end_date);
                const closestEndDate = new Date(closest.end_date);
    
                return Math.abs(currentEndDate.getTime() - today.getTime()) <
                    Math.abs(closestEndDate.getTime() - today.getTime())
                    ? current
                    : closest;
            });
    
            console.log("profileDetails: ", profileDetails._id);
            console.log("closestActivity: ", closestActivity.creator);
    
            setNearestActivity(closestActivity);
            if (closestActivity) {
                setAverageStars(calculateAverageStars(closestActivity));
            }
        } catch (error) {
            setError(error.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };
    

    // Function to calculate average stars
    const calculateAverageStars = (activity: any) => {
        if (!activity.rate || activity.rate.length === 0) return -1;

        const totalStars = activity.rate.reduce((sum: number, rate: any) => sum + parseInt(rate.stars, 10), 0);
        return Math.round(totalStars / activity.rate.length);
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    return (
        <div className="ProMenu-form-container">
            <div className="ProMenu-row">
                {/* GAUCHE */}
                <div className="ProMenu-boxshadow-left-side">
                    <div className="ProMenu-container">
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p className="error-message">{error}</p>
                        ) : nearestActivity ? (
                            <h2 className="ProMenu-sl-rouge">
                                {nearestActivity.end ? 'Résumé de la dernière session' : 'Résumé de la prochaine session'}
                            </h2>
                        ) : (
                            <p>No activity data available</p>
                        )}
                    </div>

                    <div className="ProMenu-container">
                        <h2 className="ProMenu-titre_event">{nearestActivity ? nearestActivity.name : 'No Event'}</h2>
                    </div>

                    <div className="ProMenu-row">
                        <div className="ProMenu-right-side">
                            <div className="ProMenu-container">Participation</div>
                        </div>
                        <div className="ProMenu-right-side">
                            <div className="ProMenu-container">Note Globale</div>
                        </div>
                        <div className="ProMenu-right-side">
                            <div className="ProMenu-container">Recette</div>
                        </div>
                    </div>

                    <div className="ProMenu-row">
                        <div className="ProMenu-right-side">
                            <div className="ProMenu-red_values">{nearestActivity ? nearestActivity.participents.length : '-'}</div>
                        </div>
                        <div className="ProMenu-right-side">
                            <div className="ProMenu-red_values">
                                {averageStars === -1 ? '-/5' : `${averageStars}/5`}
                            </div>

                        </div>
                        <div className="ProMenu-right-side">
                            <div className="ProMenu-red_values">
                                {nearestActivity ? `${(nearestActivity.participents.length * parseFloat(nearestActivity.price)).toFixed(2)} €` : '-'}
                            </div>
                        </div>
                    </div>

                    <div className="ProMenu-container">
                        <Link to={nearestActivity ? `/Pro-activityInfo/${nearestActivity._id}` : '#'}>
                            <button className="ProMenu-see_more">Voir d'avantage</button>
                        </Link>
                    </div>
                </div>

                {/* DROITE */}
                <div className="ProMenu-boxshadow-left-side">
                    <div className="ProMenu-container">
                        <h2 className="ProMenu-sl-rouge">Nouveautés</h2>
                    </div>

                    <div className="ProMenu-container">
                        <h2 className="ProMenu-big_red_values" style={{ marginTop: '10px', marginBottom: '10px' }}>Félicitation !</h2>
                    </div>

                    <div className="ProMenu-row">
                        <div className="ProMenu-normal_text" style={{ marginBottom: '55px' }}>
                            Vous avez 7 nouvelles personnes qui vous ont ajouté à leurs favoris
                        </div>
                    </div>
                </div>
            </div>

            <div className="ProMenu-separator"></div>

            {/* Description */}
            <div className="ProMenu-boxshadow-left-side">
                <div className="ProMenu-button-container">
                    {topButtonLabels.map((label, index) => (
                        <Button key={index} text={label} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProMenuPage;
