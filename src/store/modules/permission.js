import { asyncRouterMap, constantRouterMap } from '@/router'


function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => role === route.meta.roles)
    } else {
        return false
    }
}

function filterAsyncRouter(asyncRouterMap, roles) {
    // roles为登录用户的权限数组
    const accessedRouters = asyncRouterMap.filter(route => {
        if (hasPermission(roles, route)) {
            return true
        }
        return false
    })
    return accessedRouters
}
const permission = {
    state: {
        routers: constantRouterMap,
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers
            state.routers = constantRouterMap.concat(routers)
        }
    },
    actions: {
        GenerateRoutes({ commit }, data) {
            // data是登陆后返回的权限值为true的数组
            return new Promise((resolve) => {
                const { roles } = data
                let accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
                commit('SET_ROUTERS', accessedRouters)
                resolve()
            })
        }
    }
}

export default permission