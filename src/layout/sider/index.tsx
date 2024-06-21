import { Layout, Menu, Message } from '@arco-design/web-react';
import { Link, useLocation, useMatches } from 'react-router-dom';
import { useAppStore } from '@/stores/app';
import AcroIcon from '@/components/AcroIcon/index';
import { css } from '@emotion/css';

const { Sider } = Layout;
const { Item: MenuItem, SubMenu } = Menu;

// 递归函数来查找路径
const findBreadcrumbPath = (menuList: MenuItem[], keyword: string): string[] | null => {
  for (const item of menuList) {
    if (item.name === keyword) {
      return [item.name];
    }
    if (item.children.length > 0) {
      const childPath = findBreadcrumbPath(item.children, keyword);
      if (childPath) {
        return [item.name, ...childPath];
      }
    }
  }
  return null;
};

const renderSubMenu = (menuList: MenuItem[]) => {
  return menuList.map((item, index) => {
    if (item.children?.length > 0) {
      return (
        <SubMenu
          key={item.name}
          title={
            <span>
              <AcroIcon name={item.icon} />
              {item.title}
            </span>
          }
        >
          {
            renderSubMenu(item.children)
          }
        </SubMenu>
      )
    }
    return (
      <Link to={item.path} key={item.name}>
        <MenuItem key={item.name}>
          <AcroIcon name={item.icon} />
          {item.title}
        </MenuItem>
      </Link>
    )
  })
}

export default function LayoutSider() {

  const { menuList, collapsed, defaultOpenKeys, defaultSelectedKeys, setOpenKeys, setBreadcrumbList } = useAppStore();

  function onMenuTap(key: string) {
    Message.info({
      content: `You select ${key}`,
      showIcon: true,
    });
    setOpenKeys([key]);
    const breadcrumbList = findBreadcrumbPath(menuList, key);
    if (breadcrumbList.length) {
      setBreadcrumbList(breadcrumbList);
    }
  }

  const styles = css`
    height: 32px;
    margin: 12px 8px;
    background: var(--color-fill-2);
  `

  return (
    <Sider collapsed={collapsed} collapsible trigger={null} breakpoint='xl'>
      <div className={styles} />
      <Menu
        defaultOpenKeys={defaultOpenKeys}
        defaultSelectedKeys={defaultSelectedKeys}
        onClickMenuItem={(key) => onMenuTap(key)}
        style={{ width: '100%' }}
      >
        {
          renderSubMenu(menuList)
        }
      </Menu>
    </Sider>
  )
}