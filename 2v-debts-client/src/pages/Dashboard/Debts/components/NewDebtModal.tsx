import { addDebtMutation } from '@/network/queries/debts.query';
import { getUsersQuery } from '@/network/queries/user.query';
import type { User } from '@/types/users.types';
import { Modal, Form, DatePicker, Input, InputNumber, Select } from 'antd';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';

interface componentProps {
  open: boolean;
  onClose: () => void;
}

export default function NewDebtModal(props: componentProps) {
  const [form] = Form.useForm();
  const [usersList, setUsersList] = useState<User[]>([]);
  const { mutate: debtMutation } = addDebtMutation();
  const { data: usersRetrievedData, isLoading, isError } = getUsersQuery();

  useEffect(() => {
    if (usersRetrievedData) {
      const data = usersRetrievedData.data;
      setUsersList(data);
    }
  }, [usersRetrievedData]);

  if (isLoading) {
    return <p>Loading character </p>;
  }

  if (isError) {
    return <Navigate to={'/login'} />;
  }

  const submitDebt = async () => {
    const debtDataPayload = await form.validateFields();
    debtMutation(debtDataPayload);
    console.log('Received values:', debtDataPayload);
    props.onClose();
  };

  return (
    <Modal
      title='Crear nueva deuda'
      centered
      open={props.open}
      onCancel={props.onClose}
      onOk={submitDebt}
      destroyOnHidden={true}
      okText='Crear deuda'
      cancelText='Cancelar'
      modalRender={(dom) => (
        <Form
          form={form}
          name='new_debt_form'
          initialValues={{ remember: true }}
          autoComplete='off'
          clearOnDestroy={true}
          preserve={false}
          className='space-y-'
        >
          {dom}
        </Form>
      )}
    >
      <Form.Item
        name='title'
        rules={[
          { required: true, message: 'Debes asignar un nombre a tu deuda' },
        ]}
      >
        <Input placeholder='Título'></Input>
      </Form.Item>
      <Form.Item
        name='description'
        rules={[
          { required: true, message: 'Debes asignar un nombre a tu deuda' },
        ]}
      >
        <Input placeholder='Descripción'></Input>
      </Form.Item>
      <Form.Item
        name='debtorId'
        rules={[{ required: true, message: 'Debes elegir un deudor' }]}
      >
        <Select
          options={usersList.map((user) => ({
            value: user.id,
            label: user.name,
          }))}
          placeholder='Elegir deudor'
        />
      </Form.Item>
      <Form.Item
        className='w-full'
        name='total_debt'
        rules={[
          { required: true, message: 'Debes asignar un total a tu deuda' },
        ]}
      >
        <InputNumber<number>
          min={0}
          style={{ width: '100%' }}
          placeholder='monto'
        ></InputNumber>
      </Form.Item>
      <Form.Item name='due_date' rules={[{ required: false }]}>
        <DatePicker
          style={{ width: '100%' }}
          placeholder='fecha de vencimiento'
        ></DatePicker>
      </Form.Item>
    </Modal>
  );
}
