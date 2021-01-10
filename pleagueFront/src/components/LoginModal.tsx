import {Button, Form, Input, Modal} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import {useCallback} from "react";

type Props = {
    visible: boolean,
    handleToggleModal: () => void;
    handleDrawer: () => void;
}

const LoginModal = ({visible, handleToggleModal, handleDrawer}: Props) => {
    const onSubmitForm = useCallback(() => {
        console.log('로그인 요청됨 ');
    }, []);

    const [form] = Form.useForm();
    return (
        <>
            <Modal
                title="Login"
                visible={visible}
                // confirmLoading={confirmLoading}
                onCancel={handleToggleModal}
                footer={[
                    <Button key="register" onClick={handleDrawer}>회원가입</Button>,
                    <Button form="login" key="submit" htmlType="submit" type="primary"
                            onClick={form.submit}>Login</Button>,
                ]}
            >
                <Form
                    form={form}
                    onFinish={onSubmitForm}>
                    <div>
                        <label htmlFor="user-email">이메일</label>
                        <br/>
                        <Input name="user-email" type="email" placeholder="email" required/>
                    </div>
                    <div>
                        <label htmlFor="user-password">비밀번호</label>
                        <br/>
                        <Input.Password name="user-password"
                                        placeholder="password"
                                        required
                                        iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}/>
                    </div>
                </Form>
            </Modal>
        </>
    )
}

export default LoginModal
