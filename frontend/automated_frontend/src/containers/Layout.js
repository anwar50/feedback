import React from "react";
import { Layout, Menu, Breadcrumb, Avatar, Popover} from 'antd';
import {Link, withRouter} from "react-router-dom";
import "../css/Layout.css"
import {connect} from "react-redux";
import * as actions from "../store/actions/authActions";
import axios from "axios";
const { Header, Content, Footer } = Layout;
class CustomLayout extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            users: [],
            profile: [],
            profilePic: ""
        }
    }
    componentDidMount(){
        axios.all([
            axios.get('http://127.0.0.1:8000/api/users'),
            axios.get('http://127.0.0.1:8000/api/list/profile'),
        ])
        .then(axios.spread((users, profile) => {
                this.setState({
                    users: users.data,
                    profile: profile.data,
                })
                console.log(this.state.users)
                console.log(this.state.profile)
                
        }))
        // if(this.props.signup == true)
        // {
        //     this.props.history.push('/login');  
        // }
    }
    logout = () => {
        this.props.isAuthenticated = false;
        this.props.history.push('/login');  
    }
    render(){
        let tempUsers = this.state.users
        let tempProfile = this.state.profile
        let id = this.props.username
        let user_id = 0
        let profile_picture = ""
        let department = ""
        let role = ""
        console.log(this.props.signup)
        tempUsers.map(function(item, i){
            if(item.username == id)
            {
              user_id = item.id
            } 
            console.log(user_id)
        })
        tempProfile.map(function(item, i){
            if(item.user == user_id)
            {                
                profile_picture = item.avatar;
                department = item.department;
                role = item.user_type;
            }
        })
        const profileContent = (
            <div>
              <p>Name: {id}</p>
              <p>Department: {department}</p>
              <p>Role: {role}</p>
            </div>
          );
        return(
            <Layout className="layout">
            <Header>
            <div className="logo" />
            <Menu
                align = "right"
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['5']}
                style={{ lineHeight: '64px', fontSize: '15px'}}
            >
                <Menu.Item style={{float: 'left', color: 'skyblue', fontSize: '29px'}} key="22">
                   <Link to="/">QM Feedback</Link>
                </Menu.Item>
                {
                    this.props.isAuthenticated ?                     
                    <Menu.Item key="6" onClick={this.props.logout} style={{ justifyContent: 'space-between'}}>
                        Logout
                    </Menu.Item>
                     :
                    <Menu.Item key="4">
                        <Link to="/login"> Login </Link>
                    </Menu.Item>
                }
                {
                    this.props.isAuthenticated ? 
                    <Menu.Item key="1">
                            <Link to={'/modulesList/' + this.props.username + '/'}>Modules that you teach</Link>
                    </Menu.Item>
                    :
                    null
                }
                {
                    this.props.isAuthenticated ?
                    <Menu.Item key="2">
                            <Link to={'/savedtests/' + this.props.username + '/'}>Saved tests</Link>
                        </Menu.Item>
                    : 
                    null
                }
                {
                    this.props.isAuthenticated ?
                    <Menu.Item key="7">
                            <Link to={'/savedfeedbacks/' + this.props.username + '/'}>Saved Feedback</Link>
                        </Menu.Item>
                    : 
                    null
                }
                <Menu.Item key="3">
                    <Link to="/grade">Grade Mechanism</Link>
                </Menu.Item>
                <Menu.Item key="37">
                    <Link to="/contact">Contact Us</Link>
                </Menu.Item> 
                <Menu.Item key="8">
                    <Link to="/FAQ">FAQ</Link>
                </Menu.Item>
                {
                    this.props.isAuthenticated ? 
                    
                    <Menu.Item key="56">
                        <Popover content={profileContent} style={{textAlign: 'center'}} title="Your Profile">
                            <Avatar size={54} src={profile_picture} />
                        </Popover>
                    </Menu.Item>
                    :
                    null
                }
                
            </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
            <Breadcrumb align = "right" style={{ margin: '16px 0' }}>
                <div className="title"> Welcome to  QM Feedback, designed to give you the best feedback for your tests! </div>
            </Breadcrumb>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                {this.props.children}
            </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Copyright ©2019</Footer>
        </Layout>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
      logout: () => dispatch(actions.logout()),
    }
}
export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));