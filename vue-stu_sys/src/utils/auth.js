import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  var mill = new Date().getTime()
  var expiresTime = new Date(mill+1000*60)//设置1分钟
  //cookie过期
  return Cookies.set(TokenKey, token)
  // return Cookies.set(TokenKey, token,{expires: expiresTime})
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
