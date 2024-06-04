import React, { useState, useEffect } from 'react';
import '../styles/pages/manageAvatar.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import avatar from "../assets/avatars/body.svg"
import { ReactSVG } from 'react-svg';
import { useToast } from "@chakra-ui/react";
import { secureHeapUsed } from 'crypto';

const AvisActivityPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Vêtement");

  const [selectedPrincipColorSkin, setSelectedPrincipColorSkin] = useState("Beige");
  const [selectedSecColorSkin, setSelectedSecColorSkin] = useState("Black");

  const [selectedPrincipColorBeard, setSelectedPrincipColorBeard] = useState("Black");
  const [selectedSecColorBeard, setSelectedSecColorBeard] = useState("Black");

  const [selectedPrincipColorBody, setSelectedPrincipColorBody] = useState("Black");
  const [selectedSecColorBody, setSelectedSecColorBody] = useState("Black");

  const [selectedPrincipColorEyebrows, setSelectedPrincipColorEyebrows] = useState("Black");
  const [selectedSecColorEyebrows, setSelectedSecColoreyebrows] = useState("Black");

  const [selectedPrincipColorEyes, setSelectedPrincipColorEyes] = useState("Black");
  const [selectedSecColorEyes, setSelectedSecColorEyes] = useState("Black");

  const [selectedPrincipColorHair, setSelectedPrincipColorHair] = useState("Black");
  const [selectedSecColorHair, setSelectedSecColorHair] = useState("Black");

  const [selectedPrincipColorHat, setSelectedPrincipColorHat] = useState("Black");
  const [selectedSecColorHat, setSelectedSecColorHat] = useState("Black");

  const [selectedPrincipColorMouth, setSelectedPrincipColorMouth] = useState("Black");
  const [selectedSecColorMouth, setSelectedSecColorMouth] = useState("Black");

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
          id: indexSelectedBeard,
          color: selectedPrincipColorBeard
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
          id: indexSelectedHat,
          color: selectedPrincipColorHat
        },
        clothes: {
          id: indexSelectedBody,
          color: selectedPrincipColorBody
        }
      };

      const response = await axios.post(url,
        dataToSend, config);
      console.log(response.data);
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
    setIndexSelectedBeard(index.toString())
    const merged = mergeSVGs();
    setMergedSVG(merged);
  };

  const handleBodyClick = (str: string, index: number) => {
    setSelectedBody(str);
    setIndexSelectedBody(index.toString())
    const merged = mergeSVGs();
    setMergedSVG(merged);
  };

  const handleEyebrowsClick = (str: string, index: number) => {
    setSelectedEyebrows(str);
    setIndexSelectedEyebrows(index.toString())
    const merged = mergeSVGs();
    setMergedSVG(merged);
  };

  const handleEyesClick = (str: string, index: number) => {
    setSelectedEyes(str);
    setIndexSelectedEyes(index.toString())
    console.log(index)
    const merged = mergeSVGs();
    setMergedSVG(merged);
  };

  const handleHairClick = (str: string, index: number) => {
    setSelectedHair(str);
    setIndexSelectedHair(index.toString())
    const merged = mergeSVGs();
    setMergedSVG(merged);
  };

  const handleHatClick = (str: string, index: number) => {
    setSelectedHat(str);
    setIndexSelectedHat(index.toString())
    const merged = mergeSVGs();
    setMergedSVG(merged);
  };

  const handleMouthClick = (str: string, index: number) => {
    setSelectedMouth(str);
    setIndexSelectedMouth(index.toString())
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
  const skinColors = ["#ffdbac", "#f1c27d", "#e0ac69", "#c68642", "#8d5524"]

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

  const beardImages = ["light", "majestic", "medium", "mustache", "mustachemagnum"];
  const bodyImages = ["blazer", "crewneck", "hoodie", "overall", "polo", "scoopneck", "shirt", "vneck"];
  const eyebrowsImages = ["angry", "exited", "flat", "natural", "sad", "sad2", "unibrow", "updown"];
  const eyesImages = ["closed", "cry", "default", "dizzy", "eyeroll", "happy", "heart", "side", "squint", "surprised", "wacky", "wink"];
  const hairImages = ["afro", "big", "bun", "buzzcut", "calvitie", "curly", "curlyshort", "curvy", "frizzy", "longdreads", "longstraight", "medium", "mediumdreads", "mediumlong", "minidreads", "shaggy", "shaggymulet", "shortflat", "shortwaved", "square"];
  const hatImages = ["fedora", "hijab", "turban", "winter", "winter2", "wintercat"];
  const mouthImages = ["default", "desbelief", "eating", "grimace", "open", "sad", "scream", "serious", "smile", "tongue", "twinkle", "vomit"];

  const tabImageSetMap: { [key: string]: string[] } = {
    "Barbe": beardImages,
    "Vêtement": bodyImages,
    "Sourcils": eyebrowsImages,
    "Yeux": eyesImages,
    "Cheveux": hairImages,
    "Chapeau": hatImages,
    "Bouche": mouthImages
  };

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
    const merged = mergeSVGs();
    setMergedSVG(merged);
  }, [selectedBody, selectedHair, selectedBeard, selectedEyebrows, selectedEyes, selectedHat, selectedMouth, selectedPrincipColorSkin]);

  let rows: string[][] = [];

  return (
    <div className="manageAvatar-form-container">
      <div className="manageAvatar-back-button">
        <button onClick={() => navigate(-1)}>Retour</button>
      </div>
      <div className="manageAvatar-row" style={{ position: "relative" }}>
        {/* GAUCHE*/}
        <div className="manageAvatar-boxshadow-left-side" style={{ height: 765 }}>
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
                className={activeTab === tab ? "active" : "tab"}
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
            <div className="manageAvatar-back-button">
              <button onClick={clearSelection} style={{ margin: 0 }}>Retirer</button>

            </div>
          </div>
          <div className="manageAvatar-row">
            <div className="manageAvatar-boxshadow-left-side">
              <div className="color-cases">
                <span style={{ color: 'red', textDecoration: 'underline', fontWeight: 'bold' }}>Couleur Principale</span>
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
            </div>
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



          <div>
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
                  <div key={imageIndex} className="manageAvatar-boxshadow-svg" >
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
