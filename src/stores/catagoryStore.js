import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from "@/apis/layout";

export const useCategoryStore = defineStore('category', () => {
// 导航列表的数据管理，用pinia来优化

// State 导航数据列表
const categoryList=ref([])
// Action 获取导航数据的方法
const getCategory= async ()=>{
    const res=await getCategoryAPI()
    // console.log(res)
    categoryList.value=res.result
}
return {
    categoryList,
    getCategory
}
})
