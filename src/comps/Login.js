import React from 'react';
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {Link} from "react-router-dom"
import {API_URL,doApiMethod} from '../services/apiSer'
import {useHistory} from "react-router-dom"
import {Actions} from'../actions/index'
import { useDispatch, useSelector } from 'react-redux';

function Login(props){
    const {register , handleSubmit ,  formState: { errors } } = useForm();
    const history = useHistory();
    const dispatch = useDispatch();
    const login = useSelector(state => state.login);
    if(login){
      history.push('/')
    }
    const onSubForm= async (formData)=>{
        try{
        let url = API_URL + '/users/login'
        if(localStorage["cart"]){
          formData.cart = JSON.parse(localStorage["cart"])
        }
        let resp = await doApiMethod(url,'POST',formData);
        localStorage.setItem('token', resp.token);
        dispatch(Actions.setUserLogin())
        toast.success('Logged in successfully')
        history.push('/')
        }catch(e){
          if(e.response){
           return toast.error("Email or password wrong")
          }
         return toast.error("There are promblem please try again later")

        }
    }
    let emailRef = register("email",{
        required:true,  
        pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
      })
    let passwordRef =  register("password",{required:true, minLength:3}) ;

    return(
      <div>
      <div className="login-bg">
      </div>
        <div className="container z-i ">
        <h3 className="border-bottom w-50 mx-auto ">Login now</h3>
        <form onSubmit={handleSubmit(onSubForm)} className="col-lg-6 mx-auto shadow p-3 rounded mt-3">
          <div>
            <label>Email:</label>
            <input {...emailRef} type="text" className="form-control" />
            {errors.email && <span className="text-danger">Enter valid email</span>}
          </div>
          <div>
            <label>Password:</label>
            <input {...passwordRef} type="password" className="form-control" />
            {errors.password && <span className="text-danger">Enter min 3 charts password</span>}
          </div>
          <Link to='/signup' className="d-block mt-3 text-warning link-to-login">Not register yet? Click here and sign up now</Link>
          <button className="btn btn-success mt-3">Log in</button>
        </form>
      </div>
      </div>
      )    
}

export default Login