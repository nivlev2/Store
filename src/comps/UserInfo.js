import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Actions } from '../actions';

function UserInfo(props){
    const dispatch = useDispatch()
    const lastOrders = useSelector(state => state.lastOrders)
    const user = useSelector(state => state.user)
    const login = useSelector(state => state.login)
    const history = useHistory()
    if(!login){
        history.push('/login')
    }
    useEffect(()=>{
        dispatch(Actions.getUserInfo())
    },[])
    if(lastOrders.length < 1){
        return(
            <div>
            <div className="home-header">
            <h1 className="home-title">Welcome {user.name} {user.lastName}
            <br/> You dont have orders yet :</h1>
            </div>
            </div>
        )
    }
    return(
        <div>
                    <div className="home-header">
                    <h1 className="home-title">Welcome {user.name} {user.lastName}
                    <br/> here your last orders :</h1>
                    </div>
            
            <div className="container">
                <div className="row">
                    {lastOrders.map((order,i) =>{
                        let total = 0
                        return(
                            <div key={i} className="last-Order">
                                <h4 className="text-danger">{i+1}:</h4>
                                <div className="last-Order-flex">
                                { order.map((item,z)=>{
                                    let amount =  user.lastOrders[i][item._id]
                                    total += amount * item.price
                            return(
                                <div key={item._id} className="last-Order-item">
                                        <div style={{backgroundImage:`url(${item.image})`}} className="last-Order-img"/>
                                        <div className="last-Order-details">
                                        <div>Price: {item.price}$</div>
                                        <div>Amount:{amount}</div>
                                        <div> total:{item.price * amount}$</div>
                                        </div>
                                </div>
                            )})
                                }   
                                </div>
                                <hr/>
                                <h4 className="last-Order-total">Order total :{total}$</h4>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default UserInfo