import React from 'react';
import { Link } from 'react-router-dom';
import {Actions} from "../actions/index"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";


function Footer(props){
    const admin = useSelector(state =>state.user.admin)
    const login = useSelector(state => state.login)
    const dispatch = useDispatch()
    const logOut = ()=>{
      localStorage.removeItem('token')
      toast.warning("bye bye")
      dispatch(Actions.removeUser())
    }
  
    return(
        <div className="footer-container">
            <div className="grid-item text-light">
                <h4>Links</h4>
            <Link to="/">
                <span>Home</span>
          </Link>
          {login? <React.Fragment>
          {!admin &&<Link to="/userInfo">
              <span>Last orders</span>
          </Link>
            }
             <span >Logout</span></React.Fragment>
            : 
            <Link to="/login">
              <span>Login</span>  
          </Link>
}
          {!admin && <Link to="/cart"><span>Cart</span> 
          </Link>
}
          {admin && <Link to="/addProd"><span>Add Products</span> 
    </Link>}

            </div>
            <div className="grid-item text-light">
                <h3 className="footer-contact-title">Contact me</h3>
                <a className="footer-contact" href="tel:0549000802">0549000802</a>
                <a className="footer-contact" href="mailto:nivlev3@gmail.com">nivlev3@gmail.com</a>
            </div>
        </div>
    )
}

export default Footer