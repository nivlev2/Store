import React,{useEffect} from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../actions';
import { API_URL, doApiMethod } from '../services/apiSer';

function Cart(props){
    let [list,setList] = useState([])
    let login = useSelector(state =>state.login)
    let cart = useSelector(state => state.cartList)
    let showCart = useSelector(state => state.showCart)
    let total = useSelector(state => state.total)
    let dispatch = useDispatch()
    useEffect(() => {
        getCart()
    },[login])
    const getCart =  () =>{
        try{
            if(login){
            dispatch(Actions.getUserCart())
            }else{
                console.log("baba");
            }
        }
        catch(err){
            console.log("from catch in cart");
            console.log(err);
        }
    }
    return(
        <div>{showCart.map(item =>{
            return(
                <div key={item._id}>
                <h3>Name {item.name}</h3>
                <img src={item.image} className="img w-25"/>
                <p>price {item.price}</p>
                <p>amount: {cart[item._id]}</p>
                </div>
            )
            
        })}</div> 
    )
}

export default Cart