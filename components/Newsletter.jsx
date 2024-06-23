import React from 'react'
import { client } from '../lib/client';
import { useState } from 'react';
const Newsletter = () => {

  const [formData, setFormData] = useState({email: '' });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleChangeInput = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {

    
   
     // Validate email format
     
     if (!formData.email.includes('@')) {
   
      return;
    } else{
      event.preventDefault()
    }
  
    setLoading(true);
    const subscriber = {
        _type: 'subscriber',
      
        email: formData.email};
  

  client.create(subscriber)
            .then(() => {
                setLoading(false);
                setIsFormSubmitted(true);
            })
            .catch((err) => console.log(err));}

  return (
    <section className='newsletter'>
      <div className="newsletter-background">
        Newsletter
      </div>
      <h1>Subscribe To Get Latest Updates</h1>
      <p>Enter email to stay updated with us.</p>
      {!isFormSubmitted ? (
      <form>
        <input type='email' placeholder='Input email address' name="email" value={formData.email} onChange={handleChangeInput}/>
        <button type='submit' onClick={handleSubmit}>{!loading ? 'Get Updates' : 'Wait...'}</button>
        
       
      </form> ) : (
          <h2>Thank you for your order!</h2>
      )}
    </section>
 
  )
}

export default Newsletter