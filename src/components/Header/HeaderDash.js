import React,{Component} from 'react';
import 'antd/dist/antd.css';
import './headerdash.css';
import { Layout, Menu,Typography,Badge,Popover ,Avatar   } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined ,BellFilled ,HomeOutlined, LogoutOutlined , SettingOutlined } from '@ant-design/icons';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
// import Login from '../Login/Login'
// import Signup from '../Signup'
// import Welcome from '../welcome'
// import Dashboard from '../Dashboard'
// import CustomCalendar from '../Calendar.js/CustomCalendar';

import Home from '../Home';
import Weightage from '../Weightages'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Title } = Typography;
class HeaderDash extends Component {
  
  render() {
  const text = <span>Signed as {'Lokesh Pamnani'}</span>;
const content = (
  <Menu
  mode="inline"
  style={{ height: '100%', borderRight: 0 }}
>
  
    <Menu.Item key="1" icon={<SettingOutlined />}>
      <span>Settings</span>
      <Link to="/home" />
    </Menu.Item>
    <Menu.Item key="2" icon={<LogoutOutlined />}>
      <span>Logout</span>
      <Link to="/weightage" />
    </Menu.Item>
    {/* <Menu.Item key="3">option3</Menu.Item>
    <Menu.Item key="4">option4</Menu.Item>
  
  <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
    <Menu.Item key="5">option5</Menu.Item>
    <Menu.Item key="6">option6</Menu.Item>
    <Menu.Item key="7">option7</Menu.Item>
    <Menu.Item key="8">option8</Menu.Item>
  </SubMenu>
  <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
    <Menu.Item key="9">option9</Menu.Item>
    <Menu.Item key="10">option10</Menu.Item>
    <Menu.Item key="11">option11</Menu.Item>
    <Menu.Item key="12">option12</Menu.Item>
  </SubMenu> */}
</Menu>
);
    return (
      <div>
        <Layout>
          {/* <Header className="header">
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
          </Header> */}
          <Header className="header" >
              <Title className='title-header' style={{color:"white",padding:'15px',float:"left"}} level={3}>The Occasion</Title>
              <div style={{float:"right"}}>
                <div style={{textAlign:'center'}}>             
                 <Title className='title-header' style={{color:"white",padding:'15px',float:"left"}} level={3}>Venue name</Title>
              {/* <BellOutlined style={{display: "inline-block",margin:"auto"}}/> */}
              <Popover placement="bottom" title={"Notifications"} content={"content"} trigger="click">
              <span style={{marginRight:"20px"}}>
              <Badge dot style={{marginTop:'1.0px'}}>
                <BellFilled style={{fontSize:"1.5rem",color:"white", margin:'auto',marginTop:'1.0px' }}/>
              </Badge>
            </span>
              </Popover>
             
              {/* <BellFilled style={{display: "inline-block",marginRight:"20px",fontSize:"1.5rem",color:"white"}}/> */}
              <Popover placement="bottomRight" title={text} content={content} trigger="click">
                <Avatar style={{float:'right',float:"right",marginTop:"1.0rem"}} size={32} icon={<UserOutlined />} onClick={()=>console.log('click')}/>
              </Popover>
              </div>

              {/* <Avatar style={{float:'right',float:"right",marginTop:"1.0rem"}} size={32} icon={<UserOutlined />} onClick={()=>console.log('click')}/> */}
              </div>
          </Header>
          <Layout>
            <Sider width={200} className="site-layout-background">
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
              >
                
                  <Menu.Item key="1" icon={<HomeOutlined />}>
                    <span>Home</span>
                    <Link to="/home" />
                  </Menu.Item>
                  <Menu.Item key="2">
                    <span>Weightage</span>
                    <Link to="/weightage" />
                  </Menu.Item>
                  <Menu.Item key="3">option3</Menu.Item>
                  <Menu.Item key="4">option4</Menu.Item>
                
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                  <Menu.Item key="5">option5</Menu.Item>
                  <Menu.Item key="6">option6</Menu.Item>
                  <Menu.Item key="7">option7</Menu.Item>
                  <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                  <Menu.Item key="9">option9</Menu.Item>
                  <Menu.Item key="10">option10</Menu.Item>
                  <Menu.Item key="11">option11</Menu.Item>
                  <Menu.Item key="12">option12</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
             {/* <Layout style={{ padding: '24px 24px 24px' }}>  */}
            <Layout >  
              <Content
                className="site-layout-background"
                style={{
                  background:"#ececec",
                  margin: 0,
                  height :'100%'
                  
                }}
              >
                {/* <Router>
                <Switch>
              <Route exact path="/" component={Welcome} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/dashboard" component={Dashboard} />
                <Route exact path='/login' component={Login} /> 
                  use it later-------------------------------------
              </Switch>
              </Router> */}
              <Switch>
              <Route path="/home" component={Home} />
              <Route path="/" exact  component={Home} />
              <Route path="/weightage" component={Weightage} />
              </Switch>
              {/* <Home /> */}
              
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default HeaderDash
