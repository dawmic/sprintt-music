<template>
  <div class="control-container">
      <div class="control-buttons">
      <button class="prev-track"><img src="@/assets/images/player/prev.svg" alt="prev"></button> 
      <button class="play-track" v-if="play" @click="play=false"><img src="@/assets/images/player/play.svg" alt="play"></button>
      <button class="pause-track" v-else @click="play=true"><img src="@/assets/images/player/pause.svg" alt="pause"></button>
      <button class="next-track"><img src="@/assets/images/player/next.svg" alt="next"></button>
      </div>
     <div class="progress-bar">
          <label for="bar"></label>
          <progress id="bar" :value="song" max="100"> </progress>
      </div>

  </div>
</template>

<script>
export default {
data(){
    return{
        play: true,
        song: 20,
       // song_progress: (Time passed in seconds / Song duration in seconds) X 100;
    }
}
}
</script>

<style lang="scss" scoped>

 .control-container{
  //margin: 0 auto;  
 height: 100%;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
    .control-buttons{        
           // margin-left: 50rem;
           .prev-track, .play-track, .pause-track, .next-track {
               background: transparent;
               outline: none;
               border: none;
               cursor: pointer;
               width: 4rem;
               
               img{
                   
                  transition: all .2s;
                    &:hover{
                       transform: scale(1.05);    
                   }
               }
           }
    }
    .progress-bar{
        progress{
             height: .5rem;
        width: 75rem; 
        color: #191414;
        background-color: #C4C4C4;
       appearance: none;
        
        }
        progress::-webkit-progress-bar {
            background-color: #C4C4C4;
             width: 100%;
             }
        progress::-webkit-progress-value {
             background: #191414;
             }
              progress::-moz-progress-bar {
             background: #191414;
             }
      
    }                
    }
</style>