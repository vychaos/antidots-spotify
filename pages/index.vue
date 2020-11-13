<template>
  <div class="container">
    <h1 class="title">
      Antidots: Spotify
    </h1>
    <form>
      <input
        type="text"
        name="artist"
        placeholder="Artist"
        v-model="query"
        />
      <button
        @click="onSearch"
      ><SearchIcon/></button>
    </form>
    <div class="results">
      <div v-for="artist in artists" :key="artist.id">
        <ArtistItem v-bind:artist="artist"></ArtistItem>
      </div>
    </div>
    <div class="links">
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
      query: '',
      busy: false,
      artists: []
    }
  },

  methods: {
    async onSearch(event: any) {
      event.preventDefault();
      if (this.busy) {
        return;
      }
      this.busy = true;
      try {
        if (this.query) {
          const response = await fetch('/api/search/artists?q=' + encodeURIComponent(this.query));
          const json = await response.json();
          this.artists = json?.artists?.items || []
        }
      }
      catch(err) {
        console.error(err)
      }
      finally {
        this.busy = false;
      }
    },
  },
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

.container {
  margin: 0 auto;
  min-height: 100vh;
}

form {
  display: flex;
  max-width: 1000px;
  margin: 20px auto;
  justify-content: center;
}

input {
  flex: 1;
  outline: none;
  border-radius: 3px;
  border: solid 1px #000000;
}

button {
  padding: 0;
  display: flex;
  margin-left: 10px;
  outline: none;
  border-radius: 50%;
  overflow: hidden;
  border: 0;
  background: rgb(0, 100, 230);
  color: #fff;
  position: relative;
  cursor: pointer;
}

button:hover::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background: rgba(0, 0, 0, .2);
}

.results {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1000px;
  margin: 0 auto;
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

.links {
  padding: 15px 0;
  text-align: center;
}

.links > * {
  margin: 0 4px;
  text-decoration: none;
}
</style>
