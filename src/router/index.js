import Vue from 'vue'
import Router from 'vue-router'
import bussiness from '@/components/bussiness/bussiness'
import todo from '@/components/todo/todo'
import order from '@/components/section-one/order/order'
import interview from '@/components/section-one/interview/interview'
import sign from '@/components/section-one/sign/sign'
import reschedule from '@/components/section-one/sign/reschedule'
import confirmState from '@/components/section-one/sign/confirmState'
import evaluate from '@/components/section-one/evaluate/evaluate'
import placeOrder from '@/components/section-one/evaluate/placeOrder'
import unreported from '@/components/section-one/evaluate/unreported'

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
            //接单
            path: '/order',
            name: 'order',
            component: order
        },
        {
            //面谈
            path: '/interview',
            name: 'interview',
            component: interview
        },
        {
            //tab下的待办
            path: '/todo',
            component: todo
        },
        {
            //面签
            path: '/sign',
            name: 'sign',
            component: sign,
            children: [{
                path: 'reschedule',
                component: reschedule
            },{
                path: 'confirmState',
                component: confirmState
            }]
        },
        {
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
        }
    ]
})