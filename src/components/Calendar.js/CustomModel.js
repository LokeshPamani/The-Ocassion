import React, { useState,useEffect } from 'react';
import {  Modal, Form, Input, Radio ,Select , DatePicker,Button, } from 'antd';
import moment from 'moment';
import { Spin, Alert } from 'antd';
import {bookingStatus,newBookings, getBookingByBookingID,updateBooking} from '../../APIS/BookingsAPI/Booking'
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

let isBooked ;
let bookingId;

const CollectionCreateForm = ({  onCreate, onCancel,date, loading, setState, state, modelload, isbooked, form, cancelButtonLoading, onCancelBooking }) => {
  useEffect(() => {
    form.setFieldsValue(state)
  })
  const updateField = e => {
  if(e !== null && e !==undefined)
  {
  console.log('in the if block0', e)
  if(e instanceof moment)
  {
    setState({
      ...state,
      Booking_date : e
    })
  }
  else{
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  
  }
  }
  };

  
  
  //console.log(...state)
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
      // onOk={onOk}
      
      footer={[
        <Button key="back" onClick={onCancel}>
          Return
        </Button>,
        !isbooked ? 
        <Button key="submit" type="primary" loading={loading} onClick={onOk} disabled={modelload}>
          Book
        </Button>
        :
         <Button key="submit" type="primary" loading={loading} onClick={onOk} disabled={modelload}>
          Update
        </Button>

      ]}
    >
      
    
      <Spin tip="Loading..." spinning={modelload}>
      <Form
        form={form}
        layout="vertical"
        
        name="form_in_modal"
      //   initialValues={
      //   //   {
      //   //   Booking_type: 'Provisional',
      //   //   prefix : '+91',
      //   //   Booking_date:date,
          
      //   // }
      //   state
      // }
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
          rules={[
            {
              required: true,
              message: 'Please input the booking date',
            },
          ]}
          >
          <DatePicker disabled={!isbooked}  name="Booking_date"  format={dateFormatList} onChange={updateField}/>
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
          <Button type="text" size='large' danger  loading={cancelButtonLoading} onClick={onCancelBooking}>
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
  const [cancelButtonLoading,setCancelButtonLoading] = useState(false);
  const [isbooked , setIsbooked] = useState(false)
  const [state, setState] = useState({
    Customer_Name: '',
    phone: '',
    Occasion:'',
    Booking_date : props.date,
    paid:'',
    Due:'',
    Booking_type:'Provisional',
    Comments:''
  });
  const [modelload , setModelload] = useState(true);
  const [form] = Form.useForm();
  useEffect(() => {
    
    const bookingStatusParam={}
    const dates=(props.date && props.date.format('YYYY-MM-DD')).split('-')
    bookingStatusParam['day']=dates[2]
    bookingStatusParam['month']=dates[1]
    bookingStatusParam['year']=dates[0]
    bookingStatus(bookingStatusParam).then(res=>{
      
      isBooked = res.data.isBooked;
      console.log(isBooked)
      bookingId = res.data.bookingId;
      setIsbooked(res.data.isBooked)
    
    
    if(isBooked)
    {
      
      getBookingByBookingID(bookingId).then(res=>{
        setState({
          ...state,
          Customer_Name: res.data.customerName,
          phone: res.data.phoneNo,
          Occasion: res.data.ocassion,
          Booking_date : props.date,
          paid:'',
          Due:'',
          Booking_type:'',
          Comments:''
        });
        setModelload(false)
      }
      )
      
      
    }
   else{
    setModelload(false)
   }
  })
    }, [])
  const onCreate = values => {
    
    setLoading(true)
    if(isbooked)
    {
      updateBooking(state).then(()=>{
        props.onClose();  
        setLoading(false)
      }).catch(err=>console.log('error comes',err.response.data))
    }
    else{
      newBookings(state).then(()=>{
        props.onClose();  
        setLoading(false)
      }).catch(err=>console.log('error comes',err.response.data))
  }
    
    //setVisible(false);
  };
  
  const onCancelBooking = ()=>{
    setLoading(true);
    setCancelButtonLoading(true);
    
  }
  return (
    <div>
      
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        date={props.date}
        loading={loading}
        cancelButtonLoading={cancelButtonLoading}
        setState={setState}
        state={state}
        modelload={modelload}
        setModelload={setModelload}
        isbooked={isbooked}
        form={form}
        onCancelBooking={onCancelBooking}
        onCancel={() => {
          props.onClose();  
          // setVisible(false);
        }}
      />
    </div>
  );
};

export default CollectionsPage 
