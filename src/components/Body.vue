<template>
  <div class="q-pa-md justify-center stretch q-gutter-md">
    <div> Main Title</div>
    <div  class="control_panel">
      <div class="range_container">
        <span>Select Price</span>
        <q-range
          v-model="searchSettings.priceRange"
          :min="0"
          :max="50"
          :step="0.5"
          label
        />
      </div>
      <div class="range_container">
        <span>Select Steam rating</span>
        <q-slider
          v-model="searchSettings.steamRating"
          :min="0"
          :max="100"
          :step="0.5"
          label
        />
      </div>
      <div class="range_container">
        <span>Select Metacritic rating</span>
        <q-slider
          v-model="searchSettings.metacriticRating"
          :min="0"
          :max="100"
          :step="0.5"
          label
        />
      </div>
      <q-checkbox left-label v-model="searchSettings.onSale" label="On Sale" />
      <q-btn @click="searchGames()">Find!</q-btn>
    </div>
    <div class="pagination">
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-model="currentPage"
          @click="searchGames()"
          :max="maxPages"
          :max-pages="9"
          direction-links
        />
        <div class="sortBy">
          <q-btn-toggle
            v-model="searchSettings.sortBy"
            @click="searchGames"
            toggle-color="primary"
            :options="[
              {label: 'Default', value: 'Deal Rating'},
              {label: 'Title', value: 'Title'},
              {label: 'Savings', value: 'Savings'},
              {label: 'Price', value: 'Price'},
              {label: 'Metacritic', value: 'Metacritic'},
              {label: 'Reviews', value: 'Reviews'},
              {label: 'Release', value: 'Release'},
              {label: 'Store', value: 'Store'},
            ]"
          />
        </div>
      </div>
    </div>
    <div class="spinner">
      <div class="card_container">
        <div class="card_wrapper" v-for="(game, index) in showGames"
          :key="index">
            <ItemCard
            :gameInfo="game"
            :shopInfo="stores.filter((shop) => {return shop.storeID === game.storeID})[0]"
            />
            <!-- <pre>{{game}}</pre> -->
          </div>
        </div>
    </div>
    <div class="pagination">
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-model="currentPage"
          @click="searchGames()"
          :max="maxPages"
          :max-pages="9"
          direction-links
        />
        <pre>{{currentPage}}</pre>
      </div>
    </div>
  <q-inner-loading class="preloader" :showing="false" />
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
    const searchSettings = ref({
      onSale: false,
      priceRange: {
        min: 0,
        max: 50
      },
      steamRating: 65,
      metacriticRating: 65,
      sortBy: 'Deal Rating'

    })
    const showGames = ref([])
    const stores = ref([])
    const maxPages = ref(0)
    const currentPage = ref(1)
    const API_Section = {
      List_of_Deals: 'deals?',
      Deal_Lookup: 'deals?',
      List_of_Games: 'games?',
      Game_Lookup: 'games?',
      Multiple_Game_Lookup: 'games?',
      Stores_Info: 'stores',
    }

    function getAllGames(output, maxPages, page ) {
      const URLFabric = new config.API_Fabric()
      const api_params = {
        pageNumber: page.value
      }
      const fetch_options = {
        method: 'GET',
        redirect: 'follow'
      }
      const fetch_url = URLFabric.createURL(API_Section.List_of_Deals, api_params)
      // console.log('!!! ', api_params);
      sendOnServerGetPages(fetch_url, fetch_options, output, maxPages)
    }


    function searchWithParams(output, maxPages, page) {
      const URLFabric = new config.API_Fabric()
      const api_params = {
        pageNumber: page.value,
        onSale: searchSettings.value.onSale,
        lowerPrice: searchSettings.value.priceRange.min,
        upperPrice: searchSettings.value.priceRange.max,
        metacritic: searchSettings.value.metacriticRating,
        steamRating: searchSettings.value.steamRating,
        sortBy: searchSettings.value.sortBy
      }
      const fetch_options = {
        method: 'GET',
        redirect: 'follow'
      }
      const fetch_url = URLFabric.createURL(API_Section.List_of_Deals, api_params)

      sendOnServerGetPages(fetch_url, fetch_options, output, maxPages)
    }

    function getStores(output) {
      const URLFabric = new config.API_Fabric()
      const fetch_url = URLFabric.createURL(API_Section.Stores_Info)
      const fetch_options = {
        method: 'GET',
        redirect: 'follow'
      }
      sendOnServer(fetch_url, fetch_options, output)
    }

    function getDetailGameInfo(id) {
      const URLFabric = new config.API_Fabric()
      const api_params = {
        id: id
      }
      const fetch_url = URLFabric.createURL(API_Section.Deal_Lookup, api_params)
      const fetch_options = {
        method: 'GET',
        redirect: 'follow'
      }

      sendOnServer(fetch_url, fetch_options)
    }
    searchGames()
    // getAllGames(showGames, maxPages, currentPage)
    getStores(stores)
    getDetailGameInfo('RdTbnfxjbPgSZJ%2Fi%2BibOa9cwLng0aGCcKUws2MdngN4%3D')
    // createURL.getURL(API_Section.Deal_Lookup, api_params)

    function sendOnServer(url, params, output=ref('')) {
      fetch(url, params)
      .then(response => response.json())
      .then((result) => {
        // console.log('stores', result)
        output.value = result
        })
    }
    function sendOnServerGetPages(url, params, output=ref(''), maxPages) {
      fetch(url, params)
      .then((response) => {
        maxPages.value = Number(response.headers.get('X-Total-Page-Count'));
        console.log('maxPages = ', maxPages.value);
        return response.json()
        })
      .then((result) => {
        console.log(result);
        output.value = result
        })
    }

    function getGames() {
      getAllGames(showGames, maxPages, currentPage)
    }
    function searchGames() {
      searchWithParams(showGames, maxPages, currentPage)
    }


    return {
      showGames,
      stores,
      maxPages,
      currentPage,
      searchSettings,
      getGames,
      searchGames
    }
  }
}
</script>

<style scoped>
.card_wrapper, .range_container {
  width: 20%;
}
.card_container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.preloader {
  display: flex;
  /* position: absolute */
}
</style>