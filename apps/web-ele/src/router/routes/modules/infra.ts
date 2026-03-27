import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/infra/codegen/edit',
    component: () => import('#/views/infra/codegen/edit/index.vue'),
    name: 'InfraCodegenEdit',
    meta: {
      title: '生成配置修改',
      icon: 'ic:baseline-view-in-ar',
      activePath: '/infra/codegen',
      keepAlive: true,
      hideInMenu: true,
    },
  },
];

export default routes;
