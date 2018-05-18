import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            meta: { title: '抵押贷款' },
            redirect: '/bussiness'
        }, {
            path: '/bussiness',
            name: 'bussiness',
            meta: { title: '抵押贷款' },
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
            meta: { title: '接单' , next:'提交'},
            component: resolve => require(['../components/section-one/order/order'], resolve)
        },
        {
            //面谈
            path: '/interview',
            name: 'interview',
            meta: { title: '抵押面谈列表' },
            component: resolve => require(['../components/section-one/interview/interview'], resolve),
            children: [{
                path: ':id',
                meta: { title: '抵押面谈' },
                component: resolve => require(['../components/section-one/interview/interview-detail'], resolve),
                children: [{
                    path: 'sqForms',
                    meta: { title: '资料目录表',next:'提交' },
                    component: resolve => require(['../components/section-one/interview/application'], resolve)
                }]
            }]
        }, {
            //面签
            path: '/sign',
            name: 'sign',
            meta: { title: '抵押面签列表' },
            component: resolve => require(['../components/section-one/sign/sign'], resolve),
            children: [{
                path: 'reschedule',
                meta: { title: '约定签约时间' ,next:'提交'},
                component: resolve => require(['../components/section-one/sign/reschedule'], resolve),
            }, {
                path: 'confirmState',
                meta: { title: '确定签约状态',next:'提交' },
                component: resolve => require(['../components/section-one/sign/confirmState'], resolve),
            }]
        }, {
            //评估下单
            path: '/evaluate',
            name: 'evaluate',
            meta: { title: '评估下单列表' },
            component: resolve => require(['../components/section-one/evaluate/evaluate'], resolve),
            children: [{
                path: 'placeOrder',
                meta: { title: '下单',next:'提交' },
                component: resolve => require(['../components/section-one/evaluate/placeOrder'], resolve)
            }, {
                path: 'unreported',
                meta: { title: '出报告',next:'提交' },
                component: resolve => require(['../components/section-one/evaluate/unreported'], resolve)
            }]
        },
        {
            //审批
            path: '/approve',
            name: 'approve',
            meta: { title: '抵押审批列表' },
            component: resolve => require(['../components/section-one/approve/approve'], resolve),
            children: [{
                path: ':id',
                meta: { title: '用户审批详情' },
                component: resolve => require(['../components/section-one/approve/approve-detail'], resolve),
                children: [{
                    path: 'mulu',
                    meta: { title: '资料目录表',next:'提交' },
                    component: resolve => require(['../components/section-one/approve/mulu'], resolve),
                }, {
                    path: 'subbranch',
                    meta: { title: '支行审批' ,next:'提交'},
                    component: resolve => require(['../components/section-one/approve/subbranch'], resolve),
                }, {
                    path: 'branch',
                    meta: { title: '分行审批',next:'提交' },
                    component: resolve => require(['../components/section-one/approve/branch'], resolve),
                }, {
                    path: 'zhengping',
                    meta: { title: '出正评',next:'提交' },
                    component: resolve => require(['../components/section-one/approve/zhengping'], resolve),
                }]
            }]
        },
        {
            //审批
            path: '/mortgage',
            name: 'mortgage',
            meta: { title: '抵押面签列表' },
            component: resolve => require(['../components/section-one/mortgage/mortgage'], resolve),
            children: [{
                path: 'timePicker',
                meta: { title: '确定抵押时间',next:'提交' },
                component: resolve => require(['../components/section-one/mortgage/mortgage-time'], resolve),
            }, {
                path: 'statusPicker',
                meta: { title: '确定抵押状态',next:'提交' },
                component: resolve => require(['../components/section-one/mortgage/mortgage-status'], resolve),
            }]
        },
        {
            //放款
            path: '/getmoney',
            name: 'getmoney',
            meta: { title: '抵押放款列表' },
            component: resolve => require(['../components/section-one/getmoney/getmoney'], resolve),
            children: [{
                path: 'fangkuan',
                meta: { title: '放款',next:'提交' },
                component: resolve => require(['../components/section-one/getmoney/fangkuan'], resolve)
            }, {
                path: 'danbao',
                meta: { title: '担保',next:'提交' },
                component: resolve => require(['../components/section-one/getmoney/danbao'], resolve)
            }]
        },{
            path:'/erOrder',
            name:'erOrder',
            meta: { title: '二手房接单' ,next:'提交'},
            component: resolve => require(['../components/section-two/er-order/er-order'], resolve),
        },{
            path:'/erSign',
            name:'erSign',
            meta: { title: '二手房面签列表' },
            component: resolve => require(['../components/section-two/er-sign/er-sign'], resolve),
            children: [{
                path: 'dataGather',
                meta: { title: '资料目录表',next:'提交' },
                component: resolve => require(['../components/section-two/er-sign/dataGather'], resolve)
            }]
        },{
            path:'/erEvaluate',
            name:'erEvaluate',
            meta: { title: '二手房评估列表' },
            component: resolve => require(['../components/section-two/er-evaluate/er-evaluate'], resolve),
        },{
            path:'/erWrite',
            name:'erWrite',
            meta: { title: '二手房整件输机列表' },
            component: resolve => require(['../components/section-two/er-write/er-write'], resolve),
            children: [{
                path: 'progress',
                meta: { title: '二手房整件输机',next:'提交' },
                component: resolve => require(['../components/section-two/er-write/progress'], resolve)
            }]
        },{
            path:'/erApprove',
            name:'erApprove',
            meta: { title: '二手房评估列表' },
            component: resolve => require(['../components/section-two/er-approve/er-approve'], resolve),
            children:[{
                path:':id',
                meta: { title: '二手房评估详情' },
                component: resolve => require(['../components/section-two/er-approve/apprData'], resolve)
            }]
        }
    ]
})