import React,{Component} from 'react'
import Template from './Template'
import "./Products.css"

export default class Products extends Component{

    render(){
        return(
            <Template>
                <section className="products-section">
                    <h1>公司产品</h1>
                </section>
            </Template>
        )
    }
}