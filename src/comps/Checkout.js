import React,{useEffect,useState} from 'react';
import { Actions } from '../actions';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import { API_URL, doApiMethod } from '../services/apiSer';
import { toast } from 'react-toastify';

function Checkout(props){
    let login = useSelector(state => state.login)
    let total = useSelector(state => state.total)
    const {register , handleSubmit ,  formState: { errors } ,setValue} = useForm();
    const nameRef = register("name",{required:true,minLength:2})
    const lastNameRef = register("lastName",{required:true,minLength:2})
    const addressRef = register("address",{required:true,minLength:2})
    const cityRef = register("city",{required:true,minLength:2})
    const stateRef = register("state",{required:true,minLength:2})
    const zipRef = register("zip",{required:true,minLength:2})
    const cartRef = register("cart",{required:true,minLength:16,maxLength:16})
    const ccvRef = register("CCV",{required:true,minLength:3,maxLength:3})
    const expRef = register("EXP",{required:true})
    const [inPayment,setInPayment] = useState(false)
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
    const onSubForm = async (formData)=>{
      try{
        await pay()
      }catch(e){
        toast.error("there are a promblem try again later")
      }
    }
    const pay = async ()=>{
      try{
        let url = API_URL +'/users/checkout'
        let resp = await doApiMethod(url,"PUT",{emptyCart:{}})
        if(resp.n ===1){
          setInPayment(true)
          setTimeout(()=>{
            setInPayment(false)
            toast.success("Purchase Complete")
            dispatch(Actions.resetUserCart())
            history.push('/cart')
          },3000)
        }
      } 
      catch(e){
        throw (e)
      }
    }
  const handleChange = (e,maxInput,valToSet) => {
      const val = e.target.value
      const max = maxInput
      const maxLength = max.toString()
      const newVal = val < max ? val : parseInt(val.toString().substring(0, maxLength))
      setValue(valToSet, newVal, { shouldDirty: true })
  }  
    return(
        <div>
          <form className="checkOut-form-form" onSubmit={handleSubmit(onSubForm)}>
          <div className="checkOutFormWrapper">
            <div className="row">   
            <h3 className="my-4"><i class="fa fa-truck" aria-hidden="true"></i> Shipping details</h3>
            <div className="input-wrapper twoInputsInLine">
            <div className="input-data">
              <input {...nameRef} type="text" />
              <label htmlFor="">First Name</label>
              <div class="underline"></div>
              {errors.name && <span className="text-danger">Enter valid name</span>}
            </div>
          </div>
          <div className="input-wrapper twoInputsInLine">
            <div className="input-data ">
              <input {...lastNameRef} type="text"   maxLength="2"/>
              <label htmlFor="">Last Name</label>
              <div class="underline"></div>
              {errors.lastName && <span className="text-danger">Enter valid last name</span>}

            </div>
          </div>
          </div>
          <div className="input-wrapper oneLineInput">
            <div className="input-data ">
              <input {...addressRef} type="text" />
              <label htmlFor="">Address</label>
              <div class="underline"></div>
              {errors.address && <span className="text-danger">Enter valid address</span>}

            </div>
          </div>
          <div className="row">
          <div className="input-wrapper threeLineInput">
            <div className="input-data ">
              <input {...cityRef} type="text" />
              <label htmlFor="">City</label>
              <div class="underline"></div>
              {errors.city && <span className="text-danger">Enter valid city</span>}

            </div>
          </div>
          <div className="input-wrapper threeLineInput">
            <div className="input-data ">
              <input {...stateRef} type="text" />
              <label htmlFor="">State</label>
              <div class="underline"></div>
              {errors.state && <span className="text-danger">Enter valid state</span>}
            </div>
          </div>
          <div className="input-wrapper threeLineInput">
            <div className="input-data ">
              <input {...zipRef} type="number" maxLength="8" onInput={(e)=>{
                handleChange(e,7,"zip")
              }}/>
              <label htmlFor="">Zip</label>
              {errors.name && <span className="text-danger">Enter valid zip</span>}
              <div class="underline"></div>
            </div>
          </div>
          </div>
          <h3 className="my-4"><i class="fa fa-credit-card-alt" aria-hidden="true"></i> Payment details</h3>
          <div className="input-wrapper oneLineInput">
            <div className="input-data ">
              <input {...cartRef} type="text" 
              onInput={(e)=>{
                handleChange(e,16,"cart")
              }}/>
              <label htmlFor="">Credit cart NO</label>
              <div class="underline"></div>
              {errors.cart && <span className="text-danger">Enter valid Cart</span>}

            </div>
            
          </div>
          <div className="row">   
            <div className="input-wrapper twoInputsInLine">
            <div className="input-data">
              <input {...expRef} type="date" />
              <label htmlFor="">EXP</label>
              <div class="underline"></div>
              {errors.EXP && <span className="text-danger">Enter valid Date</span>}

            </div>
          </div>
          <div className="input-wrapper twoInputsInLine">
            <div className="input-data ">
              <input {...ccvRef} type="number" onInput={(e)=>{
                handleChange(e,3,"CCV")
              }}/>
              <label htmlFor="">CCV</label>
              <div class="underline"></div>
              {errors.CCV && <span className="text-danger">Enter valid CCV</span>}

            </div>
          </div>
          </div>
        <h4 className="my-4">Total to pay: {total}$</h4>
        {inPayment && <div className="center-payment"><i class="fa fa-shield" aria-hidden="true"></i>
<div class="dot-flashing"></div></div>}
      </div>
      <button className="btn btn-primary">Pay Now</button>
      </form>
      </div>
      )
}

export default Checkout