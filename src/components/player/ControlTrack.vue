<template>
  <div class="control-container">
   
      <div class="control-buttons">
      <button class="prev-track"><img src="@/assets/images/player/prev.svg" alt="prev"></button> 
      <button class="play-track" v-if="!isPlaying" @click="startPlayer"><img src="@/assets/images/player/play.svg" alt="play"></button>
      <button class="pause-track" v-if="isPlaying" @click="pausePlayer"><img src="@/assets/images/player/pause.svg" alt="pause"></button>
      <button class="next-track"><img src="@/assets/images/player/next.svg" alt="next"></button>
      </div>
  
     <div class="progress-bar" @click="showTime">
          <label for="bar"></label>
          <progress id="bar" :value="song_progress" max="100"> </progress>
      </div>
     
  </div>
</template>

<script>


export default {
   
props:['isPlaying','trackPlayingNow','currentTrack','audioObj'],

data(){
    return{
        
        song: 20,
        play: this.isPlaying,
        trackPlaying: this.trackPlayingNow,
       // audioObj: new Audio(`http://api.sprintt.co/spotify/play/${this.trackPlayingNow}?access=${token}`),
       // song_progress: (Time passed in seconds / Song duration in seconds) X 100;
       // (audioObj.currentTime / currentTrack.duration) * 100
       
    }
},
methods:{
    startPlayer(){
        this.play = true;
        
        this.$emit('startPlayer', this.play, this.currentTrack.track_id);
       
        
    },
    pausePlayer(){
        
        this.play = false;
        this.trackPlaying = false;
        this.$emit('pausePlayer', this.play, this.trackPlaying);
    },
    showTime(){
        console.log(this.audioObj.currentTime);
    },
    
   
   
},
computed: {
    timeDuration(){
        return  this.audioObj.currentTime;
    },
    song_progress(){
        return (this.audioObj.currentTime / this.currentTrack.duration) * 100;
    },

},

}
</script>

<style lang="scss" scoped>

 .control-container{
  //margin: 0 auto;  
  padding: .2rem;
  width: 65%;
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