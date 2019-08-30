//入口文件
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource'
import  moment from 'moment'
Vue.use(VueRouter);

Vue.filter('dataFormat',function(datastr,pattern='YYYY-MM-DD HH:mm:ss'){
     return    moment(datastr).format(pattern)
})

Vue.use(VueResource)

Vue.http.options.root='http://www.liulongbin.top:3005'

import './lib/mui/css/mui.css';
import './lib/mui/css/icons-extra.css';
import './css/index.css'


import { Header,Swipe, SwipeItem,Button} from 'mint-ui';



Vue.component('bbb',Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name,Button)


import router from './router.js';

import app from './App.vue';


var vm = new Vue({
  el:'#app',
  render:c=>c(app),
  router
})