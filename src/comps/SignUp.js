import React from 'react';
import {useForm} from 'react-hook-form'
import { useSelector } from 'react-redux';
import {Link, useHistory} from 'react-router-dom'
import { toast } from 'react-toastify';
import { API_URL, doApiMethod } from '../services/apiSer';

function SignUp(props){
    const {register , handleSubmit ,  formState: { errors } } = useForm();
    let history = useHistory()
    const login = useSelector(state => state.login);
    if(login){
      history.push('/')
    }

    const onSubForm = async (formData) =>{
        try {
            let url = API_URL + '/users'
            let resp = await doApiMethod(url,'POST',formData)
            if(resp._id){
                toast.success("Welcome " + resp.name + " Login now")
                history.push('/login')
            }
        } catch (e) {
            if(e.response){
              if(e.response.data.code === 11000){
                return toast.info('You email already exist, log in or try with diffrent email')
              }
            }
            return toast.error("There is a problem, please try again later")
            
        }
    }
    const nameRef = register("name",{required:true,minLength:2})
    const lastNameRef = register("lastName",{required:true,minLength:2})

    const emailRef = register("email",{
        required:true,  
        pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
      })
    const passwordRef =  register("password",{required:true, minLength:3}) ;

    return(
        <div>      <div>
        <div className="login-bg">
        </div>
          <div className="container z-i ">
          <h3>Sign up now</h3>
          <form onSubmit={handleSubmit(onSubForm)} className="col-lg-6 mx-auto shadow p-3 rounded mt-3">
          <div>
              <label>Name:</label>
              <input {...nameRef} type="text" className="form-control" />
              {errors.name && <span className="text-danger">Enter valid name</span>}
            </div>

            <div>          <div>
              <label>Last name:</label>
              <input {...lastNameRef} type="text" className="form-control" />
              {errors.lastName && <span className="text-danger">Enter valid last name</span>}
            </div>

              <label>Email:</label>
              <input {...emailRef} type="text" className="form-control" />
              {errors.email && <span className="text-danger">Enter valid email</span>}
            </div>
            <div>
              <label>Password:</label>
              <input {...passwordRef} type="text" className="form-control" />
              {errors.password && <span className="text-danger">Enter min 3 charts password</span>}
            </div>
            <Link to='/login' className="d-block mt-3 text-warning link-to-login">Already register? Click here and back to login</Link>
            <button className="btn btn-success mt-3">Sign up</button>
          </form>
        </div>
        </div>
  </div> 
    )
}

export default SignUp