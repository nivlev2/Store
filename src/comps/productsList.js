import React, { useState,useEffect } from 'react';
import {Actions} from '../actions/index'
import {toast} from 'react-toastify'
import {useDispatch,useSelector} from 'react-redux'
import { API_URL, doApiGet, doApiMethod } from '../services/apiSer';
import SingleProduct from './SingleProduct';
import '../css_comps/products.css'
function ProductsList(props){
    let [page,setPage] = useState(0)
    let [amountPages,setAmountPages] = useState('')
    const error = useSelector(state =>state.error)
    console.log(error);
    let dispatch = useDispatch()
    const pagesAmount = async () =>{
        let url = API_URL + '/products/count'
        let resp = await doApiGet(url)
        setAmountPages(Math.ceil(resp / 6))
    }
    useEffect(()=>{
        pagesAmount()
        dispatch(Actions.getProds(page))
    },[page])
    const addToCart = async (_id,amount) =>{
        const num = amount
        try{
            let url = API_URL +'/users/updateCart'
            let prod = {_id:_id,amount:num}
            let resp = await doApiMethod(url,'PUT',prod)
            if(resp.n === 1){
                toast("item added to your cart")
            }
        }catch(err){
            console.log("from catch here");
            console.log(err);
        }
    }
    let prods_ar = useSelector(state => state.products)
    if(error){
        return (
            <div className="errorPage">
                <div className="error-text">
                <h3 className=" text-light mt-5">There are a promblem please come black later</h3>
                </div>
            </div>
        )
    }
    return(
        <div className="container">
            <div className="row">
                {prods_ar.map(item =>{
                    return <SingleProduct key={item._id} addToCart={addToCart} item={item}/>

                })}
            </div> 
            <div className="d-flex justify-content-center align-center">               
            {[...Array(amountPages)].map((item,i) =>{
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
