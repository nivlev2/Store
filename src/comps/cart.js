import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../actions';

function Cart(props){
    let login = useSelector(state =>state.login)
    let cart = useSelector(state => state.cartList)
    let dispatch = useDispatch()
    useEffect(() => {
        getCart()
    },[login])
    console.log(cart);
    const getCart =  () =>{
        try{
            if(login){
            dispatch(Actions.getUserCart())
            }
        }
        catch(err){
            console.log("from catch");
            console.log(err);
        }
    }
    return(
        <div>Cart work</div> 
    )
}

export default Cart