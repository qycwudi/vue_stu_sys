import router, { asyncRoutes, constantRoutes } from '@/router'

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    console.log("进入hasPermission if route" + route + " roles: " + roles)
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    console.log("进入hasPermission else route" + route + " roles: " + roles)
    return true
  }
}

export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    console.log("进入循环routes：" + routes + " roles:" + roles)
    if (hasPermission(roles, tmp)) {
      console.log("进入循环hasPermission")
      if (tmp.children) {
        console.log("进入循环tmp.children")
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  console.log("res：" + res)
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    console.log("进入SET_ROUTES: routes " + routes + " state: " + state)
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
    console.log("routes:" + state.routes + " " + state.addRoutes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      console.log("进入generateRoutes:" + roles)
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
        console.log("进入判断admin if:" + roles)
      } else {
        console.log("进入判断admin else:" + roles[0]+roles)
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      console.log("accessedRoutes:"+accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
