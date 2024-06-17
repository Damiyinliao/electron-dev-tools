import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import config from '@/config';

interface State {
  collapsed: boolean;
  themeMode: 'light' | 'dark';
  menuList: MenuItem[];
  defaultOpenKeys: string[];
  defaultSelectedKeys: string[];
  breadcrumbList: string[];
}
interface Action {
  toggleCollapsed: (collapsed: State['collapsed']) => void;
  toggleThemeMode: (themeMode: State['themeMode']) => void;
  setOpenKeys: (openKeys: State['defaultOpenKeys']) => void;
  setSelectKeys: (selectKeys: State['defaultSelectedKeys']) => void;
  setBreadcrumbList: (breadcrumbList: State['breadcrumbList']) => void;
}

export const useAppStore = create<State & Action>()(
  devtools(
    persist(
      (set) => {
        return {
          menuList: config.menuList,
          defaultOpenKeys: ['Home'],
          defaultSelectedKeys: ['Home'],
          collapsed: false,
          themeMode: 'light',
          breadcrumbList: [],
          setOpenKeys: (openKeys: State['defaultOpenKeys']) => set({ defaultOpenKeys: openKeys }, false, '设置菜单展开项'),
          setSelectKeys: (selectKeys: State['defaultSelectedKeys']) => set({ defaultSelectedKeys: selectKeys }, false, '设置菜单选中项'),
          toggleCollapsed: (collapsed) => set({ collapsed }, false, '设置侧边栏收起状态'),
          toggleThemeMode: (themeMode) => set({ themeMode }, false, '设置主题模式'),
          setBreadcrumbList: (breadcrumbList) => set({ breadcrumbList }, false, '设置面包屑导航'),
        };
      },
      {
        name: 'appStore',
        storage: createJSONStorage(() => localStorage)
      }
    ),
    { name: 'appStore' }
  )
)