import Logo from "./Logo.gif"
import Sports from "./sports-icon.gif"
import Schedule from "./schedule.gif"
import Jersey from "./Jersey.gif"
import Rate from "./Rate.gif"
import Boost from "./boost.gif"

import jimy from "./jimy.jpg"
import steeven from "./steeven.jpeg"
import christian from "./christian.jpeg"
import remi from "./remi.jpeg"
import idrissa from "./idrissa.jpg"
import yacine from "./yacine.jpeg"
import antonin from "./antonin.jpg"




import Carousel from 'react-bootstrap/Carousel';
import { useEffect, useMemo, useState } from "react";
import i1 from './images/image.png';
import i2 from './images/image2.png';
import i3 from './images/image3.png';
import i4 from './images/image4.png';
import i5 from './images/image5.png';
import i6 from './images/image6.png';
import './Vitrine.css'

const images = [i1, i2, i3, i4, i5, i6]

const Vitrine = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: any) => {
        setIndex(selectedIndex);
    };

    const titles = [
        "Création d'activité", 
        "Proposition d'activité",
        "Votre calendrier",
        "Avatars",
        "Page d'accueil",
        "Profil",
    ];
    
    const descriptions = [
        "Ajout d'activité à votre calendrier.",
        "Nous vous proposons des activités selon vos goûts et vos passions.",
        "Une révision du calendrier, incluant vos activités et celles auxquelles vous êtes inscrits avec Unbored.",
        "Une vingtaine d'assets sont disponibles au début d'Unbored pour créer un avatar et vous différencier de vos amis.",
        "Une page d'accueil pour voir la liste de toutes les activités disponibles sur Unbored.",
        "Votre profil avec votre avatar et vos activités journalières, avec des propositions telles que \"remplir automatiquement\", qui permettent de vous ajouter des activités selon vos goûts !"
    ];
    
    return (
        <div className="d-flex col-12 flex-column align-items-center justify-content-center text-center align-middle">
            <div id="presentation" style={{paddingBottom: "100px"}} />

            <p className="ShowcaseTitle"> Qu'est ce que Unbored ?</p>
            <div className="col-12 d-flex flex-row justify-content-center ShowcaseBody">
                <div className="col-3 d-flex flex-column align-items-center text-start">
                    <p className="ShowcaseText"> <p className="ShowcaseTitle"> Unbored </p>
                    est une application qui vise à améliorer l'utilisation du temps libre en proposant des activités insolites et variées en fonction de l'emploi du temps. Elle promeut un style de vie sain en faisant découvrir toutes sortes d'activités autour du loisir.
                    </p>
                </div>
                <div className="col-4 d-flex align-items-center">
                    <img alt="" src={Logo} className="LogoUnbored mx-auto"/>
                </div>
            </div>

            <div id="mobile" style={{paddingBottom: "100px"}} />
            <p className="ShowcaseTitle my-0"> Notre application mobile: </p>
            <div className="col-12 d-flex flex-row justify-content-center ShowcaseBody">
                <div className="col-5 d-flex justify-content-start">
                    <Carousel data-bs-theme="dark" className="" activeIndex={index} onSelect={handleSelect}>
                        {images.map((item, index) => {return (
                                <Carousel.Item className="" key={index}> <img alt=""  src={item}/> </Carousel.Item>
                        )})}
                    </Carousel>
                </div>
                <div className="col-4 d-flex align-items-center justify-content-center">
                    <div className='ShowcaseCarouselDesc text-end'>
                        <p className="ShowcaseTitle"> {titles[index]} </p>
                        <p className="ShowcaseText"> {descriptions[index]} </p>
                    </div>
                </div>
            </div>

            <div id="user" style={{paddingBottom: "100px"}} />

            <p className="ShowcaseTitle"> Côté utilisateurs: </p>
            <div className="col-12 d-flex flex-column justify-content-between ShowcaseBodyBig">

                <div className="col-12 d-flex flex-row justify-content-center">
                    <div className="col-4 d-flex flex-column text-start">
                        <p className="ShowcaseTitle"> Activités </p>
                        <p className="ShowcaseText"> 
                        Vous pouvez trouver de nombreuses activités sur Unbored.
                        <br/>
                        Des activités seront également proposées selon vos goûts et vos passions !
                        </p>
                    </div>
                    <div className="col-5 d-flex align-items-center">
                        <img alt="" src={Sports} className="LogoUnbored mx-auto"/>
                    </div>
                </div>

                <div className="col-12 d-flex flex-row justify-content-center">
                    <div className="col-5 d-flex align-items-center">
                        <img alt="" src={Schedule} className="LogoUnbored mx-auto"/>
                    </div>
                    <div className="col-4 text-end d-flex flex-column">
                        <p className="ShowcaseTitle"> Emplois du temps </p>
                        <p className="ShowcaseText">
                        Vous pouvez aussi gérer votre emploi du temps sur Unbored.
                        <br/>
                        Vous avez la possibilité de synchroniser votre application d'emplois du temps avec celle d'Unbored, et selon vos goûts et vos passions, nous pouvons le remplir d'activités !
                        </p>
                    </div>
                </div>
                <div className="col-12 d-flex flex-row justify-content-center">
                    <div className="col-4 text-start d-flex flex-column">
                        <p className="ShowcaseTitle"> Avatars </p>
                        <p className="ShowcaseText">
                        Nous vous donnons aussi un sentiment de progression en vous offrant des avatars selon chaque activité effectuée.
                        <br/> 
                        Vous participez à une activité sur le football ? Obtenez un maillot de football pour votre avatar !
                        </p>
                    </div>
                    <div className="col-5 d-flex align-items-center">
                        <img alt="" src={Jersey} className="LogoUnbored mx-auto"/>
                    </div>

                </div>
            </div>

            <div id="pro" style={{paddingBottom: "100px"}} />
            <p className="ShowcaseTitle"> Côté professionel: </p>
            <div className="col-12 d-flex flex-column justify-content-around ShowcaseBodyMid">
                <div className="col-12 d-flex flex-row justify-content-center">
                    <div className="col-5 d-flex align-items-start">
                        <img alt="" src={Boost} className="LogoUnbored mx-auto"/>
                    </div>
                    <div className="col-4 text-end d-flex flex-column">
                        <p className="ShowcaseTitle"> Mise en avant </p>
                        <p className="ShowcaseText">
                        Unbored vise aussi les professionnels. Si vous avez une activité avec peu de visibilité, nous vous aidons à vous mettre en avant en vous permettant de proposer votre activité aux utilisateurs d'Unbored.
                        </p>
                    </div>
                </div>

                <div className="col-12 d-flex flex-row justify-content-center">
                    <div className="col-4 text-start d-flex flex-column">
                        <p className="ShowcaseTitle"> Gestion d'avis </p>
                        <p className="ShowcaseText">
                        Les utilisateurs pourront laisser un avis sur vos activités.
                            <br/>
                            Vous pourrez consulter les activités et améliorer vos propositions en fonction des avis positifs ou négatifs.
                        </p>
                    </div>
                    <div className="col-5 d-flex align-items-start">
                        <img alt="" src={Rate} className="LogoUnbored mx-auto"/>
                    </div>
                </div>
            </div>

            <div id="pro" style={{paddingBottom: "100px"}} />
            <div className="col-12 d-flex flex-column justify-content-center align-items-center ShowcaseBody">
                <p className="ShowcaseTitle"> Qui somme nous ? </p>
                <div className="col-10 d-flex flex-row flex-wrap justify-content-around mt-6">
                    <div className="col-2 mx-1 my-1 d-flex flex-column ShowcasePresCard">
                        <img alt="" src={jimy}></img>
                        <p className="ShowcaseText"> Jimy <br/>Xu
                        </p>
                        <p className="ShowcaseText"> Developpeur full-stack </p>
                    </div>

                    <div className="col-2 mx-1 my-1 d-flex flex-column ShowcasePresCard">
                        <img alt="" src={antonin}></img>
                        <p className="ShowcaseText"> Antonin <br/>Pottin</p>
                        <p className="ShowcaseText"> Developpeur front-web</p>
                    </div>

                    <div className="col-2 mx-1 my-1 d-flex flex-column ShowcasePresCard">
                        <img alt="" src={steeven}></img>
                        <p className="ShowcaseText"> Steeven <br/> Akintilo</p>
                        <p className="ShowcaseText"> Developpeur front-web</p>
                    </div>

                    <div className="col-2 mx-1 my-1 d-flex flex-column ShowcasePresCard">
                        <img alt="" src={idrissa}></img>
                        <p className="ShowcaseText"> Idrissa <br/>Fall</p>
                        <p className="ShowcaseText"> Developpeur mobile</p>
                    </div>

                    <div className="col-2 mx-1 my-1 d-flex flex-column ShowcasePresCard">
                        <img alt="" src={remi}></img>
                        <p className="ShowcaseText"> Rémi <br/>Saleh</p>
                        <p className="ShowcaseText"> Developpeur mobile</p>
                    </div>

                    <div className="col-2 mx-1 my-1 d-flex flex-column ShowcasePresCard">
                        <img alt="" src={yacine}></img>
                        <p className="ShowcaseText"> Yacine <br/>Abu-khalil</p>
                        <p className="ShowcaseText"> Developpeur mobile</p>
                    </div>

                    <div className="col-2 mx-1 my-1 d-flex flex-column ShowcasePresCard">
                        <img alt="" src={christian}></img>
                        <p className="ShowcaseText"> Christian <br/>Tran</p>
                        <p className="ShowcaseText"> Developpeur back-end</p>
                    </div>
                </div>
                </div>
        </div>
    )
}

export default Vitrine;