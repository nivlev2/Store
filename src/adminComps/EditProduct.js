import React, { useState } from 'react';
import { API_URL, doApiGet, doApiMethod} from '../services/apiSer';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

function EditProducts({urlParam}){
    const history = useHistory()
    const admin = useSelector(state => state.user.admin)
    const [name,setName]=useState("")
    const [price,setPrice]=useState(0)
    const [category,setCategory]=useState("")
    const [image,setImage]=useState("")
    if(!admin){
        history.push('/')
    }
    let [oldProd,setOldProd] = useState({});
    useEffect(()=>{
        const getProdDetails = async() =>{
            let url = API_URL + '/products/single/' + urlParam;
            const response = await doApiGet(url)
            setOldProd(response)
            setName(response.name)
            setPrice(response.price)
            setCategory(response.category)
            setImage(response.image)
        }
        getProdDetails()
    },[])
    const onSub = async() =>{
        let change = false
        const formData ={};
        formData.name = name;
        formData.price = price;
        formData.category = category;
        formData.image = image;
        for(let key in formData){
            if(formData[key] !== oldProd[key]){
                change = true
            }
        }
        if(!change) return toast.info("There were no changes to make")
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
    return(
        <form onSubmit={(e)=>{
            e.preventDefault();
            onSub()
        }}>
        <div className="container">
            <div className="row mt-3">
            <h3 className="text-center border-bottom text-light mt-3">You edit this product</h3>
            <div className="product-card">
        <div className="product-tumb">
            <img src={image} alt=""/>
        </div>
        <div className="product-details">
            <h4>{name}</h4>
            <div className="product-bottom-details">
                <div className="product-price">{price}$</div>
                <div className="product-links"> 
            </div></div></div></div>
            </div>
            <div className="row">
        <div className="input-wrapper twoInputsInLine">
        <div className="input-data">
          <input onChange={(e)=>setName(e.target.value)} value={name} name="name"  type="text" className="text-primary"  />
          <label className="text-warning mb-1">Name:</label>
          <div className="underline"></div>
          {name.length < 2 && <small className="text-danger" >please enter valid name</small>}
        </div>
        </div>
        <div className="input-wrapper twoInputsInLine">
        <div className="input-data">
          <input onChange={(e)=>setPrice(e.target.value)} value={price} name="price"  type="number" className="text-primary" />
          <label className="text-warning mb-1">Price:</label>
          <div className="underline"></div>
          {price <= 0 && <small className="text-danger" >please enter valid price</small>}

        </div>
        </div>
        <div className="input-wrapper twoInputsInLine">
        <div className="input-data">
          <input onChange={(e)=>setCategory(e.target.value)} value={category} name="category"  type="text" className="text-primary"  />
          <label  className="text-warning mb-1">Category:</label>
          <div className="underline"></div>
          {category.length < 2 && <small className="text-danger" >please enter valid category</small>}

        </div>
        </div>
        <div className="input-wrapper w-75">
        <div className="input-data">
          <input onChange={(e)=>setImage(e.target.value)} value={image} name="image" type="text" className="text-primary"  />
          <label className="text-warning mb-1">Image url:</label>
          <div className="underline"></div>
          {image < 10 && <small className="text-danger" >please enter valid image url</small>}

        </div>
        </div>
        <div className="text-center">
        <button className="btn btn-primary my-3 ">Edit Product</button>
        </div>
      </div>    
      </div>
      </form>
)
}

export default EditProducts