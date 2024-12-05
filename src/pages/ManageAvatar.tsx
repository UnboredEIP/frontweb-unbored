import React, { useState, useEffect } from 'react';
import '../styles/pages/manageAvatar.css';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import avatar from "../assets/avatars/body.svg";
import { ReactSVG } from 'react-svg';
import { useToast } from "@chakra-ui/react";

const AvisActivityPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Vêtement");

  const [selectedPrincipColorSkin, setSelectedPrincipColorSkin] = useState("beige");
  const [selectedSecColorSkin, setSelectedSecColorSkin] = useState("black");

  const [selectedPrincipColorBeard, setSelectedPrincipColorBeard] = useState("black");
  const [selectedSecColorBeard, setSelectedSecColorBeard] = useState("black");

  const [selectedPrincipColorBody, setSelectedPrincipColorBody] = useState("black");
  const [selectedSecColorBody, setSelectedSecColorBody] = useState("black");

  const [selectedPrincipColorEyebrows, setSelectedPrincipColorEyebrows] = useState("black");
  const [selectedSecColorEyebrows, setSelectedSecColoreyebrows] = useState("black");

  const [selectedPrincipColorEyes, setSelectedPrincipColorEyes] = useState("black");
  const [selectedSecColorEyes, setSelectedSecColorEyes] = useState("black");

  const [selectedPrincipColorHair, setSelectedPrincipColorHair] = useState("black");
  const [selectedSecColorHair, setSelectedSecColorHair] = useState("black");

  const [selectedPrincipColorHat, setSelectedPrincipColorHat] = useState("black");
  const [selectedSecColorHat, setSelectedSecColorHat] = useState("black");

  const [selectedPrincipColorMouth, setSelectedPrincipColorMouth] = useState("black");
  const [selectedSecColorMouth, setSelectedSecColorMouth] = useState("black");

  const [mergedSVG, setMergedSVG] = useState<JSX.Element | null>(null);

  const [selectedBeard, setSelectedBeard] = useState<string | null>(null);
  const [selectedBody, setSelectedBody] = useState<string | null>(null);
  const [selectedEyebrows, setSelectedEyebrows] = useState<string | null>(null);
  const [selectedEyes, setSelectedEyes] = useState<string | null>(null);
  const [selectedHair, setSelectedHair] = useState<string | null>(null);
  const [selectedHat, setSelectedHat] = useState<string | null>(null);
  const [selectedMouth, setSelectedMouth] = useState<string | null>(null);

  const [indexSelectedBeard, setIndexSelectedBeard] = useState<string | null>(null);
  const [indexSelectedBody, setIndexSelectedBody] = useState<string | null>(null);
  const [indexSelectedEyebrows, setIndexSelectedEyebrows] = useState<string | null>(null);
  const [indexSelectedEyes, setIndexSelectedEyes] = useState<string | null>(null);
  const [indexSelectedHair, setIndexSelectedHair] = useState<string | null>(null);
  const [indexSelectedHat, setIndexSelectedHat] = useState<string | null>(null);
  const [indexSelectedMouth, setIndexSelectedMouth] = useState<string | null>(null);

  const toast = useToast();

  const postAvatar = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const url = `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile/avatar`;

      const dataToSend = {
        head: {
          id: "null",
          color: selectedPrincipColorSkin
        },
        eyebrows: {
          id: indexSelectedEyebrows,
          color: selectedPrincipColorEyebrows
        },
        hair: {
          id: indexSelectedHair,
          color: selectedPrincipColorHair
        },
        eyes: {
          id: indexSelectedEyes,
          color: selectedPrincipColorEyes
        },
        mouth: {
          id: indexSelectedMouth,
          color: selectedPrincipColorMouth
        },
        beard: {
          id: indexSelectedBeard,
          color: selectedPrincipColorBeard
        },
        accessory: {
          id: indexSelectedBody,
          color: selectedPrincipColorBody
        },
        clothes: {
          id: indexSelectedBody,
          color: selectedPrincipColorBody
        }
      };

      const response = await axios.post(url,
        dataToSend, config);
      //console.log(response.data);
      toast({
        title: "Succès !",
        description: "Votre avatar à correctement été sauvegardé",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Un problème est survenu dans la sauvegarde de votre avatar",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const clearSelection = () => {
    switch (activeTab) {
      case "Barbe":
        setSelectedBeard(null);
        setIndexSelectedBeard(null);
        break;
      case "Vêtement":
        setSelectedBody(null);
        setIndexSelectedBody(null);
        break;
      case "Sourcils":
        setSelectedEyebrows(null);
        setIndexSelectedEyebrows(null);
        break;
      case "Yeux":
        setSelectedEyes(null);
        setIndexSelectedEyes(null);
        break;
      case "Cheveux":
        setSelectedHair(null);
        setIndexSelectedHair(null);
        break;
      case "Chapeau":
        setSelectedHat(null);
        setIndexSelectedHat(null);
        break;
      case "Bouche":
        setSelectedMouth(null);
        setIndexSelectedMouth(null);
        break;
      default:
        break;
    }
  };

  const getProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const url = `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile`;
      const response = await axios.get(url, config);
      const profileDetails = response.data.user;

      const eyeImage = eyesImages[profileDetails.style.eyes.id - 1];
      const bodyImage = bodyImages[profileDetails.style.clothes.id - 1];
      const hairImage = hairImages[profileDetails.style.hair.id - 1];
      const beardImage = beardImages[profileDetails.style.beard.id - 1];
      const eyebrowsImage = eyebrowsImages[profileDetails.style.eyebrows.id - 1];
      const mouthImage = mouthImages[profileDetails.style.mouth.id - 1];

      setSelectedPrincipColorSkin(profileDetails.style.head.color)

      setSelectedEyes(eyeImage)
      setSelectedPrincipColorEyes(profileDetails.style.eyes.color)
      setIndexSelectedEyes(profileDetails.style.eyes.id)

      setSelectedBody(bodyImage)
      setSelectedPrincipColorBody(profileDetails.style.clothes.color)
      setIndexSelectedBody(profileDetails.style.clothes.id)

      setSelectedHair(hairImage)
      setSelectedPrincipColorHair(profileDetails.style.hair.color)
      setIndexSelectedHair(profileDetails.style.hair.id)

      setSelectedBeard(beardImage)
      setSelectedPrincipColorBeard(profileDetails.style.beard.color)
      setIndexSelectedBeard(profileDetails.style.beard.id)

      setSelectedEyebrows(eyebrowsImage)
      setSelectedPrincipColorEyebrows(profileDetails.style.eyebrows.color)
      setIndexSelectedEyebrows(profileDetails.style.eyebrows.id)

      setSelectedMouth(mouthImage)
      setSelectedPrincipColorMouth(profileDetails.style.mouth.color)
      setIndexSelectedMouth(profileDetails.style.mouth.id)

    } catch (error) {
      console.error(error);
    }
  };

  const handleColorClick = (color: string, type: string) => {
    switch (activeTab) {
      case "Peau":
        const merged = mergeSVGs();
        setMergedSVG(merged);
        if (type === "princip") setSelectedPrincipColorSkin(color);
        else setSelectedSecColorSkin(color);
        break;
      case "Vêtement":
        if (type === "princip") setSelectedPrincipColorBody(color);
        else setSelectedSecColorBody(color);
        break;
      case "Cheveux":
        if (type === "princip") setSelectedPrincipColorHair(color);
        else setSelectedSecColorHair(color);
        break;
      case "Barbe":
        if (type === "princip") setSelectedPrincipColorBeard(color);
        else setSelectedSecColorBeard(color);
        break;
      case "Sourcils":
        if (type === "princip") setSelectedPrincipColorEyebrows(color);
        else setSelectedSecColoreyebrows(color);
        break;
      case "Yeux":
        if (type === "princip") setSelectedPrincipColorEyes(color);
        else setSelectedSecColorEyes(color);
        break;
      case "Chapeau":
        if (type === "princip") setSelectedPrincipColorHat(color);
        else setSelectedSecColorHat(color);
        break;
      case "Bouche":
        if (type === "princip") setSelectedPrincipColorMouth(color);
        else setSelectedSecColorMouth(color);
        break;
      default:
        break;
    }
  };

  const handleBeardClick = (str: string, index: number) => {
    setSelectedBeard(str);
    let newIndex = index + 1;
    setIndexSelectedBeard(newIndex.toString())
    const merged = mergeSVGs();
    setMergedSVG(merged);
  };

  const handleBodyClick = (str: string, index: number) => {
    setSelectedBody(str);
    let newIndex = index + 1;
    setIndexSelectedBody(newIndex.toString())
    const merged = mergeSVGs();
    setMergedSVG(merged);
  };

  const handleEyebrowsClick = (str: string, index: number) => {
    setSelectedEyebrows(str);
    let newIndex = index + 1;
    setIndexSelectedEyebrows(newIndex.toString())
    const merged = mergeSVGs();
    setMergedSVG(merged);
  };

  const handleEyesClick = (str: string, index: number) => {
    setSelectedEyes(str);
    let newIndex = index + 1;
    setIndexSelectedEyes(newIndex.toString())
    //console.log(index)
    const merged = mergeSVGs();
    setMergedSVG(merged);
  };

  const handleHairClick = (str: string, index: number) => {
    setSelectedHair(str);
    let newIndex = index + 1;
    setIndexSelectedHair(newIndex.toString())
    const merged = mergeSVGs();
    setMergedSVG(merged);
  };

  const handleHatClick = (str: string, index: number) => {
    setSelectedHat(str);
    let newIndex = index + 1;
    setIndexSelectedHat(newIndex.toString())
    const merged = mergeSVGs();
    setMergedSVG(merged);
  };

  const handleMouthClick = (str: string, index: number) => {
    setSelectedMouth(str);
    let newIndex = index + 1;
    setIndexSelectedMouth(newIndex.toString())
    const merged = mergeSVGs();
    setMergedSVG(merged);
  };

  const tabConfigMap: { [key: string]: { handleClick: (str: string, index: number) => void; primaryColor: string; secondaryColor: string; } } = {
    "Barbe": {
      handleClick: handleBeardClick,
      primaryColor: selectedPrincipColorBeard,
      secondaryColor: selectedSecColorBeard
    },
    "Vêtement": {
      handleClick: handleBodyClick,
      primaryColor: selectedPrincipColorBody,
      secondaryColor: selectedSecColorBody
    },
    "Sourcils": {
      handleClick: handleEyebrowsClick,
      primaryColor: selectedPrincipColorEyebrows,
      secondaryColor: selectedSecColorEyebrows
    },
    "Yeux": {
      handleClick: handleEyesClick,
      primaryColor: selectedPrincipColorEyes,
      secondaryColor: selectedSecColorEyes
    },
    "Cheveux": {
      handleClick: handleHairClick,
      primaryColor: selectedPrincipColorHair,
      secondaryColor: selectedSecColorHair
    },
    "Chapeau": {
      handleClick: handleHatClick,
      primaryColor: selectedPrincipColorHat,
      secondaryColor: selectedSecColorHat
    },
    "Bouche": {
      handleClick: handleMouthClick,
      primaryColor: selectedPrincipColorMouth,
      secondaryColor: selectedSecColorMouth
    }
  };

  const tabConfig = tabConfigMap[activeTab] || {};

  const colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "beige", "wheat", "brown", "white", "black"];
  const skinColors = ["#ffdbac", "#f1c27d", "#e0ac69", "#c68642", "#8d5524", "#ffcc99", "#ffbb88", "#ffaa77", "#ff9966", "#ff8844", "#ff7733", "#ff6622"];

  const tabs = ["Barbe", "Vêtement", "Sourcils", "Yeux", "Cheveux", "Chapeau", "Bouche", "Peau"];
  const tabImageMap: { [key: string]: string } = {
    "Barbe": "beard",
    "Vêtement": "body",
    "Sourcils": "eyebrows",
    "Yeux": "eyes",
    "Cheveux": "hair",
    "Chapeau": "hat",
    "Bouche": "mouth"
  };
  const imageName = tabImageMap[activeTab];

  const beardImages = ["medium",
    "majestic",
    "light",
    "mustachemagnum",
    "mustache",];
  const bodyImages = ["hoodie",
    "crewneck",
    "blazer",
    "shirt",
    "scoopneck",
    "polo",
    "vneck",
    "overall",];
  const eyebrowsImages = ["natural",
    "flat",
    "exited",
    "angry",
    "updown",
    "unibrow",
    "sad2",
    "sad",];
  const eyesImages = ["dizzy",
    "default",
    "cry",
    "closed",
    "side",
    "heart",
    "happy",
    "eyeroll",
    "wink",
    "wacky",
    "surprised",
    "squint",];
  const hairImages = [
    "calvitie",
    "buzzcut",
    "big",
    "afro",
    "frizzy",
    "curvy",
    "curlyshort",
    "curly",
    "mediumdreads",
    "medium",
    "longstraight",
    "longdreads",
    "shaggymullet",
    "shaggy",
    "minidreads",
    "mediumlong",
    "square",
    "shortwaved",
    "shortflat",];
  const hatImages = ["fedora", "hijab", "turban", "winter", "winter2", "wintercat"];
  const mouthImages = ["grimace",
    "eating",
    "desbelief",
    "default",
    "serious",
    "scream",
    "sad",
    "open",
    "vomit",
    "twinkle",
    "tongue",
    "smile",];

  const tabImageSetMap: { [key: string]: string[] } = {
    "Barbe": beardImages,
    "Vêtement": bodyImages,
    "Sourcils": eyebrowsImages,
    "Yeux": eyesImages,
    "Cheveux": hairImages,
    "Chapeau": hatImages,
    "Bouche": mouthImages
  };

  // const beardImages = ["light", "majestic", "medium", "mustache", "mustachemagnum"];
  // const bodyImages = ["blazer", "crewneck", "hoodie", "overall", "polo", "scoopneck", "shirt", "vneck"];
  // const eyebrowsImages = ["angry", "exited", "flat", "natural", "sad", "sad2", "unibrow", "updown"];
  // const eyesImages = ["closed", "cry", "default", "dizzy", "eyeroll", "happy", "heart", "side", "squint", "surprised", "wacky", "wink"];
  // const hairImages = ["afro", "big", "bun", "buzzcut", "calvitie", "curly", "curlyshort", "curvy", "frizzy", "longdreads", "longstraight", "medium", "mediumdreads", "mediumlong", "minidreads", "shaggy", "shaggymulet", "shortflat", "shortwaved", "square"];
  // const hatImages = ["fedora", "hijab", "turban", "winter", "winter2", "wintercat"];
  // const mouthImages = ["default", "desbelief", "eating", "grimace", "open", "sad", "scream", "serious", "smile", "tongue", "twinkle", "vomit"];

  const imageSet = tabImageSetMap[activeTab] || [];

  const applyColorToSVG = (svg: SVGSVGElement, principColor: string, secColor: string) => {
    const Eyes = svg.querySelectorAll('.Eye');
    Eyes.forEach(eye => {
      eye.setAttribute('fill', principColor);
    });

    const Bears = svg.querySelectorAll('.Beard');
    Bears.forEach(beard => {
      beard.setAttribute('fill', principColor);
    });

    const Clothes = svg.querySelectorAll('.Clothes');
    Clothes.forEach(cloth => {
      cloth.setAttribute('fill', principColor);
    });
    const SecClothes = svg.querySelectorAll('.SecClothes');
    SecClothes.forEach(secClothes => {
      secClothes.setAttribute('fill', secColor);
    });

    const Eyebrows = svg.querySelectorAll('.Eyebrows');
    Eyebrows.forEach(eyebrow => {
      eyebrow.setAttribute('fill', principColor);
    });

    const Hairs = svg.querySelectorAll('.Hairs');
    Hairs.forEach(Hair => {
      Hair.setAttribute('fill', principColor);
    });

    const Skins = svg.querySelectorAll('.Skins');
    Skins.forEach(Skin => {
      Skin.setAttribute('fill', principColor);
    });
  };

  const mergeSVGs = () => {
    try {
      return (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {/* Avatar de base */}
          <ReactSVG
            src={avatar}
            beforeInjection={(svg) => applyColorToSVG(svg, selectedPrincipColorSkin, selectedSecColorSkin)}
            style={{ position: "absolute", top: 90, left: 50 }}
          />
          {/* Vêtements sélectionnés */}
          {selectedBody && (
            <ReactSVG
              src={require(`../assets/avatars/body/${selectedBody}.svg`)}
              className="selected-clothing"
              beforeInjection={(svg) => applyColorToSVG(svg, selectedPrincipColorBody, selectedSecColorBody)}
              style={{ position: "absolute", top: 224, left: 18 }}
            />
          )}
          {/* Cheveux sélectionnés */}
          {selectedHair && (
            <ReactSVG
              src={require(`../assets/avatars/hair/${selectedHair}.svg`)}
              className="selected-hair"
              beforeInjection={(svg) => {
                applyColorToSVG(svg, selectedPrincipColorHair, selectedSecColorHair);
                // svg.setAttribute("width", "100%"); // Définir la largeur à 80%
                // svg.setAttribute("height", "100%"); // Définir la hauteur à 80%
              }}
              style={{ position: "absolute", top: 55, left: 18 }}
            />
          )}
          {/* Barbe sélectionnée */}
          {selectedBeard && (
            <ReactSVG
              src={require(`../assets/avatars/beard/${selectedBeard}.svg`)}
              className="selected-beard"
              beforeInjection={(svg) => applyColorToSVG(svg, selectedPrincipColorBeard, selectedSecColorBeard)}
              style={{ position: "absolute", top: 151, left: 93 }}
            />
          )}
          {/* Sourcils sélectionnés */}
          {selectedEyebrows && (
            <ReactSVG
              src={require(`../assets/avatars/eyebrows/${selectedEyebrows}.svg`)}
              className="selected-eyebrows"
              beforeInjection={(svg) => applyColorToSVG(svg, selectedPrincipColorEyebrows, selectedSecColorEyebrows)}
              style={{ position: "absolute", top: 135, left: 107 }}
            />
          )}
          {/* Yeux sélectionnés */}
          {selectedEyes && (
            <ReactSVG
              src={require(`../assets/avatars/eyes/${selectedEyes}.svg`)}
              className="selected-eyes"
              beforeInjection={(svg) => applyColorToSVG(svg, selectedPrincipColorEyes, selectedSecColorEyes)}
              style={{ position: "absolute", top: 155, left: 110 }}
            />
          )}
          {/* Chapeau sélectionné */}
          {selectedHat && (
            <ReactSVG
              src={require(`../assets/avatars/hat/${selectedHat}.svg`)}
              className="selected-hat"
              beforeInjection={(svg) => applyColorToSVG(svg, selectedPrincipColorHat, selectedSecColorHat)}
              style={{ position: "absolute", top: 60, left: 68 }}
            />
          )}
          {/* Bouche sélectionnée */}
          {selectedMouth && (
            <ReactSVG
              src={require(`../assets/avatars/mouth/${selectedMouth}.svg`)}
              className="selected-mouth"
              beforeInjection={(svg) => applyColorToSVG(svg, selectedPrincipColorMouth, selectedSecColorMouth)}
              style={{ position: "absolute", top: 205, left: 136 }}
            />
          )}
        </div>
      );
    } catch (error) {
      console.error('Erreur lors du rendu du SVG:', error);
      return null;
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    const merged = mergeSVGs();
    setMergedSVG(merged);
  }, [selectedBody, selectedHair, selectedBeard, selectedEyebrows, selectedEyes, selectedHat, selectedMouth, selectedPrincipColorSkin]);

  let rows: string[][] = [];

  return (
    <div className="manageAvatar-form-container">
      <div className="manageAvatar-back-button">
        <nav className="manageAvatar-breadcrumb">
          <Link to="/">Home</Link>/
          <Link to="/Pro-menu">Pro</Link>/
          <Link to="" className="active">Avatar</Link>
        </nav>
      </div>
      <div className="manageAvatar-row" style={{ position: "relative" }}>
        {/* GAUCHE*/}
        <div className="manageAvatar-boxshadow-left-side">
          <div className="manageAvatar-container">
            <h2 className="manageAvatar-form-title">Prévisualisation</h2>
          </div>
          <div className="manageAvatar-container">
            {mergedSVG}
          </div>
          <div className="manageAvatar-container">
            <button className="manageAvatar-button" onClick={postAvatar}>Sauvegarder</button>
          </div>
        </div>
        {/* DROITE */}
        <div className="manageAvatar-boxshadow-right-side">
          <div className="tabs">
            {tabs.map(tab => (
              <button
                key={tab}
                className={activeTab === tab ? "manageAvatar-active" : "manageAvatar-tab"}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="manageAvatar-container">
            <h2 className="manageAvatar-form-title">{activeTab}</h2>
          </div>
          <div className="manageAvatar-container">
            <div className="manageAvatar-rm-button">
              <button onClick={clearSelection} style={{ margin: 0 }}>Retirer</button>
            </div>
          </div>
          <div className="manageAvatar-row">
            {/* <div className="manageAvatar-colorbox"> */}
            <div className="color-cases">
              <span style={{ color: 'red', textDecoration: 'underline', fontWeight: 'bold' }}></span>
              {/* Utilisez activeTab pour décider entre colors et skinColors */}
              {activeTab === "Peau" ?
                skinColors.map(color => (
                  <button
                    key={color}
                    className="color-case"
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorClick(color, "princip")}
                  />
                ))
                :
                colors.map(color => (
                  <button
                    key={color}
                    className="color-case"
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorClick(color, "princip")}
                  />
                ))
              }
            </div>
            {/* </div> */}
          </div>

          {/* <div className="manageAvatar-row">
            <div className="manageAvatar-boxshadow-left-side">
              <div className="color-cases">
                <span style={{ color: 'red', textDecoration: 'underline', fontWeight: 'bold' }}>Couleur Secondaire</span>
                {colors.map(color => (
                  <button
                    key={color}
                    className="color-case"
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorClick(color, "sec")}
                  />
                ))}
              </div>
            </div>
          </div> */}



          <div className="manageAvatar-svgbox">
            {imageSet.reduce((rows, key, index) => {
              const rowIndex = Math.floor(index / 3);
              if (!rows[rowIndex]) {
                rows[rowIndex] = [];
              }
              rows[rowIndex].push(key);
              return rows;
            }, []).map((row, rowIndex) => (
              <div key={rowIndex} className="manageAvatar-row">
                {row.map((image: string, imageIndex: number) => (
                  <div key={imageIndex} className="manageAvatar-casesSvg" >
                    <ReactSVG
                      src={require(`../assets/avatars/${imageName}/${image}.svg`)}
                      onClick={() => tabConfig.handleClick && tabConfig.handleClick(image, rowIndex * 3 + imageIndex)}
                      beforeInjection={(svg) => {
                        if (tabConfig.primaryColor && tabConfig.secondaryColor) {
                          applyColorToSVG(svg, tabConfig.primaryColor, tabConfig.secondaryColor);

                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default AvisActivityPage;
