import React, { useState } from 'react';
import {  Modal, Form, Input, Radio ,Select , DatePicker,Button} from 'antd';
import moment from 'moment';

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

const CollectionCreateForm = ({ visible, onCreate, onCancel,date, loading }) => {
  console.log('the loading is k',loading)
  const [form] = Form.useForm();
  const onOk=() => {
    
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        onCreate(values);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  }
  
  return (
    <Modal
      visible={visible}
      title="Booking Form"
      // okText="Book"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={onOk}
      
      footer={[
        <Button key="back" onClick={onCancel}>
          Return
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={onOk}>
          Book
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        
        name="form_in_modal"
        initialValues={{
          modifier: 'Provisional',
          prefix : +91,
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
          <Input />
        </Form.Item>
        <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
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
          <Input  />
        </Form.Item>
        <Form.Item 
          name="Booking_date" 
          label="Booking Date"
          >
          <DatePicker disabled={true}   format={dateFormatList}/>
        </Form.Item>
        <Form.Item name='paid' label="Advance Paid (in rupees)">
          <Input />
        </Form.Item>
        <Form.Item name='Due' label="Due (in rupees)">
          <Input />
        </Form.Item>
        <Form.Item name="modifier" label='Booking type' className="collection-create-form_last-form-item">
          <Radio.Group>
            <Radio value="Provisional">Provisional</Radio>
            <Radio value="paid">Paid</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name='Comments' label="Comments">
          <Input />
        </Form.Item>
        
        
       
      </Form>
    </Modal>
  );
};

const CollectionsPage = (props) => {
  const [visible, setVisible ] = useState(true);
  const [loading , setLoading] = useState(false)
  const onCreate = values => {
    console.log('Received values of form: ', values);
    setLoading(true)
    //setVisible(false);
  };
  
  return (
    <div>
      
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        date={props.date}
        loading={loading}
        onCancel={() => {
          props.onClose();  
          setVisible(false);
        }}
      />
    </div>
  );
};

export default CollectionsPage 
