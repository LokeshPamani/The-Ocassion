import { Layout, Row, Col, Divider, Typography,Space,Input, Tooltip, Button } from 'antd';
import React, { Component } from 'react'
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import loginpic from '../../Photos/loginpic.png'
import { connect } from "react-redux";
import { login } from "../../Redux/actions/Session";

import './login.css';
const { Header,  Content } = Layout;
const { Title } = Typography;

const mapStateToProps = ({ errors }) => ({
    errors
  });

const mapDispatchToProps = dispatch => ({
    login: user => dispatch(login(user))
  });

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
             username: '',
             password : ''
        }
    }



    handleUsernameInput=val=>{
        this.setState({
            username : val.target.value
        })
    }

  handlePasswordInput = (val) => {
    this.setState({
      password: val.target.value,
    });
  };

    handleLogin=()=>{
        const user = {
            email: this.state.username,
            password: this.state.password,
          };
          
          this.props.login(user);
    }

    render() {
        return (
            <div>
                <Layout>
                    <Header className="header" >
                        <Title className='title-header' style={{color:"white",padding:'15px'}} level={3}>The Occasion</Title>
                    </Header>
                    <Content className='content'>
                    <Row>
                        <Col span={11}>
                        <img id='login-pic' src={loginpic} />
                        </Col>
                        <Divider type='vertical' style={{height:'100%'}} />
                        <Col className='login-title' span={11}>
                            <Title  level={3}>LogIn</Title>
                            <Space direction="vertical">
                                <Input
                                    className = "input-login"
                                    onChange={val=>this.handleUsernameInput(val)}
                                    placeholder="Enter your username"
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    suffix={
                                        <Tooltip title="Extra information">
                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                        </Tooltip>
                                    }
                                    />
                                    <Input.Password
                                        onChange={val=>this.handlePasswordInput(val)}
                                        className = "input-login"
                                        placeholder="input password"
                                    />
                                    <Button
                                    onClick={this.handleLogin}
                                    className='header'
                                    type="primary"
                                    block>
                                        LogIn
                                    </Button>

                                    <Link to="/signup">Signup</Link>
                            </Space>
                        </Col>
                    </Row>
                    </Content>

                </Layout>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login);
