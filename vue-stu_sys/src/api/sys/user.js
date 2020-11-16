import request from '@/utils/request'

export function login(username,password) {
  return request({
    url: '/sec/log/logins',
    method: 'post',
    data:{
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/sec/log/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/sec/log/logout',
    method: 'post'
  })
}
