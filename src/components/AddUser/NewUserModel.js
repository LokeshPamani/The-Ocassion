import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';

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
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: 'Please input the title of collection!',
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