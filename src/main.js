//入口文件
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

var car =JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
     state:{
         car:car
     },
     mutations:{
         addToCar(state,goodsmessage){
             var flag=false;
             state.car.some(item=>{
               if(item.id== goodsmessage.id){
                 item.count+=parseInt(goodsmessage.count);
                 flag=true;
                 return true;
               }

             })
             if(!flag){
               state.car.push(goodsmessage)
             }

             localStorage.setItem('car',JSON.stringify(state.car))
         },
         updatagoodsinfo(state,goodsmessage){
           state.car.some(item=>{
             if(item.id ==goodsmessage.id){
               item.count=parseInt(goodsmessage.count)
               return true
             }
           });
           localStorage.setItem('car',JSON.stringify(state.car))
         },
         removeFromCar(state,id){
            state.car.some((item,i)=>{
              if(item.id==id){
                state.car.splice(i,1)
                return true;
              }
            });
            localStorage.setItem('car',JSON.stringify(state.car));
         },
         updategoodselected(state,info){
           state.car.some(item=>{
             if(item.id==info.id){
               item.selected=info.selected
             }
           });
           localStorage.setItem('car',JSON.stringify(state.car));
         }
     },
     getters:{
            getAllCount(state) {
              var c=0;
              state.car.forEach(item=>{
                c+=item.count
              })
              return c;
            },
            getGoodCount(state){
              var o={};
              state.car.forEach(item=>{
                o[item.id]=item.count;
              })
              return o;
            },
            getgoodselected(state){
              var o={};
              state.car.forEach(item=>{
                o[item.id]=item.selected
              })
              return o;
            },
            getgoodcountAndamout(state){
              var o={
                count:0,
                amount:0
              };
              state.car.forEach(item=>{
                if(item.selected){
                  o.count+=item.count;
                  o.amount+=item.price*item.count
                }
              });
              return o
            }
     }
     
})

import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import  moment from 'moment';
Vue.use(VueRouter);

Vue.filter('dataFormat',function(datastr,pattern='YYYY-MM-DD HH:mm:ss'){
     return    moment(datastr).format(pattern)
});

Vue.use(VueResource);

Vue.http.options.root='http://www.liulongbin.top:3005';
Vue.http.options.emulateJSON=true;


import './lib/mui/css/mui.css';
import './lib/mui/css/icons-extra.css';
import './css/index.css';

/* import { Header,Swipe, SwipeItem,Button,Lazyload} from 'mint-ui';
Vue.component('Header.name',Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name,Button)
Vue.use(Lazyload); */

import MintUI from 'mint-ui';
Vue.use(MintUI);
import 'mint-ui/lib/style.css';

import VuePreview from 'vue-preview'
Vue.use(VuePreview)




import router from './router.js';

import app from './App.vue';


var vm = new Vue({
  el:'#app',
  render:c=>c(app),
  router,
  store
});