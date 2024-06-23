import React, { useState, useEffect } from 'react'
import { client, urlFor } from '../../lib/client'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { CgShoppingCart } from 'react-icons/cg'
import { useStateContext } from '../../context/StateContext';
import Link from 'next/link';

const ProductDetails = ({ products, product }) => {
    const { image, name, details, price, tags, care, size } = product;
    const [index, setIndex] = useState(0);
    const [sized, setSized] = useState(null);
    const { decQty, incQty, qty, onAdd, updateSize } = useStateContext();

    const careList = [];

    for (let i = 0; i < care.length; i++) {
        careList.push(care[i].children[0].text);
    }

    useEffect(() => {
        console.log("Sized changed:", sized);
        updateSize(sized);
    }, [sized, updateSize]);

    return (
        <div className='products'>
            <div className='product-detail-container'>
                <div className='product-images'>
                    <div className='small-images-container'>
                        {image?.map((item, ind) => (
                            <img 
                            key={ind}
                            src={urlFor(item)} 
                            className='small-image' 
                            onMouseEnter={() => setIndex(ind)} />
                        ))}
                    </div>
                    <div className='big-image-container'>
                        <img src={urlFor(image && image[index])} />
                    </div>
                </div>
                <div className='product-details'>
                    <div className='name-and-category'>
                        <h3>{name}</h3>
                        <span>{tags}</span>   
                    </div>
                    <div className='size'>
                        <p>SELECT SIZE</p>
                        <ul>
                           {Array.isArray(size) && size.map((item, ind) => (
                           <li key={ind} onClick={() => setSized(item)}>{item}</li>
                           )) 
                           }
                        </ul>
                    </div>
                    <div className='quantity-desc'>
                        <h4>Quantity: </h4>
                        <div>
                            <span className='minus' onClick={decQty}><AiOutlineMinus /></span>
                            <span className='num'>{qty}</span>
                            <span className='plus' onClick={incQty}><AiOutlinePlus /></span>
                        </div>
                    </div>
                    <p className='price'>Rs.{price}</p> 
                    <div className='add-to-cart'>
                        <button className='btn' type='button' onClick={() => onAdd(product, qty)}><CgShoppingCart size={20} />Add to Cart</button>
                        <Link href='/cart' className='btn2' type='button' onClick={() => onAdd(product, qty)}>Buy Now</Link>
                    </div>
                </div>
            </div>

            <div className='product-desc-container'>
                <div className='desc-title'>
                    <div className="desc-background">
                        Overview
                    </div>
                    <h2>Product Information</h2>  
                </div>
                <div className='desc-details'>
                    <h4>PRODUCT DETAILS</h4>
                    <p>{details[0].children[0].text}</p>  
                </div>
                <div className='desc-care'>
                    <h4>PRODUCT CARE</h4>
                    <ul>
                    {careList.map((list, index) => (
                        <li key={index}>{list}</li>
                    ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;

export const getStaticProps = async ({ params: { slug } }) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]';
    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);

    return {
        props: { products, product }
    }
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }`;

    const products = await client.fetch(query);

    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    }
}
