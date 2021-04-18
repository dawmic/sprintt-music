<template>
  <div class="playlist-container">
      <div class="header-container" 
       :style="{background: `linear-gradient(to bottom, rgba(0, 0, 0, .6) 0%, rgba(0, 0, 0, .8) 100%), url(${item.image_url})`}"
      >
          <h2>{{playlist.name}}</h2>
          <p class="playlist_songs">{{playlist_number_of_songs}} songs</p>
          <p class="playlist_description">{{playlist.description}}</p>
          <p class="playlist_duration">{{playlist_duration}}</p>
      </div>
      <div class="tracks-container" ref="tracksContainer">
         <div class="filter-container">
          <label for="filter-tr">&#x1F50D;</label>
          <input id="filter-tr" type="text" class="filter-tracks" v-model="filter_tracks" placeholder="  Filter">
          </div> 
          <table>
              
              <thead>
                  <tr>
                      <th></th>
                      <th></th>
                      <th class="title-table">TITLE</th>
                      <th>ARTIST</th>
                      <th>ALBUM</th>
                      <th>RELEASE DATE</th>
                  </tr>
              </thead>
              <tbody>
                 
                <tr v-for="track in filteredAndSortedTracks" :key="track.id">
                    <td v-if="playing" @click="playing=false" class="pause-btn"><button><img src="@/assets/images/pause_line_icon.png" alt="play-song"></button></td>
                    <td v-else @click="playing = true" class="play-btn"><button><img src="@/assets/images/play_line_icon.png" alt="play-song"></button></td>
                    <td class="liked-btn"><button><img src="@/assets/images/liked_songs_icon.png" alt="like"></button></td>
                     <td class="track-name">{{track.name}}</td>
                     <td class="track-artist">{{track.artists_names}}</td>
                     <td class="track-album">{{track.album_name}}</td>
                     <td class="track-date">{{track.release_date}}</td>
                </tr>
              </tbody>
          </table>
           <p class="no-result-info" v-if="error">
                     Sorry, something does not work :-(
                  </p>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
const options = { headers: {
    'user-access-token': '90275ed9-b7f3-4061-a8b7-6d602bfef99c' 
}}


export default {
name: 'Playlist',
props: ['item'],
data(){
    return{
        filter_tracks: '',
        error: false,
        playlist_number_of_songs: '50 songs',
        playlist_duration: '2hr 30min',
        playlist: 'something wrong',
        tracks: [],
        playing: false,
    }
},

  

mounted() {
 
        if (this.item) {
            this.playlist = this.item;   
        
        axios
      .get(`https://api.sprintt.co/spotify/playlist_tracks/${this.item.playlist_id}`, options)
      .then(response =>{ console.log(response.data)
      this.tracks = response.data.tracks;
      console.log(this.tracks);
      this.playlist_duration = response.data.playlist_duration;
      this.playlist_number_of_songs = response.data.playlist_tracks;
      this.error = false;
      })
      .catch(error=> {
          this.error = true;
          console.log(error)})
}
      
    },
    computed: {
    filteredAndSortedTracks(){
     // function to compare names
    /* function compare(a, b) {
       if (a.name < b.name) return -1;
       if (a.name > b.name) return 1;
       return 0;
     } */
      /*
     return this.tracks.filter(track => {
        return track.name.toLowerCase().includes(this.filter_tracks.toLowerCase())
     }).sort(compare) */
     return this.tracks.filter(track =>{
        return (track.name.toLowerCase().includes(this.filter_tracks.toLowerCase()) ||  track.artists_names.toLowerCase().includes(this.filter_tracks.toLowerCase()) || track.album_name.toLowerCase().includes(this.filter_tracks.toLowerCase()))
     
     })
   
    },

    }

}
</script>

<style scoped lang="scss">
.playlist-container{
    width: 100%;
    height: 100%;
  
    .header-container{
        z-index: 9999;
   position: sticky;
   top: 0;
        height: 220px;
        width: 100%;
      background-position: center !important;
        background-size: cover !important;
        
        display: grid;
    grid-template-columns:  1fr 1fr;
    align-items: center;
    h2,.playlist-container,.playlist_description,.playlist_duration,.playlist_songs{
        color: #F1F1F1;
    }
  
        h2{
            font-size: 3.6rem;
            margin: 0 0 1.1rem 10rem;
            align-self: end;
        }
        .playlist_description{
            font-size: 1.8rem;
            margin-left: 10rem;
            align-self: start;
        }
        .playlist_songs{
            margin: 0 25rem 1.1rem 0;
            font-size: 2.8rem;
            font-weight: 300;
            place-self: end end;
        }
        .playlist_duration{
            margin-right: 25rem;
            font-size: 1.8rem;
            place-self: start end;
        }
        
    }
    .tracks-container{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;

       
        // filter styles ***********
        .filter-container{
            width: 1300px; 
            
        label{
           margin-right: 1rem;
           font-size: 2.4rem;
        
        }
         .filter-tracks{
          
            margin: 3rem 0 0 0;
            background: transparent;
            outline: none;
            border: none;
            font-size: 1.8rem;
            font-weight: 300;
         
            
            &::placeholder{
                text-align: left;
            }
        }
       //end fiter styles ************
        }
        table{
            //width: 95%;
           width: 1300px;
            margin-top: 3rem;
            border-collapse: collapse;
            thead tr{
                   &:hover{
                       background: transparent;
                   }
               }
               tr:hover .play-btn button{
                   visibility: visible;
               }
            tr{
               border-bottom: .5px solid #646464;
               height: 60px;

              
               &:hover{
                   background: rgba(29,185,84,0.2);
               }
               .play-btn, .pause-btn{
                  width: 2%;
                  
                   button{
                       outline: none;
                       border: none;
                       background: transparent;
                       visibility: hidden;
                      img{
                         width: 2.8rem;
                         
                         height: 2.8rem; 
                      } 
                   }
               }  
               .pause-btn{
                  button{
                     visibility: visible; 
                  } 
               }
              .liked-btn{
                  width: 5%;
                  button{ border: none;
                  background: transparent;
                  outline: none;
                  cursor: pointer;
                  padding: 1rem;
                  img{
                      height: 20px;
                  }
                  }
                 
              }
              .track-name{
                  width: 34%;
              }
              .track-artist{
                  width: 30%;
              }
              .track-album, .track-date{
                  width: 17%;
              }
             
            }
           th,td{
                color: #191414;
            font-size: 2.2rem;
            padding: .5rem;
       
  //display:inline-block;
  //text-overflow: ellipsis;
  //white-space: nowrap;
           }
            th{
                text-align: left;
            }
            .title-table{
               
            }
        }
        .no-result-info{
            margin-top: 10rem;
            font-size: 2.4rem;
        }
    }
}

</style>