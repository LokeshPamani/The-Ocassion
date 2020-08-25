import React, { Component } from 'react'
import { Row, Col ,Card,Divider, Typography, Spin} from 'antd';
import CustomCalendar from '../Calendar.js/CustomCalendar';
import {fetchBookings} from '../../Redux/actions/Bookings'
import {connect} from 'react-redux'
import {error} from '../NotificationMessage/NotificationMessage'
const { Paragraph } = Typography;
var setIntervlId;

const mapStateToProps=({bookingsReducer})=>{
     return{
       bookings:bookingsReducer
     }
   }
   
   const mapDispatchToProps = dispatch =>{
     return{
       fetchBookings : (month,year)=> dispatch(fetchBookings({month:month,year:year}))
     }
   }
   

class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             Notes : 'Make notes that u remember',
             error : this.props.bookings.error ? true : false,
             firstLoading : 0,
             month : String(new Date().getMonth() + 1).padStart(2, '0'),
             year : new Date().getFullYear()

        }
    }


    fetchAllBookings=(month,year)=>{
      this.setState(prevstate =>{
        return {
          firstLoading : prevstate.firstLoading + 1
        }
      }
        )
      this.props.fetchBookings(month || this.state.month,year || this.state.year)
     
    }

    componentDidMount(){
        this.fetchAllBookings(null,null);
  
        setIntervlId = setInterval(()=>{
            this.fetchAllBookings()
          },5000)
        
      }

    componentWillUnmount(){
        clearInterval(setIntervlId);
      }
    onChange = str => {
        
        this.setState({ Notes : str });
      };
    
    render() {
        return (
          this.state.error?error(this.props.boookings.error) :
            <React.Fragment>
                <Spin tip="Loading..." spinning={(this.state.firstLoading === 1)  && this.props.bookings.loading}>
                <Row gutter={16} style={{padding:"10px",background:"#ececec",height:"100%"}}>
                <Col span={18}><CustomCalendar bookings={this.props.bookings.bookings}/></Col>
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

export default connect(mapStateToProps, mapDispatchToProps) (Home)
