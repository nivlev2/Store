import "../css_comps/TopBar.scss";
import { SvgIcon } from '@material-ui/core';

import {Person,Mail} from "@material-ui/icons"
import { useState } from "react";
export default function TopBar(){
    const [menuOpen,setMenuOpen] = useState(false)
    const openMenu = () =>{
        setMenuOpen(!menuOpen)
    }
    return (
        <div className= {menuOpen ? "topBar active" : "topBar"}>
            <div className="wrapper">
                <div className="left">
                    <div className="logo">
                        Niv Levi
                    </div>
                    <div className="itemContainer">
                        <Person className="icon"/>
                        <span>0549000802</span>
                    </div>
                    <div className="itemContainer">
                        <Mail className="icon"/>
                        <span>nivlev3@gmail.com</span>
                    </div>

                </div>
                <div className="right">
                    <div className="haburger" onClick={openMenu}>
                        <span className="line1"></span>
                        <span className="line2"></span>
                        <span className="line3"></span>
                    </div>
                </div>                 
            </div>
        </div>
    )
}