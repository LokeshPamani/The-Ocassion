import React, { Component } from 'react';
import {EditableTable} from './Table'
import { Row, Col, Divider, Typography } from 'antd';
const { Title, Paragraph, Text } = Typography;


class AddUser extends Component {
    render() {
        return (
            <div className='adduseragemain' >
                <div className='adduserdiv'>
                <Typography className='addusertitle'>
                    <Title level={1} className='addusertitle'>Add User</Title> 
                </Typography>
                {/* <Divider style={{font : '800px'}} orientation="left">Add User</Divider> */}
                <EditableTable className='usertable' />   
                </div>
            </div>
        );
    }
}

export default AddUser;