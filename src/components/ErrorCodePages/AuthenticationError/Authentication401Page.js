import React, { Component } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import { Result, Button } from 'antd';
class Authentication401Page extends Component {

    render() {
        
        return (
            <Result
                title="You are not authenticated or wrong Login credentials"
                extra={
                <Button type="primary" key="console" href='/login'>
                    Go Login
                </Button>
                }
            />
        );
    }
}

export default Authentication401Page;