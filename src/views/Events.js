import React,{Component} from 'react'
import {NavLink,Route} from 'react-router-dom'
import Template from './Template'
import "./Events.css"

const selectedStyle = {
    backgroundColor: 'white',
    color: 'slategray'
}

export default class Events extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <Template>
                <section className="events-section">
                    <h1>企业大事件</h1>
                </section>
            </Template>
        )
    }
}