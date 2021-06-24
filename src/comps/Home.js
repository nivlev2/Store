import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import { Actions } from '../actions';
import ProductsList from './productsList';

function Home(props){
    let [sortQ,setSortQ] = useState('_id')
    let [searchQ,setSearchQ] = useState('')
    let [wasChange,seWasChange] = useState(1)
    let login = useSelector(state => state.login)
    let dispatch = useDispatch()
    console.log(sortQ);
    useEffect(() => {
        getCart()
    },[login,wasChange])
    useEffect(()=>{
        dispatch(Actions.getUserInfo())
    },[])
    const getCart =  () =>{
        try{
            if(login){
                //reset userCart
            dispatch(Actions.getUserCart())
            }else{
                dispatch(Actions.resetUserCart())
            }
        }
        catch(err){
            console.log("from catch in cart");
            console.log(err);
        }
    }  
    const makeChange = () =>{
        seWasChange(wasChange +1)
    }
    return(
        <div>
            <Header setSearchQ={setSearchQ} setSortQ={setSortQ}/>
            <ProductsList makeChange={makeChange} sortQ={sortQ} searchQ={searchQ}/>
        </div> 
    )
}

export default Home