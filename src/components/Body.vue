<template>
  <div class="q-pa-md justify-center stretch q-gutter-md">
    <div class="text-h2 text-center gt-sm"> Выгодные предложения из всех магазинов!</div>
    <div class="text-h3 text-center lt-md"> Выгодные предложения из всех магазинов!</div>
    <div class="search_section">
      <q-form @submit.prevent="searchGames()">
        <q-input v-model="searchSettings.title" filled type="search" hint="Search (работает плохо)">
          <template v-slot:append>
            <q-btn flat icon="search" @click="searchGames()" />
          </template>
        </q-input>
      </q-form>
    </div>
    <div class="pagination">
      <div class="q-pa-lg flex flex-center">
        <div>
          <q-pagination
            class="gt-xs"
            v-model="searchSettings.page"
            @click="searchGames()"
            :max="maxPages"
            :max-pages="9"
            direction-links
          />
          <q-pagination
            class="xs q-mr-sm"
            v-model="searchSettings.page"
            @click="searchGames()"
            :max="maxPages"
            :max-pages="5"
            :boundary-numbers="true"
            :ellipses="false"
          />
        </div>
        <div class="sortBy">
          Sort by: 
          <q-select
            class="q-ml-sm"
            v-model="searchSettings.sortBy"
            @update:model-value="searchGames()"
            toggle-color="primary"
            :options="sortByOptions"
          />
        </div>
      </div>
    </div>
    <div class="spinner">
      <!-- <div class="card_container">
        <div class="card_wrapper" v-for="(game, index) in showGames"
          :key="index">
            <ItemCard
            :gameInfo="game"
            :shopInfo="stores.filter((shop) => {return shop.storeID === game.storeID})[0]"
            />
          </div>
        </div> -->
      <div class="card_container">
        <div class="card_wrapper" v-for="(game, index) in showGroups"
          :key="index">
            <ItemCard
              :showByGroup="true"
              :gameInfo="game"
              :shopInfo="stores"
            />
            <!-- <pre>{{game}}</pre> -->
          </div>
        </div>
    </div>
    <div class="pagination">
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          class="gt-xs"
          v-model="searchSettings.page"
          @click="searchGames()"
          :max="maxPages"
          :max-pages="9"
          direction-links
        />
          <q-pagination
            class="xs"
            v-model="searchSettings.page"
            @click="searchGames()"
            :max="maxPages"
            :max-pages="7"
            :boundary-numbers="false"
            :ellipses="true"
          />
        <!-- <pre>{{currentPage}}</pre> -->
      </div>
    </div>
  <q-inner-loading class="preloader" :showing="false" />
  </div>
</template>

<script>
import { ref, toRef } from '@vue/reactivity'
import ItemCard from './ItemCard.vue'
import config from '../config'
export default{
  components: {
    ItemCard
  },
  props: {
    passSearchSettings: {
      type: Object
    },
    passStores: {
      type: Array
    }
  },
  setup(props) {
    const sortByOptions = [
              {label: 'Deal Rating', value: 'Deal Rating'},
              {label: 'Title', value: 'Title'},
              {label: 'Savings', value: 'Savings'},
              {label: 'Price', value: 'Price'},
              {label: 'Metacritic', value: 'Metacritic'},
              {label: 'Steam Rating', value: 'Reviews'},
              {label: 'Release', value: 'Release'},
              {label: 'Store', value: 'Store'},
            ]
    const searchSettings = toRef(props, 'passSearchSettings')
    const stores = toRef(props, 'passStores')
    const searchText = ref('')
    const showGames = ref([])
    const showGroups = ref([])
    const maxPages = ref(0)
    // const currentPage = ref(1)
    const API_Section = {
      List_of_Deals: 'deals?',
      Deal_Lookup: 'deals?',
      List_of_Games: 'games?',
      Game_Lookup: 'games?',
      Multiple_Game_Lookup: 'games?',
      Stores_Info: 'stores',
    }

    searchGames()
    getStores(stores)

    function searchGames() {
      searchWithParams(showGames, maxPages)
    }


    function searchWithParams(output, maxPages) {
      const URLFabric = new config.API_Fabric()
      searchSettings.value.page > maxPages ? searchSettings.value.page = maxPages : null
      const api_params = {
        pageNumber: searchSettings.value.page,
        onSale: searchSettings.value.onSale,
        lowerPrice: searchSettings.value.priceRange.min,
        upperPrice: searchSettings.value.priceRange.max,
        metacritic: searchSettings.value.metacriticRating,
        steamRating: searchSettings.value.steamRating,
        sortBy: searchSettings.value.sortBy.value,
        storeID: (searchSettings.value.showFromShop.length > 0) ? searchSettings.value.showFromShop.toString() : undefined,
        title: searchSettings.value.title,
      }
      const fetch_options = {
        method: 'GET',
        redirect: 'follow'
      }
      const fetch_url = URLFabric.createURL(API_Section.List_of_Deals, api_params)
      config.setToLocalstorage("searchSettings", searchSettings.value)
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
        id
      }
      const fetch_url = URLFabric.createURL(API_Section.Deal_Lookup, api_params)
      const fetch_options = {
        method: 'GET',
        redirect: 'follow'
      }

      sendOnServer(fetch_url, fetch_options)
    }
    // searchGames()
    // getAllGames(showGames, maxPages, currentPage)
    // getStores(stores)
    // getDetailGameInfo('RdTbnfxjbPgSZJ%2Fi%2BibOa9cwLng0aGCcKUws2MdngN4%3D')
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
        // response.headers.forEach(header => console.log(header))
        return response.json()
        })
      .then((result) => {
        console.log(result);
        groupResults(result)
        output.value = result
        })
    }

    function groupResults(listOfGames){
      console.log('list: ', listOfGames);
      let newGamesObject = {}
      // {
      //   title: [{},{}]
      // }
      for (let index = 0; index < listOfGames.length; index++) {
        const element = listOfGames[index];
        if(newGamesObject.hasOwnProperty(element.title)){
          newGamesObject[element.title].push(element)
        } else {
          newGamesObject[element.title] = [element]
        }
      }
      // console.log('Is ready?', newGamesObject);
      showGroups.value = newGamesObject
    }
    // function changeValue() {
    //   console.log('showFromShop', showFromShop.value);
    //   console.log('showFromShop toString = ', showFromShop.value.toString());

    // function onSubmit() {
    //   console.log('submit');
    // }
    // }

    return {
      showGames,
      stores,
      maxPages,
      // currentPage,
      searchSettings,
      showGroups,
      sortByOptions,
      searchText,
      searchGames,
      // onSubmit,
      // changeValue
    }
  }
}
</script>

<style scoped>
.card_wrapper{
  width: 25%;
}
@media screen and (max-width: 1550px) {
  .card_wrapper{
    width: 33.33%;
  }
}
@media screen and (max-width: 1240px) {
  .card_wrapper{
    width: 50%;
  }
}
@media screen and (max-width: 920px) {
  .card_wrapper{
    width: 80%;
  }
  .card_container{
    justify-content: center;
  }
}
@media screen and (max-width: 570px) {
  .card_wrapper{
    width: 100%;
  }
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
.sortBy{
  display: flex;
  align-items: center;
}
</style>