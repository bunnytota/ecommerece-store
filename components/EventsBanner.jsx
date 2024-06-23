import React from 'react'
import Image from 'next/image'
import event1 from '../src/assets/event1.png' 
import event2 from '../src/assets/event2.png' 
import event3 from '../src/assets/event3.png' 
import Link from 'next/link'
import { urlFor } from '../lib/client'

const EventsBanner = ({event1, event2, event3}) => {
  return (
    <section className='event-container'>
      <div className='subtitle'>
        <span>PROMOTIONS</span>
        
      </div>

      <div className='event-banner'>
        <div className='event-banner-left'>
          <div className='event-card'>
            <div className='content'>
              <h3>GET UP TO <span>60%</span></h3>
              <p>For the summer season</p>
            </div>

           <img src={urlFor(event1.image)} alt='event1' />
          
          </div>

          <div className='event-card'>
            <h3>GET Clothes For Everyone</h3>
            <p>Catagoury</p>
            <Link href={'/products'}><button>VISIT STORE</button>
            </Link>
          </div>
        </div>

        <div className='event-banner-right'>
          <div className='event-banner-right-1'>
            <div className='details'>
              <p>Flex Sweatshirt</p>
              <div className='price'>
                <span>Rs.{event2.cutprice}</span>
                <span>Rs.{event2.newprice}</span>
              </div>
            </div>
            <img src={urlFor(event2.image)} alt='event2' />
          </div>

          <div className='event-banner-right-2'>
            <div className='details'>
              <p>Flex Push Button Bomber</p>
              <div className='price'>
               <span>Rs.{event3.cutprice}</span>
                <span>Rs.{event3.newprice}</span>
              </div>
            </div>
            <img src={urlFor(event3.image)} alt='event3' />
          </div>
        </div>
      </div>
      
    </section>
  )
}

export default EventsBanner