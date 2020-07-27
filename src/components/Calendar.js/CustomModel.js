import React, { useState } from 'react';
import {  Modal, Form, Input, Radio ,Select , DatePicker} from 'antd';
import moment from 'moment';
const dateFormat = 'YYYY/MM/DD';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const CollectionCreateForm = ({ visible, onCreate, onCancel,date }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="Customer Name"
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
        <Form.Item name="description" label="Description">
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="modifier" className="collection-create-form_last-form-item">
          <Radio.Group>
            <Radio value="public">Public</Radio>
            <Radio value="private">Private</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Customer Name">
          <Input />
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker disabled={true} defaultValue={moment(date, dateFormatList[0])} format={dateFormatList}/>
        </Form.Item>
        <Form.Item 
            name= 'Booking Type'
            label="Booking Type"
            rules={[
                {
                required: true,
                message: 'Please input the Booking type!',
                },
            ]}
            >
          <Select>
            <Select.Option value="Provisional">Provisional</Select.Option>
            <Select.Option value="complete">Complete</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CollectionsPage = (props) => {
  const [visible, setVisible] = useState(true);

  const onCreate = values => {
    console.log('Received values of form: ', values);
    setVisible(false);
  };

  return (
    <div>
      
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        date={props.date}
        onCancel={() => {
          props.onClose();  
          setVisible(false);
        }}
      />
    </div>
  );
};

export default CollectionsPage 
