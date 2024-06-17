import React, { Suspense } from "react";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import config from "@/config/index";

const componentsMap: { [key: string]: () => Promise<{ default: React.ComponentType<any> }> } = {
  '/views/home': () => import('@/views/home/index'),
  '/views/formatters/json': () => import('@/views/formatters/json/index'),
  '/views/formatters/sql': () => import('@/views/formatters/sql/index')
}

// 菜单列表扁平化
const flattenMenuList = (menuList: MenuItem[], parentPath = ''): RouteObject[] => {
  let result: RouteObject[] = [];
  menuList.forEach((item) => {
    const route: RouteObject = {
      path: item.path.startsWith('/') ? item.path.slice(1) : item.path, // 去掉开头的 /
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          {React.createElement(lazy(componentsMap[item.component]))}
        </Suspense>
      )
    }
    result.push(route);
    if (item.children && item.children.length > 0) {
      result = result.concat(flattenMenuList(item.children));
    }
  });
  return result;
}

export const routesFromMenu = flattenMenuList(config.menuList);