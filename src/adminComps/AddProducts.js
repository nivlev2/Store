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
        <div  className="container my-5 p-3"  style={{minHeight:"calc(100vh - 230px)", background:"#E0EAF5",borderRadius:"30px"}}>     
          <div>
          <form onSubmit={handleSubmit(onSubForm)} className="col-lg-6 mx-auto shadow p-3 rounded mt-3">
          <div>
          <h3 className="text-center mb-4">Add product</h3>

            </div>
            <div className="input-wrapper oneInputsInLine">
        <div className="input-data">
          <input {...nameRef} type="text" className="text-primary"  />
          <label className="text-warning mb-1">Name:</label>
          <div className="underline"></div>
          {errors.name && <span className="text-danger">Enter valid name</span>}
        </div>
        </div>
        <div className="input-wrapper oneInputsInLine">
        <div className="input-data">
          <input {...priceRef} type="text" className="text-primary"  />
          <label className="text-warning mb-1">Price:</label>
          <div className="underline"></div>
          {errors.price && <span className="text-danger">Enter valid price</span>}
        </div>
        </div>
        <div className="input-wrapper oneInputsInLine">
        <div className="input-data">
          <input {...categoryRef} type="text" className="text-primary"  />
          <label className="text-warning mb-1">Category:</label>
          <div className="underline"></div>
          {errors.category && <span className="text-danger">Enter valid category</span>}
        </div>
        </div>
        <div className="input-wrapper oneInputsInLine">
        <div className="input-data">
          <input {...imageRef} type="text" className="text-primary"  />
          <label className="text-warning mb-1">Image:</label>
          <div className="underline"></div>
          {errors.image && <span className="text-danger">Enter valid image url</span>}
        </div>
        </div>
        <div className="text-center">
            <button className="btn btn-primary mt-3 ">Add product</button>
          </div>
          </form>
        </div>
        </div>
    )
}

export default AddProducts