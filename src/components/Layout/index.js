import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import "./styles.css";

const { Header, Sider, Content } = Layout;

const AppLayout = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const navigateTo = (menu) => {
    history.push(menu.key);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[history.location.pathname]}
        >
          <Menu.Item key="/users" onClick={navigateTo}>
            Users
          </Menu.Item>
          <Menu.Item key="/pageone" onClick={navigateTo}>
            Page One
          </Menu.Item>
          <Menu.Item key="/pagetwo" onClick={navigateTo}>
            Page Two
          </Menu.Item>
          <Menu.Item key="/pagethree" onClick={navigateTo}>
            Page Three
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ paddingLeft: 16 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
