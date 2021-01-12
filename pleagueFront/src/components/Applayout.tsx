import React, { useCallback, useState, FC, ReactNode } from 'react';
import { Button, Col, Layout, Menu, Row } from 'antd';
import { MailOutlined, BugTwoTone, WechatOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import RegisterForm from './RegisterForm';

const { Footer } = Layout;

interface Props {
  children: ReactNode;
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
    <div style={{ overflow: 'hidden' }}>
      <Menu mode="horizontal">
        <Menu.Item key="0" icon={<BugTwoTone />}>
          <Link to="/">로고</Link>
        </Menu.Item>
        <Menu.Item key="1" icon={<MailOutlined />}>
          <Link to="/profile">프로필</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<WechatOutlined />}>
          <Link to="/chat">채팅</Link>
        </Menu.Item>
        <Menu.Item style={{ float: 'right' }}>
          <Button onClick={onToggleModal}>Login</Button>
        </Menu.Item>
      </Menu>
      <LoginModal visible={Modalvisible} handleToggleModal={onToggleModal} handleDrawer={onToggleDrawer} />
      <RegisterForm visible={DrawerVisible} handleDrawer={onToggleDrawer} />
      <Row gutter={8}>
        <Col xs={24} md={6}>
          <>왼쪽에 무엇을 넣을까?</>
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a href="https://www.xploitdev.com" target="_blank" rel="noreferrer noopener">
            Made by HeechanYang
          </a>
        </Col>
      </Row>
      <Row
        style={{
          position: 'fixed',
          background: 'grey',
          color: 'white',
          left: '0px',
          bottom: '0px',
          width: '100%',
          fontSize: '11px',
        }}
      >
        <Col xs={24} md={8} />
        <Col xs={24} md={8}>
          <>Made by Yangheechan 2021, ryanhe@gmail.com</>
        </Col>
        <Col xs={24} md={8} />
      </Row>
    </div>
  );
};

export default Applayout;
