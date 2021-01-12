import React, { useCallback } from 'react';
import { Button, Drawer, Form, Input } from 'antd';
import useInput from '../hooks/useInput';

type Props = {
  visible: boolean;
  handleDrawer: () => void;
};

const RegisterForm = ({ visible, handleDrawer }: Props) => {
  const [email, onChangeEmail, setEmail] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');
  const [passwordConfirm, onChangePasswordConfirm, setPasswordConfirm] = useInput('');

  const validatePassword = useCallback(
    async (rules, value, callback) => {
      try {
        if (value && value !== password) {
          return Promise.reject(new Error('비밀번호가 다릅니다.'));
        }
        return Promise.resolve();
      } catch (e) {
        console.error(e);
        return Promise.reject(e);
      }
    },
    [password],
  );

  const [form] = Form.useForm(); // useMemo를

  const onRegister = useCallback(() => {
    console.log('회원가입 요청됨 ', email, password);
  }, [email, password]);

  return (
    <>
      <Drawer
        title="Create a new account"
        width={360}
        visible={visible}
        onClose={handleDrawer}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button style={{ marginRight: 8 }}>Back</Button>
            <Button type="primary" onClick={form.submit}>
              register
            </Button>
          </div>
        }
      >
        <Form layout="vertical" hideRequiredMark form={form} onFinish={onRegister}>
          <Form.Item
            name="email"
            label="이메일"
            htmlFor="user-email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please enter user email',
              },
            ]}
          >
            <Input onChange={onChangeEmail} value={email} placeholder="Please enter user email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="비밀번호"
            rules={[
              {
                required: true,
                message: 'Please enter user password',
              },
            ]}
          >
            <Input.Password value={password} onChange={onChangePassword} placeholder="password" />
          </Form.Item>
          <Form.Item
            name="password-check"
            label="비밀번호 확인"
            rules={[
              {
                required: true,
                message: 'Please check user password',
              },
              { validator: validatePassword },
            ]}
          >
            <Input.Password value={passwordConfirm} onChange={onChangePasswordConfirm} placeholder="password" />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default RegisterForm;
