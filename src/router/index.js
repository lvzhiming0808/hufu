import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/layout/Layout'
import createStrategy from '../views/createStrategy1/index.vue'
// import addStrategy from '../views/strategyDetail/index.vue'
import personal from '../views/personal/index.vue'
Vue.use(Router)

const _import = file => require(`@/views/${file}`).default

export const constantRouterMap = [
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/login',
    component: _import('login'),
    hidden: true
  },
  {
    path: '/layout',
    component: Layout,
    redirect: '/layout/dashboard',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: _import('dashboard/index'),
        hidden: true
      },
      {
        path: 'ranks',
        name: '录音排行榜',
        component: _import('dashboard/sop/ranks'),
        hidden: true
      },
      {
        path: 'myStrategy',
        component: _import('strategyApproval/index'),
        hidden: true
      },
      {
        path: 'myArmy',
        component: _import('myarmyRecord/index'),
        hidden: true
      },
      {
        path: 'boutiqueBank',
        name: '精品库',
        component: _import('boutiqueBank'),
        beforeEnter: (to, from, next) => {
          const path = from.path
          if (!(~path.indexOf('/strategyDetail') || ~path.indexOf('/showDetail'))) {
            sessionStorage.setItem('clear-speechcraft-data', 1)
          }
          next()
        },
        children: [
          {
            path: '',
            redirect: 'speechcraft'
          },
          {
            path: 'speechcraft',
            component: _import('boutiqueBank/speechcraft/index'),
            name: '军团策略话术'
          },
          {
            path: 'record',
            component: _import('boutiqueBank/record/index'),
            name: '销售录音'
          }
        ]
      },
      {
        path: 'dataTable',
        component: _import('dataTable/index'),
        hidden: true,
        children: [{
          path: '',
          redirect: 'QCList'
        },
        {
          path: 'QCList',
          component: _import('dataTable/list/QCList'),
          name: '虎符质检综合报表列表'
        },
        {
          path: 'analysisList',
          component: _import('dataTable/list/analysisList'),
          name: '军团策略与分析报告列表'
        },
        {
          path: 'qualityGrade',
          component: _import('dataTable/list/qualityGrade'),
          name: '虎符质检抽查打分表列表'
        },
        {
          path: 'strategyList',
          component: _import('dataTable/list/strategyList'),
          name: '军团策略话术列表'
        },
        {
          path: 'workloadList',
          component: _import('dataTable/list/workloadList'),
          name: '工作量报表列表'
        }
        ]
      },
      {
        path: '/compare',
        component: _import('myarmyRecord/myArmy/compare'),
        name: '数据对比页'
      },
      {
        path: '/itemCompare',
        component: _import('myarmyRecord/myArmy/itemCompare'),
        name: '人员对比'
      }
    ]
  },
  {
    path: '/messageCenter',
    component: _import('messageCenter'),
    name: '消息中心',
    children: [
      {
        path: '',
        redirect: 'all'
      },
      {
        path: 'myStrategy',
        component: _import('messageCenter/myStrategy')
      },
      {
        path: 'sop',
        component: _import('messageCenter/sop')
      },
      {
        path: 'system',
        component: _import('messageCenter/system')
      },
      {
        path: 'all',
        component: _import('messageCenter/all')
      }
    ]
  },
  {
    path: '/toOuterStrategyDetail',
    component: _import('outerStrategyDetail'),
    name: '外链详情页',
    children: [
      {
        path: '',
        redirect: 'firstStrategy'
      },
      {
        path: 'firstStrategy',
        component: _import('outerStrategyDetail/firstStrategy')
      },
      {
        path: 'sevenStrategy',
        component: _import('outerStrategyDetail/sevenStrategy')
      },
      {
        path: 'reporStrategy',
        component: _import('outerStrategyDetail/reporStrategy')
      }
    ]
  },
  {
    path: '/404',
    component: _import('404'),
    hidden: true
  },
  {
    path: '/personal',
    component: personal
  },
  {
    path: '/strategyDetail',
    component: _import('strategyDetail/index'),
    hidden: true,
    name: '策略详情页'
  },
  {
    path: '/createStrategy1',
    component: createStrategy,
    name: '创建策略1'
    /* meta: {
      keepAlive: true
    }*/
  },
  {
    path: '/createStrategy2',
    component: _import('createStrategy2/index'),
    name: '创建策略2'
    /* meta: {
      keepAlive: true
    }*/
  },
  {
    path: '/createStrategy3',
    component: _import('createStrategy3/index'),
    name: '创建策略3'
    /* meta: {
      keepAlive: true
    }*/
  },
  {
    path: '/createStrategy4',
    component: _import('createStrategy4/index'),
    name: '创建策略4'
    /* meta: {
      keepAlive: true
    }*/
  },
  /* {
    path: '/approvalDetail',
    component: _import('approvalDetail/index'),
    name: '审批详情页'
  },*/
  {
    path: '/creatingAnalysis',
    component: _import('creatingAnalysis/index'),
    name: '创建分析报告'
  },
  /* {
   path: '/approvalDetails',
   component: _import('approvalDetails/index'),
   name: '审批详情'
   },*/
  /* {
    path: '/addStrategy',
    component: addStrategy,
    name: '追加策略'
  },*/
  {
    path: '/analysisDetail',
    component: _import('analysisDetail/index'),
    name: '分析报告详情'
  },
  {
    path: '/workloadSheet',
    component: _import('dataTable/sheets/workloadSheet'),
    name: '工作量报表详情'
  },
  {
    path: '/QCSheet',
    component: _import('dataTable/sheets/QCSheet'),
    name: '质检综合报表详情'
  },
  {
    path: '/audioPlay',
    component: _import('Player/index')
  },
  {
    path: '/complete',
    component: _import('Player/complete')
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  linkActiveClass: 'active',
  routes: constantRouterMap
})
