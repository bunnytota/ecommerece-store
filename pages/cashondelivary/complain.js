import React, { useState } from 'react';
import { client } from '../../lib/client';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';



const complain = () => {
   

    const [formData, setFormData] = useState({ username: '', email: '',productname:'', address: '', phonenumber: '',issue:'' });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    
    
    const { username, email,productname,address,phonenumber,issue } = formData

    
    const handleComplianInput= (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleComplain = () => {
        setLoading(true);

        const complain = {
            _type: 'complain',
            name: formData.username,
            email: formData.email,
            productname: formData.productname,
            address: formData.address,
            phonenumber: formData.phonenumber,
            issue: formData.issue
           
               
                
            
        };

        client.create(complain)
            .then(() => {
                setLoading(false);
                setIsFormSubmitted(true);
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            
            {!isFormSubmitted ? (
                <div className="app__footer-form ">
                    <div className="app__flex">


                        <input className="p-text" type="text" placeholder="Your Name" name="username" value={username} onChange={handleComplianInput} />
                    </div>
                    <div className="app__flex">
                        <input className="p-text" type="email" placeholder="Your Email" name="email" value={email} onChange={handleComplianInput} />
                    </div>
                    <div className="app__flex">
                        <input className="p-text" type="text" placeholder="Name of Product" name="productname" value={productname} onChange={handleComplianInput} />
                    </div>

                    <div className="app__flex">
                        <input className="p-text" type="text" placeholder="Your Address" name="address" value={address} onChange={handleComplianInput} />
                    </div>

                    <div className="app__flex">
                        <input className="p-text" type="text" placeholder="Phone number" name="phonenumber" value={phonenumber} onChange={handleComplianInput} />
                    </div>

                    <div>
            <textarea
              className="p-text"
              placeholder="Write your issue"
              value={issue}
              name="issue"
              onChange={handleComplianInput}
            />
          </div>

                    <button type="button" className="p-text" onClick={handleComplain}>{!loading ? 'Submit Complain' : 'Wait...'}</button>

                </div>
            ) : (
                    <div className="success-wrapper">
                        <div className="success">
                            <p className="icon">
                                <BsBagCheckFill />
                            </p>
                            <h2>Your complain is submitted</h2>
                            <p className="email-msg">Check your email inbox for the receipt.</p>
                            <p className="description">
                                If you have any questions, please email
                                <a className="email" href="mailto:bunnytota3@gmail.com">
                                    bunnytota3@gmail.com
                                </a>
                            </p>
                            <Link href="/">
                                <button type="button" width="300px" className="btn">
                                    Continue Shopping
                                </button>
                            </Link>
                        </div>
                    </div>
                )
            }
           
        </>

    )
}

export default complain;
