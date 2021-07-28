import React, { useState } from 'react';
import { API_URL, doApiGet, doApiMethod} from '../services/apiSer';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

function EditProducts({urlParam}){
    const { register, handleSubmit,setValue, formState: { errors } } = useForm();
    const history = useHistory()
    const name = register("name", { required: true, minLength: 2 });
    const price = register("price", { required: true, minLength: 1 });
    const category = register("category", { required: true, minLength: 2 });
    const image = register("image", { required: true, minLength: 10 });
    let [oldProd,setOldProd] = useState({});
    const [showProd,setShowProd] = useState({...oldProd})
    useEffect(()=>{
        const getProdDetails = async() =>{
            let url = API_URL + '/products/single/' + urlParam;
            const response = await doApiGet(url)
            setOldProd(response)
            setValue("name",response.name)
            setValue("price",response.price)
            setValue("category",response.category)
            setValue("image",response.image)
        }
        getProdDetails()
    },[])
    const onSub = async(formData) =>{
        let change = false
        for(let key in formData){
            if(formData[key] !== oldProd[key]){
                change = true
            }
        }
        if(!change) return
        setOldProd(formData)
        try{
            formData.price= Number(formData.price)
            const url =API_URL +"/products/update/" + urlParam;
            const response =  await doApiMethod(url,"PUT",formData);
            if(response.n === 1){
                toast("Product updated successfully")
                history.push('/')
            }
        }catch(e){
            toast.warning("There was an error updating, try again later")
        }
    }
    const setShow = (e) =>{
        console.log("work");
        // console.log(e.target.value);
        // setShowProd({...showProd,key:value})
    }
    return(
        <form onSubmit={handleSubmit(onSub)}>
        <div className="container">
            <div className="row">
            <div className="product-card">
        <div className="product-tumb">
            <img src={oldProd.image} alt=""/>
        </div>
        <div className="product-details">
            {/* <span class="product-catagory">Women,bag</span> */}
            <h4>{oldProd.name}</h4>
            <div className="product-bottom-details">
                <div className="product-price">{oldProd.price}$</div>
                <div className="product-links"> 
            </div></div></div></div>
            </div>
            <div className="row">
        <div className="input-wrapper twoInputsInLine">
        <div className="input-data">
          <input {...name} type="text" className="text-primary"  />
          <label className="text-warning mb-1">Name:</label>
          <div className="underline"></div>
        </div>
        </div>
        <div className="input-wrapper twoInputsInLine">
        <div className="input-data">
          <input {...price} type="number" className="text-primary" />
          <label className="text-warning mb-1">Price:</label>
          <div className="underline"></div>
        </div>
        </div>
        <div className="input-wrapper twoInputsInLine">
        <div className="input-data">
          <input {...category}  type="text" className="text-primary"  />
          <label  className="text-warning mb-1">Category:</label>
          <div className="underline"></div>
        </div>
        </div>
        <div className="input-wrapper w-75">
        <div className="input-data">
          <input {...image} type="text" className="text-primary"  />
          <label className="text-warning mb-1">Image url:</label>
          <div className="underline"></div>
        </div>
        </div>
        <div className="text-center">
        <button className="btn btn-primary mt-3 w-25">Edit Product</button>
        </div>
      </div>    
      </div>
      </form>
)
}

export default EditProducts