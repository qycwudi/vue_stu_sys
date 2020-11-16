import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/tongzhi',
    meta: {
      title: '学校通知', icon: 'el-icon-s-custom',
    },
    children: [{
      path: 'tongzhi',
      name: '通知',
      component: () => import('@/views/tongzhi/tongzhi'),
      meta: { title: '通知', icon: 'dashboard' }
    },
    {
        path: 'tongzhi1',
        name: '通知1',
        component: () => import('@/views/tongzhi/tongzhi'),
        meta: { title: '通知1', icon: 'dashboard' }
      },
  ]
  }
];
export const asyncRoutes = [
  // 个人信息
  {
    path: '/user',
    component: Layout,
    // redirect: '/user/show',  //默认路由
    name: '信息管理',
    meta: {
      title: '信息管理', icon: 'el-icon-s-custom',
      roles: ['admin', 'instr']
    },
    children: [
      {
        path: 'show',
        name: '个人信息',

        //转到页面
        component: () => import('@/views/user/show'),
        meta: {
          title: '个人信息', icon: 'el-icon-s-custom'
          ,roles: ['admin']
        }
      },
       {
        path: 'show1',
        name: '个人信息1',

        //转到页面
        component: () => import('@/views/user/show1'),
        meta: {
          title: '个人信息1', icon: 'el-icon-s-custom',
          roles: ['instr']
        }
      },
      {
        path: 'show2',
        name: '个人信息2',

        //转到页面
        component: () => import('@/views/user/show2'),
        meta: {
          title: '个人信息2', icon: 'el-icon-s-custom',
          roles: ['instr']
        }
      },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
});
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}





export default router
