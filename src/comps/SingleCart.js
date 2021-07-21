import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function SingleCart(props){
    const [amount,setAmount] = useState(props.itemAmount);
    const setProdAmount = (operator) =>{
        setAmount(amount + operator)
    }
  
    useEffect(()=>{
            props.updateAmount(props.item._id,amount)
        },[amount])
    return(
                <tr key={props.item._id}>   
                 <td>
                 <i 
                 onClick={()=>{
                     props.delOne(props.item._id)
                 }} 
                 className="fa fa-trash table-icon" aria-hidden="true"></i>
                 </td>
                <td>{props.item.name}</td>
                <td><img src={props.item.image} style={{height:"50px"}}/></td>
                <td><div className="counter w-25">
                        <div style={amount < 2? {cursor:"not-allowed"}: {cursor:"pointer"}} onClick={()=>{
                            if(amount > 1){
                             setProdAmount(-1)
                            }
                        }} className="decrement w-50">-</div>
                        <div  className="count mx-1">{amount}</div>
                        <div style={amount > 98? {cursor:"not-allowed"}: {cursor:"pointer"}}onClick={()=>{
                            if(amount < 99){
                                setProdAmount(+1)
                            }
                        }} className="increment w-50">+</div>
                    </div></td>
                <td>{props.item.price}$ ({props.item.price * amount})$</td>
                </tr>    
)
}

export default SingleCart