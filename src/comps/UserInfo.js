import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../actions';

function UserInfo(props){
    const dispatch = useDispatch()
    const lastOrders = useSelector(state => state.lastOrders)
    console.log(lastOrders);
    useEffect(()=>{
        dispatch(Actions.getUserInfo())
    },[])
    return(
        <div>UserInfo work</div> 
    )
}

export default UserInfo