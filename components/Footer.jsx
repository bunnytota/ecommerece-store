import React from 'react'
import Image from 'next/image'
import logo from '../src/assets/Logo.png'
import { BsTwitter, BsInstagram ,BsWhatsapp } from 'react-icons/bs';
import {GrFacebookOption, GrTwitter, GrLinkedinOption, GrInstagram} from 'react-icons/gr'

const Footer = () => {
  return (
    <footer>
      <div className='footer'>
       
         
          
          <div className='icon-container'>
            <a href='https://www.instagram.com/ha_store_77'><BsInstagram  size={20} /></a>
            <a href='https://www.facebook.com/profile.php?id=61557704611843&mibextid=ZbWKwL'><GrFacebookOption size={20} /></a>
            <a href='https://wa.me/923340596908'><BsWhatsapp size={20} /></a>
          
        </div>

        <div className='footer-links'>
          <h3>Company</h3>
          <ul>
            <li>About</li>
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
            <li>How it Works</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className='footer-links'>
          <h3>Support</h3>
          <ul>
            <li>Support Carrer</li>
            <li>24h Service</li>
            <li>Quick Chat</li>
          </ul>
        </div>

        <div className='footer-links'>
          <h3>Contact</h3>
          <ul>
            <li>Whatsapp</li>
            <li>Support 24h</li>
          </ul>
        </div>
      </div>

      <div className='copyright'>
        <p>Copyright © 2024 Cloth Market</p>
        <p>Design by. <span>HA-developers</span></p>
        <p>Code by. <span>Hafiz Abdullah</span></p>
      </div>
    </footer>
  )
}

export default Footer