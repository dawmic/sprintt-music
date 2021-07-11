<template>
 <div class="home-container">
   <h2>Recently played</h2>
    <div class="playlist-container">
   <carousel :perPage="5" class="carousel-container" :paginationActiveColor="'lightgray'" :paginationColor="'black'" :paginationEnabled="false"
   :navigationEnabled="true" :navigationNextLabel="next" :navigationPrevLabel="prev"
   >
   
     <slide  v-for="item in recently_playlist" :key="item.playlist_id"><PlaylistCategory :item="item" /> </slide>
    </carousel>
     </div>
   <h2 >Featured playlist</h2>
   <div class="playlist-container">
   <carousel :perPage="5" class="carousel-container" :paginationActiveColor="'lightgray'" :paginationColor="'black'"
   :paginationEnabled="false"
   :navigationEnabled="true" :navigationNextLabel="next" :navigationPrevLabel="prev">
     <slide   v-for="item in featured_playlist" :key="item.playlist_id"><PlaylistCategory :item="item" /> </slide>
    </carousel>
     </div>
     <h2>Mood</h2>
     <div class="playlist-container">
   <carousel :perPage="5" class="carousel-container" :paginationActiveColor="'lightgray'" :paginationColor="'black'"
   :paginationEnabled="false"
   :navigationEnabled="true" :navigationNextLabel="next" :navigationPrevLabel="prev">
     <slide  v-for="item in mood_playlist" :key="item.playlist_id"><PlaylistCategory :item="item"  /> </slide>
    </carousel>
     </div>
 </div>
  
</template>

<script>
import PlaylistCategory from '@/components/PlaylistCategory.vue'
import { Carousel, Slide } from 'vue-carousel'

export default {
    name: 'Home',
   components: {PlaylistCategory, Carousel, Slide},
   props: ['featured_playlist','recently_playlist','mood_playlist'],
    data(){
        return{
          prev: '<div class="slideBtn prev"></div>',
          next: '<div class="slideBtn next"></div>',
              }
          },
  }
   
 



</script>

<style lang="scss">
.home-container{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem;
  h2{
  
    font-family: Rubik, sans-serif;
    font-weight: 400;
    font-size: 2.8rem;
    color: $black-spotify;
    align-self: flex-start;
    margin: 2rem 0 0 9rem;
   
  }
  .playlist-container{
    
    width: 90%;
   overflow: hidden;
    display: flex;
    flex-direction: row;
    margin-top: 2rem;
  }

}
// carousel styles
.carousel-container {
    width: 97%;
    display: flex;
    flex-direction: column-reverse;
}

.VueCarousel-pagination {
    text-align: right !important;
  
}
.VueCarousel-navigation{
   position: absolute;
    //right: 6rem;
    right: 7%;
    top: 1rem;  
  
}
.VueCarousel-navigation{
  button{
  
    outline: none !important;
  }
}

.slideBtn{
  height: 11px;
  width: 11px;
  border-left: 2px solid black;
  border-bottom: 2px solid black;

}
.next{
    transform: rotate(-135deg);
}
.prev{
    transform: rotate(45deg);
}


</style>