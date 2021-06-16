import React,{useEffect} from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../actions';
import { API_URL, doApiGet, doApiMethod } from '../services/apiSer';
import '../css_comps/cart.css'
import { toast } from 'react-toastify';
function Cart(props){
    let [wasChange,setWasChange] = useState(false)
    let login = useSelector(state =>state.login)
    let cart = useSelector(state => state.cartList)
    let showCart = useSelector(state => state.showCart)
    let total = useSelector(state => state.total)
    let dispatch = useDispatch()
    useEffect(() => {
        getCart()
    },[login,wasChange])
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
    const delOne = async(_id) =>{
        try {
            const url = API_URL +'/users/deleteOne'
            const response = await doApiMethod(url,"PUT",{_id:_id})
            if(response.n === 1){
                // getCart()
                setWasChange(!wasChange)
                toast.success("Item removed")
            }
        } catch (e) {
            console.log(e.response);
        }
    }
    console.log(total);
    return(
        <div>

       <table className="table table-striped  mt-5">
       <thead className="bg-warning text-light">
         <tr>
           <th>#</th>
           <th>Name</th>
           <th></th>
           <th>amount</th>
           <th>price</th>

         </tr>
       </thead>
  <tbody>
        {showCart.map((item,i) =>{
            
            return(
                <tr key={item._id}>   
                 <td>{i+1}
                 <i onClick={()=>{
                     delOne(item._id)
                 }} class="fa fa-trash m-2 table-icon" aria-hidden="true"></i>

                 </td>
                <td>{item.name}</td>
                <td><img src={item.image} style={{height:"50px"}}/></td>
                <td>{cart[item._id]}</td>
                <td>{item.price}$</td>
                </tr>
            )
            
        })}
        </tbody>
      </table>
      </div>

    )
}

export default Cart