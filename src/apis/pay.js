import request from '@/utils/http'
export const getOderAPI=(id)=>{
    return request({
        url:`/member/order/${id}`
    })

}