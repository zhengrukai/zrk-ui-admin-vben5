<script lang="ts" setup>
import type {
  WorkbenchProjectItem,
  WorkbenchQuickNavItem,
  WorkbenchTodoItem,
  WorkbenchTrendItem,
} from '@vben/common-ui';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import {
  AnalysisChartCard,
  WorkbenchHeader,
  WorkbenchProject,
  WorkbenchQuickNav,
  WorkbenchTodo,
  WorkbenchTrends,
} from '@vben/common-ui';
import { preferences } from '@vben/preferences';
import { useUserStore } from '@vben/stores';
import { openWindow } from '@vben/utils';

import AnalyticsVisitsSource from '../analytics/analytics-visits-source.vue';

const userStore = useUserStore();

// url 也可以是内部路由，在 navTo 方法中识别处理，进行内部跳转
// 例如：url: /dashboard/workspace
const projectItems: WorkbenchProjectItem[] = [
  {
    color: '#1890ff',
    content: '',
    date: '2026-01-01',
    group: 'Spring Cloud 微服务架构',
    icon: 'material-symbols:cloud-outline',
    title: 'zrk-cloud',
    url: 'https://github.com/zhengrukai/zrk-cloud',
  },
  {
    color: '#e18525',
    content: '',
    date: '2026-03-01',
    group: 'Vue3 + vben5 管理后台',
    icon: 'devicon:antdesign',
    title: 'zrk-ui-admin-vben5',
    url: 'https://github.com/zhengrukai/zrk-ui-admin-vben5',
  },
  {
    color: '#2979ff',
    content: '',
    date: '2026-xx-xx',
    group: 'Vue3 + uniapp 管理手机端',
    icon: 'ant-design:mobile',
    title: 'zrk-ui-admin-uniapp',
    url: 'https://github.com/zhengrukai/zrk-ui-admin-uniapp',
  },
  {
    color: '#ff4d4f',
    content: '',
    date: '2026-xx-xx',
    group: 'Vue3 + uniapp 商城手机端',
    icon: 'icon-park-outline:mall-bag',
    title: 'zrk-mall-uniapp',
    url: 'https://github.com/zhengrukai/zrk-mall-uniapp',
  },
  {
    color: '#ff4d4f',
    content: '',
    date: '2026-xx-xx',
    group: 'XXX',
    icon: 'icon-park-outline:mall-bag',
    title: 'XXX',
    url: 'https://github.com/zhengrukai/',
  },
  {
    color: '#ff4d4f',
    content: '',
    date: '2026-xx-xx',
    group: 'XXX',
    icon: 'icon-park-outline:mall-bag',
    title: 'XXX',
    url: 'https://github.com/zhengrukai/',
  }
];

// 同样，这里的 url 也可以使用以 http 开头的外部链接
const quickNavItems: WorkbenchQuickNavItem[] = [
  {
    color: '#1fdaca',
    icon: 'ion:home-outline',
    title: '首页',
    url: '/',
  },
  // {
  //   color: '#ff6b6b',
  //   icon: 'ep:shop',
  //   title: '商城中心',
  //   url: '/mall',
  // },
  {
    color: '#7c3aed',
    icon: 'tabler:ai',
    title: 'AI 大模型',
    url: '/ai',
  },
  {
    color: '#3fb27f',
    icon: 'simple-icons:erpnext',
    title: 'ERP 系统',
    url: '/erp',
  },
  // {
  //   color: '#4daf1bc9',
  //   icon: 'simple-icons:civicrm',
  //   title: 'CRM 系统',
  //   url: '/crm',
  // },
  // {
  //   color: '#1a73e8',
  //   icon: 'fa-solid:hdd',
  //   title: 'IoT 物联网',
  //   url: '/iot',
  // },
];

const todoItems = ref<WorkbenchTodoItem[]>([
  {
    completed: false,
    content: `系统支持 JDK 17/21，Vue 3`,
    date: '2026-03-14 09:30:00',
    title: '技术兼容性',
  },
  {
    completed: false,
    content: `后端提供 Spring Boot 3.2 + Cloud 双架构`,
    date: '2026-03-14 09:30:00',
    title: '架构灵活性',
  }
]);
const trendItems: WorkbenchTrendItem[] = [
  // {
  //   avatar: 'svg:avatar-1',
  //   content: `在 <a>开源组</a> 创建了项目 <a>Vue</a>`,
  //   date: '刚刚',
  //   title: '威廉',
  // },
  // {
  //   avatar: 'svg:avatar-2',
  //   content: `关注了 <a>威廉</a> `,
  //   date: '1个小时前',
  //   title: '艾文',
  // },
  // {
  //   avatar: 'svg:avatar-3',
  //   content: `发布了 <a>个人动态</a> `,
  //   date: '1天前',
  //   title: '克里斯',
  // },
  // {
  //   avatar: 'svg:avatar-4',
  //   content: `发表文章 <a>如何编写一个Vite插件</a> `,
  //   date: '2天前',
  //   title: 'Vben',
  // },
  // {
  //   avatar: 'svg:avatar-1',
  //   content: `回复了 <a>杰克</a> 的问题 <a>如何进行项目优化？</a>`,
  //   date: '3天前',
  //   title: '皮特',
  // },
  // {
  //   avatar: 'svg:avatar-2',
  //   content: `关闭了问题 <a>如何运行项目</a> `,
  //   date: '1周前',
  //   title: '杰克',
  // },
  // {
  //   avatar: 'svg:avatar-3',
  //   content: `发布了 <a>个人动态</a> `,
  //   date: '1周前',
  //   title: '威廉',
  // },
  // {
  //   avatar: 'svg:avatar-4',
  //   content: `推送了代码到 <a>Github</a>`,
  //   date: '2021-04-01 20:00',
  //   title: '威廉',
  // },
  // {
  //   avatar: 'svg:avatar-4',
  //   content: `发表文章 <a>如何编写使用 Admin Vben</a> `,
  //   date: '2021-03-01 20:00',
  //   title: 'Vben',
  // },
];

const router = useRouter();

// 这是一个示例方法，实际项目中需要根据实际情况进行调整
// This is a sample method, adjust according to the actual project requirements
function navTo(nav: WorkbenchProjectItem | WorkbenchQuickNavItem) {
  if (nav.url?.startsWith('http')) {
    openWindow(nav.url);
    return;
  }
  if (nav.url?.startsWith('/')) {
    router.push(nav.url).catch((error) => {
      console.error('Navigation failed:', error);
    });
  } else {
    console.warn(`Unknown URL for navigation item: ${nav.title} -> ${nav.url}`);
  }
}
</script>

<template>
  <div class="p-5">
    <WorkbenchHeader
      :avatar="userStore.userInfo?.avatar || preferences.app.defaultAvatar"
    >
      <template #title>
        早安, {{ userStore.userInfo?.nickname }}, 开始您一天的工作吧！
      </template>
      <template #description> 今日晴，20℃ - 32℃！ </template>
    </WorkbenchHeader>

    <div class="mt-5 flex flex-col lg:flex-row">
      <div class="mr-4 w-full lg:w-3/5">
        <WorkbenchProject :items="projectItems" title="项目" @click="navTo" />
        <WorkbenchTrends :items="trendItems" class="mt-5" title="最新动态" />
      </div>
      <div class="w-full lg:w-2/5">
        <WorkbenchQuickNav
          :items="quickNavItems"
          class="mt-5 lg:mt-0"
          title="快捷导航"
          @click="navTo"
        />
        <WorkbenchTodo :items="todoItems" class="mt-5" title="待办事项" />
        <AnalysisChartCard class="mt-5" title="访问来源">
          <AnalyticsVisitsSource />
        </AnalysisChartCard>
      </div>
    </div>
  </div>
</template>
