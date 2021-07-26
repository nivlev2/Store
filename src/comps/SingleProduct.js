import React from 'react';
import { useState } from 'react';
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom';

function SingleProduct(props){
    let [amount,setAmount] = useState(1)
    const login = useSelector(state =>state.login)
    const user = useSelector(state => state.user);
    const setProdAmount = (operator) =>{
        setAmount(amount + operator)
    }
    // const amount = useRef()
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
                <div className="product-links"> 
                      {/* <input ref={amount} min="1" max="20" type="number"/> */}
                    {/* <a href=""><i class="fa fa-heart"></i></a> */}
                    <div className="counter">
                        <div style={amount < 2? {cursor:"not-allowed"}: {cursor:"pointer"}} onClick={()=>{
                            if(amount > 1){
                                setProdAmount(-1)
                            }
                        }} className="decrement">-</div>
                        <div className="count">{amount}</div>
                        <div  style={amount > 98? {cursor:"not-allowed"}: {cursor:"pointer"}} onClick={()=>{
                            if(amount < 99){
                                setProdAmount(+1)
                            }
                        }} className="increment">+</div>
                    </div>
                    <i 
                    onClick={()=>{
                        if(!login){
                            props.NotLoggedAddTocart(props.item._id,amount,props.item) 
                        }else{
                            props.addToCart(props.item._id,amount)
                        }
                    }} 
                    className="fa fa-shopping-cart h3"></i>
                </div>
            </div>
            {user.admin &&  <div className="container bg-light">
                <hr className="bg-light"></hr>
                <i class="fa fa-trash h3 float-start ms-2 admin-icon text-danger" aria-hidden="true"></i>
                <Link to={"/editProd/"+props.item._id} class="fa fa-pencil h3 float-end me-2 admin-icon" aria-hidden="true"></Link>
            </div>
 }
        </div>
        </div>
        )}

export default SingleProduct