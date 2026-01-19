import { Modal, Form, DatePicker, Input, InputNumber } from 'antd';

interface componentProps {
  open: boolean;
  onClose: () => void;
}

export default function NewDebtModal(props: componentProps) {
  const [form] = Form.useForm();

  const submitDebt = async () => {
    const values = await form.validateFields();
    console.log('Received values:', values);
    // Implement the logic to submit the debt here
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
        className='w-full'
        name='debt_total'
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
