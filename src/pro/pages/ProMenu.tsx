import React, { Component, } from 'react';
import '../styles/ProMenu.css';
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
        toPath = '/Pro-profile';
    }
    else if (text === 'Voir contrat') {
        toPath = '/Pro-myContract';
    }

    return (
        <Link to={toPath}>
            <button className="ProMenu-button">
                {text}
            </button>
        </Link>
    );
}

function ProMenuPage() {
    const topButtonLabels = ['Créer une activité', 'Voir contrat', 'Profil'];

    return (
        <div className="ProMenu-form-container">
            <div className="ProMenu-row">
                {/* GAUCHE*/}
                <div className="ProMenu-boxshadow-left-side">

                    <div className="ProMenu-container">
                        <h2 className="ProMenu-sl-rouge">Résumé de la dernière session</h2>
                    </div>

                    <div className="ProMenu-container">
                        <h2 className="ProMenu-titre_event">Bowling</h2>
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
                            <div className="ProMenu-red_values">38</div>
                        </div>
                        <div className="ProMenu-right-side">
                            <div className="ProMenu-red_values">4/5</div>
                        </div>
                        <div className="ProMenu-right-side">
                            <div className="ProMenu-red_values">380€</div>
                        </div>
                    </div>

                    <div className="ProMenu-container">
                        <Link to={"/Pro-myActivites"}>
                        <button className="ProMenu-see_more">Voir d'avantage</button>
                        </Link>
                    </div>

                </div>

                {/* drotie */}
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
                <div className="ProMenu-button-container ">
                    {topButtonLabels.map((label, index) => (
                        <Button key={index} text={label} />
                    ))}
                </div>
            </div>
        </div >
    );
}

export default ProMenuPage;
