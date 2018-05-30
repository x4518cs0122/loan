import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export const constantRouterMap = [{
    path: '/',
    redirect: '/login',
    hidden: true
}, {
    path: '/login',
    name: 'login',
    component: resolve => require(['../base/login/login'], resolve),
    hidden: true
}, {
    //tab下的待办
    path: '/todo',
    component: resolve => require(['../components/todo/todo'], resolve),
    hidden: true
}]

export const asyncRouterMap = [{
        path: '/bussiness',
        name: 'bussiness',
        meta: { roles: 'bussiness', title: '业务办理' },
        component: resolve => require(['../components/bussiness/bussiness'], resolve),
        hidden: true
    },
    {
        //接单
        path: '/order',
        name: 'order',
        meta: { roles: 'jiedan', icon: 'fa-handshake-o', title: '接单' },
        component: resolve => require(['../components/section-one/order/order'], resolve)
    },
    {
        //面谈
        path: '/interview',
        name: 'interview',
        meta: { roles: 'miantan', icon: 'fa-coffee', title: '面谈' },
        component: resolve => require(['../components/section-one/interview/interview'], resolve),
        children: [{
            path: ':id',
            meta: { roles: 'miantan' },
            component: resolve => require(['../components/section-one/interview/interview-detail'], resolve),
            // children: [{
            //     path: 'sqForms',
            //     meta: { roles: 'miantan'},
            //     component: resolve => require(['../components/section-one/interview/application'], resolve)
            // }]
        }]
    }, {
        //面签
        path: '/sign',
        name: 'sign',
        meta: { roles: 'mianqian', icon: 'fa-files-o', title: '面签' },
        component: resolve => require(['../components/section-one/sign/sign'], resolve),
        children: [{
            path: 'confirmState',
            meta: { roles: 'mianqian' },
            component: resolve => require(['../components/section-one/sign/confirmState'], resolve),
        },{
            path: ':id',
            meta: { roles: 'mianqian' },
            component: resolve => require(['../components/section-one/sign/sign-detail'], resolve),
            children: [{
                path: 'form',
                meta: { roles: 'mianqian' },
                component: resolve => require(['../components/section-one/sign/jymulu'], resolve),
            }, {
                path: 'application',
                meta: { roles: 'mianqian' },
                component: resolve => require(['../components/section-one/sign/application'], resolve),
            }]
        }]
    }, {
        //评估下单
        path: '/evaluate',
        name: 'evaluate',
        meta: { roles: 'pinggu', icon: 'fa-calculator', title: '评估下单' },
        component: resolve => require(['../components/section-one/evaluate/evaluate'], resolve),
        children: [{
            path: 'placeOrder',
            meta: { roles: 'pinggu' },
            component: resolve => require(['../components/section-one/evaluate/placeOrder'], resolve)
        }, {
            path: 'unreported',
            meta: { roles: 'pinggu' },
            component: resolve => require(['../components/section-one/evaluate/unreported'], resolve)
        }]
    },
    {
        //审批
        path: '/approve',
        name: 'approve',
        meta: { roles: 'shengpi', icon: 'fa-pencil', title: '审批' },
        component: resolve => require(['../components/section-one/approve/approve'], resolve),
        children: [{
            path: ':id',
            meta: { roles: 'shengpi' },
            component: resolve => require(['../components/section-one/approve/approve-detail'], resolve),
            children: [{
                path: 'mulu',
                meta: { roles: 'shengpi' },
                component: resolve => require(['../components/section-one/approve/mulu'], resolve),
            }, {
                path: 'subbranch',
                meta: { roles: 'shengpi' },
                component: resolve => require(['../components/section-one/approve/subbranch'], resolve),
            }, {
                path: 'branch',
                meta: { roles: 'shengpi' },
                component: resolve => require(['../components/section-one/approve/branch'], resolve),
            }, {
                path: 'zhengping',
                meta: { roles: 'shengpi' },
                component: resolve => require(['../components/section-one/approve/zhengping'], resolve),
            }]
        }]
    },
    {
        //抵押
        path: '/mortgage',
        name: 'mortgage',
        meta: { roles: 'diya', icon: 'fa-university', title: '抵押' },
        component: resolve => require(['../components/section-one/mortgage/mortgage'], resolve),
        children: [{
            path: 'timePicker',
            component: resolve => require(['../components/section-one/mortgage/mortgage-time'], resolve),
        }, {
            path: 'statusPicker',
            component: resolve => require(['../components/section-one/mortgage/mortgage-status'], resolve),
        }]
    },
    {
        //放款
        path: '/getmoney',
        name: 'getmoney',
        meta: { roles: 'fangkuan', icon: 'fa-money', title: '放款' },
        component: resolve => require(['../components/section-one/getmoney/getmoney'], resolve),
        children: [{
            path: 'fangkuan',
            component: resolve => require(['../components/section-one/getmoney/fangkuan'], resolve)
        }, {
            path: 'danbao',
            component: resolve => require(['../components/section-one/getmoney/danbao'], resolve)
        }]
    }, {
        path: '/erOrder',
        name: 'erOrder',
        meta: { roles: 'erJiedan', icon: 'fa-handshake-o', title: '接单' },
        component: resolve => require(['../components/section-two/er-order/er-order'], resolve),
    }, {
        path: '/erSign',
        name: 'erSign',
        meta: { roles: 'erMianqian', icon: 'fa-files-o', title: '面签' },
        component: resolve => require(['../components/section-two/er-sign/er-sign'], resolve),
        children: [{
            path: 'dataGather',
            component: resolve => require(['../components/section-two/er-sign/dataGather'], resolve)
        }]
    }, {
        path: '/erEvaluate',
        name: 'erEvaluate',
        meta: { roles: 'erPingu', icon: 'fa-calculator', title: '评估下单' },
        component: resolve => require(['../components/section-two/er-evaluate/er-evaluate'], resolve),
    }, {
        path: '/erWrite',
        name: 'erWrite',
        meta: { roles: 'erShuji', icon: 'fa-laptop', title: '整件输机' },
        component: resolve => require(['../components/section-two/er-write/er-write'], resolve),
        children: [{
            path: 'progress',
            component: resolve => require(['../components/section-two/er-write/progress'], resolve)
        }]
    }, {
        path: '/erApprove',
        name: 'erApprove',
        meta: { roles: 'erShenpi', icon: 'fa-pencil', title: '审批' },
        component: resolve => require(['../components/section-two/er-approve/er-approve'], resolve),
        children: [{
            path: ':id',
            component: resolve => require(['../components/section-two/er-approve/apprData'], resolve)
        }]
    }, {
        path: '/erGuohu',
        name: 'erGuohu',
        meta: { roles: 'erGuohu', icon: 'fa-building-o', title: '过户' },
        component: resolve => require(['../components/section-two/er-guohu/er-guohu'], resolve),
        children: [{
            path: 'customer',
            component: resolve => require(['../components/section-two/er-guohu/customer'], resolve)
        }, {
            path: 'quanzheng',
            component: resolve => require(['../components/section-two/er-guohu/quanzheng'], resolve)
        }]
    }, {
        path: '/erMortgage',
        name: 'erMortgage',
        meta: { roles: 'erDiya', icon: 'fa-university', title: '抵押' },
        component: resolve => require(['../components/section-two/er-mortgage/er-mortgage'], resolve),
        children: [{
            path: 'erMortDetail',
            component: resolve => require(['../components/section-two/er-mortgage/er-mort-detail'], resolve)
        }]
    }
]

export default new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})