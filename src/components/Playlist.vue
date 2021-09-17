<template>
  <div class="playlist-container">
    <div
      class="header-container"
      :style="{
        background: `linear-gradient(to bottom, rgba(0, 0, 0, .6) 0%, rgba(0, 0, 0, .8) 100%), url(${playlist.image_url})`,
      }"
    >
      <h2>{{ playlist.name }}</h2>
      <p class="playlist_songs">{{ playlistInfo.number_of_songs }} songs</p>
      <p class="playlist_description">{{ playlistInfo.description }}</p>
      <p class="playlist_duration">{{ playlistInfo.duration || "" }}</p>
    </div>
    <div class="tracks-container" ref="tracksContainer">
      <div class="filter-container">
        <label for="filter-tr">&#x1F50D;</label>
        <input
          id="filter-tr"
          type="text"
          class="filter-tracks"
          v-model="filter_tracks"
          placeholder="  Filter"
        />
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
          <tr
            v-for="track in filteredAndSortedTracks"
            :key="track.id"
            :class="{ activeTrack: trackPlayingNow == track.track_id }"
          >
            <td v-if="trackPlayingNow == track.track_id" class="pause-btn">
              <button @click="pauseTrack(track)">
                <img src="@/assets/images/pause_line_icon.png" alt="pause" />
              </button>
            </td>
            <td v-else class="play-btn">
              <button
                @click="
                  currentTrack(track),
                    playTrack(track),
                    post_recentlyPlaylist(track.track_id)
                "
              >
                <img src="@/assets/images/play_line_icon.png" alt="play" />
              </button>
            </td>
            <td
              v-if="!track.is_liked"
              class="like-btn"
              @click="like_song(track)"
            >
              <button>
                <img src="@/assets/images/liked_songs_icon.png" alt="like" />
              </button>
            </td>
            <td
              v-if="track.is_liked"
              class="like-btn"
              @click="unlike_song(track)"
            >
              <button>
                <img src="@/assets/images/liked.png" alt="unlike" />
              </button>
            </td>
            <td class="track-name">{{ track.name }}</td>
            <td class="track-artist">{{ track.artists_names }}</td>
            <td class="track-album">{{ track.album_name }}</td>
            <td class="track-date">{{ track.release_date }}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="!error && filteredAndSortedTracks.length < 1">Empty playlist</p>
      <div class="dots-3" v-if="error"></div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
const options = {
  headers: {
    "user-access-token": "90275ed9-b7f3-4061-a8b7-6d602bfef99c",
  },
};
export default {
  name: "Playlist",
  props: ["item", "trackPlayingNow", "liked_path"],
  data() {
    return {
      img_path: "",
      liked_songs: false,
      filter_tracks: "",
      error: true,
      playlist: "something wrong",
      playlistInfo: {
        number_of_songs: "50",
        duration: "2hr 30min",
        tracks: [],
      },
      playingMusic: false,
      activeTrack: this.trackPlayingNow,
    };
  },
  methods: {
    currentTrack(current) {
      this.$emit(
        "currentTrack",
        current,
        /*this.item.image_url*/ this.playlist.image_url
      );
    },
    playTrack(track) {
      this.playingMusic = track.album_name;
      this.activeTrack = track.track_id;
      this.$emit(
        "playTrack",
        this.playingMusic,
        this.activeTrack,
        this.playlistInfo
      );
    },
    pauseTrack() {
      this.playingMusic = false;
      this.activeTrack = false;
      this.$emit("pauseTrack", this.playingMusic, this.activeTrack);
      console.log("PAUSE TRACK");
    },
    post_recentlyPlaylist(track_id) {
      this.$emit("post_recentlyPlaylist", track_id, this.playlist.playlist_id);
    },
    like_song(track) {
      console.log("like test");
      this.$emit("like_song", track);
    },
    unlike_song(track) {
      console.log("unlike test");
      this.$emit("unlike_song", track);
      console.log(this.$route.name);
    },
  },
  mounted() {
    if (this.liked_path) {
      this.liked_songs = true;
      this.playlist = this.item;
      axios
        .get(this.liked_path, options)
        .then((response) => {
          console.log(response.data);
          this.playlistInfo.tracks = response.data.liked_tracks;
          this.playlistInfo.duration = "";
          this.error = false;
          this.playlistInfo.number_of_songs = response.data.liked_tracks.length;
        })
        .catch((error) => {
          this.error = true;
          console.log(error);
        });
    } else {
      this.playlist = this.item;
      this.img_path = this.item.image_url;
      axios
        .get(
          `https://api.sprintt.co/spotify/playlist_tracks/${this.item.playlist_id}`,
          options
        )
        .then((response) => {
          console.log(response.data);
          this.playlistInfo.tracks = response.data.tracks;
          console.log(this.tracks);
          this.playlistInfo.duration = response.data.playlist_duration;
          this.playlistInfo.number_of_songs = response.data.playlist_tracks;
          this.error = false;
        })
        .catch((error) => {
          this.error = true;
          console.log(error);
        });
    }
  },
  computed: {
    filteredAndSortedTracks() {
      return this.playlistInfo.tracks.filter((track) => {
        return (
          track.name.toLowerCase().includes(this.filter_tracks.toLowerCase()) ||
          track.artists_names
            .toLowerCase()
            .includes(this.filter_tracks.toLowerCase()) ||
          track.album_name
            .toLowerCase()
            .includes(this.filter_tracks.toLowerCase())
        );
      });
    },
  },
};
</script>
<style scoped lang="scss">
.playlist-container {
  width: 100%;
  height: 100%;
  .header-container {
    z-index: 9999;
    position: sticky;
    top: 0;
    height: 220px;
    width: 100%;
    background-position: center !important;
    background-size: cover !important;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    h2,
    .playlist-container,
    .playlist_description,
    .playlist_duration,
    .playlist_songs {
      color: #f1f1f1;
    }
    h2 {
      font-size: 3.6rem;
      margin: 0 0 1.1rem 10rem;
      align-self: end;
    }
    .playlist_description {
      font-size: 1.8rem;
      margin-left: 10rem;
      align-self: start;
    }
    .playlist_songs {
      margin: 0 25rem 1.1rem 0;
      font-size: 2.8rem;
      font-weight: 300;
      place-self: end end;
    }
    .playlist_duration {
      margin-right: 25rem;
      font-size: 1.8rem;
      place-self: start end;
    }
  }
  .tracks-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .filter-container {
      width: 1300px;
      label {
        margin-right: 1rem;
        font-size: 2.4rem;
      }
      .filter-tracks {
        margin: 3rem 0 0 0;
        background: transparent;
        outline: none;
        border: none;
        font-size: 1.8rem;
        font-weight: 300;
        &::placeholder {
          text-align: left;
        }
      }
    }
    table {
      width: 1300px;
      margin-top: 3rem;
      border-collapse: collapse;
      thead tr {
        &:hover {
          background: transparent;
        }
      }
      tr:hover .play-btn button {
        visibility: visible;
      }
      tr {
        border-bottom: 0.5px solid #646464;
        height: 60px;
        &:hover {
          background: rgba(29, 185, 84, 0.2);
        }
        .play-btn,
        .pause-btn {
          width: 2%;
          button {
            outline: none;
            border: none;
            background: transparent;
            visibility: hidden;
            img {
              width: 2.8rem;
              height: 2.8rem;
            }
          }
        }
        .pause-btn {
          button {
            visibility: visible;
          }
        }
        .like-btn {
          width: 5%;
          button {
            border: none;
            background: transparent;
            outline: none;
            cursor: pointer;
            padding: 1rem;
            img {
              height: 20px;
            }
          }
        }
        .track-name {
          width: 34%;
        }
        .track-artist {
          width: 30%;
        }
        .track-album,
        .track-date {
          width: 17%;
        }
      }
      th,
      td {
        color: #191414;
        font-size: 2.2rem;
        padding: 0.5rem;
      }
      th {
        text-align: left;
      }
      .title-table {
      }
    }
    .no-result-info {
      margin-top: 10rem;
      font-size: 2.4rem;
    }
    .dots-3 {
      margin-top: 10rem;
      width: 50px;
      height: 24px;
      background: radial-gradient(circle closest-side, currentColor 90%, #0000)
          0% 50%,
        radial-gradient(circle closest-side, currentColor 90%, #0000) 50% 50%,
        radial-gradient(circle closest-side, currentColor 90%, #0000) 100% 50%;
      background-size: calc(100% / 3) 12px;
      background-repeat: no-repeat;
      animation: d3 1s infinite linear;
    }
    @keyframes d3 {
      20% {
        background-position: 0% 0%, 50% 50%, 100% 50%;
      }
      40% {
        background-position: 0% 100%, 50% 0%, 100% 50%;
      }
      60% {
        background-position: 0% 50%, 50% 100%, 100% 0%;
      }
      80% {
        background-position: 0% 50%, 50% 50%, 100% 100%;
      }
    }
  }
  .activeTrack {
    background: rgba(29, 185, 84, 0.2);
    border-radius: 10px;
  }
}
</style>