import React, {Component} from 'react'
import {NavLink, Route} from 'react-router-dom'
import Template from "./Template"
import "./About.css"

const selectedStyle = {
    backgroundColor: 'white',
    color: 'slategray'
}

class Menu extends Component{
    render(){

        return (
            <div className="about">
                <ul className="about-menu">
                    <li>
                        <NavLink to="/about" exact activeStyle={selectedStyle}>公司简介</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about/history" exact activeStyle={selectedStyle}>公司历史</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about/services" exact activeStyle={selectedStyle}>公司服务</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about/location" exact activeStyle={selectedStyle}>公司位置</NavLink>
                    </li>
                </ul>
                <Route path="/about" exact component={Company}/>
                <Route path="/about/history" exact component={History}/>
                <Route path="/about/services" exact component={Services}/>
                <Route path="/about/location" exact component={Location}/>
            </div>
        )
    }
}

export default class About extends Component {

    render() {
        return (
            <Template>
                <Menu/>
            </Template>
        )
    }
}

class Company extends Component {

    render() {
        return (
            <h3>Compony</h3>
        )
    }
}
class History extends Component {

    render() {
        return (
            <h3>History</h3>
        )
    }
}
class Services extends Component {

    render() {
        return (
            <h3>Services</h3>
        )
    }
}
class Location extends Component {

    render() {
        return (
            <h3>Location</h3>
        )
    }
}