//入口文件
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);


import './lib/mui/css/mui.css';
import './lib/mui/css/icons-extra.css';
import './css/index.css'

import { Header,Swipe, SwipeItem } from 'mint-ui';



Vue.component('bbb',Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

import router from './router.js';

import app from './App.vue';


var vm = new Vue({
  el:'#app',
  render:c=>c(app),
  router
})