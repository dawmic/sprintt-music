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
     <slide  v-for="item in mood_playlist" :key="item.playlist_id"><PlaylistCategory :item="item" /> </slide>
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
   props: ['featured_playlist','rp','mood_playlist'],
    data(){
        return{
          prev: '<div class="slideBtn prev"></div>',
          next: '<div class="slideBtn next"></div>',
          recently_playlist:[ 
            {
          description: "Start your day with calm and cool jazz.",
          image_url: "https://i.scdn.co/image/ab67706f000000035337e18dc6803780d806efba",
          name: "Jazzy Morning",
          playlist_id: "37i9dQZF1DXdziGPHNE40t"
      },
      {
          description: "The home for alternative electronic music. Cover: Fred again.. and The Blessed Madonna",
          image_url: "https://i.scdn.co/image/ab67706f0000000345e1025ae30404128c57d824",
          name: "Altar",
          playlist_id: "37i9dQZF1DXa71eg5j9dKZ"
      },
      {
          description: "the loose knit sweater, diy bedroom mural wall, alt milk of playlists. ✨ featuring Still Woozy",
          image_url: "https://i.scdn.co/image/ab67706f0000000330454e871ce5a1b00703716f",
          name: "Lorem",
          playlist_id: "37i9dQZF1DXdwmD5Q7Gxah"
      },
      {
          description: "Smooth joints. Cover: Ruti",
          image_url: "https://i.scdn.co/image/ab67706f00000003cb35da286acfe287316c4640",
          name: "Butter",
          playlist_id: "37i9dQZF1DWVzZlRWgqAGH"
      },
      {
          description: "Feel great with these timelessly fun songs!",
          image_url: "https://i.scdn.co/image/ab67706f00000003e649da22aa371c86c801603f",
          name: "Have a Great Day!",
          playlist_id: "37i9dQZF1DX7KNKjOK0o75"
      },
      {
          description: "Chill beats for cool coffeehouse vibes.",
          image_url: "https://i.scdn.co/image/ab67706f000000033f861d7f7b340e5e4934bb78",
          name: "Lo-Fi Cafe",
          playlist_id: "37i9dQZF1DX9RwfGbeGQwP"
      },
      {
          description: "Lounge and chill out music for your workday.",
          image_url: "https://i.scdn.co/image/ab67706f00000003f1ecb8caee4c015b3f33058a",
          name: "Workday Lounge",
          playlist_id: "37i9dQZF1DWT5lkChsPmpy"
      },
      {
          description: "Curl up in your favorite spot with some sweet, mellow tunes...",
          image_url: "https://i.scdn.co/image/ab67706f000000035ae7aa0454c9eafdd6505fda",
          name: "Your Favorite Coffeehouse",
          playlist_id: "37i9dQZF1DX6ziVCJnEm59"
      },
      {
          description: "Chillout hip-hop vibes. Cover: Kota The Friend",
          image_url: "https://i.scdn.co/image/ab67706f00000003dd2fb26650c3d75d8a32c972",
          name: "Mellow Bars",
          playlist_id: "37i9dQZF1DWT6MhXz0jw61"
      },
      {
          description: "High-Key bangers for Low-Key enjoyment.",
          image_url: "https://i.scdn.co/image/ab67706f00000003c0c5bb00461fd08b95f9b9da",
          name: "Low-Key",
          playlist_id: "37i9dQZF1DX2yvmlOdMYzV"
      }
          ],
       
       
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