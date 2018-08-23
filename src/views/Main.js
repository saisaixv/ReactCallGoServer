import React,{Component} from 'react'
import {Link} from "react-router-dom"
import "./Main.css"
import PropTypes from 'prop-types'

export default class Main extends Component{

    static contextTypes={
        router:PropTypes.object.isRequired,
    }

    componentDidMount(){
        var token=localStorage.getItem("token")

        console.log(token)
        if(token===undefined || token===""){
            this.context.router.history.push('/login')
            return
        }
    }

    render(){
        return (
            <section className="main">
                <h1>企业网站</h1>
                <nav>
                    <Link to="/about">关于我们</Link>
                    <Link to="/users">用户</Link>
                    <Link to="/products">公司产品</Link>
                    <Link to="/contact">联系我们</Link>
                </nav>
            </section>
        )
    }
}