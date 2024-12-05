import { ReactSVG } from 'react-svg';
import baseAvatar from "../../assets/avatars/body.svg"; // Placeholder base avatar
import '../styles/displayAvatar.css';

// Define the arrays for each avatar part
const beardImages = ["medium", "majestic", "light", "mustachemagnum", "mustache"];
const bodyImages = ["hoodie", "crewneck", "blazer", "shirt", "scoopneck", "polo", "vneck", "overall"];
const eyebrowsImages = ["natural", "flat", "exited", "angry", "updown", "unibrow", "sad2", "sad"];
const eyesImages = ["dizzy", "default", "cry", "closed", "side", "heart", "happy", "eyeroll", "wink", "wacky", "surprised", "squint"];
const hairImages = ["calvitie", "buzzcut", "big", "afro", "frizzy", "curvy", "curlyshort", "curly", "mediumdreads", "medium", "longstraight", "longdreads", "shaggymullet", "shaggy", "minidreads", "mediumlong", "square", "shortwaved", "shortflat"];
const mouthImages = ["grimace", "eating", "desbelief", "default", "serious", "scream", "sad", "open", "vomit", "twinkle", "tongue", "smile"];

const applyColorToSVG = (svg: SVGSVGElement, principColor: string) => {
    const parts = ['Eye', 'Beard', 'Clothes', 'SecClothes', 'Eyebrows', 'Hairs', 'Skins'];
    parts.forEach(part => {
        const elements = svg.querySelectorAll(`.${part}`);
        elements.forEach(element => {
            element.setAttribute('fill', principColor);
        });
    });
};

const Avatar = ({ avatarData, size }) => {
    try {
        const eyeImage = eyesImages[avatarData.eyes?.id - 1];
        const bodyImage = bodyImages[avatarData.clothes?.id - 1]
        const hairImage = hairImages[avatarData.hair?.id - 1];
        const beardImage = beardImages[avatarData.beard?.id - 1];
        const eyebrowsImage = eyebrowsImages[avatarData.eyebrows?.id - 1];
        const mouthImage = mouthImages[avatarData.mouth?.id - 1];

        const scaling = size;
        const widthValue = size * 300;
        const heightValue = size * 300;

        return (
            <div
                className="displayAvatar-box"
                style={{
                    width: `${widthValue}px`,
                    height: `${heightValue}px`,
                    transform: `scale(${scaling})`,
                }}
            >
                {/* Base Avatar */}
                <ReactSVG
                    className="displayAvatar-body"
                    src={baseAvatar}
                    beforeInjection={(svg) => applyColorToSVG(svg, avatarData.head.color)}
                />

                {/* Dynamically load body */}
                {bodyImage && avatarData.clothes?.color && (
                    <ReactSVG
                        className="displayAvatar-clothes"
                        src={require(`../../assets/avatars/body/${bodyImage}.svg`)}
                        beforeInjection={(svg) =>
                            applyColorToSVG(svg, avatarData.clothes.color)
                        }
                    />
                )}

                {/* Dynamically load hair */}
                {hairImage && avatarData.hair?.color && (
                    <ReactSVG
                        className="displayAvatar-hair"
                        src={require(`../../assets/avatars/hair/${hairImage}.svg`)}
                        beforeInjection={(svg) =>
                            applyColorToSVG(svg, avatarData.hair.color)
                        }
                    />
                )}

                {/* Dynamically load beard */}
                {beardImage && avatarData.beard?.color && (
                    <ReactSVG
                        className="displayAvatar-beard"
                        src={require(`../../assets/avatars/beard/${beardImage}.svg`)}
                        beforeInjection={(svg) =>
                            applyColorToSVG(svg, avatarData.beard.color)
                        }
                    />
                )}

                {/* Dynamically load eyebrows */}
                {eyebrowsImage && avatarData.eyebrows?.color && (
                    <ReactSVG
                        className="displayAvatar-eyebrows"
                        src={require(`../../assets/avatars/eyebrows/${eyebrowsImage}.svg`)}
                        beforeInjection={(svg) =>
                            applyColorToSVG(svg, avatarData.eyebrows.color)
                        }
                    />
                )}

                {/* Dynamically load eyes */}
                {eyeImage && avatarData.eyes?.color && (
                    <ReactSVG
                        className="displayAvatar-eyes"
                        src={require(`../../assets/avatars/eyes/${eyeImage}.svg`)}
                        beforeInjection={(svg) =>
                            applyColorToSVG(svg, avatarData.eyes.color)
                        }
                    />
                )}

                {/* Dynamically load mouth */}
                {mouthImage && avatarData.mouth?.color && (
                    <ReactSVG
                        className="displayAvatar-mouth"
                        src={require(`../../assets/avatars/mouth/${mouthImage}.svg`)}
                        beforeInjection={(svg) =>
                            applyColorToSVG(svg, avatarData.mouth.color)
                        }
                    />
                )}
            </div>
        );
    } catch (error) {
        console.error("Erreur lors du rendu du SVG:", error);
        return null;
    }
};

export default Avatar;
