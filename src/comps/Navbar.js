import React, { useState,useEffect } from "react";
import {Actions} from "../actions/index"
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { API_URL, doApiMethod } from "../services/apiSer";
function NavBar(props) {
  let [showMobileNav, setShowMobileNav] = useState(false);
  let dispatch = useDispatch()
  useEffect(()=>{
    checkIfLoggedIn()
  },[])
  const checkIfLoggedIn =async () =>{
      try {
        let url = API_URL +'/users/authUser';
        let resp = await doApiMethod(url,'GET');
        if(resp.msg){
          dispatch(Actions.setUserLogin())
        }

      } catch (err) {
        dispatch(Actions.removeUser())
        console.log(err);
      }
  }
  return (
    <div className="container nav_top p-1 ">
      <div className="row align-items-center">
        <div className="logo col-lg-3 d-flex justify-content-between align-items-center">
          <h2 className="text-danger">Store</h2>
          <div
            className="burger"
            onClick={() => {
              setShowMobileNav(!showMobileNav);
            }}
          >
            <i className="fa fa-bars fs-2" aria-hidden="true"></i>
          </div>
        </div>
        {/* style -> with condition */}
        <nav
                    onClick={() => {
                      setShowMobileNav(!showMobileNav);
                    }}
        
          className={"col-lg-9 text-end"}
          style={{ display: showMobileNav && "block" }}
        >
          <Link to="/">
            <i className="fa fa-home h3 icon" aria-hidden="true" ></i>
          </Link>
          <Link to="/login">
            <i className="fa fa-user-circle-o h3 icon" aria-hidden="true"></i>
          </Link>
          <Link to="/cart">
            <i className="fa fa-shopping-cart h3 icon" aria-hidden="true"></i>
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
