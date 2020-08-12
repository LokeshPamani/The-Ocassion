import React, { useState,useEffect } from 'react';
import {  Modal, Form, Input, Radio ,Select , DatePicker,Button, } from 'antd';
import moment from 'moment';
import { Spin, Alert } from 'antd';
import {bookingStatus,newBookings} from '../../APIS/BookingsAPI/Booking'
import {success,openNotification} from '../NotificationMessage/NotificationMessage'
import './CustomModel.css'

const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }}>
      <Option value="91">+91</Option>
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
    </Select>
  </Form.Item>
);



const CollectionCreateForm = ({ visible, onCreate, onCancel,date, loading, setState, state, modelload,setModelload, isbooked }) => {
  const updateField = e => {
    console.log('the onchange is calling',e.target)
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };
  const [form] = Form.useForm();
  const onOk=() => {
    
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        onCreate(values);
       //success('Booking Succesful !!!')
      // openNotification()
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  }
  
  return (
    
    <Modal
      visible
      title="Booking Form"
      // okText="Book"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={onOk}
      
      footer={[
        <Button key="back" onClick={onCancel}>
          Return
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={onOk} disabled={modelload}>
          Book
        </Button>,
      ]}
    >
      
    
      <Spin tip="Loading..." spinning={modelload}>
      <Form
        form={form}
        layout="vertical"
        
        name="form_in_modal"
        initialValues={{
          Booking_type: 'Provisional',
          prefix : '+91',
          Booking_date:date
          
        }}
      >
        <Form.Item
          name="Customer_Name"
          label="Customer Name"
          rules={[
            {
              required: true,
              message: 'Please input the Customer name!',
            },
          ]}
        >
          <Input  name="Customer_Name" onChange={updateField} />
        </Form.Item>
        <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input name="phone" addonBefore={prefixSelector} style={{ width: '100%' }} onChange={updateField}   />
      </Form.Item>
        <Form.Item 
          name="Occasion" 
          label="Ocassion"
          rules={[
            {
              required: true,
              message: 'Please input the  Occasion',
            },
          ]}
          >
          <Input name="Occasion"  onChange={updateField}/>
        </Form.Item>
        <Form.Item 
          name="Booking_date" 
          label="Booking Date"
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          >
          <DatePicker disabled={true}   format={dateFormatList} onChange={updateField}/>
        </Form.Item>
        
        
        <Form.Item name='paid' label="Advance Paid (in rupees)">
          <Input name='paid' onChange={updateField}/>
        </Form.Item>
        <Form.Item name='Due' label="Due (in rupees)">
          <Input name='Due' onChange={updateField} />
        </Form.Item>
        <Form.Item name="Booking_type" label='Booking type' className="collection-create-form_last-form-item">
          <Radio.Group name="Booking_type" onChange={updateField} >
            <Radio value="Provisional">Provisional</Radio>
            <Radio value="paid">Paid</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name='Comments' label="Comments"onChange={updateField}>
          <Input name='Comments'/>
        </Form.Item>
        
       {isbooked ? <Form.Item 
          name="Cancel_booking" 
          >
          <Button type="text" size='large' danger>
          Cancel Booking
        </Button>
        </Form.Item> : null}
       
      </Form>
      </Spin>
    </Modal>
    
  );
};



const CollectionsPage = (props) => {
  const [visible, setVisible ] = useState(true);
  const [loading , setLoading] = useState(false);
  const [isbooked , setIsbooked] = useState(false)
  const [state, setState] = useState({
    Customer_Name: '',
    phone: '',
    Occasion:'',
    Booking_date : props.date,
    paid:'',
    Due:'',
    Booking_type:'',
    Comments:''
  });
  const [modelload , setModelload] = useState(false);
  useEffect(() => {
    let isBooked=false ;
    const bookingStatusParam={}
    const dates=(props.date && props.date.format('YYYY-MM-DD')).split('-')
    bookingStatusParam['day']=dates[2]
    bookingStatusParam['month']=dates[1]
    bookingStatusParam['year']=dates[0]
    bookingStatus(bookingStatusParam).then(res=>{
      isBooked = res.isBooked
      setIsbooked(res.isBooked)
    })
    if(isBooked)
    {

    }
    setModelload(false)
    }, [])
  const onCreate = values => {
    
    setLoading(true)
    newBookings(state).then(()=>{
      props.onClose();  
    }).catch(err=>console.log('error comes',err.response.data))
    
    //setVisible(false);
  };
  
  return (
    <div>
      
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        date={props.date}
        loading={loading}
        setState={setState}
        state={state}
        modelload={modelload}
        setModelload={setModelload}
        isbooked={isbooked}
        onCancel={() => {
          props.onClose();  
          // setVisible(false);
        }}
      />
    </div>
  );
};

export default CollectionsPage 
