<template>
  <NuxtLink v-bind:to="internalLink" class="artist">
    <img v-bind:src="imageSrc" class="cover"/>
  </NuxtLink>
</template>
<script>
  export default {
    props: {
      artist: {
        type: Object,
        required: true
      }
    },
    computed: {
      imageSrc: function () {
        return this?.artist?.images[0]?.url
      },
      internalLink: function () {
        return '/artists/' + this?.artist?.id
      }
    }
  }
</script>

<style>
.artist {
  display: block;
  margin: 15px;
  height: 220px;
  width: 220px;
}
.cover {
  height: 220px;
  width: 220px;
  transform: scale(.95);
  transition: transform .1s linear;
}
.artist:hover .cover{
  transform: none;
}
</style>