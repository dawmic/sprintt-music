<template>
  <div class="current-track-description">
        <div class="track-image"></div>
   <div class="track-description"><p class="track-name">Song name</p>
   <p class="track-album">album name</p></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.current-track-description{
    height: 100%;
   
    display: flex;
    flex-direction: row;
    align-items: center;
    .track-image{
        height: 100%;
        width: 10rem;
        border: 2px solid brown;
    }
    .track-description{
        margin-left: 3rem;
        .track-name{
            font-size: 2.4rem;
            font-weight: 400;
            color: #191414;
        }
        .track-album{
            font-size: 1.8rem;
            font-weight: 400;
            color: #646464;
        }
       
    } 
} 

</style>