<template>
    <div class="goodsinfo-container">

        <transition 
        @before-enter='beforeEnter'
        @enter='Enter'
        @after-enter='afterEnter'>
        <div class="ball" v-show="ballFlag" ref='ball'></div>
        </transition>

        <div class="mui-card">
				
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
					</div>
				</div>
				
		</div>

        <div class="mui-card">
				<div class="mui-card-header">{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                            市场价:<del>${{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价:  <span class="now">${{goodsinfo.sell_price}}</span>
                        </p>
                        <p>购买数量:&nbsp;<numbox @getcount='getselectedcount' :max='goodsinfo.stock_quantity'></numbox>
                        </p>
                        <p>
                            <mt-button type='primary' size='small'>立即购买</mt-button>
                            <mt-button type='danger' size='small' @click="addtoshopcar">加入购物车</mt-button>
                        </p>
					</div>
				</div>
				<div class="mui-card-footer">页脚</div>
		</div>

        <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号:{{goodsinfo.goods_no}}</p>
                        <p>库存情况:{{goodsinfo.stock_quantity}}</p>
                        <p>上架时间:{{goodsinfo.add_time|dataFormat}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type='primary' size='large' plain @click="goDesc(id)">图文介绍</mt-button>
                    <mt-button type='danger' size='large' plain @click="goComment(id)">商品评论</mt-button>
                </div>
		</div>
        
    </div>
</template>

<script>
import swiper from '../subcomponents/swiper.vue'

import numbox from '../subcomponents/goodsinfo_numberbox.vue'

export default {
    data(){
          return{
              id:this.$route.params.id,
              lunbotu:[],
              goodsinfo:[],
              ballFlag:false,
              selectedcount:1,
              goodsmessage:{},
          }
    },
    created(){
          this.getlunbotu();
          this.getgoodsinfo();
    },
    methods:{
        getlunbotu(){
            this.$http.get('api/getthumimages/'+this.id).then(result=>{
                if(result.body.status===0){
                    result.body.message.forEach(item=>{
                          item.img=item.src;
                    });
                    this.lunbotu=result.body.message;
                }
            })
        },
        getgoodsinfo(){
            this.$http.get('api/goods/getinfo/'+ this.id).then(result=>{
                if(result.body.status===0){
                    this.goodsinfo=result.body.message[0];
                }
            })
        },
        goDesc(id){
            this.$router.push({ name: 'goodsdesc',params:{id} });
        },
        goComment(id){
            this.$router.push({ name: 'goodscomment',params:{id} });
        },
        addtoshopcar(){
            this.ballFlag=!this.ballFlag;

            var goodsmessage={
                id:this.id,
                count:this.selectedcount,
                price:this.goodsinfo.sell_price,
                selected:true
            };

            this.$store.commit('addToCar',goodsmessage)
        },
        beforeEnter(el){
              el.style.transform='translate(0,0)';
        },
        Enter(el,done){
              el.offsetWidth;



              const ballPosition=this.$refs.ball.getBoundingClientRect();
              const badgePosition=document.getElementById('badge').getBoundingClientRect();
              
              const XDist=badgePosition.left-ballPosition.left;
              const YDist=badgePosition.top-ballPosition.top;


              el.style.transform=`translate(${XDist}px,${YDist}px)`;
              el.style.transition='all 1s cubic-bezier(.4,-0.3,1,.68)';
              done()
        },
        afterEnter(el){
              this.ballFlag=!this.ballFlag;
        },
        getselectedcount(count){
             this.selectedcount=count;
             console.log(this.selectedcount)
        },
    },
    components:{
        swiper,
        numbox
    }
    
}
</script>

<style lang="scss">

.goodsinfo-container{
    background-color: #eee;
    overflow: hidden;

    .now{
        color: red;
        font-size: 16px;
        font-weight: bold;
    }

    .mui-card-footer{
        display: block;
        button{
            margin: 15px 0;
        }
    }

    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 98;
        top: 390px;
        left: 140px;
    }
}






    
</style>