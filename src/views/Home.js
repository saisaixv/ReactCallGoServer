import React, {Component} from 'react';

import {BrowserRouter, Route, Switch} from 'react-router-dom'

import About from './About'
import Users from './users/Users'
import Main from './Main'
import Contact from './Contact'
import Products from './Products'
import Login from './Login'
import Register from './register/Register'
import Test from './test/Test'


class Home extends Component {

    render() {

        return (
            <BrowserRouter>
                <div style={{height:"100%",width:"100%",paddingTop:20,paddingLeft:20,paddingRight:20,backgroundColor:"#f3f7ff"}}>
                    <Switch>
                        <Route path="/" exact component={Main}/>
                        <Route path="/about" component={About}/>
                        <Route path="/users" component={Users}/>
                        <Route path="/products" component={Products}/>
                        <Route path="/contact" component={Contact}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/test" component={Test}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )

        // return (
        //     <BrowserRouter>
        //         <div>
        //             <Switch>
        //                 <Route path="/" component={Home2}/>
        //                 <Route path="/about" component={About.js}/>
        //                 <Route path="/contact" component={Contact}/>
        //                 <Route path="/products" component={Products}/>
        //                 <Route path="/events" component={Events}/>
        //                 <Redirect to="about/history" from="/history"/>
        //                 <Route path="/details/:type" component={Details}/>
        //                 <Route component={NotFound404}/>
        //             </Switch>
        //         </div>
        //     </BrowserRouter>
        // )
    }
}

export default Home;