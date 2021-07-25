import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {useForm} from 'react-hook-form'

import { toast } from 'react-toastify';
import { API_URL, doApiMethod } from '../services/apiSer';


function AddProducts(props){
    const user = useSelector(state => state.user)
    const history =useHistory()
    if(!user.admin){
        history.push('/')
    }
    const {register , handleSubmit ,  formState: { errors } } = useForm();

    const nameRef = register("name",{required:true,minLength:2})
    const priceRef = register("price",{
        required:true,
        min:1,
        max:9999,
        pattern:/^\d*[1-9]\d*$/
      })
    const categoryRef =  register("category",{required:true, minLength:3}) ;
    const imageRef = register("image",{required:true,minLength:10})

    const onSubForm = async (formData) =>{
      try{
        let url = API_URL + '/products';
        const response = await doApiMethod(url,"POST",formData)
        if (response._id){
          toast.success("item added successfully");
          history.push('/')
        }
      }catch(e){
        toast.error("There is an error please try again later")
      }
    }
    return(
        <div>     
          <div className="container z-i ">
          <h3>Sign up now</h3>
          <form onSubmit={handleSubmit(onSubForm)} className="col-lg-6 mx-auto shadow p-3 rounded mt-3">
          <div>
              <label>Name:</label>
              <input {...nameRef} type="text" className="form-control" />
              {errors.name && <span className="text-danger">Enter valid name</span>}
            </div>

            <div>          <div>
              <label>Price:</label>
              <input {...priceRef} type="number" min="0" max="1000"className="form-control" />
              {errors.price && <span className="text-danger">Enter valid price</span>}
            </div>

              <label>Category:</label>
              <input {...categoryRef} type="text" className="form-control" />
              {errors.category && <span className="text-danger">Enter valid category</span>}
            </div>
            <div>
              <label>Image url:</label>
              <input {...imageRef} type="text" className="form-control" />
              {errors.password && <span className="text-danger">Enter valid image url</span>}
            </div>
            <button className="btn btn-success mt-3">Add</button>
          </form>
        </div>
  </div> 
    )
}

export default AddProducts