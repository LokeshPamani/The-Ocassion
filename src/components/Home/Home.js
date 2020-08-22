import React, { Component } from 'react'
import { Row, Col ,Card,Divider, Typography, Spin} from 'antd';
import CustomCalendar from '../Calendar.js/CustomCalendar';

const { Paragraph } = Typography;

class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             Notes : 'Make notes that u remember'
        }
    }

    onChange = str => {
        
        this.setState({ Notes : str });
      };
    
    render() {
        
        return (
            <React.Fragment>
                <Spin>
                <Row gutter={16} style={{padding:"10px",background:"#ececec",height:"100%"}}>
                <Col span={18}><CustomCalendar /></Col>
                <Col span={6}>
                    <Row>
                    <Card title="Notes" bordered={false} style={{ width: '100%',height : "370px" }}>
                        <Paragraph editable={{ onChange: this.onChange }}>{this.state.Notes}</Paragraph>
                    </Card>
                    </Row>
                    <br></br>
                    <Row>
                        <Card title="Statistics in Month" bordered={false} style={{ width: '100%' }}>
                        <p><strong>Booked</strong> - 5</p>
                        <p><strong>Available</strong> - 17</p>
                        <p><strong>Provisinal Bookings</strong> - 17</p>
                        <p><strong>Cancelled </strong> - 17</p>
                        <Divider orientation="left">Date Wieghtage</Divider>
                        <p><strong>High</strong> - 5</p>
                        <p><strong>Medium</strong> - 15</p>
                        <p><strong>Low</strong> - 10</p>
                        </Card>
                    </Row>
                    
                
                
                </Col>
                </Row>
                </Spin>
            </React.Fragment>
        )
    }
}

export default Home
