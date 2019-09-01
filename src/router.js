import VueRouter from 'vue-router'

import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShoppingContainer from './components/tabbar/ShoppingContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import news from './components/news/news.vue'
import newsinfo from './components/news/newsinfo.vue'
import PhotoList from './components/photos/photoList.vue'
import photoinfo from './components/photos/photoinfo.vue'
import goodslist from './components/goods/goodslist.vue'
import goodsinfo from './components/goods/goodsinfo.vue'
import goodsdesc from './components/goods/goodsdesc.vue'
import goodscomment from './components/goods/goodscomment.vue'




var router = new VueRouter({
  routes: [
    {path:'/home/newsinfo/:id',component:newsinfo},
    {path:'/',redirect:'/home'},
    {path:'/home',component:HomeContainer},
    {path:'/member',component:MemberContainer},
    {path:'/shopping',component:ShoppingContainer},
    {path:'/search',component:SearchContainer},
    {path:'/home/news',component:news},
    {path:'/home/photolist',component:PhotoList},
    {path:'/home/photoinfo/:id',component:photoinfo},
    {path:'/home/goodslist',component:goodslist},
    {path:'/home/goodsinfo/:id',component:goodsinfo},
    {path:'/home/goodsdesc/:id',component:goodsdesc,name:'goodsdesc'},
    {path:'/home/goodscomment/:id',component:goodscomment,name:'goodscomment'},
  ],
  linkActiveClass:'mui-active',
})

// 把路由对象暴露出去
export default router