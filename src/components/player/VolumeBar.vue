<template>
  <div class="volume-container">
    <img src="@/assets/images/player/volume.png" alt="" /><label
      for="vol"
    ></label>
    <div
      class="volume-bar"
      ref="volbar"
      @click="
        changeVolume($event);
        emitVolume();
      "
    >
      <div class="volume-progress" :style="{ width: volume + '%' }"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      volume: 40,
    };
  },
  methods: {
    changeVolume(e) {
      let position = e.clientX - this.$refs.volbar.offsetLeft;
      this.volume = Math.floor(
        (100 * position) / this.$refs.volbar.clientWidth
      );
    },
    emitVolume() {
      this.$emit("emitVolume", this.volume);
    },
  },
};
</script>
<style lang="scss" scoped>
.volume-container {
  height: 100%;
  padding: 0.2rem;
  width: 10%;
  display: flex;
  align-items: center;
  margin-right: 3rem;
  cursor: pointer;
  img {
    padding: 1rem;
  }
  .volume-bar {
    width: 11rem;
    height: 0.6rem;
    background: #c4c4c4;
    border-radius: 1.1rem;
    .volume-progress {
      height: 100%;
      background: #191414;
      border-radius: 1.1rem;
    }
  }
}
</style>