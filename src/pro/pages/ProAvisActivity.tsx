import React, { Component, } from 'react';
import '../styles/ProAvisActivity.css';
import activityImage from "../../google.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AvisActivityPage: React.FC = () => {

    const navigate = useNavigate();

    return (
        <div className="ProAvisActivity-form-container">

            <div className="ProAvisActivity-back-button">
                <button onClick={() => navigate(-1)}>Retour</button>
            </div>
            <div className="ProAvisActivity-row">
                {/* GAUCHE*/}
                <div className="ProAvisActivity-boxshadow-left-side">
                    <div className="ProAvisActivity-container">
                        <h2 className="ProAvisActivity-form-title">Avis Positif</h2>
                    </div>
                    <div className="ProAvisActivity-boxshadow-left-side">
                        <div className="ProAvisActivity-row">
                            <div className="ProAvisActivity-form-row">
                                <label className="ProAvisActivity-label-column_15">
                                    <img src={activityImage} alt="Activité" style={{ maxHeight: '50px' }} />
                                </label>
                                <label className="ProAvisActivity-label-column_75">
                                    Donal toto
                                    <div className="ProAvisActivity-form-row">
                                        Mardi 11 Décembre
                                    </div>
                                </label>
                                <label className="ProAvisActivity-note">
                                    5/5
                                </label>
                            </div>

                        </div>
                        <div className="ProAvisActivity-form-row">
                            Super activitée
                        </div>
                    </div>
                    <div className="ProAvisActivity-boxshadow-left-side">
                        <div className="ProAvisActivity-row">
                            <div className="ProAvisActivity-form-row">
                                <label className="ProAvisActivity-label-column_15">
                                    <img src={activityImage} alt="Activité" style={{ maxHeight: '50px' }} />
                                </label>
                                <label className="ProAvisActivity-label-column_75">
                                    Donal toto
                                    <div className="ProAvisActivity-form-row">
                                        Mardi 11 Décembre
                                    </div>
                                </label>
                                <label className="ProAvisActivity-note">
                                    5/5
                                </label>
                            </div>

                        </div>
                        <div className="ProAvisActivity-form-row">
                            Super activitée
                        </div>
                    </div>
                    <div className="ProAvisActivity-boxshadow-left-side">
                        <div className="ProAvisActivity-row">
                            <div className="ProAvisActivity-form-row">
                                <label className="ProAvisActivity-label-column_15">
                                    <img src={activityImage} alt="Activité" style={{ maxHeight: '50px' }} />
                                </label>
                                <label className="ProAvisActivity-label-column_75">
                                    Donal toto
                                    <div className="ProAvisActivity-form-row">
                                        Mardi 11 Décembre
                                    </div>
                                </label>
                                <label className="ProAvisActivity-note">
                                    5/5
                                </label>
                            </div>

                        </div>
                        <div className="ProAvisActivity-form-row">
                            Super activitée
                        </div>
                    </div>
                </div>
                {/* drotie */}
                <div className="ProAvisActivity-boxshadow-right-side" >
                    <div className="ProAvisActivity-container">
                        <h2 className="ProAvisActivity-form-title">Avis Negatif</h2>
                    </div>
                    <div className="ProAvisActivity-boxshadow-left-side">
                        <div className="ProAvisActivity-row">
                            <div className="ProAvisActivity-form-row">
                                <label className="ProAvisActivity-label-column_15">
                                    <img src={activityImage} alt="Activité" style={{ maxHeight: '50px' }} />
                                </label>
                                <label className="ProAvisActivity-label-column_75">
                                    Donal toto
                                    <div className="ProAvisActivity-form-row">
                                        Mardi 11 Décembre
                                    </div>
                                </label>
                                <label className="ProAvisActivity-note">
                                    1/5
                                </label>
                            </div>

                        </div>
                        <div className="ProAvisActivity-form-row">
                            Nul
                        </div>
                    </div>
                    <div className="ProAvisActivity-boxshadow-left-side">
                        <div className="ProAvisActivity-row">
                            <div className="ProAvisActivity-form-row">
                                <label className="ProAvisActivity-label-column_15">
                                    <img src={activityImage} alt="Activité" style={{ maxHeight: '50px' }} />
                                </label>
                                <label className="ProAvisActivity-label-column_75">
                                    Donal toto
                                    <div className="ProAvisActivity-form-row">
                                        Mardi 11 Décembre
                                    </div>
                                </label>
                                <label className="ProAvisActivity-note">
                                    1/5
                                </label>
                            </div>

                        </div>
                        <div className="ProAvisActivity-form-row">
                            Nul
                        </div>
                    </div>
                    <div className="ProAvisActivity-boxshadow-left-side">
                        <div className="ProAvisActivity-row">
                            <div className="ProAvisActivity-form-row">
                                <label className="ProAvisActivity-label-column_15">
                                    <img src={activityImage} alt="Activité" style={{ maxHeight: '50px' }} />
                                </label>
                                <label className="ProAvisActivity-label-column_75">
                                    Donal toto
                                    <div className="ProAvisActivity-form-row">
                                        Mardi 11 Décembre
                                    </div>
                                </label>
                                <label className="ProAvisActivity-note">
                                    1/5
                                </label>
                            </div>

                        </div>
                        <div className="ProAvisActivity-form-row">
                            Nul
                        </div>
                    </div>
                </div>
            </div>

            <div className="ProAvisActivity-separator"></div>

            {/* Description */}
            <div className="ProAvisActivity-boxshadow-left-side">
                <div className="ProAvisActivity-container">
                    <div className="ProAvisActivity-note-globale">4/5</div>
                    <div className="ProAvisActivity-form-nobox-title">Note globale</div>
                </div>
                <div className="ProAvisActivity-container">
                    Sur<span style={{ color: 'red', marginLeft: '5px', marginRight: '5px' }}>37343</span>avis
                </div>
                <div className="ProAvisActivity-row" style={{ paddingLeft: '10%' }}>
                    <label className="ProAvisActivity-note">5</label>
                    <label className="ProAvisActivity-column_75">
                        <div className="ProAvisActivity-redbar"></div>
                    </label>
                    <label className="ProAvisActivity-label-column_15">
                        394382
                    </label>
                </div>
                <div className="ProAvisActivity-row" style={{ paddingLeft: '10%' }}>
                    <label className="ProAvisActivity-note">4</label>
                    <label className="ProAvisActivity-column_75">
                        <div className="ProAvisActivity-redbar" style={{ width: '70%' }}></div>
                    </label>
                    <label className="ProAvisActivity-label-column_15">
                        50
                    </label>
                </div>
                <div className="ProAvisActivity-row" style={{ paddingLeft: '10%' }}>
                    <label className="ProAvisActivity-note">3</label>
                    <label className="ProAvisActivity-column_75">
                        <div className="ProAvisActivity-redbar" style={{ width: '10%' }}></div>
                    </label>
                    <label className="ProAvisActivity-label-column_15">
                        8989
                    </label>
                </div>
                <div className="ProAvisActivity-row" style={{ paddingLeft: '10%' }}>
                    <label className="ProAvisActivity-note">2</label>
                    <label className="ProAvisActivity-column_75">
                        <div className="ProAvisActivity-redbar" style={{ width: '40%' }}></div>
                    </label>
                    <label className="ProAvisActivity-label-column_15">
                        6272
                    </label>
                </div>
                <div className="ProAvisActivity-row" style={{ paddingLeft: '10%' }}>
                    <label className="ProAvisActivity-note">1</label>
                    <label className="ProAvisActivity-column_75">
                        <div className="ProAvisActivity-redbar" style={{ width: '20%' }}></div>
                    </label>
                    <label className="ProAvisActivity-label-column_15">
                        767
                    </label>
                </div>
            </div>
        </div >
    );
}


export default AvisActivityPage;
