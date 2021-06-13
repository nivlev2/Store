import React, { useState } from 'react';
import {Actions} from '../actions/index'
import {toast} from 'react-toastify'
import {useDispatch,useSelector} from 'react-redux'
import { API_URL, doApiMethod } from '../services/apiSer';
import '../css_comps/products.css'
function ProductsList(props){
    let dispatch = useDispatch()
    useState(()=>{
        dispatch(Actions.getProds())
    },[])
    const addToCart = async (_id) =>{
        try{
            let url = API_URL +'/users/updateCart'
            let prod = {_id:_id}
            let resp = await doApiMethod(url,'PUT',prod)
            if(resp.n === 1){
                toast.success("item added to cart")
            }
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
                    <div class="product-card" key={item._id}>
                    {/* <div class="badge">Hot</div> */}
                    <div class="product-tumb">
                        <img src={item.image} alt=""/>
                    </div>
                    <div class="product-details">
                        {/* <span class="product-catagory">Women,bag</span> */}
                        <h4>{item.name}</h4>
                        <div class="product-bottom-details">
                            <div class="product-price">{item.price}$</div>
                            <div class="product-links">
                                {/* <a href=""><i class="fa fa-heart"></i></a> */}
                                <i onClick={()=>{
                                    addToCart(item._id)
                                }} class="fa fa-shopping-cart h3"></i>
                            </div>
                        </div>
                    </div>
                    </div>
                    )
                })}
            </div>
        </div> 
    )
}

export default ProductsList
