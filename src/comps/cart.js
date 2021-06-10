import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../actions';

function Cart(props){
    let login = useSelector(state =>state.login)
    let dispatch = useDispatch()
    useEffect(() => {
        getCart()
    },[login])
    const getCart =  () =>{
        console.log(login);
        if(login){
            dispatch(Actions.getUserCart())
        }
    }
    return(
        <div>Cart work</div> 
    )
}

export default Cart