<template>
  <div class="shopcar-container">
    <div class="goodslist">

        <div class="mui-card" v-for="(item,i) in goodlist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch v-model="$store.getters.getgoodselected[item.id]" 
                        @change="selectedChanged(item.id,$store.getters.getgoodselected[item.id])"></mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">${{item.sell_price}}</span>
                                <numbox :initcount='$store.getters.getGoodCount[item.id]' :goodsid='item.id'></numbox>
                                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                            </p>
                        </div>
                        
					</div>
				</div>
		</div>

        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner pay">
						<div class="left">
                            <p>总计(不含运费)</p>
                            <p>已勾选商品<span class="red">{{$store.getters.getgoodcountAndamout.count}}</span>件,
                            总价<span class="red">${{$store.getters.getgoodcountAndamout.amount}}</span></p>
                        </div>
                        <mt-button type='danger'>去结算</mt-button>
					</div>
                    
				</div>
		</div>
    </div>


  </div>


</template>

<script>
import numbox from '../subcomponents/shopcar_numberbox.vue'
export default {
    data(){
        return{
            goodlist:[]
        }
    },
    created(){
           this.getGoodlist();
    },
    methods:{
         getGoodlist(){
             var idArr=[];
             this.$store.state.car.forEach(item=>{
                 idArr.push(item.id)
             })
             if (idArr.length<=0){
                 return
             }
             this.$http.get('api/goods/getshopcarlist/'+idArr.join(',')).then(result=>{
                 if(result.body.status===0){
                        this.goodlist=result.body.message;
                 }
             });
         },
         remove(id,index){
             this.goodlist.splice(index,1);
             this.$store.commit('removeFromCar',id);
         },
         selectedChanged(id,val){
             console.log(id +'---'+val);
             this.$store.commit('updategoodselected',{id,selected:val})   
         }
    },
    components:{
         numbox
     }
}

</script>

<style lang="scss" scoped>
.shopcar-container{
     background-color: #eee;
     overflow: hidden;

     .goodslist{
         .mui-card-content-inner{
             display: flex;
             align-items: center;
         }
         img{
             width: 60px;
             height: 60px;
         }
         h1{
             font-size: 13px;
         }
         .info{
             display: flex;
             flex-direction: column;
             justify-content: space-between;
             .price{
                 color: red;
                 font-weight: bold;
             }
         }
     }

     .pay{
         display: flex;
         justify-content: space-between;
         align-items: center;
         .red{
             color: red;
             font-weight: bold;
             font-size: 16px;
         }

     }
}

</style>