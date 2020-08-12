import React, { Component } from 'react'
import { Calendar, Badge } from 'antd';
import { element } from 'prop-types';
import Model from './CustomModel'
export class CustomCalendar extends Component {

      constructor(props) {
        super(props)
      
        this.state = {
           showForm : false,
           dateSelected : ''
        }
      }
      


    getListData=(value)=>{
        let listData;
        switch (value.date()) {
          case 8:
            listData = [
              { type: 'warning', content: 'This is warning event.' },
              { type: 'success', content: 'This is usual event.' },
            ];
            break;
          case 10:
            listData = [
              { type: 'warning', content: 'This is warning event.' },
              { type: 'success', content: 'This is usual event.' },
              { type: 'error', content: 'This is error event.' },
            ];
            break;
          case 15:
            listData = [
              { type: 'warning', content: 'This is warning event' },
              { type: 'success', content: 'This is very long usual event。。....' },
              { type: 'error', content: 'This is error event 1.' },
              { type: 'error', content: 'This is error event 2.' },
              { type: 'error', content: 'This is error event 3.' },
              { type: 'error', content: 'This is error event 4.' },
            ];
            break;
          default:
        }
        return listData || [];
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
        
        listData.length>0 && <React.Fragment><div style={{height:"60%",width:"100%",background:"blue"}}>lokesh</ div><div style={{height:"40%",width:"100%",background:"red"}} /> </ React.Fragment>
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
        console.log('in the onselect ', this.state.showForm)
      };
    render() {
        return (
            <div>
                <Calendar dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender} onSelect={this.onSelect}/>
                {this.state.showForm && <Model date={this.state.dateSelected} onClose={this.onClose}/> }
            </div>
        )
    }
}

export default CustomCalendar
