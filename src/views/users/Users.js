import React, {Component} from 'react'
import {Tabs, List, Checkbox} from 'antd'
import PropTypes from 'prop-types'
import Template from "../Template"
import fetchUtils from '../../utils/FetchUtils'
const TabPane = Tabs.TabPane

function changeColor(obj, backgroundColor) {
    if (obj !== undefined) {
        obj.style.backgroundColor = backgroundColor
    } else {
        console.log("undefined")
    }
}

class UserItem extends Component {
    constructor(props) {
        super(props)
        this.itemKey = this.props.itemKey

        this.state = {
            data: this.props.data
        }
        this.onChangEvent = this.onChangEvent.bind(this)
        this.mouseEnterItem = this.mouseEnterItem.bind(this)
        this.mouseLeaveItem = this.mouseLeaveItem.bind(this)
    }

    onChangEvent(b) {
        console.log(b.target.checked)
        this.props.onCheck(this.itemKey, b.target.checked)
        // var data = this.state.data
        // data.checked = b.target.checked
        // this.setState({
        //     data: data
        // })
    }

    // componentDidMount(){
    //     console.log("componentDidMount")
    // }
    //
    // componentWillUnmount(){
    //     console.log("componentDidMount")
    // }

    mouseEnterItem() {
        var a = document.getElementById(this.itemKey)
        changeColor(a, "#acfffd")
    }

    mouseLeaveItem() {
        var a = document.getElementById(this.itemKey)
        changeColor(a, "#fff")
    }

    render() {
        return (
            <div id={this.itemKey}
                 style={{
                     display: "flex",
                     width: "100%",
                     height: "100%",
                     backgroundColor: "#fff",
                     paddingTop: 10,
                     paddingBottom: 10,
                     paddingLeft: 24,
                     paddingRight: 24
                 }}
                 onMouseEnter={this.mouseEnterItem}
                 onMouseLeave={this.mouseLeaveItem}>
                <Checkbox style={{marginRight: 50}} checked={this.props.checked}
                          onChange={this.onChangEvent}/>
                <div style={{width: "calc(100% - 66px)", display: "flex"}}>
                    <div style={{
                        width: "20%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}>{this.state.data.nickname}</div>
                    <div style={{
                        width: "20%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}>{`${this.state.data.sex == 0 ? "男" : "女"}`}</div>
                    <div style={{
                        width: "20%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}>{this.state.data.phone}</div>
                    <div style={{
                        width: "20%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}>{this.state.data.email}</div>
                    <div style={{
                        width: "20%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}>{this.state.data.createtime}</div>
                </div>
            </div>
        )
    }
}
class UserHead extends Component {
    constructor(props) {
        super(props)
        this.data = this.props.data

        this.onChangeEvent = this.onChangeEvent.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.data = nextProps.data
    }

    onChangeEvent(a) {
        this.props.onCheck(a.target.checked)
    }

    render() {

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    padding: "0",
                }}>
                <Checkbox style={{marginRight: 50}} checked={this.data.checked}
                          onChange={this.onChangeEvent}/>
                <div style={{width: "calc(100% - 66px)", display: "flex"}}>
                    <label style={{
                        width: "20%", overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: "#708090"
                    }}>昵称</label>
                    <label style={{
                        width: "20%", overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: "#708090"
                    }}>性别</label>
                    <label style={{
                        width: "20%", overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: "#708090"
                    }}>手机号</label>
                    <label style={{
                        width: "20%", overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: "#708090"
                    }}>邮箱</label>
                    <label style={{
                        width: "20%", overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: "#708090"
                    }}>注册时间</label>
                </div>
            </div>
        )
    }
}

class UsersScreen extends Component {

    static contextTypes = {
        router: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            data: [],
            check: false
        }

        this.showData = []
        this.selectData = []

        this.pageNum = 1
        this.pageSize = 8
        this.dataShowStart = 0
        this.dataShowEnd = 0
        this.checkedSize = 0
        this.currentPageSize = 0

        this.userState = this.props.userState
        this.update = true
        this.refreshData = this.refreshData.bind(this)
        this.renderItem = this.renderItem.bind(this)
        this.callback = this.callback.bind(this)
        this.errorcallback = this.errorcallback.bind(this)
        this.checkAll = this.checkAll.bind(this)
        this.checkItem = this.checkItem.bind(this)
    }

    componentWillMount() {
        this.refreshData()
    }

    refreshData() {
        console.log("refreshData")
        var token = localStorage.getItem("token")
        var header = {
            "x-us-authtype": 1,
            "time-zone": -8,
            "accept-language": "en",
            "x-us-token": token
        }

        fetchUtils.setHeader(header)
        fetchUtils.setServer("192.168.150.130:8081")
        var params
        if (this.userState === "all") {

        } else if (this.userState === "woman") {
            params = {sex: 0}
        } else if (this.userState === "man") {
            params = {sex: 1}
        }
        fetchUtils.getUsers(params, this.callback, this.errorcallback)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.clickCount !== this.props.clickCount) {
            this.setState({
                loading: true,
                data: [{id: "", checked: false}]
            })
            this.refreshData()
        }
    }

    callback(json) {
        var data = []
        var showData = this.showData

        if (json.error_code !== 0) {
            if (json.error_code === 101) {
                this.context.router.history.push("/login")
            }
            return
        }

        data.push.apply(data, json.userinfolist)

        this.dataShowStart = 0
        if (this.pageSize > data.length) {
            this.dataShowEnd = data.length
            showData.push.apply(showData, json.userinfolist)
        } else {
            this.dataShowEnd = this.pageSize
            for (var user in json.userinfolist) {
                showData.push(user)
            }
        }

        this.showData = showData
        this.currentPageSize=this.dataShowEnd-this.dataShowStart

        this.setState({
            loading: false,
            data: data,
            check:false
        })
    }

    errorcallback(error) {
        console.log(error)
    }

    checkAll(b) {
        this.selectData = []
        for (var i = this.dataShowStart; i < this.dataShowEnd; i++) {
            var user = this.state.data[i]
            if (b) {
                this.selectData.push(user)
            }
        }
        this.checkedSize = b ? this.currentPageSize : 0
        this.setState({
            data: this.state.data,
            check: b
        })
    }

    checkItem(id, b) {
        var data = this.state.data

        for (var i = this.dataShowStart; i < this.dataShowEnd; i++) {
            if (data[i].id === id) {
                if (b) {
                    this.checkedSize = this.checkedSize + 1
                    this.selectData.push(data[i])
                } else {
                    this.checkedSize = this.checkedSize - 1

                    for(var j=0;j<this.selectData.length;j++){
                        if(this.selectData[j].id===id) {
                            this.selectData.splice(j, 1);
                        }
                    }
                }
            }
        }

        this.setState({
            data: data,
            check: this.checkedSize === this.currentPageSize ? true : false
        })
    }

    renderItem(item, key) {
        //分页的时候不能使用这个key，这个key是item在界面上的索引。分页的时候需要用唯一的id
        // return (
        //         <UserItem itemKey={item.id} data={item} onCheck={this.checkItem}/>
        // )

        for(var index in this.selectData){
            if (this.selectData[index].id===item.id){

                return (
                    <List.Item key={item.id} style={{padding: 0}}>
                        <UserItem itemKey={item.id} checked={true} data={item} onCheck={this.checkItem}/>
                    </List.Item>
                )
            }
        }
        return (
            <List.Item key={item.id} style={{padding: 0}}>
                <UserItem itemKey={item.id} checked={false} data={item} onCheck={this.checkItem}/>
            </List.Item>
        )
    }

    render() {
        if (this.state.loading) {
            return <h1>loading</h1>
        } else {
            return (
                <List
                    pagination={{
                        onChange: (page) => {
                            this.pageNum = page
                            this.dataShowStart = ((this.pageNum - 1) * this.pageSize)
                            this.dataShowEnd = this.state.data.length > (this.pageNum * this.pageSize) ? this.pageNum * this.pageSize : this.state.data.length
                            this.currentPageSize=this.dataShowEnd-this.dataShowStart
                            this.selectData=[]
                            this.checkedSize=0
                            this.setState({
                                check:false
                            })
                        },
                        pageSize: this.pageSize,
                    }}
                    header={
                        <UserHead data={{checked: this.state.check}} onCheck={this.checkAll}/>
                    }
                    split={true}
                    bordered={true}
                    dataSource={this.state.data}
                    renderItem={(item, key) => this.renderItem(item, key)}
                />

            )
        }

    }
}

class UsersTab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabAllCount: 1,
            tabWomanCount: 1,
            tabManCount: 1
        }
        this.callback = this.callback.bind(this)
        this.tabClick = this.tabClick.bind(this)
    }

    callback(key) {

        if (key == 1) {
            this.setState({
                tabAllCount: this.state.tabAllCount + 1
            })
        } else if (key == 2) {
            this.setState({
                tabWomanCount: this.state.tabWomanCount + 1
            })
        } else if (key == 3) {
            this.setState({
                tabManCount: this.state.tabManCount + 1
            })
        }
    }

    tabClick(key) {
        // console.log(key)
    }

    render() {
        return (
            <Tabs style={{
                flexGrow: 1, marginLeft: 30, minWidth: 600, minHeight: 800
            }}
                  animated={false}
                  defaultActiveKey="1"
                  onChange={this.callback}
                  onTabClick={this.tabClick}>
                <TabPane tab="All" key="1">
                    <UsersScreen
                        clickCount={this.state.tabAllCount}
                        userState="all"/>
                </TabPane>
                <TabPane tab="Woman" key="2">
                    <UsersScreen
                        clickCount={this.state.tabWomanCount}
                        userState="woman"/>
                </TabPane>
                <TabPane tab="Man" key="3">
                    <UsersScreen
                        clickCount={this.state.tabManCount}
                        userState="man"/>
                </TabPane>
            </Tabs>
        )
    }
}

export default class Users extends Component {

    render() {
        return (
            <Template>
                <UsersTab/>
            </Template>
        )
    }
}