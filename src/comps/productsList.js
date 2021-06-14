import React, { useState,useEffect } from 'react';
import {Actions} from '../actions/index'
import {toast} from 'react-toastify'
import {useDispatch,useSelector} from 'react-redux'
import { API_URL, doApiGet, doApiMethod } from '../services/apiSer';
import '../css_comps/products.css'
function ProductsList(props){
    let userName = useSelector(state => state.userName)
    console.log(userName);
    let [page,setPage] = useState(0)
    let [amountPages,setAmountPages] = useState('')
    let dispatch = useDispatch()
    const pagesAmount = async () =>{
        let url = API_URL + '/products/count'
        let resp = await doApiGet(url)
        setAmountPages(Math.ceil(resp / 6))
    }
    console.log(page + 'page');
    console.log(amountPages);
    useEffect(()=>{
        pagesAmount()
        dispatch(Actions.getProds(page))
    },[page])
    const addToCart = async (_id) =>{
        try{
            let url = API_URL +'/users/updateCart'
            let prod = {_id:_id}
            let resp = await doApiMethod(url,'PUT',prod)
            if(resp.n === 1){
                toast("item added to your cart")
            }
        }catch(err){
            console.log(err);
        }
    }
    let prods_ar = useSelector(state => state.products)
    console.log(prods_ar);
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
            <div className="d-flex justify-content-center align-center">               
            {[...Array(amountPages)].map((item,i) =>{
                console.log(i);
                    console.log("work");
                    return (
                    <div className="pages"key={i} onClick={() => {
                        setPage(i)
                    }}
                    >{i+1}</div>)
                })}
            </div>
        </div> 
    )
}

export default ProductsList
