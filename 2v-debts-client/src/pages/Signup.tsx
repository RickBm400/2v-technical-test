import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { registerUserMutation } from '@/network/queries/user.query';
import { useNavigate } from 'react-router';

export default function Register() {
  const { mutate: mutateRegister } = registerUserMutation();
  const navigate = useNavigate();

  const onFinish = ({
    email,
    password,
    name,
  }: {
    email: string;
    name: string;
    password: string;
  }) => {
    mutateRegister(
      { email, password, name },
      {
        onSuccess: () => {
          message.success('Registro exitoso!');
          navigate('/debts', { replace: true });
        },
        onError: (error) => {
          console.log(error);
          message.error('Error al registrarse. Por favor, intenta de nuevo.');
        },
      },
    );
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <Card className='w-full max-w-sm p-6'>
        <h1 className='text-2xl font-bold text-center mb-6'>Crear Cuenta</h1>

        <Form name='register_form' onFinish={onFinish} autoComplete='off'>
          <Form.Item
            name='name'
            rules={[
              { required: true, message: 'Por favor ingresa tu nombre!' },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder='Nombre de usuario'
              className='py-2'
            />
          </Form.Item>
          <Form.Item
            name='email'
            rules={[
              { required: true, message: 'Por favor ingresa tu email!' },
              { type: 'email', message: 'Ingresa un email válido!' },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder='Email'
              className='py-2'
            />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[
              { required: true, message: 'Por favor ingresa tu contraseña!' },
              {
                min: 6,
                message: 'La contraseña debe tener al menos 6 caracteres',
              },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder='Contraseña'
              className='py-2'
            />
          </Form.Item>

          <Form.Item
            name='confirmPassword'
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Por favor confirma tu contraseña!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Las contraseñas no coinciden'),
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder='Confirmar contraseña'
              className='py-2'
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='w-full bg-blue-600 hover:bg-blue-700'
            >
              Registrarse
            </Button>
          </Form.Item>

          <div className='text-center'>
            <a href='/login'>¿Ya tienes cuenta? Inicia sesión</a>
          </div>
        </Form>
      </Card>
    </div>
  );
}
