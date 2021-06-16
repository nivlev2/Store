import React, { useState,useEffect } from 'react';
import {Actions} from '../actions/index'
import {toast} from 'react-toastify'
import {useDispatch,useSelector} from 'react-redux'
import { API_URL, doApiGet, doApiMethod } from '../services/apiSer';
import SingleProduct from './SingleProduct';
import '../css_comps/products.css'
function ProductsList(props){
    let userName = useSelector(state => state.userName)
    let [page,setPage] = useState(0)
    let [amountPages,setAmountPages] = useState('')
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
        const num = amount.current.value
        try{
            let url = API_URL +'/users/updateCart'
            let prod = {_id:_id,amount:num}
            let resp = await doApiMethod(url,'PUT',prod)
            if(resp.n === 1){
                toast("item added to your cart")
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
                    // console.log("run");
                    // return(
                    // <div className="product-card" key={item._id}>
                    // {/* <div class="badge">Hot</div> */}
                    // <div className="product-tumb">
                    //     <img src={item.image} alt=""/>
                    // </div>
                    // <div className="product-details">
                    //     {/* <span class="product-catagory">Women,bag</span> */}
                    //     <h4>{item.name}</h4>
                    //     <div className="product-bottom-details">
                    //         <div className="product-price">{item.price}$</div>
                    //         <div className="product-links">
                    //             {/* <a href=""><i class="fa fa-heart"></i></a> */}
                    //             <i onClick={()=>{
                    //                 addToCart(item._id,1)
                    //             }} className="fa fa-shopping-cart h3"></i>
                    //         </div>
                    //     </div>
                    // </div>
                    // </div>
                    // )
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
