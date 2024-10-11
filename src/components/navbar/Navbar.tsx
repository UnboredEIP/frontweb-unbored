import './Navbar.css'
import Button from '../button/Button'
import { useContext } from 'react'

interface MenuItem {
    name: string;
    links?: string;
}
  
interface NavbarProps {
    items: MenuItem[];
}
  
export const Navbar: React.FC<NavbarProps> = ({items}) => {

    return (
        <div className='Navbar d-flex col-12'>
            {/* Logo au centre
            <div className='col-5'></div>
            <div className='NavTitle d-flex align-items-center justify-content-center col-2'>
                <a href="/" style={{textDecoration: "none", color: "whitesmoke"}}> Unbored </a>
            </div> */}
            
            
            {/* Logo au début */}
            <div className='NavTitle d-flex align-items-center justify-content-center col-2'>
                <a href="/" style={{textDecoration: "none", color: "whitesmoke"}}> Unbored </a>
            </div>
            <div className='col-5'></div>


            <div className='d-flex f-0 align-items-center justify-content-end h-100 col-5'>
                <>
                    {items.map((item, index) => {
                        if (typeof item?.name === 'string') {
                            return (
                                <Button key={index} name={item.name} links={item.links}></Button>
                            )
                        }
                        return null;
                    })}
                </>
            </div>
        </div>
    )
}

export default Navbar;
