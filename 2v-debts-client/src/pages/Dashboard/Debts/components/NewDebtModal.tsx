import { useDebtListActionsContext } from '@/context/ListActions.context';
import {
  addDebtMutation,
  updateDebtByIdMutation,
} from '@/network/queries/debts.query';
import { getUsersQuery } from '@/network/queries/user.query';
import type { debtsListDataType } from '@/types/debts.types';
import { Modal, Form, DatePicker, Input, InputNumber, Select } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { Navigate } from 'react-router';

interface componentProps {
  open: boolean;
  onClose: () => void;
  data?: debtsListDataType;
}

export default function NewDebtModal(props: componentProps) {
  const [form] = Form.useForm();
  const { mutate: createDebtMutation } = addDebtMutation();
  const { mutate: updateDebtMutation } = updateDebtByIdMutation();
  const { data: usersRetrievedData, isLoading, isError } = getUsersQuery();
  const { modalEditorMode } = useDebtListActionsContext();

  useEffect(() => {
    if (!props.open) return;

    if (modalEditorMode === 'EDIT' && props.data) {
      form.setFieldsValue({
        title: props.data.title,
        description: props.data.description,
        debtor_id: (props.data?.debtor as any)?.id,
        total_debt: props.data.total_debt,
        dueDate: dayjs(props.data.dueDate),
      });
    }

    if (modalEditorMode === 'CREATE') {
      form.resetFields();
    }
  }, [props.data, props.open, , modalEditorMode, form]);

  if (isLoading) {
    return <p>Loading character </p>;
  }

  if (isError) {
    return <Navigate to={'/login'} />;
  }

  const submitDebt = async () => {
    const debtFormData = await form.validateFields();
    const payload: debtsListDataType = {
      ...debtFormData,
      ...(debtFormData['dueDate'] && {
        dueDate: debtFormData['dueDate'].toISOString(),
      }),
    };

    console.log(props);
    modalEditorMode == 'CREATE'
      ? createDebtMutation(payload)
      : updateDebtMutation({ id: props.data?.id as string, data: payload });
    props.onClose();
  };

  return (
    <Modal
      title={`${modalEditorMode == 'CREATE' ? 'Crear' : 'Editar'} nueva deuda`}
      centered
      open={props.open}
      onCancel={props.onClose}
      onOk={submitDebt}
      okText={`${modalEditorMode == 'CREATE' ? 'Crear' : 'Editar'}`}
      cancelText='Cancelar'
      modalRender={(dom) => (
        <Form
          form={form}
          name='new_debt_form'
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
        name='debtor_id'
        rules={[{ required: true, message: 'Debes elegir un deudor' }]}
      >
        <Select
          options={usersRetrievedData.data?.map((user: any) => ({
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
      <Form.Item name='dueDate' rules={[{ required: false }]}>
        <DatePicker
          style={{ width: '100%' }}
          placeholder='fecha de vencimiento'
          format={'YYYY-MM-DD'}
        ></DatePicker>
      </Form.Item>
    </Modal>
  );
}
