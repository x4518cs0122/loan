import Vue from 'vue'
import Router from 'vue-router'
import bussiness from '@/components/bussiness/bussiness'
import todo from '@/components/todo/todo'
import order from '@/components/section-one/order/order'
import interview from '@/components/section-one/interview/interview'
import sign from '@/components/section-one/sign/sign'
import reschedule from '@/components/section-one/sign/reschedule'
import confirmState from '@/components/section-one/sign/confirmState'
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
            path: '/order',
            name: 'order',
            component: order
        },
        {
            path: '/interview',
            name: 'interview',
            component: interview
        },
        {
            path: '/todo',
            component: todo
        },
        {
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
        }
    ]
})