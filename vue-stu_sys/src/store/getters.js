import { start } from "nprogress"

const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  id: state => state.user.id,
  roles: state => state.user.roles,
  routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes,
  permission_routes: state => state.permission.routes

}
export default getters
