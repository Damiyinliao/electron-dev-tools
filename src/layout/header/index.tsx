import { Layout, Button } from '@arco-design/web-react';
import { IconCaretRight, IconCaretLeft } from '@arco-design/web-react/icon';
import { useState } from 'react';
import { useAppStore } from '@/stores/app';

const { Header } = Layout;
export default function LayoutHeader() {
  const { collapsed, toggleCollapsed } = useAppStore();

  return (
    <Header>
      <Button shape='round' className='trigger' onClick={() => toggleCollapsed(!collapsed)}>
        { collapsed ? <IconCaretRight /> : <IconCaretLeft />}
      </Button>
    </Header>
  );
}