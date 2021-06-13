import React, { useState } from 'react';
import {Actions} from '../actions/index'
import {useDispatch,useSelector} from 'react-redux'
import { API_URL, doApiMethod } from '../services/apiSer';
function ProductsList(props){
    let dispatch = useDispatch()
    let cart = useSelector(state => state.cartList)
    useState(()=>{
        dispatch(Actions.getProds())
    },[])

    const addToCart = async (_id) =>{
        try{
            let url = API_URL +'/users/updateCart'
            let prod = {_id:_id}
            let resp = await doApiMethod(url,'PUT',prod)
            console.log(resp);
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