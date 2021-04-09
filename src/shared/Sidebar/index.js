import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import { DashboardOutlined, DollarOutlined } from '@ant-design/icons';

const { Sider } = Layout;

function Sidebar() {
  const { pathname } = useLocation();

  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div className="logo" />

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['/']}
        selectedKeys={[pathname]}
      >
        <Menu.Item key="/" icon={<DashboardOutlined />}>
          <NavLink to="/">DashBoard</NavLink>
        </Menu.Item>

        <Menu.Item key="/debts" icon={<DollarOutlined />}>
          <NavLink to="/debts">Dívidas</NavLink>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Sidebar;
