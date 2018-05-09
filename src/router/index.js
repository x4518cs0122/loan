import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/bussiness'
        }, {
            path: '/login',
            name: 'login',
            component: resolve => require(['../base/login/login'], resolve)
        }, {
            path: '/bussiness',
            name: 'bussiness',
            component: resolve => require(['../components/bussiness/bussiness'], resolve)
        },
        {
            //tab下的待办
            path: '/todo',
            component: resolve => require(['../components/todo/todo'], resolve)
        },
        {
            //接单
            path: '/order',
            name: 'order',
            component: resolve => require(['../components/section-one/order/order'], resolve)
        },
        {
            //面谈
            path: '/interview',
            name: 'interview',
            component: resolve => require(['../components/section-one/interview/interview'], resolve),
            children: [{
                path: ':id',
                component: resolve => require(['../components/section-one/interview/interview-detail'], resolve),
                children: [{
                    path: 'sqForms',
                    component: resolve => require(['../components/section-one/interview/application'], resolve)
                }]
            }]
        }, {
            //面签
            path: '/sign',
            name: 'sign',
            component: resolve => require(['../components/section-one/sign/sign'], resolve),
            children: [{
                path: 'reschedule',
                component: resolve => require(['../components/section-one/sign/reschedule'], resolve),
            }, {
                path: 'confirmState',
                component: resolve => require(['../components/section-one/sign/confirmState'], resolve),
            }]
        }, {
            //评估下单
            path: '/evaluate',
            name: 'evaluate',
            component: resolve => require(['../components/section-one/evaluate/evaluate'], resolve),
            children: [{
                path: 'placeOrder',
                component: resolve => require(['../components/section-one/evaluate/placeOrder'], resolve)
            }, {
                path: 'unreported',
                component: resolve => require(['../components/section-one/evaluate/unreported'], resolve)
            }]
        },
        {
            //审批
            path: '/approve',
            name: 'approve',
            component: resolve => require(['../components/section-one/approve/approve'], resolve),
            children: [{
                path: ':id',
                component: resolve => require(['../components/section-one/approve/approve-detail'], resolve),
                children: [{
                    path: 'mulu',
                    component: resolve => require(['../components/section-one/approve/mulu'], resolve),
                }, {
                    path: 'subbranch',
                    component: resolve => require(['../components/section-one/approve/subbranch'], resolve),
                }, {
                    path: 'branch',
                    component: resolve => require(['../components/section-one/approve/branch'], resolve),
                }, {
                    path: 'zhengping',
                    component: resolve => require(['../components/section-one/approve/zhengping'], resolve),
                }]
            }]
        },
        {
            //审批
            path: '/mortgage',
            name: 'mortgage',
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
            //接单
            path: '/getmoney',
            name: 'getmoney',
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
            component: resolve => require(['../components/section-two/er-order/er-order'], resolve),
        }, {
            path: '/erSign',
            name: 'erSign',
            component: resolve => require(['../components/section-two/er-sign/er-sign'], resolve),
            children: [{
                path: 'dataGather',
                component: resolve => require(['../components/section-two/er-sign/dataGather'], resolve)
            }]
        }, {
            path: '/erEvaluate',
            name: 'erEvaluate',
            component: resolve => require(['../components/section-two/er-evaluate/er-evaluate'], resolve),
        }, {
            path: '/erWrite',
            name: 'erWrite',
            component: resolve => require(['../components/section-two/er-write/er-write'], resolve),
            children: [{
                path: 'progress',
                component: resolve => require(['../components/section-two/er-write/progress'], resolve)
            }]
        }, {
            path: '/erApprove',
            name: 'erApprove',
            component: resolve => require(['../components/section-two/er-approve/er-approve'], resolve),
            children: [{
                path: ':id',
                component: resolve => require(['../components/section-two/er-approve/apprData'], resolve)
            }]
        }, {
            path: '/erGuohu',
            name: 'erGuohu',
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
            component: resolve => require(['../components/section-two/er-mortgage/er-mortgage'], resolve),
            children: [{
                path: 'erMortDetail',
                component: resolve => require(['../components/section-two/er-mortgage/er-mort-detail'], resolve)
            }]
        }
    ]
})