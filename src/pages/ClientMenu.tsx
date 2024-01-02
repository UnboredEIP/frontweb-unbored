import React, { Component, } from 'react';
import '../styles/pages/ClientMenu.css';
import activityImage from "../google.png";
import { Link } from 'react-router-dom';

interface ButtonProps {
    text: string;
}

function Button({ text }: ButtonProps) {
    let toPath = '/';
    if (text === 'Créer une activité') {
        toPath = '/create-activity';
    } else if (text === 'Profil') {
        toPath = '/client-profile';
    }
    else if (text === 'Voir contrat') {
        toPath = '/client-myContract';
    }

    return (
        <Link to={toPath}>
            <button className="ClientMenu-button">
                {text}
            </button>
        </Link>
    );
}

function ClientMenuPage() {
    const topButtonLabels = ['Créer une activité', 'Voir contrat', 'Profil'];

    return (
        <div className="ClientMenu-form-container">
            <div className="ClientMenu-row">
                {/* GAUCHE*/}
                <div className="ClientMenu-boxshadow-left-side">

                    <div className="ClientMenu-container">
                        <h2 className="ClientMenu-sl-rouge">Résumé de la dernière session</h2>
                    </div>

                    <div className="ClientMenu-container">
                        <h2 className="ClientMenu-titre_event">Bowling</h2>
                    </div>

                    <div className="ClientMenu-row">
                        <div className="ClientMenu-right-side">
                            <div className="ClientMenu-container">Participation</div>
                        </div>
                        <div className="ClientMenu-right-side">
                            <div className="ClientMenu-container">Note Globale</div>
                        </div>
                        <div className="ClientMenu-right-side">
                            <div className="ClientMenu-container">Recette</div>
                        </div>
                    </div>

                    <div className="ClientMenu-row">
                        <div className="ClientMenu-right-side">
                            <div className="ClientMenu-red_values">38</div>
                        </div>
                        <div className="ClientMenu-right-side">
                            <div className="ClientMenu-red_values">4/5</div>
                        </div>
                        <div className="ClientMenu-right-side">
                            <div className="ClientMenu-red_values">380€</div>
                        </div>
                    </div>

                    <div className="ClientMenu-container">
                        <Link to={"/client-myActivites"}>
                        <button className="ClientMenu-see_more">Voir d'avantage</button>
                        </Link>
                    </div>

                </div>

                {/* drotie */}
                <div className="ClientMenu-boxshadow-left-side">

                    <div className="ClientMenu-container">
                        <h2 className="ClientMenu-sl-rouge">Nouveautés</h2>
                    </div>

                    <div className="ClientMenu-container">
                        <h2 className="ClientMenu-big_red_values" style={{ marginTop: '10px', marginBottom: '10px' }}>Félicitation !</h2>
                    </div>

                    <div className="ClientMenu-row">
                        <div className="ClientMenu-normal_text" style={{ marginBottom: '55px' }}>
                            Vous avez 7 nouvelles personnes qui vous ont ajouté à leurs favoris
                        </div>
                    </div>

                </div>
            </div>

            <div className="ClientMenu-separator"></div>

            {/* Description */}
            <div className="ClientMenu-boxshadow-left-side">
                <div className="ClientMenu-button-container ">
                    {topButtonLabels.map((label, index) => (
                        <Button key={index} text={label} />
                    ))}
                </div>
            </div>
        </div >
    );
}

export default ClientMenuPage;
