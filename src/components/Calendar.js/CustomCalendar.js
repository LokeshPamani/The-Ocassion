import React, { Component } from 'react'
import { Calendar, Badge , Progress, Spin } from 'antd';
import { element } from 'prop-types';
import Model from './CustomModel'
import {error} from '../NotificationMessage/NotificationMessage'
import moment from 'moment'


class CustomCalendar extends Component {

      constructor(props) {
        super(props)
        this.handleMouseHover = this.handleMouseHover.bind(this);
   
        this.state = {
           showForm : false,
           isHovering: '',
           dateSelected : '',
           loading : false
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
        let listData;
        this.props.bookings.forEach(element => {
          const date = moment(element.date)
          if(date.date() === value.date() && date.month() === value.month() )
          {
            listData=element
          }
              
        });
        return listData || undefined;
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
        
        listData ? <React.Fragment><div id='divcustom' style={{height:"100%",width:"100%",background:"grey",opacity:"10"}}
        onMouseEnter={()=>this.handleMouseHover(value._d)}
          onMouseLeave={()=>this.handleMouseHover('')}
          >
            {
              new String(this.state.isHovering).valueOf() === new String(value._d).valueOf() &&<Progress type="circle" percent={30} width={40} />
    }</ div> </ React.Fragment>
    :
    <React.Fragment><div id='divcustom' style={{height:"100%",width:"100%"}}
        onMouseEnter={()=>this.handleMouseHover(value._d)}
          onMouseLeave={()=>this.handleMouseHover('')}
          >
            {
              new String(this.state.isHovering).valueOf() === new String(value._d).valueOf() &&<Progress type="circle" percent={30} width={40} />
    }</ div> </ React.Fragment>
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
        
        this.setState({
          showForm : true,
          dateSelected : value
        })
        //console.log(value,'the valudis is',  `${value && value.format('YYYY-MM-DD')}`)
        
      };

      onPanelChange=(date,mode)=>{
        console.log('on panel change ',date,mode);
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
