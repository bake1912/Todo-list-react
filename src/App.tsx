import { useState } from 'react';
import { Popconfirm, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Button, Modal, Input } from 'antd';
import { Formik, Form, Field } from 'formik';

const App = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number>(0);
  const [adress, setAdress] = useState('');
  const [editingUser, setEditingUser] = useState<any>(null);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [countKey, setCountKey] = useState(2);
  const [array, setArray] = useState([{
    key: 1,
    name: "Jonh",
    age: 28,
    adress: 'Trudova 3'
  }]);


  const dataUpdate = {
    key: countKey,
    name: name,
    age: age,
    adress: adress

  };

  const showModalAdd = () => {
    setIsModalAddOpen(true);
  };
  const handleAddOk = () => {
    if (name === '' || age === 0 || adress === '') {
      alert('Enter a data')
    }
    else if (Number.isNaN(age)) {
      alert("Enter the correct value of number")
    }
    else {
      setCountKey(countKey + 1);
      addUser();
      setIsModalAddOpen(false);
    }


  };

  const handleEditOk = () => {
    setArray(array => {
      return array.map(user => {
        if (user.key === editingUser.key) {
          return editingUser;
        }
        else {
          return user;
        }
      })
    })
    setIsModalEditOpen(false);
  };

  const handleAddCancel = () => {
    setIsModalAddOpen(false);
  };

  const handleEditCancel = () => {
    setIsModalEditOpen(false);
  };

  const addUser = () => {
    setArray([...array, dataUpdate]);
  }

  const deleteUser = (record: any) => {

    setArray(array => {
      return array.filter(
        user => user.key != record.key);
    })

  }

  const editUser = (record: string[]) => {
    setIsModalEditOpen(true);
    setEditingUser({ ...record });
  }
  type DataType = {
    key: number;
    name: string;
    age: number;
    adress: string;
  }
  enum ColumnsTopOptions {
    NAME = 'name',
    AGE = 'age',
    ADRESS = 'adress'
  }

  const columns: ColumnsType<DataType> =
    [
      {
        title: ColumnsTopOptions.NAME,
        dataIndex: ColumnsTopOptions.NAME,
        key: ColumnsTopOptions.NAME,
        render: (text) => <a>{text}</a>,
      },
      {

        title: ColumnsTopOptions.AGE,
        dataIndex: ColumnsTopOptions.AGE,
        key: ColumnsTopOptions.AGE,
      },
      {
        title: ColumnsTopOptions.ADRESS,
        dataIndex: ColumnsTopOptions.ADRESS,
        key: ColumnsTopOptions.ADRESS,
      },

      {
        title: 'Action',
        key: 'action',
        render: (record) => (
          <Space size="middle">
            <a onClick={() => {
              editUser(record)
            }} >Edit</a>
            <Popconfirm title="Are you sure to delete this user?" onConfirm={() => deleteUser(record)}>
              <a>
                Delete</a>
            </Popconfirm>
          </Space>
        ),
      },
    ];
  

  return (
    <>
      <Table columns={columns} pagination={{ pageSize: 3 }}
        dataSource={array} />
      <Button type="primary"
        onClick={showModalAdd}>
        Add
      </Button>
      <Modal okText="Add"
        title="Adding a new user"
        open={isModalAddOpen}
        onOk={handleAddOk}
        onCancel={handleAddCancel}>
       
          <Input placeholder='name'
            value={name}
            onChange={(e) => { setName(e.target.value) }}
            name='Name: ' />
          <Input placeholder='age'
            value={age}
            onChange={(e) => { setAge(parseInt(e.target.value)) }}
            name='age: ' />
          <Input placeholder='adress'
            value={adress}
            onChange={(e) => { setAdress(e.target.value) }}
            name='Adress: ' />
      
      </Modal>

      <Modal title="Editing the user"
        okText="Edit"
        open={isModalEditOpen}
        onOk={handleEditOk}
        onCancel={handleEditCancel}>
        <Input placeholder='name'
          value={editingUser?.name}
          onChange={(e) => {
            setEditingUser((array: string[]) => {
              return { ...array, name: e.target.value }
            }
            )
          }}
          name='Name: ' />
        <Input placeholder='age'
          value={editingUser?.age}
          onChange={(e) => {
            setEditingUser((array: string[]) => {
              return { ...array, age: parseInt(e.target.value) }
            })
          }}
          name='age: ' />
        <Input placeholder='adress'
          value={editingUser?.adress}
          onChange={(e) => {
            setEditingUser((array: string[]) => {
              return { ...array, adress: e.target.value }
            })
          }}
          name='Adress: ' />
      </Modal>
    </>
  );
};

export default App;







