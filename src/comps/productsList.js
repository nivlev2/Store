import React, { useState,useEffect } from 'react';
import {Actions} from '../actions/index'
import {toast} from 'react-toastify'
import {useDispatch,useSelector} from 'react-redux'
import { API_URL, doApiGet, doApiMethod } from '../services/apiSer';
import SingleProduct from './SingleProduct';
import '../css_comps/products.css'
import { Link } from 'react-router-dom';
function ProductsList(props){
    let [page,setPage] = useState(0)
    let [amountPages,setAmountPages] = useState('')
    const [adminRemoved,setAdminRemoved] = useState(false)
    const error = useSelector(state =>state.error)
    const loading = useSelector(state =>state.loading)
    const user = useSelector(state => state.user);
    let dispatch = useDispatch()
    const pagesAmount = async () =>{
        let url = API_URL + '/products/count'
        let resp = await doApiGet(url)
        setAmountPages(Math.ceil(resp / 6))
    }
    useEffect(()=>{
        pagesAmount()
        dispatch(Actions.getProds(page,props.sortQ,props.searchQ))
    },[page,props.sortQ,props.searchQ,adminRemoved])
    const addToCart = async (_id,amount) =>{
        const num = amount
        try{
            let url = API_URL +'/users/updateCart'
            let prod = {_id:_id,amount:num}
            let resp = await doApiMethod(url,'PUT',prod)
            if(resp.n === 1){
                props.makeChange()
                toast("item added to your cart")
            }
        }catch(err){
            toast.error("there is a promblem try again later")
        }
    }
    
    const NotLoggedAddTocart = (itemId,amount,item) =>{
        localStorage.setItem("NotLog",true)
        if(localStorage["cart"]){
            const cart = JSON.parse(localStorage["cart"])
            checkIfInCart(itemId,amount,cart)
        }else{
            const cart = {}
            cart[itemId] = amount
            localStorage.setItem("cart",JSON.stringify(cart))
        }
        const show = localStorage["showCart"] ? JSON.parse(localStorage["showCart"]) : [];
        for(let i of show){
            if(i._id === itemId) return
        }
        localStorage.setItem("showCart",JSON.stringify([...show,item]))
    }
    const checkIfInCart = (itemId,amount,cart) =>{
        for(let key in cart){
            if(key === itemId){
                cart[key] = cart[key] + amount  
                return localStorage.setItem("cart",JSON.stringify(cart));
            }
        }
        const newCart = {...cart}
        newCart[itemId] = amount
        return localStorage.setItem("cart",JSON.stringify(newCart));
    }
    const toggleAdminRemoved = () =>{
        setAdminRemoved(!adminRemoved)
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
    if(prods_ar.length === 0 && props.searchQ !== "") {
        return(
            <div className="no_products">
                <h2 className="text-light">There are no results,<br/>try to search with diffrent key</h2>
            </div>
        )
    }
    return(
        <div className="container">
            
            {loading &&<div className="d-flex justify-content-center mt-5">
            <div className="lds-dual-ring"></div>
            </div>
}

            <div className="row">
                
                {user.admin && <div className="d-flex justify-content-center"><Link to="/addProd" className="mt-3 w-25 btn btn-danger">Add products</Link></div>}
                {prods_ar.map(item =>{
                    return <SingleProduct toggleAdminRemoved={toggleAdminRemoved} NotLoggedAddTocart={NotLoggedAddTocart} key={item._id} addToCart={addToCart} item={item}/>

                })}
            </div>
            <div className="d-flex justify-content-center align-center">
                      
            {props.searchQ != ""  && prods_ar.length < 6 ? <React.Fragment></React.Fragment> : [...Array(amountPages)].map((item,i) =>{
                    return (
                    <div className="pages"key={i} onClick={() => {
                        setPage(i)
                        window.scrollTo(0, 200)
                    }}
                    >{i+1}</div>)
                })}
            </div>
            
        </div> 
    )
}

export default ProductsList
