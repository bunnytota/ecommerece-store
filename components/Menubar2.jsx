import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import GridViewIcon from '@mui/icons-material/GridView';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import Link from 'next/link';
import {RiMenu3Line,RiArrowLeftLine, RiCloseLine } from 'react-icons/ri';
import { useState } from 'react';
import { Updates } from './';
const Menubar2 = () => {

    const [selectedLink, setSelectedLink] = useState(null);
    const [toggleMenu, setToggleMenu] = useState(false);
    const handleClick = (link) => {
        if (selectedLink === link) {
            setSelectedLink(null); // Deselect if already selected
        } else {
            setSelectedLink(link); // Select the new link
        }
    };

    const handleCatClick = () => {
        handleClick('./cat'); // Call handleClick with the link
        // Your additional logic for ./cat link here
        setToggleMenu(true)
        ;
    };


    

 // Define a CSS class for selected link
 const selectedClass = 'selected';

  return (
    <div className='menu2'>
     <Link href='./' className={`${selectedLink === './' ? selectedClass : ''} muicons`} onClick={()=>handleClick('./')}><HomeIcon/></Link>
     <Link href='./' className={`${selectedLink === './cat' ? selectedClass : ''} muicons`} onClick={handleCatClick} ><GridViewIcon/></Link>
     {toggleMenu && (
          <div className='navbar-smallscreen_overlay'>
            {/*<Link href='/'>
              <Image className='logo-small' src={logo} width={140} height={25} alt='logo' />
            </Link>*/}
            <RiCloseLine  color='black' fontSize={27} className='close_icon' onClick={() => setToggleMenu(false)} />
            <ul className='navbar-smallscreen_links'>
              
              <Link href='/female' className='nav-li'><li>Female</li></Link>
              <Link href='/male' className='nav-li'><li>Male</li></Link>
              <Link href='/kids' className='nav-li'><li>Kids</li></Link>
              <Link href='/products' className='nav-li'><li>All Products</li></Link>
            </ul>
          </div>
        )}
     
     
     <Link href='./' id='' className={`${selectedLink === './Updates' ? selectedClass : ''} muicons`} onClick={()=>handleClick('./Updates')}> <Updates/></Link>
     <Link href='./female' className={`${selectedLink === './female' ? selectedClass : ''} muicons`} onClick={()=>handleClick('./female')}><CommentOutlinedIcon/></Link>
     
    </div>
    
  )
}

export default Menubar2