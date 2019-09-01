<template>
    <div class="photoinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{photoinfo.add_time|dataFormat}}</span>
            <span>点击次数：{{photoinfo.click}}</span>
        </p>
        <hr>


        <div class="content" v-html="photoinfo.content"></div>

        <div class="thumbs">
        <vue-preview :slides="slide1"></vue-preview>
        </div>

        <comment-box :id='id'></comment-box>


    </div>
</template>


<script>
import comment from '../subcomponents/comment.vue'

export default {
    data(){
        return{
            id:this.$route.params.id,
            photoinfo:{},
            slide1:[]
        };
    },
    created(){
        this.getphotoinfo();
        this.getThumbs();
    },
    methods:{
        getphotoinfo(){
            this.$http.get('api/getimageInfo/'+this.id).then(result=>{
                if(result.body.status===0){
                      this.photoinfo=result.body.message[0];
                }
            })
        },
        getThumbs(){
            this.$http.get('api/getthumimages/'+this.id).then(result=>{
                if(result.body.status===0){
                    result.body.message.forEach(item=>{
                        item.w=600;
                        item.h=400;
                        item.msrc=item.src;
                    })
                this.slide1=result.body.message;
                }
            })
        }
    },
    components:{
             'comment-box':comment,
    }
}
</script>


<style lang='scss' scoped>

.photoinfo-container{
    padding: 3px;
    h3{
        color:#26A2FF;
        font-size: 15px;
        text-align: center;
        margin:15px 0;
    }
    .subtitle{
           display: flex;
           justify-content: space-between;
           font-size: 13px;
    }

    .content{
        font-size: 13px;
        line-height: 30px;
    }

    
}
.thumbs {
/deep/ .my-gallery {
display: flex;
flex-wrap: wrap;
figure {
width: 30%;
margin: 5px;
img {
width: 100%;
}
}
}
}

</style>