import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Popconfirm, Form,Button } from 'antd';
import NewUserModel from './NewUserModel';
import {fetchUsers} from '../../Redux/actions/Users'
import {connect} from 'react-redux'
import {deleteUser,newUser, updateUser} from '../../APIS/UsersAPI/UsersAPI'
import { postCall } from '../../APIS/APICalls';


const { Option } = Select
const mapStateToProps=({usersReducer})=>{
   return{
     users:usersReducer
   }
 }
 
 const mapDispatchToProps = dispatch =>{
   return{
     fetchUsers : ()=> dispatch(fetchUsers())
   }
 }
 

const originData = [];



const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'select' ? <Select   >
                                              <Option value="user">User</Option>
                                              <Option value="admin">Admin</Option>
                                              </Select> 
  : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

 const EditableTable = ({fetchUsers, users}) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(users.users);
  const [editingKey, setEditingKey] = useState('');
  const [showModel, setShowModel] = useState(false)
  const isEditing = record => record.key === editingKey;
  useEffect(()=>{
    fetchUsers()
  },[])


  const showModelAddUser=()=>{
      setShowModel(true)
  }

  const onClose=()=>{
      setShowModel(false)
  }

  const edit = record => {
    console.log(record)
    form.setFieldsValue({
      name: '',
      email: '',
      phoneNo: '',
      role:'',
      ...record,
    });
    setEditingKey(record.key);
  };

  const deleteRecord = record =>{

    deleteUser(record.key)
    fetchUsers()
  }

  const cancel = () => {
    setEditingKey('');
  };

  const save = async( key,userData) => {
    try {

      const row = await form.validateFields();
      const newData = [...users.users];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
       
        updateUser(key,newData[index])
        fetchUsers();
        console.log(newData,'daa is there')
      } else {
        // newData.push(row);
        // setData(newData);
       return  newUser(userData)
        
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '15%',
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '15%',
      editable: true,
    },
    {
      title: 'PhoneNo',
      dataIndex: 'phoneNo',
      width: '15%',
      editable: true,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      width: '15%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
        <>
          <a disabled={editingKey !== '' } onClick={() => edit(record)}  style={{
                marginRight: 15,
              }}>
            Edit
          </a>
          <a disabled={editingKey !== '' || !record.isDelete } onClick={() => deleteRecord(record)}  style={{
                marginRight: 15,
              }}>
          Delete
        </a>
        <a  onClick={() => edit(record)}>
          ChangePassword
        </a>
        </>
        );
      },
    },
  ];
  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    
    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex === 'role' ? 'select' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
      <>
      <Button 
          onClick={showModelAddUser}
          type="primary"    
        >
          Add New User
        </Button>

    <Form form={form} component={false} >
        
      <Table
        className='usertable'
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        loading={users.loading}
        dataSource={users.users}
        columns={mergedColumns}
        rowClassName="editable-row"
        
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
    <NewUserModel showModel={showModel} onClose={onClose} save={save} refresh={fetchUsers}/>
    </>
  );
};

// ReactDOM.render(<EditableTable />, mountNode);
export default connect(mapStateToProps, mapDispatchToProps) (EditableTable)