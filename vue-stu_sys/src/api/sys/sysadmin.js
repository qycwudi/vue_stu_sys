import request from '@/utils/request'
export default{
    showfy(num,size,user) {
      return request({
        url: `/sys/sys-staff/show/${num}/${size}`,
        method: 'post',
        data: user
      })
  }
}