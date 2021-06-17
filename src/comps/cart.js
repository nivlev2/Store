import React,{useEffect} from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Actions } from '../actions';
import { API_URL, doApiGet, doApiMethod } from '../services/apiSer';
import '../css_comps/cart.css'
import { toast } from 'react-toastify';
import SingleCart from './SingleCart';
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
    const delOne = async(_id) =>{
        try {
            const url = API_URL +'/users/deleteOne'
            const response = await doApiMethod(url,"PUT",{_id:_id})
            if(response.n === 1){
                // getCart()
                setWasChange(!wasChange)
                toast("Item removed")
            }
        } catch (e) {
            console.log(e.response);
        }
    }
    const updateAmount = async (_id,amount) =>{
        try{
            const url =API_URL + '/users/updateCheckout'
            const resp = await doApiMethod(url,'PUT',{_id:_id,amount:amount})
            setWasChange(!wasChange)
            console.log(resp);
        }catch(e){
            console.log(e);
        }
    }
    console.log(total);
    return(
            <div className="container">
                <div className="row">
        <div className="col-lg-9">
       <table className="table table-striped  mt-5 ">
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
            let itemAmount = cart[item._id]
            return(
                <SingleCart key={item._id} updateAmount={updateAmount} delOne={delOne} itemAmount={itemAmount} item={item} i={i}/>
                // <tr key={item._id}>   
                //  <td>{i+1}
                //  <i onClick={()=>{
                //      delOne(item._id)
                //  }} class="fa fa-trash m-2 table-icon" aria-hidden="true"></i>

                //  </td>
                // <td>{item.name}</td>
                // <td><img src={item.image} style={{height:"50px"}}/></td>
                // <td>{cart[item._id]}</td>
                // <td>{item.price}$</td>
                // </tr>
            )
            
        })}
        </tbody>
      </table>
      </div>
      <div className="col-lg-3 mt-5  border-left 1px">
          <h4>Subtotal:{total}$ ({showCart.length} items) </h4>
          <Link to='/checkout'>
            <button className="checkout-btn btn btn-light mt-3"> Proceed to Checkout</button>
          </Link>
      </div>
      </div>
      </div>


    )
}

export default Cart