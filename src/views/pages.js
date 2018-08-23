import React, {Component} from 'react'
import {Link, NavLink, Route} from 'react-router-dom'


const selectedStyle = {
    backgroundColo: 'white',
    color: 'slategray'
}

export class Home2 extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <nav style={{
                    display: "flex",
                    justifyContent: 'space-around',
                    padding: "1em",
                    width: "calc(100%-2em)",
                    backgroundColor: 'slategray',
                    borderTop: "dashed 0.5em ghostwhite",
                    borderBottom: "dashed 0.5em ghostwhite",
                }}>
                    <Link
                        style={{
                            fontSize: "2em",
                            color: "ghostwhite",
                            flexBasis: "200px",
                            marginLeft: "10px",
                            marginRight: "10px"
                        }}
                        to="/about">关于我们</Link>
                    <Link
                        style={{
                            fontSize: "2em",
                            color: "ghostwhite",
                            flexBasis: "200px",
                            marginLeft: "10px",
                            marginRight: "10px"
                        }}
                        to="/products">公司产品</Link>
                    <Link
                        style={{
                            fontSize: "2em",
                            color: "ghostwhite",
                            flexBasis: "200px",
                            marginLeft: "10px",
                            marginRight: "10px"
                        }}
                        to="/events">企业事件</Link>
                    <Link
                        style={{
                            fontSize: "2em",
                            color: "ghostwhite",
                            flexBasis: "200px",
                            marginLeft: "10px",
                            marginRight: "10px"
                        }}
                        to="/contact">联系我们</Link>
                </nav>
            </section>

        )
    }
}

export class About extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log("about");
        return (
            <div style={{
                display: "flex",
            }}>
                <nav>
                    <NavLink to="/">首页</NavLink>
                    <NavLink to="/about" activeStyle={selectedStyle}>关于我们</NavLink>
                    <NavLink to="/events" activeStyle={selectedStyle}>企业事件</NavLink>
                    <NavLink to="/products" activeStyle={selectedStyle}>公司产品</NavLink>
                    <NavLink to="/contact" activeStyle={selectedStyle}>联系我们</NavLink>
                </nav>
                <section>
                    <ul>
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
                </section>
            </div>
        )
    }
}

class Company extends Component {
    render() {
        return (
            <section>
                <p>公司简介</p>
            </section>
        )
    }
}
class Services extends Component {
    render() {
        return (
            <section>
                <p>公司简介</p>
            </section>
        )
    }
}
class Location extends Component {
    render() {
        return (
            <section>
                <p>公司简介</p>
            </section>
        )
    }
}
class History extends Component {
    render() {
        return (
            <section>
                <p>公司简介</p>
            </section>
        )
    }
}