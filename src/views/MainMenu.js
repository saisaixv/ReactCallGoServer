import React,{Component} from 'react'
import {NavLink} from "react-router-dom"
import "./MainMenu.css"

const selectStyle={
    backgroundColor:"white",
    color:"slategray"
}

export default class MainMenu extends Component{
    render(){
        return(
            <nav className="main-menu">
                <NavLink to="/">首页</NavLink>
                <NavLink to="/about" activeStyle={selectStyle}>关于我们</NavLink>
                <NavLink to="/users" activeStyle={selectStyle}>用户</NavLink>
                <NavLink to="/products" activeStyle={selectStyle}>公司产品</NavLink>
                <NavLink to="/contact" activeStyle={selectStyle}>联系我们</NavLink>
            </nav>
        )
    }
}