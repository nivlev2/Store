import React, { useState } from "react";
import { Link } from "react-router-dom";
function NavBar(props) {
  let [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <div className="container nav_top p-2 ">
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
          className={"col-lg-9 text-end"}
          style={{ display: showMobileNav && "block" }}
        >
          <Link to="/">
            <i class="fa fa-home h3" aria-hidden="true"></i>
          </Link>
          <Link to="/login">
            <i class="fa fa-user-circle-o h3" aria-hidden="true"></i>
          </Link>
          <Link to="/cart">
            <i class="fa fa-shopping-cart h3" aria-hidden="true"></i>
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
