import React, {
  useCallback, useState, FC, ReactNode,
} from 'react';
import { Button, Menu } from 'antd';
import { MailOutlined, BugTwoTone, WechatOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import RegisterForm from './RegisterForm';

interface Props {
  children: ReactNode,
}

const Applayout: FC<Props> = ({ children }: Props) => {
  // state
  const [Modalvisible, setModalvisible] = useState(false);
  const onToggleModal = useCallback(() => {
    setModalvisible(!Modalvisible);
  }, [Modalvisible]);

  const [DrawerVisible, setDrawerVisible] = useState(false);
  const onToggleDrawer = useCallback(() => {
    if (Modalvisible) setModalvisible(false);
    setDrawerVisible(!DrawerVisible);
  }, [DrawerVisible, Modalvisible]);

  return (
    <>
      <Menu mode="horizontal">
        <Menu.Item key="0" icon={<BugTwoTone/>}>
          <Link to="/">로고</Link>
        </Menu.Item>
        <Menu.Item key="1" icon={<MailOutlined/>}>
          <Link to="/profile">프로필</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<WechatOutlined/>}>
          <Link to="/chat">채팅</Link>
        </Menu.Item>
        <Menu.Item style={{ float: 'right' }}>
          <Button onClick={onToggleModal}>Login</Button>
        </Menu.Item>
      </Menu>
      <LoginModal
        visible={Modalvisible}
        handleToggleModal={onToggleModal}
        handleDrawer={onToggleDrawer}
      />
      <RegisterForm visible={DrawerVisible} handleDrawer={onToggleDrawer}/>
      {children}
    </>
  );
};

export default Applayout;
