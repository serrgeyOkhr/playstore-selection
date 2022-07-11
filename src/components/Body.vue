<template>
  <div class="q-pa-md row justify-center stretch q-gutter-md">
    <div class="card_wrapper" v-for="(item,index) in 15" :key="index">
      <ItemCard />
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
    const createURL = new config.API_Fabric()
    const api_params = {}
    const type = {
      List_of_Deals: 'deals?',
      Deal_Lookup: 'deals?',
      List_of_Games: 'games?',
      Game_Lookup: 'games?',
      Multiple_Game_Lookup: 'games?',
      Stores_Info: 'stores',
    }

    function getAllGames(page = 0) {
      api_params.pageNumber = page
      // console.log('!!! ', api_params);
      fetch (createURL.getURL(type.List_of_Deals, api_params), {
        method: 'GET',
        redirect: 'follow'
      })
      .then(response => response.json())
      .then(result => console.log(result))
    }
    function getStores() {
      // api_params.pageNumber = page
      // console.log('!!! ', api_params);
      fetch (createURL.getURL(type.Stores_Info), {
        method: 'GET',
        redirect: 'follow'
      })
      .then(response => response.json())
      .then(result => console.log('stores', result))
    }
    function getDetailGameInfo(id) {
      api_params.id = id
      // console.log('!!! ', api_params);
      fetch (createURL.getURL(type.Deal_Lookup, api_params), {
        method: 'GET',
        redirect: 'follow'
      })
      .then(response => response.json())
      .then(result => console.log('DetailGameInfo', result))
    }
    getAllGames(1)
    getStores()
    getDetailGameInfo('RdTbnfxjbPgSZJ%2Fi%2BibOa9cwLng0aGCcKUws2MdngN4%3D')
    // createURL.getURL(type.Deal_Lookup, api_params)
    return {
    }
  }
}
</script>

<style scoped>
.card_wrapper {
  width: 20%;
}
</style>