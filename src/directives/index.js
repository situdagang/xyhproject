import { useIntersectionObserver } from '@vueuse/core'
// 定义懒加载插件
export const lazyPlugin={
    install(app){
        // 懒加载指令逻辑
        app.directive('img-lazy',{
            mounted(el,binding){
                // el是绑定元素img
                // binding.value指令等于号后面绑定的表达式的值 也就是图片url
                // console.log(el,binding.value)
          const {stop} = useIntersectionObserver(
                    el,
                    ([{ isIntersecting }]) => {
                      console.log(isIntersecting)
                      if (isIntersecting) {
                        // 进入视口区域
                         el.src = binding.value 
                        stop()
                      }
                    },      
                )
            }
            }
        )
    }
}