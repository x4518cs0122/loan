import Vue from 'vue'
import Router from 'vue-router'
import bussiness from '@/components/bussiness/bussiness'
import todo from '@/components/todo/todo'
import order from '@/components/section-one/order/order'
import interview from '@/components/section-one/interview/interview'
import inDetail from '@/components/section-one/interview/interview-detail'
import sign from '@/components/section-one/sign/sign'
import reschedule from '@/components/section-one/sign/reschedule'
import confirmState from '@/components/section-one/sign/confirmState'
import evaluate from '@/components/section-one/evaluate/evaluate'
import placeOrder from '@/components/section-one/evaluate/placeOrder'
import unreported from '@/components/section-one/evaluate/unreported'
import approve from '@/components/section-one/approve/approve'
import sqForms from '@/components/section-one/application/application'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/bussiness'
        }, {
            path: '/bussiness',
            name: 'bussiness',
            component: bussiness,
        },
        {
            //tab下的待办
            path: '/todo',
            component: todo
        },
        {
            //接单
            path: '/order',
            name: 'order',
            component: order
        },
        {
            //面谈
            path: '/interview',
            name: 'interview',
            component: interview,
            children: [{
                path: ':id',
                component: inDetail,
                children: [{
                    path: 'sqForms',
                    component: sqForms
                }]
            }]
        },
        {
            //面签
            path: '/sign',
            name: 'sign',
            component: sign,
            children: [{
                path: 'reschedule',
                component: reschedule
            }, {
                path: 'confirmState',
                component: confirmState
            }]
        },
        {
            //评估下单
            path: '/evaluate',
            name: 'evaluate',
            component: evaluate,
            children: [{
                path: 'placeOrder',
                component: placeOrder
            }, {
                path: 'unreported',
                component: unreported
            }]
        }, {
            //审批
            path: '/approve',
            name: 'approve',
            component: approve,
            // children: [{
            //     path: 'placeOrder',
            //     component: placeOrder
            // }, {
            //     path: 'unreported',
            //     component: unreported
            // }]
        }
    ]
})