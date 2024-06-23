import React from 'react';
import { client } from '../lib/client';
import { HeroBanner, EventsBanner, Newsletter, FeaturesBanner, Product,SwipeableTextMobileStepper } from '../components';
import Link from 'next/link'
const Home = ({ products, bannerData, event1Data, event2Data, event3Data }) => {
  return (
    <>
    <SwipeableTextMobileStepper/>
     
      <div className='products-outer-container'>
      <Link href='/products' style={{position:'absolute',right:'7%', background:'black' ,color:'white' ,padding:'10px',borderRadius:'20px'}}>show more</Link>
        <h2 style={{alignItems:'center',justifyContent:'center' }}>select cloths</h2>
       
        <div className='products-container'>
          {products?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <EventsBanner
        event1={event1Data.length && event1Data[0]}
        event2={event2Data.length && event2Data[0]}
        event3={event3Data.length && event3Data[0]}
      />
      
      <Newsletter  id='updates'/>
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  //events

  const event1Query = '*[_type == "event1"]';
  const event1Data = await client.fetch(event1Query);

  const event2Query = '*[_type == "event2"]';
  const event2Data = await client.fetch(event2Query);

  const event3Query = '*[_type == "event3"]';
  const event3Data = await client.fetch(event3Query);

  return {
    props: { products, bannerData, event1Data, event2Data, event3Data },
  };
};

export default Home;
