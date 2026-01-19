import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { loginUserMutation } from '@/network/queries/user.query';
import { useNavigate } from 'react-router';

export default function Login() {
  const { mutate: mutateLogin } = loginUserMutation();
  const navigate = useNavigate();

  const onFinish = (payload: { email: string; password: string }) => {
    try {
      mutateLogin(payload, {
        onSuccess: () => {
          navigate('/debts', { replace: true });
        },
      });
    } catch (error) {
      console.log(error);
      message.error(
        'Error al iniciar sesión. Por favor, verifica tus credenciales.',
      );
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <Card className='w-full max-w-sm p-6'>
        <h1 className='text-2xl font-bold text-center mb-6'>Iniciar Sesión</h1>
        <Form
          name='login_form'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete='off'
        >
          <Form.Item
            name='email'
            rules={[{ required: true, message: 'Por favor ingresa tu email!' }]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='email'
              className='py-2'
            />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[
              { required: true, message: 'Por favor ingresa tu contraseña!' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon' />}
              placeholder='Contraseña'
              className='py-2'
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='w-full bg-blue-600 hover:bg-blue-700'
            >
              Ingresar
            </Button>
          </Form.Item>

          <div className='text-center'>
            <a href='/sign-up'>¿No tienes cuenta? Regístrate</a>
          </div>
        </Form>
      </Card>
    </div>
  );
}
