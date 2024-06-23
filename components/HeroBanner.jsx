import React from 'react'
import Image from 'next/image'
import {CgShoppingCart} from 'react-icons/cg'

import Link from 'next/link';
import { urlFor } from '../lib/client';

const HeroBanner = ({ heroBanner }) => {
  return (
    <header className='header'>
        <div className='header-left-side'>
            <div className='header-content'>
            <Link href='/products'>
                     <button className='btn' type='button'><CgShoppingCart size={26} />  Start Shopping</button>
                </Link>
                
                
                <p>Get garments of every kind such as for mens and Women we have suit and kurtas of different brands.This is the quality of our store to provide you high quality products on lowest rate as much as possible .</p>
                <span>Sale 70%</span>
            </div>

           {/*<div className='header-featured'>
                <Image src={featured1} width={100} height={35} alt='img' />
                <Image src={featured2} width={100} height={35} alt='img' />
                <Image src={featured3} width={100} height={35} alt='img' />
                <Image src={featured4} width={100} height={35} alt='img' />
  </div>*/}
        </div>

        <div className='header-right-side'>
            <div className='header-circle'>
                <img  src={urlFor(heroBanner.image)} width={650} height={650} alt='header image' className='header-img'/>
            </div>
        </div>
    </header>
  )
}

export default HeroBanner