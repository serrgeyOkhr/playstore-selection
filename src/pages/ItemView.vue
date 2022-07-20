<template>
  <h2>{{gameInfo?.info.title}}</h2>
  <q-img :src="steamInfo.background"></q-img>
  <pre>{{steamInfo}}</pre>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import config from '../config'

export default {
  setup() {
    const gameInfo = ref(null)
    const steamInfo = ref(null)
    const route = useRoute()
    const gameID = ref(0)
    const steamID = ref(0)

    getGameID(route, gameID)
    getGameInfo(gameID, gameInfo)
    .then(()=>{
      getSteamID(gameInfo, steamID)
      getSteamInfo(steamID, steamInfo)
      // console.log(steamID.value);
    })


    function getSteamID (gameInfo, output) {
      output.value = Number(gameInfo?.value?.info?.steamAppID)
    }
    function getGameID (route, output) {
      output.value = Number(route.params.id)
    }

    async function getSteamInfo(gameID, output) {
      const gameInfoURL = `https://store.steampowered.com/api/appdetails?appids=${gameID.value}`
      // console.log(gameInfoURL);
      const params ={
        method: 'GET',
        // headers: {
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Content-Type':	'application/json;',
        // },
        mode: 'cors',
      }
      fetch('http://cors-anywhere.herokuapp.com/'+gameInfoURL, params)
          .then(response => {
            console.log(response) 
            return response.json()})
          .then((result) => {
            console.log('gameInfo', result)
            output.value = result[gameID.value].data
          })
      // await sendOnServer(gameInfoURL, params, output)
    }
    async function getGameInfo(gameID, output) {
      const URLFabric = new config.API_Fabric()
      const params = {
        id: gameID.value
      }

      const gameInfoURL = URLFabric.createURL(config.API_Section.Game_Lookup, params)

      await sendOnServer(gameInfoURL, params, output)
    }

    async function sendOnServer(url, params, output=ref('')) {
        await fetch(url, params)
          .then(response => {
            // console.log(response)
            return response.json()})
          .then((result) => {
            console.log('gameInfo', result)
            output.value = result
          })
    }
    return {
      gameInfo,
      steamInfo
    }
  }
}
</script>

<style>

</style>