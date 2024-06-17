interface MenuItem {
  name: string;
  title: string;
  icon: string;
  path: string;
  component?: string;
  children: MenuItem[];
}