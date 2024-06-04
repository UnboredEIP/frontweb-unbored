import Logo from "./UnboredLogo.svg"
import Carousel from 'react-bootstrap/Carousel';
import { useState } from "react";
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
  
   const title = [
        "Création d'activité", 
        "Proposition d'activité",
        "Votre calendrier",
        "Avatars",
        "Page d'accueil",
        "Profil",
    ];
    const description =[
        "Ajout d'activité sur ton calendrier",
        "On vous propose des activités selon vos gouts et vos passions",
        "Une revisite du calendrier, avec vos activités plus ceux auquel vous vous êtes inscrit avec unbored",
        "Une vingtaine d'assets sont disponible au début d'unbored pour vous crée un avatar et de vous différencier de vos amis",
        "Une page d'accueil pour voir la liste de toutes les activitées disponible sur unbored",
        "Votre profil avec votre avatar et vos activités journalière, avec des proposition tel que \" remplir automatiquement \" qui permet de vous ajoutez des activités selon vos gouts ! "
    ]

    return (
        <div className="d-flex col-12 flex-column align-items-center justify-content-center text-center align-middle">
            <div id="presentation" style={{paddingBottom: "100px"}} />

            <div className="col-6 d-flex align-items-center ShowcaseBody">
                <div>
                    <p className="ShowcaseTitle"> Qu'est ce que Unbored ?</p>
                    <img alt="" src={Logo} className="LogoUnbored mx-auto"/>
                    <p className="ShowcaseText"> Unbored est une application qui vise à améliorer l'utilisation du temps libre en leur proposant des activités insolites et variées en fonction de leur emploi du temps. Il promeut un style de vie sain en faisant découvrir toutes sortes d'activités autour du loisir.</p>
                </div>
            </div>

            <div id="mobile" style={{paddingBottom: "100px"}} />
            <div className="col-6 d-flex align-items-center ShowcaseBody">
                <div>
                    <p className="ShowcaseTitle"> Notre application mobile: </p>
                    <div className="">
                        <Carousel data-bs-theme="dark"  activeIndex={index} onSelect={handleSelect}>
                            {images.map((item, index) => {return (
                                    <Carousel.Item key={index}> <img alt=""  src={item}/> </Carousel.Item>
                            )})}
                        </Carousel>
                        <div className='ShowcaseCarouselDesc'>
                            <p className="ShowcaseTitle"> {title[index]} </p>
                            <p className="ShowcaseText"> {description[index]} </p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="user" style={{paddingBottom: "100px"}} />
            <div className="col-6 d-flex align-items-center ShowcaseBody">
                <div className="">
                    <i style={{fontSize: '10rem'}} className="fa-solid fa-user col-3 text-center pt-1"></i>

                    <p className="ShowcaseTitle"> Côté utilisateurs: </p>
                    <p className="ShowcaseText"> Comme dit dans les présentations, Unbored vous permettra d'avoir une style de vie sains en vous proposant des activités selon vos goûts et selon votre emplois du temps.</p>
                </div>
            </div>

            <div id="pro" style={{paddingBottom: "100px"}} />
            <div className="col-6 d-flex align-items-center ShowcaseBody">
                <div>
                    <i style={{fontSize: '10rem'}} className="fa-solid fa-user-tie col-3 text-center pt-1"></i>
                    <p className="ShowcaseTitle"> Côté professionel: </p>
                    <p className="ShowcaseText"> Unbored vise aussi les professionels, si vous avez une activitées avec peut de visibilité nous vous aidons a vous mettre en avant en vous permetant de proposer votre activité aux utlisateurs d'Unbored</p>
                </div>
            </div>

        </div>
    )
}

export default Vitrine;