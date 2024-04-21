import { useEffect, useState } from 'react';
import './main.css'
import { Chrono } from "react-chrono";
import Carousel from 'react-bootstrap/Carousel';

import i1 from '../../components/images/image.png';
import i2 from '../../components/images/image2.png';
import i3 from '../../components/images/image3.png';
import i4 from '../../components/images/image4.png';
import i5 from '../../components/images/image5.png';
import i6 from '../../components/images/image6.png';

export function Main() {
    const items = [
        {
            "title": "9 Sept. 2022",
            "cardTitle": "Premier jet",
            "cardSubtitle": "Toute première idée du concept, présentée dans le cadre de la piscine innovation - Moonshot"
        },
        {
            "title": "16 Sept. 2022",
            "cardTitle": "Finalisation de l'idée",
            "cardSubtitle": "L'équipe se met d'accord sur l'idée du projet et la présente durant la Keynote Moonshot"
        },
        {
            "title": "Oct. 2022",
            "cardTitle": "Sprint Desirability",
            "cardSubtitle": "Durant ce sprint, notre équipe a pu peaufiner et trouver des idées pour rendre notre projet le plus désirable possible"
        },
        {
            "title": "Nov. 2022",
            "cardTitle": "Sprint Viability / feasibility",
            "cardSubtitle": "Sprint qui nous a permis de comprendre comment nous allions faire pour rendre notre projet viable, les technologies utilisées ..."
        },
        {
            "title": "Nov. 2022",
            "cardTitle": "Model Canvas",
            "cardSubtitle": "Mises en place d'une charte graphique et d'un canvas pour imaginer le premier visuel de notre projet."
        },
        {
            "title": "Dec. 2022 - Fev. 2023",
            "cardTitle": "Piscine Innov Make & Drive",
            "cardSubtitle": "Premier test des technologies utilisées dans un projet d'une semaine. Présentation du projet et du visuel. Finalisation de ce sprint avec le EPITECH EXPERIENCE"
        },
        {
            "title": "Avril - Juin 2023",
            "cardTitle": "Test and learn",
            "cardSubtitle": "Début du vrai développement où l’on teste en condition réelle les technologies choisies et on apprend à travailler en groupe"
        },
        {
            "title": "Juil. - Oct. 2023",
            "cardTitle": "Management process",
            "cardSubtitle": "Sprint où nous avons continué à développer tout en mettant en place des processus de développement et un document pour gérer le management au sein du groupe"
        },
        {
            "title": "Nov. 2023 - Janv. 2024",
            "cardTitle": "Fast forward",
            "cardSubtitle": "Sprint où nous avons beaucoup avancé dans notre développement, en utilisant les process que nous avons mis en place auparavant"
        },
        {
            "title": "Fev. - Mai 2024",
            "cardTitle": "Beta & Growth Hacking",
            "cardSubtitle": "Sprint où nous avons travaillé pour finaliser une version déployable et utilisable pour la présenter à nos bêta testeurs"
        },
        {
            "title": "Mai - Juin 2024",
            "cardTitle": "Sortie de la première bêta sur mobile/web",
            "cardSubtitle": "La première version bêta du projet est officiellement lancée sur les plateformes mobiles et web. C'est une étape importante qui marque le début de la phase d'utilisation réelle par les utilisateurs."
        },
        {
            "title": "Juil. - Oct. 2024",
            "cardTitle": "Consolidation du projet",
            "cardSubtitle": "Durant cette période, l'équipe se concentre sur la consolidation et l'amélioration de la plateforme en fonction des retours des utilisateurs de la version bêta. Des fonctionnalités supplémentaires peuvent être développées, et des ajustements sont effectués pour optimiser l'expérience utilisateur."
        },
        {
            "title": "Nov. - Dec. 2024",
            "cardTitle": "Finalisation du projet et sortie du projet final",
            "cardSubtitle": "Les dernières touches sont apportées au projet, et la version finale est prête à être déployée. Tous les aspects du projet, y compris la technologie, le design et l'expérience utilisateur, sont examinés et finalisés. Le projet est ensuite officiellement lancé dans sa version finale."
        },
        {
            "title": "Janv. 2025",
            "cardTitle": "Rétrospective finale du projet, présentation du projet devant un jury",
            "cardSubtitle": "Une rétrospective finale est menée pour évaluer le projet dans son ensemble, en mettant en lumière les succès, les défis rencontrés et les leçons apprises tout au long du processus. Enfin, le projet est présenté devant un jury pour évaluation et clôture officielle du processus de développement."
        }
    ];
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
        <div className="information h-100 w-100 d-flex flex-column align-items-center justify-content-center">
            <section id="description" className='presentation mx-5 col-6'>
                <h1> Qu'est ce qu'Unbored ? </h1>
                <p>
                    Unbored est une application qui vise à améliorer l'utilisation du temps libre
                    en leurs proposant des activités insolite et variée en fonction de leur emploi du temps
                    Il promeut un style de vie sain, en faisant découvrir toute sorte d'activité autour de soir. 
                </p>
            </section>
            <section id="team" className='presentation mx-5 col-6'>
                <h1> Notre équipe </h1>
                <p>
                    Rémi SALEH - Développeur mobile
                </p>
                <p>
                    Idrissa FALL - Développeur mobile
                </p>
                <p>
                    Steeven AKINTILO - Développeur Web
                </p>
                <p>
                    Anotnin POTTIN - Développeur Web
                </p>
                <p>
                    Yacine ABU-KHALIL - Développeur Web
                </p>
                <p>
                    Jimy XU - Développeur backend
                </p>
                <p>
                    Chrisitan TRAN - Développeur backend
                </p>
            </section>
            <section id="timeline" className='presentationTL col-6'>
                <h1> Timeline </h1>
                <p>
                    <Chrono 
                    className='w-100'
                        items={items} 
                        theme={{
                            primary: 'black',
                            secondary: 'transparent',
                            cardBgColor: 'orange',
                            cardTitleColor: 'black',
                            cardSubtitleColor: 'black',
                            titleColor: 'black',
                            titleColorActive: 'white',
                            title: '10px',
                          }}
                        disableClickOnCircle={true}
                        cardHeight={100}
                        cardWidth={250}
                        activeItemIndex={9}
                        mode="VERTICAL" 
                        disableToolbar={true}
                    />
                </p>
            </section>
            <section id="demo" className='presentationC mx-5 col-6'>
                <Carousel data-bs-theme="dark" className='cassss'
                    activeIndex={index} onSelect={handleSelect}
                >
                    <Carousel.Item>
                        <img src={i1} className='w-100'>
                        </img>
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={i2} className='w-100'>
                        </img>
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={i3} className='w-100'>
                        </img>
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={i4} className='w-100'>
                        </img>
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={i5} className='w-100'>
                        </img>
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={i6} className='w-100'>
                        </img>
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <div className='mx-2 col-6 desc'>
                    <h1> {title[index]} </h1>
                    <p> {description[index]} </p>
                </div>
            </section>
            <section id="contact" className='presentation mx-5 col-6'>
                <h1> Nous contacter </h1>
                <p>
                    Pour toute question ou demande, veuillez nous contacter à l'adresse suivante:
                    <br></br>
                    <p><a href="mailto:unbored_2025@labeip.epitech.eu"> unbored_2025@labeip.epitech.eu </a> </p>
                    <br></br>
                    Vous pouvez aussi suivre notre instagram:
                    <p><a href="https://instagram.com/unbored_paris" target="_blank"> @unbored_paris </a> </p>
                </p>
            </section>
        </div>
    )
} 


export default Main;