import React from "react";
import { useRef } from "react";

function Header({setSortQ,setSearchQ}) {
    const selectRef = useRef()
    const searchRef = useRef()
    const onSelectChange = () =>{
        let sort = selectRef.current.value;
        setSortQ(sort)
    }
    const onInputChange = () =>{
        let search = searchRef.current.value;
        setSearchQ(search)
    }
  return (
    <div>
      <header>
        <div className="home-header">
          <h1 className="home-title">Welcome to the best outdoor store</h1>
        </div>
        <div className="container">
            <div className="row mt-2 ">
                <div className="col-md-6 mt-2">
                    <input placeholder="Search items " onChange={onInputChange} ref={searchRef} type="text" className="form-control w-75 float-start "/>
                    <button className="btn btn-info">Search</button>
                </div>
                <div className="col-md-6 mt-2">
                    <label className="sort-label me-2 mt-2">Sort by:</label>
                    <select onChange={onSelectChange} ref={selectRef} className="form-select w-50 ">
                    <option value="_id">Newest</option>
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                    </select>
                </div>
            </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
