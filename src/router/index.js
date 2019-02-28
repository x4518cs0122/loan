import Vue from 'vue';
import Router from 'vue-router';
import { Permission } from '@/utils/Const.js';

Vue.use(Router);

export const constantRouterMap = [
  {
    path: '/',
    redirect: '/login',
    hidden: true
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['../base/login/login'], resolve),
    hidden: true
  }
];

export const asyncRouterMap = [
  {
    path: '/bussiness',
    name: 'bussiness',
    meta: { roles: Permission.EMPLOYEE, title: '业务办理' },
    // component: resolve => require(['../components/bussiness/bussiness'], resolve),
    component: resolve => require(['../components/mainPage'], resolve),
    hidden: true
  },
  {
    //接单
    path: '/order',
    name: 'checklist',
    meta: { roles: Permission.EMPLOYEE, icon: 'fa-handshake-o', title: '接单' },
    component: resolve => require(['../components/mortgageLoan/getOrder/jiedan'], resolve)
  },
  {
    //面谈
    path: '/interview',
    name: 'view',
    meta: { roles: Permission.EMPLOYEE, icon: 'fa-coffee', title: '面谈' },
    component: resolve => require(['../components/mortgageLoan/interview/interview'], resolve),
    children: [
      {
        path: ':id',
        meta: { roles: Permission.EMPLOYEE },
        component: resolve => require(['../components/mortgageLoan/interview/interview-detail'], resolve)
        // children: [{
        //     path: 'sqForms',
        //     meta: { roles: 'miantan'},
        //     component: resolve => require(['../components/section-one/interview/application'], resolve)
        // }]
      }
    ]
  },
  {
    //面签
    path: '/sign',
    name: 'visa',
    meta: { roles: Permission.EMPLOYEE, icon: 'fa-files-o', title: '面签' },
    component: resolve => require(['../components/mortgageLoan/sign/index.vue'], resolve),
    children: [
      {
        path: 'confirmState',
        meta: { roles: Permission.EMPLOYEE },
        component: resolve => require(['../components/mortgageLoan/sign/confirmState'], resolve)
      },
      {
        path: ':id',
        meta: { roles: Permission.EMPLOYEE },
        component: resolve => require(['../components/mortgageLoan/sign/sign-detail'], resolve),
        children: [
          {
            path: 'form',
            meta: { roles: Permission.EMPLOYEE },
            component: resolve => require(['../components/mortgageLoan/sign/jymulu'], resolve)
          },
          {
            path: 'application',
            name: 'application',
            meta: { roles: Permission.EMPLOYEE },
            component: resolve => require(['../components/mortgageLoan/sign/application'], resolve)
          }
        ]
      }
    ]
  },
  {
    //评估下单
    path: '/evaluate',
    name: 'order',
    meta: { roles: Permission.EMPLOYEE, icon: 'fa-calculator', title: '评估下单' },
    component: resolve => require(['../components/mortgageLoan/valuations/evaluate'], resolve),
    children: [
      {
        path: 'placeOrder',
        meta: { roles: Permission.EMPLOYEE },
        component: resolve => require(['../components/mortgageLoan/valuations/placeOrder'], resolve)
      },
      {
        path: 'reports',
        meta: { roles: Permission.EMPLOYEE },
        component: resolve => require(['../components/mortgageLoan/valuations/reports'], resolve)
      }
    ]
  },
  {
    //审批
    path: '/approve',
    name: 'approve',
    meta: { roles: Permission.EMPLOYEE, icon: 'fa-pencil', title: '审批' },
    component: resolve => require(['../components/mortgageLoan/approval/approve'], resolve),
    children: [
      {
        path: ':id',
        meta: { roles: Permission.EMPLOYEE },
        component: resolve => require(['../components/mortgageLoan/approval/approve-detail'], resolve),
        children: [
          {
            path: 'mulu',
            meta: { roles: Permission.EMPLOYEE },
            component: resolve => require(['../components/mortgageLoan/approval/mulu'], resolve)
          },
          {
            path: 'state',
            meta: { roles: Permission.EMPLOYEE },
            component: resolve => require(['../components/mortgageLoan/approval/state'], resolve)
          },
          {
            path: 'baoshen',
            meta: { roles: Permission.EMPLOYEE },
            component: resolve => require(['../components/mortgageLoan/approval/baoshen'], resolve)
          },
          {
            path: 'zhengping',
            meta: { roles: Permission.EMPLOYEE },
            component: resolve => require(['../components/mortgageLoan/approval/reports'], resolve)
          }
        ]
      }
    ]
  },
  {
    //抵押
    path: '/mortgage',
    name: 'mortgage',
    meta: { roles: Permission.EMPLOYEE, icon: 'fa-university', title: '抵押' },
    component: resolve => require(['../components/mortgageLoan/diya/mortgage'], resolve),
    children: [
      {
        path: 'statusPicker',
        meta: { roles: Permission.EMPLOYEE },
        component: resolve => require(['../components/mortgageLoan/diya/mortgage-status'], resolve)
      }
    ]
  },
  {
    //放款
    path: '/charge',
    name: 'charge',
    meta: { roles: Permission.EMPLOYEE, icon: 'fa-diamond', title: '收费' },
    component: resolve => require(['../components/mortgageLoan/charge/index'], resolve),
    children: [
      {
        path: 'chargeState',
        meta: { roles: Permission.EMPLOYEE },
        component: resolve => require(['../components/mortgageLoan/charge/chargeState'], resolve)
      }
    ]
  },
  {
    //放款
    path: '/getmoney',
    name: 'loan',
    meta: { roles: Permission.EMPLOYEE, icon: 'fa-money', title: '放款' },
    component: resolve => require(['../components/mortgageLoan/getmoney/getmoney'], resolve),
    children: [
      {
        path: 'fangkuan',
        meta: { roles: Permission.EMPLOYEE },
        component: resolve => require(['../components/mortgageLoan/getmoney/fangkuan'], resolve)
      }
    ]
  },
  {
    // 二手房路由
    path: '/erOrder',
    name: 'erchecklist',
    meta: { roles: Permission.EMPLOYEE, icon: 'fa-handshake-o', title: '接单' },
    component: resolve => require(['../components/secondHandLoan/getOrder/erjiedan'], resolve)
  },
  {
    path: '/erSign',
    name: 'ervisa',
    meta: { roles: Permission.EMPLOYEE, icon: 'fa-files-o', title: '面签' },
    component: resolve => require(['../components/secondHandLoan/sign/index'], resolve),
    children: [
      {
        path: 'mulu',
        meta: { roles: Permission.EMPLOYEE },
        component: resolve => require(['../components/secondHandLoan/sign/mulu'], resolve)
      },
      {
        path: 'confirmState',
        meta: { roles: Permission.EMPLOYEE },
        component: resolve => require(['../components/secondHandLoan/sign/confirmState'], resolve)
      }
    ]
  },
  {
    path: '/erEvaluate',
    name: 'erorder',
    meta: { roles: Permission.EMPLOYEE, icon: 'fa-calculator', title: '评估下单' },
    component: resolve => require(['../components/secondHandLoan/valuations/index'], resolve),
    children: [
      {
        path: 'placeOrder',
        meta: { roles: Permission.EMPLOYEE },
        component: resolve => require(['../components/secondHandLoan/valuations/placeOrder'], resolve)
      }
    ]
  },
  {
    // 整件输机
    path: '/erWrite',
    name: 'erinput',
    meta: { roles: Permission.EMPLOYEE, icon: 'fa-laptop', title: '整件输机' },
    component: resolve => require(['../components/secondHandLoan/shuji/index'], resolve),
    children: [
      {
        path: 'check',
        meta: { roles: Permission.EMPLOYEE },
        component: resolve => require(['../components/secondHandLoan/shuji/check'], resolve)
      },
      {
        path: 'catalog',
        meta: { roles: Permission.EMPLOYEE },
        component: resolve => require(['../components/secondHandLoan/shuji/catalog'], resolve)
      },
      {
        path: 'input',
        meta: { roles: Permission.EMPLOYEE },
        component: resolve => require(['../components/secondHandLoan/shuji/inputState'], resolve)
      }
    ]
  },
  {
    path: '/erApprove',
    name: 'erapprove',
    meta: { roles: Permission.EMPLOYEE, icon: 'fa-pencil', title: '审批' },
    component: resolve => require(['../components/secondHandLoan/approve/index'], resolve),
    children: [
      {
        path: 'baoshen',
        meta: { roles: Permission.EMPLOYEE },
        component: resolve => require(['../components/secondHandLoan/approve/baoshen'], resolve)
      },
      {
        path: 'approveState',
        meta: { roles: Permission.EMPLOYEE },
        component: resolve => require(['../components/secondHandLoan/approve/approveState'], resolve)
      }
    ]
  },
  {
    path: '/erGuohu',
    name: 'ertransfer',
    meta: { roles: Permission.EMPLOYEE, icon: 'fa-building-o', title: '过户' },
    component: resolve => require(['../components/secondHandLoan/guohu/index'], resolve),
    children: [
      {
        path: 'huizheng',
        meta: { roles: Permission.EMPLOYEE },
        component: resolve => require(['../components/secondHandLoan/guohu/huizheng'], resolve)
      },
      {
        path: 'confirmState',
        meta: { roles: Permission.EMPLOYEE },
        component: resolve => require(['../components/secondHandLoan/guohu/confirmState'], resolve)
      }
    ]
  },
  {
    path: '/erMortgage',
    name: 'ermortgageA',
    meta: { roles: Permission.EMPLOYEE, icon: 'fa-university', title: '抵押' },
    component: resolve => require(['../components/secondHandLoan/mortgage/index'], resolve),
    children: [
      {
        path: 'mortgageState',
        meta: { roles: Permission.EMPLOYEE },
        component: resolve => require(['../components/secondHandLoan/mortgage/mortgageState'], resolve)
      },
      {
        path: 'getProof',
        meta: { roles: Permission.EMPLOYEE },
        component: resolve => require(['../components/secondHandLoan/mortgage/getProofTime'], resolve)
      },
      {
        path: 'returnTime',
        meta: { roles: Permission.EMPLOYEE },
        component: resolve => require(['../components/secondHandLoan/mortgage/returnTime'], resolve)
      }
    ]
  },
  {
    path: '/erGuarantee',
    name: 'erguarantee',
    meta: { roles: Permission.EMPLOYEE, icon: 'fa-gavel', title: '担保' },
    component: resolve => require(['../components/secondHandLoan/guarantee/index'], resolve),
    children: [
      {
        path: 'process',
        meta: { roles: Permission.EMPLOYEE },
        component: resolve => require(['../components/secondHandLoan/guarantee/process'], resolve)
      },
      {
        path: 'zhengping',
        meta: { roles: Permission.EMPLOYEE },
        component: resolve => require(['../components/secondHandLoan/guarantee/zhengping'], resolve)
      }
    ]
  },
  {
    path: '/erGetmoney',
    name: 'erloan',
    meta: { roles: Permission.EMPLOYEE, icon: 'fa-money', title: '放款' },
    component: resolve => require(['../components/secondHandLoan/getmoney/index'], resolve),
    children: [
      {
        path: 'state',
        meta: { roles: Permission.EMPLOYEE },
        component: resolve => require(['../components/secondHandLoan/getmoney/state'], resolve)
      }
    ]
  },
  {
    path: '/erCharge',
    name: 'ercharge',
    meta: { roles: Permission.EMPLOYEE, icon: 'fa-diamond', title: '收费' },
    component: resolve => require(['../components/secondHandLoan/charge/index'], resolve),
    children: [
      {
        path: 'state',
        meta: { roles: Permission.EMPLOYEE },
        component: resolve => require(['../components/secondHandLoan/charge/state'], resolve)
      }
    ]
  },
  /**查询组件路由 */
  {
    path: '/queryResult',
    name: 'queryResult',
    meta: { roles: Permission.EMPLOYEE },
    component: resolve => require(['../components/query/result'], resolve),
    hidden: true
  }
];

export default new Router({
  // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
