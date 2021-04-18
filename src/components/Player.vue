<template>
 <div class="player-container">
  <CurrentTrack/>
 <ControlTrack/>
    <VolumeBar/>
  
 </div>
</template>

<script>
import CurrentTrack from '@/components/player/CurrentTrack.vue'
import ControlTrack from '@/components/player/ControlTrack.vue'
import VolumeBar from '@/components/player/VolumeBar.vue'

export default {
name: 'Player',
components: { CurrentTrack, ControlTrack, VolumeBar},
data(){
    return{
        
    }
},
}
</script>

<style scoped lang="scss">
.player-container{
    background: linear-gradient(0deg, #FFFFFF, #FFFFFF), #F1F1F1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    height: 100%;
    width: 100%;
  
    .control-container{
          
           .prev-track, .play-track, .pause-track, .next-track {
               background: transparent;
               outline: none;
               border: none;
               cursor: pointer;
               img{
                   height: 3rem;
                   width: 3rem;
               }
           }
               
             
           
                
    }
}
</style>