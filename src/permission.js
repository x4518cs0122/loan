import { getToken } from 'common/js/utils'
import store from './store'
import router from './router'

function hasPermission(roles, permissionRoles) {
    //roles保存为用户权限的值，permissionroles为路由的meta属性，若用户权限内包含路由属性则为真
    if (!(roles.indexOf(permissionRoles) === -1) || permissionRoles === 'bussiness') {
        return true
    } else {
        return false
    }
}

const whiteList = ['/login', '/bussiness']

router.beforeEach((to, from, next) => {
    //to and from are Route Object,next() must be called to resolve the hook}
    if (getToken()) {
        if (to.path === "/login") {
            next()
        } else {
            if (store.getters.addRouters.length === 0) { //已登陆但是路由信息未加载完成
                let roles = store.getters.roles
                if (roles.length === 0) {
                    next({ path: '/login' })
                } else {
                    store.dispatch('GenerateRoutes', { roles }).then(() => {
                        router.addRoutes(store.getters.addRouters)
                        next({...to, replace: true })
                    })
                }
            } else {
                if (hasPermission(store.getters.roles, to.meta.roles)) {
                    next()
                } else {
                    next({ path: '/bussiness' })
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next()
        } else {
            next({ path: '/login' })
        }
    }
})