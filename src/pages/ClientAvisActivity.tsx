import React, { Component, } from 'react';
import '../styles/pages/ClientAvisActivity.css';
import activityImage from "../google.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AvisActivityPage: React.FC = () => {

    const navigate = useNavigate();

    return (
        <div className="ClientAvisActivity-form-container">
            
            <div className="ClientAvisActivity-back-button">
            <button onClick={() => navigate(-1)}>Retour</button>
            </div>
            <div className="ClientAvisActivity-row">
                {/* GAUCHE*/}
                <div className="ClientAvisActivity-boxshadow-left-side">
                    <div className="ClientAvisActivity-container">
                        <h2 className="ClientAvisActivity-form-title">Avis Positif</h2>
                    </div>
                    <div className="ClientAvisActivity-boxshadow-left-side">
                        <div className="ClientAvisActivity-row">
                            <div className="ClientAvisActivity-form-row">
                                <label className="ClientAvisActivity-label-column_15">
                                    <img src={activityImage} alt="Activité" style={{ maxHeight: '50px' }} />
                                </label>
                                <label className="ClientAvisActivity-label-column_75">
                                    Donal toto
                                    <div className="ClientAvisActivity-form-row">
                                        Mardi 11 Décembre
                                    </div>
                                </label>
                                <label className="ClientAvisActivity-note">
                                    5/5
                                </label>
                            </div>

                        </div>
                        <div className="ClientAvisActivity-form-row">
                            Super activitée
                        </div>
                    </div>
                    <div className="ClientAvisActivity-boxshadow-left-side">
                        <div className="ClientAvisActivity-row">
                            <div className="ClientAvisActivity-form-row">
                                <label className="ClientAvisActivity-label-column_15">
                                    <img src={activityImage} alt="Activité" style={{ maxHeight: '50px' }} />
                                </label>
                                <label className="ClientAvisActivity-label-column_75">
                                    Donal toto
                                    <div className="ClientAvisActivity-form-row">
                                        Mardi 11 Décembre
                                    </div>
                                </label>
                                <label className="ClientAvisActivity-note">
                                    5/5
                                </label>
                            </div>

                        </div>
                        <div className="ClientAvisActivity-form-row">
                            Super activitée
                        </div>
                    </div>
                    <div className="ClientAvisActivity-boxshadow-left-side">
                        <div className="ClientAvisActivity-row">
                            <div className="ClientAvisActivity-form-row">
                                <label className="ClientAvisActivity-label-column_15">
                                    <img src={activityImage} alt="Activité" style={{ maxHeight: '50px' }} />
                                </label>
                                <label className="ClientAvisActivity-label-column_75">
                                    Donal toto
                                    <div className="ClientAvisActivity-form-row">
                                        Mardi 11 Décembre
                                    </div>
                                </label>
                                <label className="ClientAvisActivity-note">
                                    5/5
                                </label>
                            </div>

                        </div>
                        <div className="ClientAvisActivity-form-row">
                            Super activitée
                        </div>
                    </div>
                </div>
                {/* drotie */}
                <div className="ClientAvisActivity-boxshadow-right-side" >
                    <div className="ClientAvisActivity-container">
                        <h2 className="ClientAvisActivity-form-title">Avis Negatif</h2>
                    </div>
                    <div className="ClientAvisActivity-boxshadow-left-side">
                        <div className="ClientAvisActivity-row">
                            <div className="ClientAvisActivity-form-row">
                                <label className="ClientAvisActivity-label-column_15">
                                    <img src={activityImage} alt="Activité" style={{ maxHeight: '50px' }} />
                                </label>
                                <label className="ClientAvisActivity-label-column_75">
                                    Donal toto
                                    <div className="ClientAvisActivity-form-row">
                                        Mardi 11 Décembre
                                    </div>
                                </label>
                                <label className="ClientAvisActivity-note">
                                    1/5
                                </label>
                            </div>

                        </div>
                        <div className="ClientAvisActivity-form-row">
                            Nul
                        </div>
                    </div>
                    <div className="ClientAvisActivity-boxshadow-left-side">
                        <div className="ClientAvisActivity-row">
                            <div className="ClientAvisActivity-form-row">
                                <label className="ClientAvisActivity-label-column_15">
                                    <img src={activityImage} alt="Activité" style={{ maxHeight: '50px' }} />
                                </label>
                                <label className="ClientAvisActivity-label-column_75">
                                    Donal toto
                                    <div className="ClientAvisActivity-form-row">
                                        Mardi 11 Décembre
                                    </div>
                                </label>
                                <label className="ClientAvisActivity-note">
                                    1/5
                                </label>
                            </div>

                        </div>
                        <div className="ClientAvisActivity-form-row">
                            Nul
                        </div>
                    </div>
                    <div className="ClientAvisActivity-boxshadow-left-side">
                        <div className="ClientAvisActivity-row">
                            <div className="ClientAvisActivity-form-row">
                                <label className="ClientAvisActivity-label-column_15">
                                    <img src={activityImage} alt="Activité" style={{ maxHeight: '50px' }} />
                                </label>
                                <label className="ClientAvisActivity-label-column_75">
                                    Donal toto
                                    <div className="ClientAvisActivity-form-row">
                                        Mardi 11 Décembre
                                    </div>
                                </label>
                                <label className="ClientAvisActivity-note">
                                    1/5
                                </label>
                            </div>

                        </div>
                        <div className="ClientAvisActivity-form-row">
                            Nul
                        </div>
                    </div>
                </div>
            </div>

            <div className="ClientAvisActivity-separator"></div>

            {/* Description */}
            <div className="ClientAvisActivity-boxshadow-left-side">
                <div className="ClientAvisActivity-container">
                    <div className="ClientAvisActivity-note-globale">4/5</div>
                    <div className="ClientAvisActivity-form-nobox-title">Note globale</div>
                </div>
                <div className="ClientAvisActivity-container">
                    Sur<span style={{ color: 'red', marginLeft: '5px', marginRight: '5px' }}>37343</span>avis
                </div>
                <div className="ClientAvisActivity-row" style={{ paddingLeft: '10%' }}>
                    <label className="ClientAvisActivity-note">5</label>
                    <label className="ClientAvisActivity-column_75">
                        <div className="ClientAvisActivity-redbar"></div>
                    </label>
                    <label className="ClientAvisActivity-label-column_15">
                        394382
                    </label>
                </div>
                <div className="ClientAvisActivity-row" style={{ paddingLeft: '10%' }}>
                    <label className="ClientAvisActivity-note">4</label>
                    <label className="ClientAvisActivity-column_75">
                        <div className="ClientAvisActivity-redbar" style={{ width: '70%' }}></div>
                    </label>
                    <label className="ClientAvisActivity-label-column_15">
                        50
                    </label>
                </div>
                <div className="ClientAvisActivity-row" style={{ paddingLeft: '10%' }}>
                    <label className="ClientAvisActivity-note">3</label>
                    <label className="ClientAvisActivity-column_75">
                        <div className="ClientAvisActivity-redbar" style={{ width: '10%' }}></div>
                    </label>
                    <label className="ClientAvisActivity-label-column_15">
                        8989
                    </label>
                </div>
                <div className="ClientAvisActivity-row" style={{ paddingLeft: '10%' }}>
                    <label className="ClientAvisActivity-note">2</label>
                    <label className="ClientAvisActivity-column_75">
                        <div className="ClientAvisActivity-redbar" style={{ width: '40%' }}></div>
                    </label>
                    <label className="ClientAvisActivity-label-column_15">
                        6272
                    </label>
                </div>
                <div className="ClientAvisActivity-row" style={{ paddingLeft: '10%' }}>
                    <label className="ClientAvisActivity-note">1</label>
                    <label className="ClientAvisActivity-column_75">
                        <div className="ClientAvisActivity-redbar" style={{ width: '20%' }}></div>
                    </label>
                    <label className="ClientAvisActivity-label-column_15">
                        767
                    </label>
                </div>
            </div>
        </div >
    );
}


export default AvisActivityPage;
