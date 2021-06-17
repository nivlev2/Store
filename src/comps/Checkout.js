import React,{useEffect} from 'react';
import { Actions } from '../actions';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Checkout(props){
    let login = useSelector(state => state.login)
    let showCart = useSelector(state => state.showCart)
    let cart = useSelector(state => state.cartList)
    let total = useSelector(state => state.total)

    let history = useHistory()
    let dispatch = useDispatch()
    useEffect(() => {
        if(!login){
            return history.push('/login')
        }    
        getCart()
    },[login])
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

    return(
        <div>
        <h1>Add new card to your biz:</h1>
        <div className="row">
        <form  className="row col-md-8">
          <div className="col-sm-6">
            <label>Name:</label>
            <input  type="text" className="form-control mt-2" />
     
          </div>
          <div className="col-sm-6">
            <label>Last name</label>
            <input  type="text" className="form-control mt-2" />
     
          </div>

  
          <div className="col-sm-12">
            <label>Address</label>
            <input   type="text" className="form-control mt-2" />
      
          </div>
          <div className="col-sm-4">
            <label>City</label>
            <input   type="text" className="form-control mt-2" />
       
          </div>
          <div className="col-sm-4">
            <label>Phone</label>
            <input   type="text" className="form-control mt-2" />
       
          </div>

          <div className="col-sm-4">
            <label>Zip</label>
            <input   type="text" className="form-control mt-2" />
        
          </div>
          <div className="col-sm-12">
            <label>Credit cart NO</label>
            <input   type="text" className="form-control mt-2" />
      
          </div>

          <div className="col-sm-6">
            <label>EXP</label>
            <input  type="date" className="form-control mt-2" />
          </div>
          <div className="col-sm-6">
            <label>CCV</label>
            <input  type="text" className="form-control mt-2" />
          </div>
            <div className="col-12 text-center">
            <button className="btn btn-info  mt-4">Add new biz card</button>
          </div>
          <div className="checkOutFormWrapper">
            <div className="row">   
            <h1 className="my-4">Add new card to your biz:</h1>
            <div className="input-wrapper twoInputsInLine">
            <div className="input-data">
              <input type="text" />
              <label htmlFor="">First Name</label>
              <div class="underline"></div>
            </div>
          </div>
          <div className="input-wrapper twoInputsInLine">
            <div className="input-data ">
              <input type="text" />
              <label htmlFor="">Last Name</label>
              <div class="underline"></div>
            </div>
          </div>
          </div>
          <div className="input-wrapper oneLineInput">
            <div className="input-data ">
              <input type="text" />
              <label htmlFor="">name</label>
              <div class="underline"></div>
            </div>
          </div>
          <div className="row">
          <div className="input-wrapper threeLineInput">
            <div className="input-data ">
              <input type="text" />
              <label htmlFor="">name</label>
              <div class="underline"></div>
            </div>
          </div>
          <div className="input-wrapper threeLineInput">
            <div className="input-data ">
              <input type="text" />
              <label htmlFor="">name</label>
              <div class="underline"></div>
            </div>
          </div>
          <div className="input-wrapper threeLineInput">
            <div className="input-data ">
              <input type="text" />
              <label htmlFor="">name</label>
              <div class="underline"></div>
            </div>
          </div>
          </div>
          <h1 className="my-4">Add new card to your biz:</h1>
          <div className="input-wrapper oneLineInput">
            <div className="input-data ">
              <input type="text" />
              <label htmlFor="">name</label>
              <div class="underline"></div>
            </div>
            
          </div>
          <div className="row">   
            <div className="input-wrapper twoInputsInLine">
            <div className="input-data">
              <input type="text" />
              <label htmlFor="">First Name</label>
              <div class="underline"></div>
            </div>
          </div>
          <div className="input-wrapper twoInputsInLine">
            <div className="input-data ">
              <input type="text" />
              <label htmlFor="">Last Name</label>
              <div class="underline"></div>
            </div>
          </div>
          </div>
          </div>
        </form>
        {/* <div className="input-wrapper">
            <div className="input-data">
              <input type="text" />
              <label htmlFor="">name</label>
            </div>
          </div> */}

      </div>
      </div>
      )
}

export default Checkout