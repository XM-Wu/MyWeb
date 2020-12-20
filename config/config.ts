// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';

export default defineConfig({
    hash: true,
    antd: {},
    dva: {
      hmr: true,
    },
    locale: {
      // default zh-CN
      default: 'zh-CN',
      antd: true,
      // default true, when it is true, will use `navigator.language` overwrite default
      baseNavigator: true,
    },
    dynamicImport: {
      loading: '@/components/PageLoading/index',
    },
    targets: {
      ie: 11,
    },
    // umi routes: https://umijs.org/docs/routing
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: 'home',
                icon: 'smile',
                component: './Welcome',
              },
              {
                path: '/task',
                name: 'task',
                icon: 'rocket',
                component: './TaskDashBoard',
              },
              {
                name: 'weight',
                icon: 'heart',
                path: '/weight',
                component: './Weight',
              },
              {
                name: 'selfControl',
                icon: 'table',
                path: '/selfControl',
                component: './SelfControlData',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
    // Theme for antd: https://ant.design/docs/react/customize-theme-cn
    theme: {
      // ...darkTheme,
      'primary-color': defaultSettings.primaryColor,
    },
    // @ts-ignore
    title: false,
    ignoreMomentLocale: true,
    proxy: {
      '/backend/': {
        target: 'http://localhost:9999',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/backend': '',
        },
      },
    },
    manifest: {
      basePath: '/',
    },

  },
);
