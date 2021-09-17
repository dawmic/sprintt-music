<template>
  <div id="app">
    <nav class="nav-panel">
      <router-link to="/Home"
        ><img
          class="spotify-logo"
          src="@/assets/images/sprintt_logo.png"
          alt="spotify"
      /></router-link>
      <ul>
        <li>
          <router-link to="/Home"
            ><img src="@/assets/images/home_icon.png" alt="home" /><span
              >Home</span
            ></router-link
          >
        </li>
        <li>
          <router-link to="/Browse"
            ><img src="@/assets/images/browse_icon.png" alt="browse" /><span
              >Browse</span
            ></router-link
          >
        </li>
        <li>
          <router-link
            :to="{
              name: 'Like-playlist',
              params: { liked_path: liked_path, item: liked_obj },
            }"
            ><img
              src="@/assets/images/liked_songs_icon.png"
              alt="liked songs"
            /><span>Liked songs</span></router-link
          >
        </li>
      </ul>
    </nav>
    <main class="main-container">
      <router-view
        :featured_playlist="featured_pl"
        :mood_playlist="mood_pl"
        :recently_playlist="recently_pl"
        @currentTrack="showLog"
        @playTrack="playTrack"
        @pauseTrack="pauseTrack"
        :trackPlayingNow="trackPlayingNow"
        @post_recentlyPlaylist="post_recentlyPlaylist"
        @like_song="like_song"
        @unlike_song="unlike_song"
        @currentTrackCategory="showLog"
        @playCategory="playTrack"
      />
    </main>
    <div class="player-container">
      <CurrentTrack
        :currentTrack="track.currentTrack"
        :image="track.imagePlaylist"
      />
      <ControlTrack
        :isPlaying="isPlaying"
        @startPlayer="startPlayer"
        @pausePlayer="pausePlayer"
        :trackPlayingNow="trackPlayingNow"
        :currentTrack="track.currentTrack"
        :audioObj="audioObj"
        @nextTrack="nextTrack"
        @prevTrack="prevTrack"
        :currentTimePlayingTrack="track.currentTimePlayingTrack"
      />
      <VolumeBar @emitVolume="changeVolume" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import CurrentTrack from "@/components/player/CurrentTrack.vue";
import ControlTrack from "@/components/player/ControlTrack.vue";
import VolumeBar from "@/components/player/VolumeBar.vue";
const options = {
  headers: {
    "user-access-token": "90275ed9-b7f3-4061-a8b7-6d602bfef99c",
  },
};
const recent_list = axios.get(
  "https://api.sprintt.co/spotify/recently_played_playlists?limit=10",
  options
);
const featured_list = axios.get(
  "https://api.sprintt.co/spotify/featured_playlists?limit=10",
  options
);
const mood_list = axios.get(
  "https://api.sprintt.co/spotify/mood_playlists?limit=10",
  options
);

const getEncryptedToken = (token) => {
  let date = new Date();
  let utcTime = `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;
  let stringToEncrypt = `${token}===${utcTime}`;
  return btoa(stringToEncrypt);
};
const token = getEncryptedToken("90275ed9-b7f3-4061-a8b7-6d602bfef99c");
export default {
  name: "App",
  components: {
    CurrentTrack,
    ControlTrack,
    VolumeBar,
  },
  data() {
    return {
      liked_obj: {
        image_url: require("@/assets/images/liked_songs.jpg"),
        description: "",
        name: "Liked Songs",
        playlist_id: 9999999999,
      },
      liked_path: "https://api.sprintt.co/music/liked_tracks?limit=100",
      recently_pl: "",
      featured_pl: "",
      mood_pl: "",
      isPlaying: false,
      trackPlayingNow: "",
      volume: 0.4,
      track: {
        currentTrack: "",
        imagePlaylist: "",
        activePlaylistTracks: "",
        currentTimePlayingTrack: "",
      },
    };
  },
  created() {
    axios
      .all([recent_list, featured_list, mood_list])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0].data.playlists;
          const responseTwo = responses[1].data.playlists;
          const responseThree = responses[2].data.playlists;
          this.recently_pl = responseOne;
          this.featured_pl = responseTwo;
          this.mood_pl = responseThree;
        })
      )
      .catch((errors) => {
        console.log(errors);
      });
    this.$router.push("Home");
  },
  methods: {
    showLog(...args) {
      this.audioObj.pause();
      const [x, y] = args;
      this.track.currentTrack = x;
      this.track.imagePlaylist = y;
      this.audioObj.play();
    },
    playTrack(...args) {
      //this.audioObj.pause();
      const [playingMusic, activeTrack, playlistInfo] = args;

      this.isPlaying = playingMusic;

      this.trackPlayingNow = activeTrack;

      this.track.activePlaylistTracks = playlistInfo;
      this.audioObj.volume = this.volume;
      // this.audioObj.play();
      this.currentTimeInterval();
      this.audioObj.onended = () => {
        this.nextTrack();
        console.log("test next");
      };
    },
    pauseTrack(...args) {
      this.audioObj.pause();
      const [playingMusic, activeTrack] = args;
      this.isPlaying = playingMusic;
      this.trackPlayingNow = activeTrack;
    },
    startPlayer(...args) {
      this.audioObj.pause();
      //this.isPlaying = status;
      const [play, trackPlaying] = args;
      this.isPlaying = play;
      this.trackPlayingNow = trackPlaying;

      this.audioObj.play();
      this.currentTimeInterval();
    },
    pausePlayer(...args) {
      this.audioObj.pause();
      const [play, trackPlaying] = args;
      this.isPlaying = play;
      this.trackPlayingNow = trackPlaying;
    },
    changeVolume(vol) {
      this.volume = vol / 100;
      this.audioObj.volume = this.volume;
    },
    nextTrack() {
      let next = this.track.activePlaylistTracks.tracks[this.nextTrackIndex];

      this.audioObj.pause();
      this.isPlaying = false;
      this.track.currentTrack = next;
      this.trackPlayingNow = this.track.currentTrack.track_id;
      this.audioObj.play();
      this.isPlaying = true;
      this.audioObj.volume = this.volume;
      this.audioObj.onended = () => {
        this.nextTrack();
        if (
          this.track.activePlaylistTracks.tracks[this.nextTrackIndex] ==
          this.track.activePlaylistTracks.tracks[
            this.track.activePlaylistTracks.tracks.length - 1
          ]
        ) {
          console.log("ostatni track");
          this.audioObj.pause();
        }
      };
    },
    prevTrack() {
      console.log("test prev");
      let prev = this.track.activePlaylistTracks.tracks[this.prevTrackIndex];
      this.audioObj.pause();
      this.isPlaying = false;
      this.track.currentTrack = prev;
      this.trackPlayingNow = this.track.currentTrack.track_id;
      this.audioObj.play();
      this.isPlaying = true;
    },
    post_recentlyPlaylist(...args) {
      const [recently_track_id, recently_playlist_id] = args;

      if (recently_track_id && recently_playlist_id != undefined)
        axios.post(
          `https://api.sprintt.co/spotify/notify_played/${recently_playlist_id}/${recently_track_id}`,
          null,
          options
        );
      axios
        .get(
          "https://api.sprintt.co/spotify/recently_played_playlists?limit=10",
          options
        )
        .then((response) => (this.recently_pl = response.data.playlists));
    },
    currentTimeInterval() {
      setInterval(() => {
        this.track.currentTimePlayingTrack = Math.floor(
          this.audioObj.currentTime
        );
      }, 1000);
      console.log(this.audioObj.currentTime + "czas");
    },
    stopTimeInterval() {
      clearInterval();
    },
    like_song(track) {
      track.is_liked = 1;
      if (track) {
        axios.post(
          `https://api.sprintt.co/music/liked_tracks/${track.track_id}?status=true`,
          null,
          options
        );
      }
    },
    unlike_song(track) {
      track.is_liked = 0;
      if (track) {
        axios.post(
          `https://api.sprintt.co/music/liked_tracks/${track.track_id}?status=false`,
          null,
          options
        );
      }
    },
  },
  computed: {
    audioObj() {
      return new Audio(
        `https://api.sprintt.co/spotify/play/${this.track.currentTrack.track_id}?access=${token}`
      );
    },
    nextTrackIndex() {
      return (
        this.track.activePlaylistTracks.tracks.indexOf(
          this.track.currentTrack
        ) + 1
      );
    },
    prevTrackIndex() {
      return (
        this.track.activePlaylistTracks.tracks.indexOf(
          this.track.currentTrack
        ) - 1
      );
    },
  },
  watch: {
    audioObj(newAudioObj, oldAudioObj) {
      oldAudioObj.pause();
    },
  },
};
</script>
<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 1.6rem;
  font-family: Rubik, sans-serif;
  font-weight: 400;
}
html {
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
  background: linear-gradient(0deg, #ffffff, #ffffff);
  .spotify-logo {
    margin: 0 0 2rem -6rem;
    align-self: flex-start;
  }
  ul {
    list-style-type: none;

    li {
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
        &.router-link-active {
          //router-link-exact-active
          color: #42b983;
          background: rgba(29, 185, 84, 0.15);
        }
        span {
          font-size: 18px;
          color: #191414;
          font-family: Rubik, sans-serif;
          font-style: normal;
          font-weight: 300;
          line-height: 21px;
        }
        span,
        img {
          margin-left: 1rem;
        }
      }
    }
  }
}
.main-container {
  background: #f1f7f1;
  overflow: scroll;
}
.player-container {
  grid-column: span 2 / auto;
  background: linear-gradient(0deg, #ffffff, #ffffff), #f1f1f1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
}
</style>
