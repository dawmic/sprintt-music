<template>
  <div id="app">
    <nav class="nav-panel">
      <img class="spotify-logo" src="@/assets/images/sprintt_logo.png" alt="spotify">
      <ul>
        <li><router-link to="/"><img src="@/assets/images/home_icon.png" alt="home"><span>Home</span></router-link></li>
        <li><router-link to="/Browse"><img src="@/assets/images/browse_icon.png" alt="browse"><span>Browse</span></router-link></li>
        <li><router-link to="/Liked_songs"><img src="@/assets/images/liked_songs_icon.png" alt="liked songs"><span>Liked songs</span></router-link></li>
      </ul>
    
      
      </nav>
    <main class="main-container">
    <router-view  :featured_playlist="featured_pl"
     :mood_playlist="mood_pl"
      @currentTrack="showLog"
      @playTrack="playTrack"
      @pauseTrack="pauseTrack"
      :trackPlayingNow="trackPlayingNow"
    
      />
  </main>
 <div class="player-container">
   <CurrentTrack  :currentTrack="currentTrack"
                  :image="imagePlaylist"
   />
   <ControlTrack  :isPlaying="isPlaying"
                  @startPlayer="startPlayer"
                  @pausePlayer="pausePlayer"
                  :trackPlayingNow="trackPlayingNow"
                  :currentTrack="currentTrack"
                  :audioObj="audioObj"
   />
   <VolumeBar @emitVolume="changeVolume"/>
   
   </div>
  </div>
</template>
<script>

import axios from 'axios'
import CurrentTrack from '@/components/player/CurrentTrack.vue'
import ControlTrack from '@/components/player/ControlTrack.vue'
import VolumeBar from '@/components/player/VolumeBar.vue'

//api request
const options = { headers: {
    'user-access-token': '90275ed9-b7f3-4061-a8b7-6d602bfef99c' 
}
  };
const recent_list = axios.get('http://api.sprintt.co/spotify/recently_played_playlists?limit=10', options);
const featured_list = axios.get('http://api.sprintt.co/spotify/featured_playlists?limit=10', options);
const mood_list = axios.get('http://api.sprintt.co/spotify/mood_playlists?limit=10', options);

const getEncryptedToken = (token) => {
    let date = new Date();
    let utcTime = `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`
    let stringToEncrypt = `${token}===${utcTime}`
    return btoa(stringToEncrypt);
  }
const token = getEncryptedToken('90275ed9-b7f3-4061-a8b7-6d602bfef99c');


export default {
  name: 'App',
  components: {
    CurrentTrack, ControlTrack, VolumeBar
  },
  data(){
    return{
      recently_pl: '',
      featured_pl: '',
      mood_pl: '',
      currentTrack: '',
      imagePlaylist: '',
      activePlaylistTracks: '',
      isPlaying: false, //player play pause
      trackPlayingNow: '', // player play pause
      //audioObj: new Audio(`http://api.sprintt.co/spotify/play/${this.trackPlayingNow}?access=${token}`),
     
      

    }
  },
     created(){

    axios.all([recent_list, featured_list, mood_list]).then(axios.spread((...responses) => {
        const responseOne = responses[0].data.playlists;
        const responseTwo = responses[1].data.playlists;
        const responseThree = responses[2].data.playlists;
  // use/access the results 
        console.log(responseOne); // recently list log
      
        this.recently_pl = responseOne;
        this.featured_pl = responseTwo;
        this.mood_pl = responseThree;     
    })).catch(errors => {
  
        console.log(errors);
}); 
},
methods:{
  showLog(...args){
 //this.audioObj.pause();
    const [x,y] = args;
   this.currentTrack = x;
   this.imagePlaylist = y;
    
  // this.audioObj.play();
  },
  playTrack(...args){
  // this.audioObj.pause();
   const [playingMusic, activeTrack, playlistInfo] = args;
    
   this.isPlaying = playingMusic;
   
   this.trackPlayingNow = activeTrack;
   
   this.activePlaylistTracks = playlistInfo;
  
   // this.audioObj.play();
    
    

  },
  pauseTrack(...args){
  // this.audioObj.pause();
   const [playingMusic, activeTrack] = args;
   this.isPlaying = playingMusic;
   this.trackPlayingNow = activeTrack;
  
  
  },
  startPlayer(...args){
  // this.audioObj.pause();
  //this.isPlaying = status;
    const [play, trackPlaying] = args;
    this.isPlaying = play;
    this.trackPlayingNow = trackPlaying;
    
  //this.audioObj.play();
  
   
  },
  pausePlayer(...args){
  //this.audioObj.pause();
    const [play, trackPlaying] = args;
    this.isPlaying = play;
    this.trackPlayingNow = trackPlaying;
    
  },
  changeVolume(vol){
    this.audioObj.volume = vol/100;
  }
 
},
computed: {
  audioObj(){
   return new Audio(`http://api.sprintt.co/spotify/play/${this.currentTrack.track_id}?access=${token}`);
  },
  
}





}
</script>
<style lang="scss">
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 1.6rem;
  font-family: Rubik, sans-serif;
  font-weight: 400;
}
html{
  font-size: 62.5%;
  
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  

overflow-x: scroll;
  display: grid;
  grid-template-columns: 270px 1370px;
  grid-template-rows: 980px 100px;
  justify-content: center;

 
}

.nav-panel {
  padding: 30px;
display: flex;
flex-direction: column;
align-items: center;
  background: linear-gradient(0deg, #FFFFFF, #FFFFFF);
  .spotify-logo{
    margin: 0 0 2rem 0;
  align-self: flex-start;
   
  }
  ul{
    list-style-type: none;

    li{
        width: 210px;
        height: 55px;
       
      
       a {
    font-weight: bold;
    color: #2c3e50;
    width: 100%;
    height: 100%;
    text-decoration: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    border-radius: 10px;
     &.router-link-exact-active {
      color: #42b983;
      background: rgba(29,185,84,.15);
    }
    span{
      font-size: 18px;
      color: #191414;
      font-family: Rubik, sans-serif;
      font-style: normal;
      font-weight: 300;
      line-height: 21px;
     
    }
   span,img{
     margin-left: 1rem;
   }
  }
    }
  }
 
}
.main-container{
  background: #F1F7F1;
  overflow: scroll;
}


.player-container{
  
 grid-column: span 2 / auto;

 background: linear-gradient(0deg, #FFFFFF, #FFFFFF), #F1F1F1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    height: 100%;
    width: 100%;


}
</style>
