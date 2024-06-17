import { Layout, Breadcrumb, Button } from '@arco-design/web-react';
import { useAppStore } from '@/stores/app';
import { Outlet, useNavigate } from 'react-router-dom';
import Sider from './sider/index';
import Header from './header/index';
import './index.css';


const { Content, Footer } = Layout

export default function BasicLayout() {
  const { collapsed, breadcrumbList, toggleCollapsed } = useAppStore();

  return (
    <Layout className='layout-collapse-demo flex-row'>
      <Sider />
      <Layout>
        <Header />
        <Layout style={{ padding: '0 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {breadcrumbList.map((item, index) => {
              return (
                <Breadcrumb.Item key={index}>
                  {item}
                </Breadcrumb.Item>
              )
            })}
          </Breadcrumb>
          <Content>
            <Outlet />
          </Content>
          <Footer>DevTools</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}
