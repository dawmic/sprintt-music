<template>
  <div class="control-container">
   
      <div class="control-buttons">
      <button class="prev-track" @click="prevTrack()"><img src="@/assets/images/player/prev.svg" alt="prev"></button> 
      <button class="play-track" v-if="!isPlaying" @click="startPlayer"><img src="@/assets/images/player/play.svg" alt="play"></button>
      <button class="pause-track" v-if="isPlaying" @click="pausePlayer"><img src="@/assets/images/player/pause.svg" alt="pause"></button>
      <button class="next-track" @click="nextTrack()"><img src="@/assets/images/player/next.svg" alt="next"></button>
      </div>
  
     <div class="progress-bar" @click="showTime"> <span>{{convertTime(currentTimePlayingTrack)}}</span>
          <label for="bar"></label>
          <progress id="bar" :value="song_progress" max="100"> </progress>
         <span> {{convertTime(Math.floor(song_time_left))}}</span>
      </div>
     
  </div>
</template>

<script>


export default {
   
props:['isPlaying','trackPlayingNow','currentTrack','audioObj','currentTimePlayingTrack'],

data(){
    return{
        
        song: 20,
        play: this.isPlaying,
        trackPlaying: this.trackPlayingNow,
        //roundTrackDuration: this.currentTrack.duration / 1000,
       
       // audioObj: new Audio(`http://api.sprintt.co/spotify/play/${this.trackPlayingNow}?access=${token}`),
       // song_progress: (Time passed in seconds / Song duration in seconds) X 100;
       // (audioObj.currentTime / currentTrack.duration) * 100
       
    }
},
methods:{
    startPlayer(){
        this.play = true;
        
        this.$emit('startPlayer', this.play, this.currentTrack.track_id);
        console.log(this.audioObj.currentTime);
       
        
    },
    pausePlayer(){
        
        this.play = false;
        this.trackPlaying = false;
        this.$emit('pausePlayer', this.play, this.trackPlaying);
    },
    showTime(){
        console.log(this.audioObj.currentTime);
    },
    nextTrack(){
        
        this.$emit('nextTrack');
    },
    prevTrack(){
        this.$emit('prevTrack');
    },
   convertTime(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours   = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes+':'+seconds; // Return is MM : SS
},
    
   
   
},
computed: {

    song_progress(){
        return (this.currentTimePlayingTrack / (this.currentTrack.duration / 1000)) * 100;
    },
    song_time_left(){
        return (this.currentTrack.duration / 1000) - this.currentTimePlayingTrack;
    }
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
        span{
            margin: 0 5px;
        }
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
             transition: width 1s;
             }
              progress::-moz-progress-bar {
             background: #191414;
             }
      
    }                
    }
</style>