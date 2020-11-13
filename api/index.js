import * as dotenv from 'dotenv';
import fetch from 'node-fetch';
import express, { response } from 'express';
const app = express();

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const COUNTRY_CODE = 'FR'

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/search/artists', async (req, res) => {
  try {
    if(!req.query?.q) {
      throw new Error('There is no query');
    }
    const authorizationToken = await getAuthorizationToken();
    const results = await searchArtists(authorizationToken, req.query.q);
    res.send(results);
  }
  catch (err) {
    res.json({
      error: err.message
    });
  }
});

app.get('/artists/:id', async (req, res) => {
  const authorizationToken = await getAuthorizationToken();
  const results = await searchArtistByArtistId(authorizationToken, req.params.id);
  res.send(results);
});

app.get('/artists/:id/albums', async (req, res) => {
  const authorizationToken = await getAuthorizationToken();
  const results = await searchAlbumsByArtistId(authorizationToken, req.params.id);
  res.send(results);
});

app.get('/artists/:id/top-tracks', async (req, res) => {
  const authorizationToken = await getAuthorizationToken();
  const results = await searchTopTracksByArtistId(authorizationToken, req.params.id);
  res.send(results);
});

async function searchArtists(authorizationToken, search) {
  let response = await requestSearchArtists(authorizationToken, search);
  return await response.json();
}

async function requestSearchArtists(authorizationToken, search) {
  return fetch('https://api.spotify.com/v1/search?q=' + encodeURIComponent(search) + '&type=artist', {
    method: "GET",
    headers: {
      'Authorization': getAccessToken(authorizationToken)
    }
  })
}

async function searchArtistByArtistId(authorizationToken, artistId) {
  let response = await requestArtistByArtistId(authorizationToken, artistId);
  return await response.json();
}

async function requestArtistByArtistId(authorizationToken, artistId) {
  return fetch('https://api.spotify.com/v1/artists/' + artistId, {
    method: "GET",
    headers: {
      'Authorization': getAccessToken(authorizationToken)
    }
  })
}

async function searchAlbumsByArtistId(authorizationToken, artistId) {
  let response = await requestAlbumsByArtistId(authorizationToken, artistId);
  return await response.json();
}

async function requestAlbumsByArtistId(authorizationToken, artistId) {
  return fetch('https://api.spotify.com/v1/artists/' + artistId + '/albums?market=' + COUNTRY_CODE, {
    method: "GET",
    headers: {
      'Authorization': getAccessToken(authorizationToken)
    }
  })
}

async function searchTopTracksByArtistId(authorizationToken, artistId) {
  let response = await requestTopTracksByArtistId(authorizationToken, artistId);
  return await response.json();
}

async function requestTopTracksByArtistId(authorizationToken, artistId) {
  return fetch('https://api.spotify.com/v1/artists/' + artistId + '/top-tracks?country=' + COUNTRY_CODE, {
    method: "GET",
    headers: {
      'Authorization': getAccessToken(authorizationToken)
    }
  })
}

function getAccessToken(authorizationToken) {
  return authorizationToken.token_type + ' ' + authorizationToken.access_token
}

async function getAuthorizationToken() {
  let response = await requestAuthorizationToken();
  return await response.json();
}

async function requestAuthorizationToken() {
  return fetch('https://accounts.spotify.com/api/token', {
    headers: {
      'Authorization': getBasicAuthorizationToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: "POST",
    body: [
      'grant_type=client_credentials',
    ],
  });
}

function getBasicAuthorizationToken() {
  return 'Basic ' + (Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'));
}

module.exports = {
  path: '/api',
  handler: app
}
