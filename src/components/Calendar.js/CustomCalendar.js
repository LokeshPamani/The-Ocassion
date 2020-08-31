import React, { Component } from 'react'
import { Calendar, Badge , Progress, Spin } from 'antd';
import { element } from 'prop-types';
import Model from './CustomModel'
import {error} from '../NotificationMessage/NotificationMessage'
import moment from 'moment'
import './customcalendar.css'


class CustomCalendar extends Component {

      constructor(props) {
        super(props)
        this.handleMouseHover = this.handleMouseHover.bind(this);
   
        this.state = {
           showForm : false,
           isHovering: '',
           dateSelected : '',
           loading : false,
        }
      }
      
      
    

      handleMouseHover(val) {
        
        this.setState(()=>this.toggleHoverState(val));
      }

      toggleHoverState(val) {
        return {
          //isHovering: !state.isHovering,
          isHovering: val
        };
      }
    getListData=(value)=>{
        let listData = {};
        // this.props.bookings.forEach(element => {
        //   const date = moment(element.date)
        //   // if(date.date() === value.date() && date.month() === value.month() )
        //   if(date.date() === value.date())
        //   {
        //     listData=element
        //   }
              
        // });
        // console.log(this.props.bookings.bookings)
        const bookings = this.props.bookings
        if(bookings.bookings)
        {
          if(value.date() <= 15)
            {
            for (let counter=0; counter < Math.ceil((bookings.bookings.length)/2); counter++){
               if (parseInt(bookings.bookings[counter].date) === value.date() && parseInt(bookings.bookings[counter].month) === value.month()+1){
                listData.weightage=bookings.bookings[counter].weight
                if(bookings.bookings[counter].isBooked)
                {
                  listData.bookings =bookings.bookings[counter].booking
                }
                break;
              }
            }  
          }
          else{
            
            for (let counter=Math.ceil((bookings.bookings.length)/2); counter < bookings.bookings.length; counter++){
              if (parseInt(bookings.bookings[counter].date) === value.date() && parseInt(bookings.bookings[counter].month) === value.month()+1){
                listData.weightage=bookings.bookings[counter].weight
                if(bookings.bookings[counter].isBooked)
                {
                  listData.bookings =bookings.bookings[counter].booking
                }
                break;
              }
            }  
          }
      }  
        return listData ;
      }


    dateCellRender=(value)=>{
        
        
        const listData = this.getListData(value);
        
        return (
        //   <ul className="events">
        //     {listData.map(item => (
        //       <li key={item.content}>
        //         {/* <Badge status={item.type} text={item.content} /> */}
        //         <div style={{background:"blue"}}/>
        //       </li>
        //     ))}
        //   </ul>
        
        listData.bookings ? <React.Fragment>
          <div className='divcustom' style={{height:"100%",width:"100%",background: '#40a9ff',opacity:"90"}}
            onMouseEnter={()=>this.handleMouseHover(value._d)}
            onMouseLeave={()=>this.handleMouseHover('')}
          > 
            
            
              {
                new String(this.state.isHovering).valueOf() === new String(value._d).valueOf() ?
                <Progress className='weightage' type="circle" percent={listData.weightage} width={60} />
                :
                <ul className="events">
            
                <li>
                  <Badge status='error' text={listData.bookings.customerName} />
                </li>
                <li>
                  <Badge status='error' text={listData.bookings.ocassion} />
                </li>
                
             
             
                 </ul>
              }
          </ div>
          </ React.Fragment>
          :
          <React.Fragment>
          <div className='divcustom' style={{height:"100%",width:"100%"}}
               onMouseEnter={()=>this.handleMouseHover(value._d)}
              onMouseLeave={()=>this.handleMouseHover('')}
          >
            {
              new String(this.state.isHovering).valueOf() === new String(value._d).valueOf() &&<Progress className='weightage' type="circle" percent={listData.weightage} width={70} format={(percent) => `${percent}%Rise`} />
            }
            </ div> 
          </ React.Fragment>
        )
      }

    getMonthData=(value)=> {
        if (value.month() === 8) {
          return 1394;
        }
      }

    monthCellRender=(value)=> {
        const num = this.getMonthData(value);
        return num ? (
          <div className="notes-month">
            <section>{num}</section>
            <span>Backlog number</span>
          </div>
        ) : null;
      }

      onClose=()=>{

          this.setState({
            showForm:false,
            dateSelected:''
          })
      }

      onSelect = value => {
       // console.log('selected date',value)
        this.setState({
          showForm : true,
          dateSelected : value
        })
        //console.log(value,'the valudis is',  `${value && value.format('YYYY-MM-DD')}`)
        
      };

      onPanelChange=(date,mode)=>{
        this.props.fetchBookingsFunction(date.month()+1,date.year())

      }

    render() {
        return (
            <div>
              
                <Calendar dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender} onSelect={this.onSelect} onPanelChange={this.onPanelChange}/>
                {this.state.showForm && <Model date={this.state.dateSelected} onClose={this.onClose}/> }
             
            </div>
        )
    }
}

export default  CustomCalendar
