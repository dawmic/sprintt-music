<template>
<div class="item-container">
    <img :src="item.image_url" alt="">
  <!--    <h3>{{item.name}}</h3>-->
  <router-link tag="h3" :to="{ name: 'Playlist', params: { name: item.name, item } }" >
         {{item.name}}
      </router-link>
  <router-link  tag="p" :to="{ name: 'Playlist', params: { name: item.name, item } }" >
         {{item.description}}
      </router-link>
   
   
</div>
  
</template>

<script>
export default {
name: 'PlaylistCategory',
props: ['item'],
data(){
    return{
        
    }
},
}
</script>

<style lang="scss" scoped>
.item-container{
    width: 165px;
    
   
    margin: 3rem;
    padding-top: 2rem;
 

    h3{
        color: $black-spotify;
        font-size: 1.8rem;
        font-weight: 400;
        line-height: 2.1rem;
        margin: 1rem 0;
        cursor: pointer;
    }
    p{
        font-size: 1.4rem;
        color: #646464;
        line-height: 1.6rem;
        overflow: scroll;
        cursor: pointer;
        
    }
    img{
        width: 100%;
        border-radius: 1rem;
    }
}
</style>