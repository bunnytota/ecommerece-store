import React, { useState } from 'react';
import { client } from '../../lib/client';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import { useStateContext } from '../../context/StateContext';

const cashon = () => {

   
    const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove, } = useStateContext();

    const [formData, setFormData] = useState({ username: '', email: '', address: '', phonenumber: '' });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        setLoading(true);

        const contact = {
            _type: 'contact',
            name: formData.username,
            email: formData.email,
            phonenumber: formData.phonenumber,
            whatsapp: formData.whatsapp,
            address: formData.address,
            city : formData.city,
            cartItems: cartItems.map(item => ({
               
                price: item.price,
                quantity: item.quantity,
                name: item.name,
                Size: item.size,
                Subtotal: totalPrice,
                
                // Add image details here as needed
                // For example, if your image is stored in item.image:
                
            }))
        };

        client.create(contact)
            .then(() => {
                setLoading(false);
                setIsFormSubmitted(true);
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
        

            <div className="app__footer-cards">

            </div>
            {!isFormSubmitted ? (
                <div className="app__footer-form ">
                    
                    <div className="app__flex p-text">
                    
                    <select name="Pakistan" id="Pakistan">
                    <option value="pak">Pakistan Only</option>
                    </select></div>


                    <div className="app__flex">

                    
                        <input className="p-text" type="text" placeholder="Your Name" name="username" value={formData.username} onChange={handleChangeInput} />
                    </div>
                    <div className="app__flex">
                        <input className="p-text" type="email" placeholder="Your Email" name="email" value={formData.email} onChange={handleChangeInput} />
                    </div>
                    

                    <div className="app__flex">
                        <input className="p-text" type="text" placeholder="Phone number" name="phonenumber" value={formData.phonenumber} onChange={handleChangeInput} />
                    </div>
                    <div className="app__flex">
                        <input className="p-text" type="text" placeholder="WhatsApp" name="whatsapp" value={formData.whatsapp} onChange={handleChangeInput} />
                    </div>
                    <div className="app__flex">
                        <input className="p-text" type="text" placeholder="Your Address" name="address" value={formData.address} onChange={handleChangeInput} />
                    </div>
                    <div className="app__flex">
                        <input className="p-text" type="text" placeholder="City" name="city" value={formData.city} onChange={handleChangeInput} />
                    </div>


                    <button type="button" className="p-text" onClick={handleSubmit}>{!loading ? 'Place Order' : 'Wait...'}</button>

                </div>
            ) : (
                    <div className="success-wrapper">
                        <div className="success">
                            <p className="icon">
                                <BsBagCheckFill />
                            </p>
                            <h2>Thank you for your order!</h2>
                            <p className="email-msg">Check your email inbox for the receipt.</p>
                            <p className="description">
                                If you have any questions, please email
                                <a className="email" href="mailto:bunnytota3@gmail.com">
                                    bunnytota3@gmail.com
                                </a>
                            </p>
                            <a href="/" >
                                <button type="button" width="300px" className="btn">
                                    Continue Shopping 
                                </button>
                            </a>
                        </div>
                    </div>
                )
            }
           
        </>

    )
}

export default cashon;
