import React, { Component, ChangeEvent } from 'react';
import {
    Input,
    InputGroup,
    InputRightElement,
    IconButton,
    position,
} from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import '../styles/pages/ClientAvisActivity.css';
import axios from "axios";
import Select, { ActionMeta, MultiValue } from 'react-select';
import { Center } from 'chakra-ui';
import activityImage from "../google.png";
import { Link } from 'react-router-dom';

interface State {
    type: string;
    nom: string;
    horaires: string;
    date: string;
    lieuVille: string;
    lieuRue: string;
    lieuNumero: string;
    description: string;
    age: string;
    payante: boolean;
    prix: string;
    email: string;
    telephone: string;
    selectedOption: { value: string; label: string } | null;
}

class AvisActivityPage extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            type: '', // Initialisez avec un tableau vide
            nom: '',
            horaires: '',
            date: '',
            lieuVille: '',
            lieuRue: '',
            lieuNumero: '',
            description: '',
            age: '',
            payante: false,
            prix: '',
            email: '',
            telephone: '',
            selectedOption: null,
        };
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }


    options: readonly any[] = [
        { value: 'sport', label: 'Sport' },
        { value: 'theatre', label: 'Théâtre' },
        { value: 'musique', label: 'Musique' },
        { value: 'art', label: 'Art' },
        { value: 'danse', label: 'Danse' },
        { value: 'cuisine', label: 'Cuisine' },
        { value: 'jeux', label: 'Jeux' },
        { value: 'nature', label: 'Nature' },
        { value: 'technologie', label: 'Technologie' },
    ];

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const target = event.target;
        const name = target.name;
        let value: string | boolean = target.value;

        if (target.type === 'checkbox') {
            value = (target as HTMLInputElement).checked;
        }

        // Créez un objet temporaire pour mettre à jour l'état
        const updatedState = {
            ...this.state,
            [name]: value
        };

        // Mettez à jour l'état avec l'objet temporaire
        this.setState(updatedState);
    }

    handleSelectChange = (newValue: any, actionMeta: any) => {
        // console.log(this.options)
        console.log(newValue);
        // console.log(newValue);
        // const value = actionMeta.option
        // this.setState( { value } )
        // this.setState( );
    }

    handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        try {
            const lieu = `${this.state.lieuRue} ${this.state.lieuNumero} ${this.state.lieuVille}`;
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.post("http://20.216.143.86/event/createevent", {
                name: this.state.nom,
                address: lieu,
                categories: this.state.type,
            }, config);
            console.log(response.status);
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        return (
            <div className="ClientAvisActivity-form-container">
                <Link to="/client-activityInfo">
                    <button>Retour</button>
                </Link>
                <form onSubmit={this.handleSubmit}>
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
                </form >
            </div >
        );
    }
}

export default AvisActivityPage;
