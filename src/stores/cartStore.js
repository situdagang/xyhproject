// 封装购物车模块
import {defineStore} from 'pinia'
import {computed, ref} from 'vue'
import { useUserStore } from './userStore'
import { insertCartAPI,findNewCartListAPI,delCartAPI } from '@/apis/cart' 



export const useCartStore= defineStore('cart',()=>{
    const userStore=useUserStore()
    const isLogin=computed(()=>userStore.userInfo.token)
    // 1.定义state -cartList
    const cartList=ref([])
    // 获取最新购物车列表action
    const updateNewList=async()=>{
        const res= await findNewCartListAPI()
        cartList.value=res.result
    }


    // 2.定义操作cartList的方法 action
    // 添加购物车
    const addCart=async(goods)=>{
        const {skuId,count}=goods
        if(isLogin.value){
            //登陆之后的加入购物车逻辑
            await insertCartAPI({skuId,count})
            updateNewList()
        }else{
            // 本地购物车逻辑
            // 添加购物车操作
        // 已添加 count+(思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中匹配到)
        const item=cartList.value.find((item)=>goods.skuId===item.skuId)
        if(item){
            item.count++
        }else{
            // 没添加 直接push
            cartList.value.push(goods)
        }
        
        }    
    }


    // 删除购物车
    const delCart=async(skuId)=>{
        if(isLogin.value){
            //登陆之后实现接口购物车的删除功能
           await delCartAPI([skuId])
           updateNewList()
        }else{
            // 使用数组过滤方法filter
        const idx=cartList.value.findIndex((item)=>skuId===item.skuId)
        cartList.value.splice(idx,1)
        }
        
    }

    // 清除购物车
    const clearCart=()=>{
        cartList.value=[]
    }


// 计算属性 总数和总价
// 第二个参数0为初始值，a是每相加一次的结果给a,c是每一项 
const allCount= computed(()=>cartList.value.reduce((a,c)=>a+c.count,0))
const allPrice= computed(()=>cartList.value.reduce((a,c)=>a+c.count*c.price,0))

// 结算时的已选择商品数量
const selectedCount=computed(()=>cartList.value.filter(item=>item.selected).reduce((a,c)=>a+c.count,0))

// 已选择的商品价钱合计
const selectedPrice=computed(()=>cartList.value.filter(item=>item.selected).reduce((a,c)=>a+c.count*c.price,0))


// 是否全选
const isAll =computed(()=>cartList.value.every((item)=>item.selected))

// 全选功能
const allCheck=(selected)=>{
    // cartList中每一项的selected都设置为当前的全选框状态
    cartList.value.forEach(item=>item.selected=selected)
}


// 单选功能
const singleCheck=(skuId,selected)=>{
// 通过skuId找到要修改的那一项
    console.log(selected)
    const item=cartList.value.find((item)=>item.skuId===skuId)
    item.selected=selected
}

    // 3.return
    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice,
        singleCheck,
        isAll,
        allCheck,
        selectedCount,
        selectedPrice,
        clearCart,
        updateNewList
    }
},{
    // 同步让localstage也更新
    persist:true
})