import React from 'react';
import { useRef } from 'react';

function SingleProduct(props){
    const amount = useRef()
    return(
        <div className="product-card" key={props.item._id}>
        {/* <div class="badge">Hot</div> */}
        <div className="product-tumb">
            <img src={props.item.image} alt=""/>
        </div>
        <div className="product-details">
            {/* <span class="product-catagory">Women,bag</span> */}
            <h4>{props.item.name}</h4>
            <div className="product-bottom-details">
                <div className="product-price">{props.item.price}$</div>
                <div className="product-links">                    <input ref={amount} min="1" max="20" type="number"/>
                    {/* <a href=""><i class="fa fa-heart"></i></a> */}
                    <i 
                    onClick={()=>{
                        props.addToCart(props.item._id,amount)
                    }} 
                    className="fa fa-shopping-cart h3"></i>
                </div>
            </div>
        </div>
        </div>
        )}

export default SingleProduct