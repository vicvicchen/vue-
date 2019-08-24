//入口文件
import Vue from 'vue';

import app from './App.vue';

import { Header } from 'mint-ui';

import './lib/mui/css/mui.css'

Vue.component('bbb',Header);


var vm = new Vue({
  el:'#app',
  render:c=>c(app),
})