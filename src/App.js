import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';

import Sidebar from './shared/Sidebar';
import Routes from './routes';

const { Header, Content } = Layout;

function App() {
  return (
    <Layout className="site-layout-wrapper">
      <BrowserRouter>
        <Sidebar />

        <Layout>
          <Header className="site-layout-header" />

          <Content className="site-layout-content">
            <main className="site-layout-main">
              <Routes />
            </main>
          </Content>
        </Layout>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
