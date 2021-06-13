import React, { useState } from 'react';
import {Actions} from '../actions/index'
import {useDispatch,useSelector} from 'react-redux'
import { API_URL, doApiMethod } from '../services/apiSer';
function ProductsList(props){
    console.log("here");
    let dispatch = useDispatch()
    let cart = useSelector(state => state.cartList)
    console.log(cart);
    useState(()=>{
        dispatch(Actions.getProds())
    },[])
    const addToCart = async (_id) =>{
        try{
            let url = API_URL +'/users/updateCart'
            console.log(cart);
            // let newCart = {...cart,_id}
            // let dataBody = {cart: newCart}
            // //TODO: get the new cart with ids only from userInfo and then do this action
            // let resp = await doApiMethod(url,'PUT',dataBody)
            // console.log(resp);
        }catch(err){
            console.log(err);
        }
    }
    let prods_ar = useSelector(state => state.products)
    return(
        <div className="container">
            <div className="row">
                {prods_ar.map(item =>{
                    return(
                        <div key={item._id} className="col-md-5 p-3 m-2 shadow">
                            <h3>{item.name}</h3>
                            <p>{item.price}$</p>
                            <button onClick={()=>{
                                addToCart(item._id)
                            }} className="btn btn-info">Add</button>
                        </div>
                    )
                })}
            </div>
        </div> 
    )
}

export default ProductsList