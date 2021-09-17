<template>
  <div class="current-track-description">
    <img :src="image" alt="playlist-image" class="track-image" />
    <div class="track-description">
      <p class="track-name">{{ currentTrack.name || "Song" }}</p>
      <p class="track-album">{{ currentTrack.album_name || "Album" }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["currentTrack", "image"],
};
</script>
<style lang="scss" scoped>
.current-track-description {
  height: 100%;
  width: 25%;
  padding: 0.2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  .track-image {
    height: 100%;
    width: 10rem;
  }
  .track-description {
    margin-left: 3rem;
    .track-name {
      font-size: 2.4rem;
      font-weight: 400;
      color: #191414;
    }
    .track-album {
      font-size: 1.8rem;
      font-weight: 400;
      color: #646464;
    }
  }
}
</style>