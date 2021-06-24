import React, { useState,useEffect } from 'react';
import {Actions} from '../actions/index'
import {toast} from 'react-toastify'
import {useDispatch,useSelector} from 'react-redux'
import { API_URL, doApiGet, doApiMethod } from '../services/apiSer';
import { Link } from 'react-router-dom';
import SingleProduct from './SingleProduct';
import '../css_comps/products.css'
function ProductsList(props){
    let [page,setPage] = useState(0)
    let [amountPages,setAmountPages] = useState('')
    let [popUp,SetPopUp] = useState(false)
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
        dispatch(Actions.getProds(page,props.sortQ,props.searchQ))
    },[page,props.sortQ,props.searchQ])
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
    
    const closePopUp = () => {
        SetPopUp(false)
    } 
    const openPopUp = () =>{
        SetPopUp(true)
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
                    return <SingleProduct openPopUp={openPopUp} key={item._id} addToCart={addToCart} item={item}/>

                })}
            </div>
            {popUp && <div onClick={closePopUp} id="popupWrapper">
                     <div id="popup"> 
                     <div onClick={closePopUp} id="popupClose">X</div>
                      <div id="popupContent"> 
                      <h3 className="mb-4">Login in order to start shopping</h3>
                       <Link onClick={closePopUp} className={`btn btn-primary`} to="/login">Click here to login</Link> </div>
                       </div>
                       </div>} 
            <div className="d-flex justify-content-center align-center">
                               
            {props.searchQ != ""  && prods_ar.length < 5 ? <React.Fragment></React.Fragment> : [...Array(amountPages)].map((item,i) =>{
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
