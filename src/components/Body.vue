<template>
  <div class="q-pa-md row justify-center stretch q-gutter-md">
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-model="currentPage"
          @click="getGames()"
          :max="maxPages"
          :max-pages="9"
          direction-links
        />
        <pre>{{currentPage}}</pre>
      </div>
    <div class="card_wrapper" v-for="(game, index) in showGames"
    :key="index">
      <ItemCard
      :gameInfo="game"
      :shopInfo="stores.filter((shop) => {return shop.storeID === game.storeID})[0]"
      />
      <!-- <pre>{{game}}</pre> -->
    </div>

  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import ItemCard from './ItemCard.vue'
import config from '../config'
export default{
  components: {
    ItemCard
  },
  setup() {
    const showGames = ref([])
    const stores = ref([])
    const maxPages = ref(0)
    const currentPage = ref(1)
    const type = {
      List_of_Deals: 'deals?',
      Deal_Lookup: 'deals?',
      List_of_Games: 'games?',
      Game_Lookup: 'games?',
      Multiple_Game_Lookup: 'games?',
      Stores_Info: 'stores',
    }

    function getAllGames(output, maxPages, page ) {
      const createURL = new config.API_Fabric()
      const api_params = {}
      api_params.pageNumber = page.value
      // console.log('!!! ', api_params);
      fetch (createURL.getURL(type.List_of_Deals, api_params), {
        method: 'GET',
        redirect: 'follow'
      })
      .then((response) => { maxPages.value = Number(response.headers.get('X-Total-Page-Count')); return response.json()})
      .then((result) => {
        console.log(result);
        output.value = result
        })
    }
    function getStores(output) {
      const createURL = new config.API_Fabric()

      fetch (createURL.getURL(type.Stores_Info), {
        method: 'GET',
        redirect: 'follow'
      })
      .then(response => response.json())
      .then((result) => {
        console.log('stores', result)
        output.value = result
        })
    }
    function getDetailGameInfo(id) {
      const createURL = new config.API_Fabric()
      const api_params = {}
      api_params.id = id
      // console.log('!!! ', api_params);
      fetch (createURL.getURL(type.Deal_Lookup, api_params), {
        method: 'GET',
        redirect: 'follow'
      })
      .then(response => response.json())
      .then(result => console.log('DetailGameInfo', result))
    }
    getAllGames(showGames, maxPages, currentPage)
    getStores(stores)
    getDetailGameInfo('RdTbnfxjbPgSZJ%2Fi%2BibOa9cwLng0aGCcKUws2MdngN4%3D')
    // createURL.getURL(type.Deal_Lookup, api_params)
    function getGames() {
      getAllGames(showGames, maxPages, currentPage)
    }
    return {
      showGames,
      stores,
      maxPages,
      currentPage,
      getGames
    }
  }
}
</script>

<style scoped>
.card_wrapper {
  width: 20%;
}
</style>