import React,{Component} from 'react'

import MainMenu from './MainMenu'
import './Template.css'

export default class Template extends Component{

    render(){
        return (
            <div className="template">
                <MainMenu/>
                {this.props.children}
            </div>
        )
    }
}