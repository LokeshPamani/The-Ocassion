import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, InputNumber } from 'antd';
import { success, error } from '../NotificationMessage/NotificationMessage';

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        title="Create a new User"
        okText="OK"
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
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please input the name of user !',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="phoneNo" label="Mobile No."
           rules={[
            {
              required: true,
              message: 'Please input your Mobile no.!',
            },
            ]}
          >
            <Input />
          </Form.Item>
        <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        >
         <Input.Password />
        </Form.Item>
        </Form>
      </Modal>
    );
  };
  

class NewUserModel extends Component {
    constructor(props) {
        super(props);
        this.state={
            visible : false
        }
    }


    setVisible=(visible)=>{
        this.setState({
            visible:visible
        })
    }

    onCreate = values => {
        console.log('Received values of form: ', values);
        values.role = 'manager'
        this.props.save(null,values).then(res=>{
          this.props.onClose();
          success('New User Created!!!')
          this.props.refresh()
        }).catch(err=>{
          // error(err.response.data)
          console.log(err.response)
        })
        this.setVisible(false);
        
      };
    
    render() {
        return (
            <div>
            <CollectionCreateForm
                visible={this.props.showModel}
                onCreate={this.onCreate}
                onCancel={() => {
                this.props.onClose();
                }}
            /> 
            </div>
        );
    }
}

export default NewUserModel;