import React from 'react';
import { useState } from 'react';
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiMethod } from '../services/apiSer';

function SingleProduct(props){
    let [amount,setAmount] = useState(1)
    let [del,setDel] = useState(false)

    const login = useSelector(state =>state.login)
    const user = useSelector(state => state.user);
    const setProdAmount = (operator) =>{
        setAmount(amount + operator)
    }
    const openDel = () =>{

        setDel(true);
    }
    const closeDel = (e) =>{
        if(e.target.className !== "not-close"){
            setDel(false)
        }
    }
    const deleteProd = async () =>{
        try{
            const url = API_URL + "/products/delete/" + props.item._id;
            const response = await doApiMethod(url,"DELETE")
            console.log(response);
                if(response.n === 1){
                    toast("Product removed");
                    props.toggleAdminRemoved()
                }
        }catch(e){
            toast.error("there is a promblem please try again later")
        }
    }

    // const amount = useRef()
    return(
        <React.Fragment>
            {del &&<div id="popupWrapper" onClick={closeDel} >
        <div id="popup" className="not-close">
            <div id="popupClose" >X</div>
            <div id="popupContent" className="not-close">
                <h4 className="not-close">Are you sure you want to delete {props.item.name}?</h4>
                <button className="w-50 btn btn-primary">Back</button>
                <button className="w-50 btn btn-danger" onClick={deleteProd}>Delete</button>

            </div>
        </div>
    </div>
}

        <div className="product-card" key={props.item._id}>
            
        <div className="product-tumb">
            <img src={props.item.image} alt=""/>
        </div>
        <div className="product-details">
            <h4>{props.item.name}</h4>
            <div className="product-bottom-details">
                <div className="product-price">{props.item.price}$</div>
                <div className="product-links"> 
                      {/* <input ref={amount} min="1" max="20" type="number"/> */}
                    {/* <a href=""><i class="fa fa-heart"></i></a> */}
                    {!user.admin && <React.Fragment>
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
                        </React.Fragment>}
                </div>
            </div>
            {user.admin &&  <div className="container bg-light">
                <hr className="bg-light"></hr>
                <i onClick={openDel} className="fa fa-trash h3 float-start ms-2 admin-icon text-danger" aria-hidden="true"></i>
                <Link to={"/editProd/"+props.item._id} className="fa fa-pencil h3 float-end me-2 admin-icon" aria-hidden="true"></Link>
            </div>
 }
 
        </div>

        </div>
        
        </React.Fragment>
        )}

export default SingleProduct