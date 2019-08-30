import VueRouter from 'vue-router'

import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShoppingContainer from './components/tabbar/ShoppingContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import news from './components/news/news.vue'
import newsinfo from './components/news/newsinfo.vue'




var router = new VueRouter({
  routes: [
    {path:'/home/newsinfo/:id',component:newsinfo},
    {path:'/',redirect:'/home'},
    {path:'/home',component:HomeContainer},
    {path:'/member',component:MemberContainer},
    {path:'/shopping',component:ShoppingContainer},
    {path:'/search',component:SearchContainer},
    {path:'/home/news',component:news},
  ],
  linkActiveClass:'mui-active',
})

// 把路由对象暴露出去
export default router