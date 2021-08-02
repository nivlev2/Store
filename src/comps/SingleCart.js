import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function SingleCart(props){
    const [amount,setAmount] = useState(props.itemAmount);
    let [del,setDel] = useState(false)

    const openDel = () =>{

        setDel(true);
    }
    const closeDel = (e) =>{
        if(e.target.className !== "not-close"){
            setDel(false)
        }
    }

    const setProdAmount = (operator) =>{
        setAmount(amount + operator)
    }
    useEffect(()=>{
            props.updateAmount(props.item._id,amount)
        },[amount])
    return(
        <React.Fragment>
            {del && <div id="popupWrapper"  onClick={closeDel}>
        <div id="popup" className="not-close">
            <div id="popupClose" onClick={closeDel} >X</div>
            <div id="popupContent" className="not-close">
                <h4 className="not-close">Are you sure you want to remove {props.item.name}?</h4>
                <button className="Popup-button-back">Back</button>
                <button className="Popup-button-del" onClick={()=>{
                    props.delOne(props.item._id)
                }}>Delete</button>
            </div>
        </div>
    </div>
}
                <tr key={props.item._id}>   
                 <td>
                 <i 
                 onClick={()=>{
                    openDel()
                 }} 
                 className="fa fa-trash table-icon" aria-hidden="true"></i>
                 </td>
                <td>{props.item.name}</td>
                <td><img src={props.item.image} style={{height:"50px"}} alt={props.item.name}/></td>
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
                 </React.Fragment> 
)
}

export default SingleCart