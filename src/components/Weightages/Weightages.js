import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { DatePicker, Space } from 'antd';
import { Progress, Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Select, Tooltip } from 'antd';
import { WarningFilled} from '@ant-design/icons';
import {error, success} from '../NotificationMessage/NotificationMessage'
import {assignWeightage} from '../../APIS/WeightageAPI/WeightageAPI'

const { Option } = Select;
const { RangePicker } = DatePicker;

class Weightages extends Component {
    constructor(props) {
        super(props);
        this.state={
            rangepicker : null,
            datepicker : null,
            percent: 0,
            type : null,
            error : false,
            errorMessage : '',
            loadingButton : false
        }
    }

     refreshPage=()=>{ 
        window.location.reload(); 
    }

    increase = () => {
        let percent = this.state.percent + 10;
        if (percent > 100) {
          percent = 100;
        }
        this.setState({ percent });
    };
    
    decline = () => {
        let percent = this.state.percent - 10;
        if (percent < 0) {
          percent = 0;
        }
        this.setState({ percent });
    }

    onChangeRangePicker=(value)=>{
        this.setState({
            rangepicker : value
        })
    }

    onChangeDatePicker=(value)=>{
        this.setState({
            datepicker : value
        })
    }

    onChangeSelect=(value)=>{
        this.setState({
            type:value
        })
    }
    

    verfication=()=>{
        if(!(this.state.rangepicker || this.state.datepicker))
        {
            error('one of the datepicker is required to fill')
            this.setState({
                error:true,
                errorMessage : 'one of the datepicker is required to fill'
            })
            return false;
        }

        if( this.state.percent <=0)
        {
            error('percentage is required')
            this.setState({
                error:true,
                errorMessage : 'percentage is required'
            })
            return false;
        }

        if(this.state.type === null)
        {
            error('Choose type')
            this.setState({
                error:true,
                errorMessage : 'Choose type'
            })
            return false;
        }

        return true
    }

    onClickButton=()=>{
        this.setState({
            error : false
        })
        const check = this.verfication();
        if(check)
        {
            this.setState({
                loadingButton : true
            })
            const data={
                rangepicker : this.state.rangepicker,
                datepicker : this.state.datepicker,
                percent : this.state.percent,
                type :  this.state.type
            }
            assignWeightage(data).then((res) =>{
                success("Weightage assign successfully!!!!")
                //setTimeout(this.refreshPage,5000)
                
            }).catch(err=>{
                console.log(err.response.data)
                error(err.response.data)
            }).finally(()=>{
                this.setState({loadingButton : false})
            })
        }
    }

    render() {
        console.log(this.state.rangepicker)
        return (
            <div className='Weightagemain' >
                <div className='weightagediv'>
                    <Space direction='vertical' size={20}>
                        <Space direction='horizontal' size={20}>
                            <Space direction="vertical" size={2}>
                                <RangePicker onChange={this.onChangeRangePicker}/>
                                <h1> OR</h1>
                                <DatePicker onChange={this.onChangeDatePicker} />
                                
                            </Space>
                            <div>
                                <Progress type="circle" percent={this.state.percent} />
                                <Button.Group>
                                    <Button onClick={this.decline} icon={<MinusOutlined />} />
                                    <Button onClick={this.increase} icon={<PlusOutlined />} />
                                </Button.Group> 
                            </div>
                                <Select  defaultValue="choose type" style={{ width: 180 }} onChange={this.onChangeSelect}>
                                    <Option value="Rise">Rise</Option>
                                    <Option value="fall">Fall</Option>
                                </Select>
                                <br></br>
                            
                        </Space>
                        {this.state.error?
                        <Tooltip title={this.state.errorMessage} placement='bottom' color='red' onClick={this.onClickButton}>
                            <Button type="primary" danger={true} size='large'  icon={ <WarningFilled />} > save </Button>
                        </Tooltip>
                        :
                        <Button type='primary' size='large' onClick={this.onClickButton} loading={this.state.loadingButton}>Save</Button>
                        }
                        
                    </Space>
                    
                
                </div>
                
            </div>
        );
    }
}

export default Weightages;