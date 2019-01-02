import { asyncRouterMap, constantRouterMap } from '@/router'


function filterAsyncRouter(asyncRouterMap, role) {
    // roles为登录用户的权限数组
    
    const accessedRouters = asyncRouterMap.filter(route => {
        return role === route.meta.roles
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
                const role = data
                /** asyncRouterMap为权限路由 */
                let accessedRouters = filterAsyncRouter(asyncRouterMap, role)
                commit('SET_ROUTERS', accessedRouters)
                resolve()
            })
        }
    }
}

export default permission