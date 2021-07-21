import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Actions } from "../actions";
import { API_URL, doApiMethod } from "../services/apiSer";
import "../css_comps/cart.css";
import { toast } from "react-toastify";
import SingleCart from "./SingleCart";
function Cart(props) {
  let [wasChange, setWasChange] = useState(false);
  let login = useSelector((state) => state.login);
  let cart = useSelector((state) => state.cartList);
  let showCart = useSelector((state) => state.showCart);
  let total = useSelector((state) => state.total);
  let dispatch = useDispatch();
  useEffect(() => {
    getCart();
  }, [login, wasChange]);
  const getCart = () => {
    try {
      if (login) {
        dispatch(Actions.getUserCart());
      } else {
        dispatch(Actions.resetUserCart());
      }
    } catch (err) {
      return err;
    }
  };
  const delOne = async (_id) => {
    if (login) {
      try {
        const url = API_URL + "/users/deleteOne";
        const response = await doApiMethod(url, "PUT", { _id: _id });
        if (response.n === 1) {
          // getCart()
          setWasChange(!wasChange);
          toast("Item removed");
        }
      } catch (e) {
        dispatch(Actions.removeUser());
        toast.info("Your season expired login again");
      }
    } else {
      console.log("from here");
      let cart = JSON.parse(localStorage["cart"]);
      delete cart[_id];
      let showCart = JSON.parse(localStorage["showCart"]).filter(
        (item) => item._id !== _id
      );
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("showCart", JSON.stringify(showCart));
      setWasChange(!wasChange);
      toast("Item removed");
    }
  };
  const updateAmount = async (_id, amount) => {
    if (login) {
      try {
        const url = API_URL + "/users/updateCheckout";
        const resp = await doApiMethod(url, "PUT", {
          _id: _id,
          amount: amount,
        });
        setWasChange(!wasChange);
      } catch (e) {
        dispatch(Actions.removeUser());
        toast.info("Your season expired login again");
      }
    } else {
      let cart = JSON.parse(localStorage["cart"]);
      cart[_id] = amount;
      localStorage.setItem("cart", JSON.stringify(cart));
      setWasChange(!wasChange);
    }
  };
  const totalItems = () => {
    let total = 0;
    for (let key in cart) {
      total += cart[key];
    }
    return total;
  };
  // if(!login){
  //     return(
  //         <div>
  //     <div className="notLoginCart">
  //     </div>
  //         <div className="container z-i ">
  //         <h4>You have to log in in order to add item to your cart</h4>
  //             <Link Name="btn btn-primary" to="/login">Click here to Login</Link>
  //     </div>
  //     </div>
  //     )
  // }
  if (showCart.length === 0) {
    return (
      <div>
        <div className="container-empty-cart"></div>
        <div className="z-i-2">
          <h2 className="empty-cart-title mb-5">Your cart is empty</h2>
          <Link to="/" className="btn btn-light">
            Cick here and start shopping
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9">
          <table className="table table-striped  mt-5 ">
            <thead className="bg-warning text-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th></th>
                <th>amount</th>
                <th>price</th>
              </tr>
            </thead>
            <tbody>
              {showCart.map((item, i) => {
                let itemAmount = cart[item._id];
                return (
                  <SingleCart
                    key={item._id}
                    updateAmount={updateAmount}
                    delOne={delOne}
                    itemAmount={itemAmount}
                    item={item}
                    i={i}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="col-lg-3 mt-5  border-left 1px">
          <h4>
            Subtotal:{total}$ ({totalItems()} items){" "}
          </h4>
          <Link to="/checkout">
            <button className="checkout-btn btn btn-light mt-3">
              {" "}
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
