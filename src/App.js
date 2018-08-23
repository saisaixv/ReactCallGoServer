import React, {Component} from 'react';
import {
    Button,
    Input,
    Icon,

} from  'antd'

import fetchUtils from "./utils/FetchUtils"
import PropTypes from 'prop-types'
import './App.css';
import 'antd/dist/antd.css'

function changeColor(obj, color, weight) {
    if (obj !== undefined) {
        obj.style.color = color
        obj.style.fontWeight = weight
    } else {
        console.log("undefined")
    }
}

class App extends Component {

    static contextTypes={
        router:PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props)
        this.id_a_email = "a_email"
        this.id_a_mobile = "a_mobile"
        this.id_i_account="i_account"
        this.id_i_pwd="i_pwd"

        this.state = {
            currentSelect: this.id_a_email,
        }

        this.onSelectEmail = this.onSelectEmail.bind(this)
        this.onSelectMobile = this.onSelectMobile.bind(this)
        this.onMouseEnterEmail = this.onMouseEnterEmail.bind(this)
        this.onMouseEnterMobile = this.onMouseEnterMobile.bind(this)
        this.onMouseLeaveEmail = this.onMouseLeaveEmail.bind(this)
        this.onMouseLeaveMobile = this.onMouseLeaveMobile.bind(this)
        this.onLoginClick = this.onLoginClick.bind(this)
        this.onRegisterClick = this.onRegisterClick.bind(this)
        this.callback = this.callback.bind(this)
        this.errorcallback = this.errorcallback.bind(this)

        fetchUtils.setServer("localhost:8080")
        var header={
            "x-us-authtype":1,
            "time-zone":-8,
            "accept-language":"en"
        }
        fetchUtils.setHeader(header)

    }

    componentDidMount() {
        // var a=document.all(this.a_id)
        //
        // for(var i=0;i<a.length;i++){
        //     a[i].addEventListener("mouseenter",function () {
        //         changeColor(this,"#e43942","bold")
        //     })
        //     a[i].addEventListener("mouseleave",function () {
        //         changeColor(this,"#666666","")
        //     })
        // }

    }


    onLoginClick(){

        var account=document.getElementById(this.id_i_account).value
        var pwd=document.getElementById(this.id_i_pwd).value

        if (account=="" || pwd==""){
            return
        }

        var params={
            identify_type:this.state.currentSelect==this.id_a_email?"email":"phone",
            identifier:`${account}`,
            credential:`${pwd}`
        }
        fetchUtils.login(params,this.callback,this.errorcallback)
    }

    callback(json){
        console.log(`josn = ${json.token}`)

        var header={
            "x-us-authtype":1,
            "time-zone":-8,
            "accept-language":"en",
            "x-us-token":`${json.token}`
        }

        fetchUtils.setHeader(header)

        this.context.router.history.push('/home')
    }

    errorcallback(error){
        console.log(`josn = ${JSON.stringify(error)}`)
    }

    onRegisterClick(){

    }

    onSelectEmail() {
        if (this.state.currentSelect === this.id_a_email) {
            return
        }
        this.setState({
            currentSelect: this.id_a_email
        })
        console.log("选择email")
        document.getElementById(this.id_i_account).value=""
        document.getElementById(this.id_i_pwd).value=""
    }

    onSelectMobile() {
        if (this.state.currentSelect === this.id_a_mobile) {
            return
        }
        this.setState({
            currentSelect: this.id_a_mobile
        })
        console.log("选择mobile")
        document.getElementById(this.id_i_account).value=""
        document.getElementById(this.id_i_pwd).value=""
    }

    onMouseEnterEmail() {
        if (this.state.currentSelect === this.id_a_email) {
            return
        }
        var a = document.getElementById(this.id_a_email)
        changeColor(a, "#e43942", "bold")
    }


    onMouseLeaveEmail() {
        if (this.state.currentSelect === this.id_a_email) {
            return
        }
        var a = document.getElementById(this.id_a_email)
        changeColor(a, "#666666", "")
    }

    onMouseEnterMobile() {
        if (this.state.currentSelect === this.id_a_mobile) {
            console.log("email");
            return
        }
        var a = document.getElementById(this.id_a_mobile)
        changeColor(a, "#e43942", "bold")
    }


    onMouseLeaveMobile() {
        if (this.state.currentSelect === this.id_a_mobile) {
            console.log("email");
            return
        }
        var a = document.getElementById(this.id_a_mobile)
        changeColor(a, "#666666", "")
    }

    render() {

        var selectStyle = {
            color: "#e43942",
            fontSize: "20px",
            fontWeight: "bold",
            textDecoration: "none"
        }
        var normalStyle = {
            color: "#666666",
            fontSize: "20px",
            fontWeight: "",
            textDecoration: "none"
        }

        var aaa = this.state.currentSelect == this.id_a_email ? "mail" : "mobile"

        return (
            <div className="App">

                <div style={{
                    display: "flex",
                    height: 600,
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <div
                        style={{
                            marginTop: 50,
                            width: 300,
                            height: 200,
                            borderWidth: 2,
                            borderColor: "#0f0",
                        }}>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}>
                            <div style={{
                                width: "100%"
                            }}>
                                <a
                                    id={this.id_a_email}
                                    style={this.state.currentSelect == this.id_a_email ? selectStyle : normalStyle}
                                    onMouseEnter={this.onMouseEnterEmail}
                                    onMouseLeave={this.onMouseLeaveEmail}
                                    href="javascript:void(0)"
                                    onClick={this.onSelectEmail}>邮箱登录</a>
                            </div>
                            <div style={{width: 1, height: 15, backgroundColor: "#000"}}/>
                            <div
                                style={{
                                    width: "100%"
                                }}>
                                <a
                                    id={this.id_a_mobile}
                                    style={this.state.currentSelect == this.id_a_mobile ? selectStyle : normalStyle}
                                    onMouseEnter={this.onMouseEnterMobile}
                                    onMouseLeave={this.onMouseLeaveMobile}
                                    href="javascript:void(0)"
                                    onClick={this.onSelectMobile}>手机登录</a>
                            </div>
                        </div>
                        <Input id={this.id_i_account} placeholder={this.state.currentSelect == this.id_a_email ? "mail" : "mobile"}
                               style={{marginTop: 10}} addonBefore={<Icon
                            type={this.state.currentSelect == this.id_a_email ? "mail" : "mobile"}/>}/>
                        <Input id={this.id_i_pwd} type="password" placeholder="password" style={{marginTop: 10}} addonBefore={<Icon type="lock"/>}/>
                        <div style={{
                            display: "flex",
                            width: "100%",
                            marginTop:10
                        }}>
                            <Button style={{width: "100%"}} onClick={this.onLoginClick}>登录</Button>
                            <div style={{width:20,height:1}}></div>
                            <Button style={{width: "100%"}}>注册</Button>
                        </div>
                    </div>

                </div>
                <Button type="primary">Button</Button>
            </div>
        )

        // return (
        //   <div className="App">
        //     <header className="App-header">
        //       <img src={logo} className="App-logo" alt="logo" />
        //       <h1 className="App-title">Welcome to React</h1>
        //     </header>
        //     <p className="App-intro">
        //       To get started, edit <code>src/App.js</code> and save to reload.
        //     </p>
        //   </div>
        // );
    }
}

export default App;
