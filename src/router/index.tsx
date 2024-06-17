import { memo, useState } from 'react';
import { createBrowserRouter, RouterProvider, RouteObject, Navigate } from 'react-router-dom';
import BasicLayout from '@/layout/index';
import ErrorPage from '@/views/error/404/index';
import { routesFromMenu } from './routerHelper';

const Router = () => {
  // const [routes, setRoutes] = useState<RouteObject[]>([
  //   {
  //     path: '/',
  //     element: <BasicLayout />,
  //     errorElement: <ErrorPage />,
  //     children: [
  //       {
  //         index: true,
  //         element: <Navigate to="home" />
  //       },
  //       {
  //         path: 'home',
  //         element: <Home></Home>
  //       },
  //       {
  //         path: 'formatters',
  //         children: [
  //           {
  //             path: 'json',
  //             element: <JSONFormatter></JSONFormatter>
  //           },
  //           {
  //             path: 'sql',
  //             element: <SQLFormatter></SQLFormatter>
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // ]);
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <BasicLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Navigate to="home" />
        },
        ...routesFromMenu
      ]
    }
  ];
  console.log('routes----@@@', routes);
  return <RouterProvider router={createBrowserRouter(routes)} />;
}

export default memo(Router);