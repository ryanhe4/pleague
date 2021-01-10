import {Button, Drawer, Form, Input} from "antd";

type Props = {
    visible: boolean,
    handleDrawer: () => void;
}

const RegisterForm = ({visible, handleDrawer}: Props) => {
    return (
        <>
            <Drawer
                title="Create a new account"
                width={360}
                visible={visible}
                onClose={handleDrawer}
                bodyStyle={{paddingBottom: 80}}
                footer={
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <Button style={{marginRight: 8}}>
                            Back
                        </Button>
                        <Button type="primary">
                            register
                        </Button>
                    </div>
                }>

                <Form layout="vertical" hideRequiredMark>
                    <Form.Item
                        name="email"
                        label="email"
                        rules={[{required: true, message: 'Please enter user email'}]}
                    >
                        <Input placeholder="Please enter user email"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="password"
                        rules={[{required: true, message: 'Please enter user password'}]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        name="password-check"
                        label="password-check"
                        rules={[{required: true, message: 'Please check user password'}]}
                    >
                        <Input.Password/>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    )
};

export default RegisterForm;
