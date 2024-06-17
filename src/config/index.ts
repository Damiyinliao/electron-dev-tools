export default {
  menuList: [
    {
      name: 'Home',
      title: '首页',
      path: '/home',
      component: '/views/home',
      icon: 'home',
      children: []
    },
    {
      name: 'Formtters',
      title: '格式化',
      path: '/formatters',
      icon: 'code',
      children: [
        {
          name: 'JsonFormatter',
          title: 'JSON格式化',
          path: '/formatters/json',
          component: '/views/formatters/json',
          icon: 'codeBlock',
          children: []
        },
        {
          name: 'SQLFormatter',
          title: 'SQL格式化',
          path: '/formatters/sql',
          component: '/views/formatters/sql',
          icon: 'calendar',
          children: []
        }
      ]
    }
  ]
}