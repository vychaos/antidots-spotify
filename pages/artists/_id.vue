<template>
  <div class="container">
    <h1>
      {{ artist.name }}
    </h1>
    <h2><span>Albums</span></h2>
    <div class="results">
      <div v-for="album in albums" :key="album.id" class="album">
        <img v-if="album.images.length" v-bind:src="album.images[0].url" />
        <div class="description">
          <p class="title">{{ album.name }}</p>
          <p class="tracks">Tracks: {{ album.total_tracks }}</p>
        </div>
      </div>
    </div>
    <h2><span>Top Tracks</span></h2>
    <div class="results">
      <div v-for="topTrack in topTracks" :key="topTrack.id" class="track">
        <p class="title">{{ topTrack.name }}</p>
        <p class="popularity">Popularity: <b>{{ topTrack.popularity }}</b></p>
      </div>
    </div>
    <div class="links">
      <NuxtLink to='/'>
        Home
      </NuxtLink>
      <a
        href="https://github.com/vychaos/antidots-spotify"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: function () {
    return {
      artist: {},
      albums: [],
      topTracks: []
    }
  },
  created: async function () {
    const { id } = this.$route.params;
    try {
      const artistResponse = await fetch('/api/artists/' + id);
      const artistJson = await artistResponse.json();
      if (artistJson.error) {
        throw new Error(artistJson.error)
      }
      this.artist = artistJson;
      const albumsResponse = await fetch('/api/artists/' + id + '/albums');
      const albumsJson = await albumsResponse.json();
      if (albumsJson.error) {
        throw new Error(albumsJson.error)
      }
      this.albums = albumsJson.items;
      const topTracksResponse = await fetch('/api/artists/' + id + '/top-tracks');
      const topTracksJson = await topTracksResponse.json();
      if (topTracksJson.error) {
        throw new Error(topTracksJson.error)
      }
      this.topTracks = topTracksJson.tracks;
    }
    catch(error) {
      window.location.href = '/';
    }
  }
});
</script>

<style>
* {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
}

.results {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.album,
.track {
  margin: 0;
  width: 100%;
  display: flex;
}

.album:nth-child(odd),
.track:nth-child(odd) {
  background: rgb(220, 220, 220);
}

.album img {
  width: 100px;
  height: 100px;
  margin: 10px;
}

.album .title {
  margin: 10px 0;
}

.album .tracks {
  margin: 10px 0;
  font-weight: 500;
}

.track .title {
  flex: 1;
  margin: 10px;
}

.track .popularity {
  font-size: 14px;
}

.container {
  margin: 0 auto;
  min-height: 100vh;
}

h1 {
  display: block;
  font-weight: 300;
  font-size: 60px;
  color: #35495e;
  letter-spacing: 2px;
  padding: 10px 0;
  text-align: center;
  background: rgb(230, 240, 255);
  border-bottom: 1px solid rgb(235, 235, 235);
  position: sticky;
  top: 0;
  z-index: 100;
}

h2 {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 30px;
  color: #35495e;
  letter-spacing: 1px;
  font-style: italic;

  margin: 20px auto;
  padding: 0;
  background: rgb(255, 255, 255);
  border-bottom: 2px solid rgb(165, 200, 255);
  position: sticky;
  top: 96px;
  max-width: 1000px;
}

h2 span {
  margin: 0 10px;
}

.links {
  padding-top: 15px;
  text-align: center;
}

.links > * {
  margin: 0 10px;
}
</style>
