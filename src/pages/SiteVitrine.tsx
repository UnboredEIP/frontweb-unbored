import React from 'react';

const SiteVitrine: React.FC = () => {
  return (
    <div>
      <style>
        {`
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        
        header {
          background-color: #333;
          color: #fff;
          padding: 20px 0;
          text-align: center;
        }
        
        .container {
          width: 80%;
          margin: 0 auto;
        }
        
        .logo {
          width: 100px;
          height: 100px;
          display: block;
          margin: 0 auto;
        }
        
        .description,
        .equipe,
        .timeline,
        .contact {
          padding: 50px 0;
        }
        
        h2 {
          color: #333;
          font-size: 36px; /* Augmenter la taille du texte */
          font-weight: bold; /* Mettre en gras */
        }
        
        p {
          color: #666; /* Changement de la couleur du texte des paragraphes */
          line-height: 1.6; /* Augmentation de l'espacement des lignes */
          font-size: 24px; /* Augmentation de la taille du texte des paragraphes */
        }
        
        li {
          color: #666; /* Changement de la couleur du texte des paragraphes */
          line-height: 1.6; /* Augmentation de l'espacement des lignes */
          font-size: 24px; /* Augmentation de la taille du texte des paragraphes */
        }
        
        ul {
          list-style-type: none;
          padding: 0;
        }
        
        ul li {
          margin-bottom: 10px;
        }
        
        .blanc {
          color: white;
        }
      
        .contact p {
          margin-bottom: 10px;
        }
        `}
      </style>

      <header>
        <div className="">
          <a href="/" className="logo-link"><img src="unbored.png" alt="Votre Logo" className="logo" /></a>
          <h2 className="blanc">Unbored</h2>
        </div>
      </header>
      <section className="description">
        <div className="container">
          <h2>Description du Projet</h2>
          <p>UnBored est une application qui vise à améliorer l'utilisation du temps libre des jeunes, en leur proposant des activités insolites et variées, en fonction de leur emploi du temps. Il promeut un style de vie sain, en faisant découvrir toute sorte d‘activité autour de soi.</p>
        </div>
      </section>
      <section className="equipe">
        <div className="container">
          <h2>Notre Équipe</h2>
          <ul>
            <li>Remi SALEH - Développeur Mobile</li>
            <li>Idrissa FALL - Développeur Mobile</li>
            <li>Steeven AKINTILO - Développeur Web</li>
            <li>Antonin POTIN - Développeur Web</li>
            <li>Yacine ABU-KHALIL - Développeur Web</li>
            <li>Jimy XU - Développeur Backend</li>
            <li>Christiant TRAN - Développeur Backend</li>
          </ul>
        </div>
      </section>
      <section className="timeline">
        <div className="container">
          <h2>Timeline du Projet</h2>
          <ul>
              <li>9 Septembre 2022 : Premier jet : Toute première idée du concept, présentée dans le cadre de la piscine innovation - Moonshot</li>
              <li>16 Septembre 2022 : Finalisation de l'idée : L'équipe se met d'accord sur l'idée de projet et la présente durant la Keynote Moonshot</li>
              <li>Octobre 2022 : Sprint Desirability : Durant ce sprint, notre équipe a pu peaufiner et trouver des idées pour rendre notre projet le plus désirable possible</li>
              <li>Novembre 2022 : Sprint Viability / feasibility : Sprint qui nous a permis de comprendre comment nous allions faire pour rendre notre projet viable, les technologies utilisées ...</li>
              <li>Novembre 2022 : Model Canvas : Mises en place d'une charte graphique et d'un canvas pour imaginer le premier visuel de notre projet.</li>
              <li>Décembre 2022 / Février 2023 : Piscine Innov Make & Drive : premier test des technologies utilisées dans un projet d'une semaine. Présentation du projet et du visuel. Finalisation de ce sprint avec le EPITECH EXPERIENCE</li>
              <li>Avril - Juin 2023 : Test and learn : début du vrai développement où l’on teste en condition réelle les technologies choisies et on apprend à travailler en groupe</li>
              <li>Juillet - Octobre 2023 : Management process : Sprint ou nous avons continué à développer tout en mettant en place des processus de développement et un document pour gérer le management au sein du groupe</li>
              <li>Novembre 2023 - Janvier 2024 : Fast forward: sprint ou nous avons beaucoup avancer dans notre developpent, en utilisant les process que nous avons mis en place auparavant</li>
              <li>Février - Mai 2024 : Beta & Growth Hacking: sprint où nous avons travaillé pour finaliser un version deployable et utilisable pour la présenter à nous bêta testeur</li>
              <li>Mai - Juin 2024 : Sortie de la première bêta sur mobile/web: La première version bêta du projet est officiellement lancée sur les plateformes mobiles et web. C'est une étape importante qui marque le début de la phase d'utilisation réelle par les utilisateurs.</li>
              <li>Juillet - Octobre 2024 : Consolidation du projet: Durant cette période, l'équipe se concentre sur la consolidation et l'amélioration de la plateforme en fonction des retours des utilisateurs de la version bêta. Des fonctionnalités supplémentaires peuvent être développées, et des ajustements sont effectués pour optimiser l'expérience utilisateur.</li>
              <li>Novembre - Décembre : Finalisation du projet et sortie du projet final: Les dernières touches sont apportées au projet, et la version finale est prête à être déployée. Tous les aspects du projet, y compris la technologie, le design et l'expérience utilisateur, sont examinés et finalisés. Le projet est ensuite officiellement lancé dans sa version finale.</li>
              <li>Janvier 2025 : Rétrospective finale du projet, présentation du projet devant un jury: Une rétrospective finale est menée pour évaluer le projet dans son ensemble, en mettant en lumière les succès, les défis rencontrés et les leçons apprises tout au long du processus. Enfin, le projet est présenté devant un jury pour évaluation et clôture officielle du processus de développement.</li>  
          </ul>
        </div>
      </section>
      <section className="contact">
        <div className="container">
          <h2>Nous Contacter</h2>
          <p>Pour toute question ou demande, veuillez nous contacter à l'adresse suivante :</p>
          <p>Email: <a href="mailto:unbored_2025@labeip.epitech.eu">unbored_2025@labeip.epitech.eu</a></p>
          <p>Instagram: <a href="https://www.instagram.com/unbored_paris/">unbored_paris</a></p>
        </div>
      </section>
    </div>
  );
}

export default SiteVitrine;
