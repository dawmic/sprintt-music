<template>
  <div class="item-container">
    <div class="image-container">
      <img class="playlist-image" :src="item.image_url" alt="" />
      <button
        v-if="!playing"
        class="play-btn-cat"
        @click="playBtn(), currentTrackCategory()"
      >
        <img src="@/assets/images/play_line_icon_cat.png" alt="" />
      </button>
      <button
        :style="{ display: display }"
        v-if="playing"
        class="pause-btn-cat"
        @click="pauseBtn"
      >
        <img src="@/assets/images/pause_line_icon_cat.png" alt="" />
      </button>
    </div>
    <router-link
      tag="h3"
      :to="{ name: 'Playlist', params: { name: item.name, item } }"
    >
      {{ item.name }}
    </router-link>
    <router-link
      tag="p"
      :to="{ name: 'Playlist', params: { name: item.name, item } }"
    >
      {{ item.description }}
    </router-link>
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
  name: "PlaylistCategory",
  props: ["item"],
  data() {
    return {
      playing: false,
      display: "none",
      playlistInfo: {},
      playingMusic: "",
      activeTrack: "",
    };
  },
  methods: {
    currentTrackCategory() {
      this.$parent.$emit(
        "currentTrackCategory",
        this.activeTrack,
        this.item.image_url
      );
    },
    playBtn() {
      console.log(this.item);
      this.playing = true;
      this.display = "block";

      this.$parent.$emit(
        "playCategory",
        this.playingMusic,
        this.activeTrack,
        this.playlistInfo
      );
    },
    pauseBtn() {
      this.playing = false;
      this.display = "none";
    },
  },
  mounted() {
    axios
      .get(
        `https://api.sprintt.co/spotify/playlist_tracks/${this.item.playlist_id}`,
        options
      )
      .then((response) => {
        console.log(response.data);
        this.playlistInfo.tracks = response.data.tracks;
        this.playlistInfo.duration = "";
        this.playlistInfo.number_of_songs = response.data.playlist_tracks;
        this.playingMusic = response.data.tracks[0].album_name;
        this.activeTrack = response.data.tracks[0].track_id;
      });
  },
};
</script>

<style lang="scss" scoped>
.item-container {
  width: 165px;
  margin: 3rem;
  padding-top: 2rem;
  h3 {
    color: $black-spotify;
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 2.1rem;
    margin: 1rem 0;
    cursor: pointer;
  }
  p {
    font-size: 1.4rem;
    color: #646464;
    line-height: 1.6rem;
    overflow: scroll;
    cursor: pointer;
  }
  .image-container {
    position: relative;
    .playlist-image {
      width: 100%;
      border-radius: 1rem;
      position: relative;
    }
    &:hover .playlist-image {
      filter: brightness(30%);
    }
    &:hover .play-btn-cat {
      display: block;
    }
    &:hover .pause-btn-cat {
      display: block;
    }
    .play-btn-cat,
    .pause-btn-cat {
      display: none;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: transparent;
      border: none;
      border-radius: 1rem;
    }
  }
}
</style>