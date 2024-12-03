import { useState } from 'react';
import './Navbar.css'



export function Navbar() {
    const [sideBar, setSideBar] = useState(false)
    window.addEventListener('scroll', function() {
        var navbbb = document.getElementById('navbbb');
        var logoImage = document.getElementById('logoImage');
    
        if (window.scrollY > 0) {
            navbbb?.classList.remove('navbarr');
            navbbb?.classList.add('sidebarr');
            logoImage?.classList.add('d-none');
            setSideBar(true)
        } else {
            navbbb?.classList.remove('sidebarr');
            navbbb?.classList.add('navbarr');
            logoImage?.classList.remove('d-none');
            setSideBar(false)
        }
    });

    return (
        <nav id="navbbb" className='navbarr'>
            {
                sideBar ?
                <a href="#description"className='navitem mx-1 my-0 py-0'>
                    description
                </a>
                :
                <a>
                </a>
            }
            <a href="#team"className='navitem mx-1 my-0 py-0'>
                équipe
            </a>
            <a href="#timeline"className='navitem mx-1 my-0 py-0'>
                timeline
            </a>
            <a href="#demo"className='navitem mx-1 my-0 py-0'>
                demo
            </a>
            
            <a href="#contact"className='navitem mx-1 my-0 py-0'>
                contact
            </a>

        </nav>
    )
}

export default Navbar;