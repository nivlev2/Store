import React from 'react';
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {API_URL,doApiMethod} from '../services/apiSer'
import {useHistory} from "react-router-dom"
import {Actions} from'../actions/index'
import { useDispatch } from 'react-redux';

function Login(props){
    const {register , handleSubmit ,  formState: { errors } } = useForm();
    const history = useHistory();
    const dispatch = useDispatch();
    
    const onSubForm= async (formData)=>{
        try{
        let url = API_URL + '/users/login'
        let resp = await doApiMethod(url,'POST',formData);
        localStorage.setItem('token', resp.token);
        //TODO: Dispatch cart to user.cart and remove this to userSer file
        dispatch(Actions.setUserLogin())
        toast.success('Logged in successfully')
        history.push('/')
        }catch(e){
          console.log(e);
        }
    }
    let emailRef = register("email",{
        required:true,  
        pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
      })
    let passwordRef =  register("password",{required:true, minLength:3}) ;

    return(
        <div className="container">
    
        <form onSubmit={handleSubmit(onSubForm)} className="col-lg-6 mx-auto shadow p-3 rounded mt-3">
          <div>
            <label>Email:</label>
            <input {...emailRef} type="text" className="form-control" />
            {errors.email && <span className="text-danger">Enter valid email</span>}
          </div>
          <div>
            <label>Password:</label>
            <input {...passwordRef} type="text" className="form-control" />
            {errors.password && <span className="text-danger">Enter min 3 charts password</span>}
          </div>
         
          <button className="btn btn-success mt-3">Log in</button>
        </form>
      </div>
      )    
}

export default Login