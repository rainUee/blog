import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Rainee的知识库',
  mode: 'site',
  logo: '/avatar.png',
  favicon: '/avatar.png',
  base: '/blog/',
  // more config: https://d.umijs.org/config
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: '施工ing',
      path: '链接是可选的',
      // 可通过如下形式嵌套二级导航菜单，目前暂不支持更多层级嵌套：
      children: [
        { title: '第一项', path: 'https://d.umijs.org' },
        { title: '第二项', path: '/guide' },
      ],
    },
    {
      title: 'GitHub',
      path: 'https://github.com/rainUee/blog',
    },
  ],
});
