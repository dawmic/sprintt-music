<template>
  <div class="liked-container">
  <Playlist    :item="liked_obj"   @unlike_song="unlike_song" @playTrack="playTrack"
     liked_path="https://api.sprintt.co/music/liked_tracks?limit=100"/>
  
  </div>
</template>

<script>
import Playlist from './Playlist.vue'
export default {
  components: { Playlist },
    name: 'Liked-songs',
    props: [],
    data(){
        return{
          liked_obj:{ image_url: require('@/assets/images/liked_songs.jpg',),
                      description: '',
                      name: 'Liked Songs',
                      playlist_id: 9999999999,
        },
        
    }

},
methods:{
playTrack(track){
  this.$emit('playTrack', track);
},
  unlike_song(track){
    console.log(track);
    this.$emit('unlike_song', track);
  }
},

}
</script>

<style scoped lang="scss">

</style>