<template>
  <div class="liked-container">
  <Playlist    :item="liked_obj"
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
                      playlist_id: 999,
        }
    }

},
}
</script>

<style scoped lang="scss">

</style>