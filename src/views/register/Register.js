import React, {Component} from 'react'
import {Icon, Input, Select, Steps, Button, message} from 'antd'
import PropTypes from 'prop-types'
import fetchUtils from "../../utils/FetchUtils"
const InputGroup = Input.Group
const Option = Select.Option
const Step = Steps.Step;

function changeColor(obj, color, weight) {
    if (obj !== undefined) {
        obj.style.color = color
        obj.style.fontWeight = weight
    } else {
        console.log("undefined")
    }
}

class VerifyMobile extends Component {

    constructor(props) {
        super(props)

        this.options = [
            {
                label: "中国"
            },
            {
                label: "美国"
            },
            {
                label: "新加坡"
            },
        ]

        this.id_i_mobile = "i_mobile"

        this.getOptions = this.getOptions.bind(this)
        this.click = this.click.bind(this)
    }

    getOptions() {
        console.log("getOptions")
        var list = this.options.map((item, index) => {
            return <Option key={index} value={item.label}>{item.label}</Option>
        })
        return list
    }

    click() {
        var mobile = document.getElementById(this.id_i_mobile)
        if (mobile.value === "") {
            message.error("请先填入手机号")
            return
        }
        this.props.onVerify(mobile.value)
    }

    render() {
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
            }}>
                <InputGroup
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: 10,
                        marginBottom: 10
                    }} compact>
                    <Select defaultValue={this.options[0].label}>
                        {this.getOptions()}
                    </Select>
                    <Input id={this.id_i_mobile}/>
                </InputGroup>
                <Button
                    style={{
                        marginTop: 10,
                        marginBottom: 10
                    }}
                    onClick={this.click}
                    type="danger" block>下一步</Button>
            </div>
        )
    }
}

class EnterAccountInfo extends Component {

    constructor(props) {
        super(props)

        this.id_i_username = "i_username"
        this.id_i_pwd = "i_pwd"
        this.id_i_verify_pwd = "i_verify_pwd"
        this.id_i_email = "i_email"
        this.id_i_captcha = "i_captcha"
        this.click = this.click.bind(this)
    }

    click() {

        var username = document.getElementById(this.id_i_username).value
        var pwd = document.getElementById(this.id_i_pwd).value
        var verifyPwd = document.getElementById(this.id_i_verify_pwd).value
        var email = document.getElementById(this.id_i_email).value
        var captcha = document.getElementById(this.id_i_captcha).value

        if (username === "" || pwd === "" || verifyPwd === "" || email === "" || captcha === "") {
            message.error("请将信息填写完整")
            return
        }

        console.log(pwd)
        console.log(verifyPwd)

        if (pwd !== verifyPwd) {
            message.error("确认密码不正确")
            return
        }

        var info = {
            username: username,
            pwd: pwd,
            email: email,
            captcha: captcha
        }
        this.props.onRegister(info)
    }

    render() {
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
            }}>

                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                    marginBottom: 10,
                    padding: 10,
                }}>
                    <label style={{width: 100}}>用户名</label>
                    <Input id={this.id_i_username} placeholder="用户名"/>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                    marginBottom: 10,
                    padding: 10,
                }}>
                    <label style={{width: 100}}>设置密码</label>
                    <Input id={this.id_i_pwd} placeholder="设置密码"/>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                    marginBottom: 10,
                    padding: 10,
                }}>
                    <label style={{width: 100}}>确认密码</label>
                    <Input id={this.id_i_verify_pwd} placeholder="确认密码"/>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                    marginBottom: 10,
                    padding: 10,
                }}>
                    <label style={{width: 100}}>邮箱验证</label>
                    <Input id={this.id_i_email} placeholder="邮箱验证"/>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                    marginBottom: 10,
                    padding: 10,
                }}>
                    <label style={{width: 100}}>邮箱验证码</label>
                    <Input id={this.id_i_captcha} placeholder="邮箱验证码"/>
                </div>

                <Button onClick={this.click} type="danger" block>立即注册</Button>
            </div>
        )
    }
}

class Finish extends Component{

    login(){
        this.props.onLogin()
    }
    render(){
        return (
            <div>
                <h1>注册完成</h1>
                <Button onClick={()=>this.login()}>登录</Button>
            </div>
        )
    }
}

export default class Register extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired,
    }
    constructor(props) {
        super(props)
        this.state = {
            current: 0,
        }

        this.userInfo={}

        this.steps=[{
            title: '确认手机',
            content: '确认手机',
        }, {
            title: '填写帐号信息',
            content: 'Second-content',
        }, {
            title: '注册成功',
            content: 'Last-content',
        }]

        this.id_a_enterprise = "a_enterprise"
        this.id_a_international = "a_international"

        this.renderContent = this.renderContent.bind(this)
        this.verifyClick = this.verifyClick.bind(this)
        this.registerClick = this.registerClick.bind(this)
        this.loginClick = this.loginClick.bind(this)
        this.callback = this.callback.bind(this)
        this.errorcallback = this.errorcallback.bind(this)

        fetchUtils.setServer("localhost:8080")
        var header = {
            "x-us-authtype": 1,
            "time-zone": -8,
            "accept-language": "en"
        }
        fetchUtils.setHeader(header)

    }

    next() {
        const current = this.state.current + 1;
        this.setState({current});
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({current});
    }

    enterpriseUserEnter() {
        var a = document.getElementById(this.id_a_enterprise)
        changeColor(a, "#f00", "")
    }

    enterpriseUserLeave() {
        var a = document.getElementById(this.id_a_enterprise)
        changeColor(a, "#666", "")

    }

    internationalEnter() {
        var a = document.getElementById(this.id_a_international)
        changeColor(a, "#f00", "")
    }

    internationalLeave() {
        var a = document.getElementById(this.id_a_international)
        changeColor(a, "#666", "")
    }

    verifyClick(mobile) {
        console.log(mobile)
        message.success("手机验证成功")
        this.setState({
            current: this.state.current + 1
        })
        this.userInfo["phone"]=mobile
    }

    registerClick(info) {
        console.log(`${info}`)

        this.userInfo["nickname"]=info.username
        this.userInfo["credential"]=info.pwd
        this.userInfo["email"]=info.email
        this.userInfo["avatar"]="sdasdasdasda"

        fetchUtils.register(this.userInfo,this.callback,this.errorcallback)
    }

    callback(json){
        console.log(`${JSON.stringify(json)}`)
        if(json.error_code!==0){
            message.error("注册失败")
            return
        }
        message.success("注册成功")
        this.setState({
            current: this.state.current + 1
        })
    }

    errorcallback(error){
        console.log(`${JSON.stringify(error)}`)
    }

    loginClick(){
        this.context.router.history.push("/login")
    }

    renderContent(current) {
        if (current === 0) {
            return <VerifyMobile onVerify={this.verifyClick}/>
        } else if (current === 1) {
            return <EnterAccountInfo onRegister={this.registerClick}/>
        } else if (current === 2) {
            return <Finish onLogin={this.loginClick}/>
        }

    }

    render() {
        const {current} = this.state;

        return (
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
            }}>
                <div style={{
                    marginTop:50,
                    display: "flex",
                    flexDirection: "column",
                    width: 600,
                    minWidth: 200,
                    justifyContent: "center"
                }}>
                    <Steps current={current}>
                        {this.steps.map((item,index) => {
                            if(index<current){
                                return <Step status="finish" key={index} title={item.title}/>
                            }
                            return <Step key={index} title={item.title}/>
                        })}
                    </Steps>

                    {this.renderContent(current)}

                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center"
                            }}
                            onMouseEnter={() => this.enterpriseUserEnter()}
                            onMouseLeave={() => this.enterpriseUserLeave()}
                        >
                            <Icon type="user"/>
                            <a id={this.id_a_enterprise} style={{marginLeft: 10, color: "#666", textDecoration: "none"}}
                               href="javascript:void(0)">企业用户注册</a>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center"
                            }}
                            onMouseEnter={() => this.internationalEnter()}
                            onMouseLeave={() => this.internationalLeave()}
                        >
                            <Icon type="mail"/>
                            <a id={this.id_a_international}
                               style={{marginLeft: 10, color: "#666", textDecoration: "none"}}
                               href="javascript:void(0)">国际站注册</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}