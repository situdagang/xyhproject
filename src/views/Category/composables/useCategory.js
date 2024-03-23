// 封装分类数据相关的业务代码
import { ref,onMounted } from "vue"
import {getCategoryAPI} from '@/apis/category'
import { useRoute } from "vue-router";
import { onBeforeRouteUpdate } from 'vue-router';


export function useCategory(){
    // 获取分类数据
const categoryDate=ref({})
const route=useRoute()
const getCategory=async (id=route.params.id)=>{
   const res=await  getCategoryAPI(id)
   console.log(res)
    categoryDate.value=res.result
}
onMounted(()=>getCategory())

// 目标：在路由参数变化的时候，可以把分类数据接口重新发送
onBeforeRouteUpdate((to)=>{
  getCategory(to.params.id)
  // 存在问题：需要使用最新的路由参数，来请求数据接口，但是这个是在路由更新前就执行，所以用to

})

return {
    categoryDate
}
}