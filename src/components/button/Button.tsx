import { useState } from 'react';
import './Button.css'

interface ButtonProps {
    name: string;
    backgroundColor?: string
    textColor?: string
    links?: string
    onClick?: any;
    hooverColor?: string;
    className?: string;
    shadowColor?: string;
    newPage?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ name, backgroundColor, textColor, onClick, links, className, hooverColor, shadowColor, newPage }) => {
    const [hover, setHover] = useState(false);

    const buttonStyle = {
        backgroundColor: hover ? (hooverColor ? hooverColor : 'lightgray') : backgroundColor,
        transition: 'background-color 0.3s, transform 0.3s',
        transform: hover ? 'scale(1.05)' : 'scale(1)',
        boxShadow: '0px 2px 2px' + (shadowColor ? shadowColor : ' lightgray')
    };

    return (
        <div style={buttonStyle} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className={`Button p-0 py-2 mx-1 ${className}`} onClick={onClick}>
            <a style={{color: textColor}} href={links}  target={newPage === true ? "_blank" : ''}  rel="noreferrer" className='my-0 p-3 BtnText h-100 w-100'>
                {name}
            </a>
        </div>
    )
}

export default Button;