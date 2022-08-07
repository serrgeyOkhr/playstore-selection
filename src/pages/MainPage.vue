<template>
  <!-- <div class="q-pa-md"> -->
    <q-layout view="hHh lpr lff" container style="max-height: 100vh; height: 100vh" class="shadow-2">
      <q-header elevated class="bg-black">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Игры выгодно!</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        :width="250"
        :breakpoint="500"
        show-if-above
        bordered
        elevated
        class="bg-grey-3"
      >
        <q-scroll-area class="fit">
    <div  class="control_panel">
      <div class="selectorWithParams">
        <div class="sliders_container">
          <div class="range_container">
            <span class="text-subtitle1">Select Price</span>
            <q-range
              v-model="searchSettings.priceRange"
              :min="0"
              :max="50"
              :step="0.5"
              label-always
              class="q-mt-xl q-pa-sm"
            />
          </div>
        <q-separator />
          <div class="range_container">
            <span class="text-subtitle1">Select min Steam rating</span>
            <q-slider
              v-model="searchSettings.steamRating"
              :min="0"
              :max="100"
              :step="0.5"
              label-always
              class="q-mt-xl q-pa-sm"
            />
          </div>
          <q-separator />
          <div class="range_container">
            <span class="text-subtitle1">Select min Metacritic rating</span>
            <q-slider
              v-model="searchSettings.metacriticRating"
              :min="0"
              :max="100"
              :step="0.5"
              label-always
              class="q-mt-xl q-pa-sm"
            />
          </div>
          <q-separator />
          <q-checkbox left-label v-model="searchSettings.onSale" label="On Sale" />
        </div>
      <div class="shopSelector">
        <q-checkbox left-label v-model="isShowShopSelect" label="Choose shop for select" />
        <div class="shop_container" v-if="isShowShopSelect">
          <div class="shop_item border rounded-borders q-ma-xs" v-for="(store, index) in stores" :key="index">
          <q-item tag="label" v-ripple>
            <q-item-section  side center>
              <q-checkbox v-model="searchSettings.showFromShop" :val="index+1"  />
            </q-item-section>
            <q-item-section class="flex row">
              <q-img
              class="q-mb-xs"
              :src="'https://www.cheapshark.com/'+store.images.logo"
              fit="contain"
              width="35%"
              />
              <div>
                <q-item-label>{{ store.storeName }}</q-item-label>
              </div>
            </q-item-section>
          </q-item>
            <div>
              
              </div>
          </div>
        </div>
              <!-- <q-btn @click="searchGames()">Apply</q-btn> -->
      </div>
      </div>
      <div class="bottom_section bg-grey-4">
        <q-btn @click="searchGames()" class="bg-grey-2">Find!</q-btn>
      </div>
    </div>
        </q-scroll-area>
      </q-drawer>

      <q-page-container style="max-height: 100vh; overflow: auto;">
        <q-page padding>
          <BodyVue :passSearchSettings="searchSettings" :passStores="stores" :key="reRender" />
        </q-page>
      </q-page-container>
    </q-layout>
  <!-- </div> -->
</template>

<script>
import HeaderVue from '../components/Header.vue'
import BodyVue from '../components/Body.vue'
import { ref } from '@vue/reactivity'
import config from '../config'

export default {
  name: 'store-app',
  components:{
    HeaderVue,
    BodyVue
  },
  setup () {
    const searchSettings = ref({})
    const localStorageData = config.getFromLocalstorage("searchSettings")
    searchSettings.value = localStorageData ? localStorageData : ({
      onSale: false,
      priceRange: {
        min: 0,
        max: 50
      },
      steamRating: 0,
      metacriticRating: 0,
      sortBy: {label: 'Title', value: 'Title'},
      showFromShop: [],
      page: 1,
      title: ''
     })
    const drawer = ref(false)
    const stores = ref([])
    const isShowShopSelect =ref(false)
    const API_Section = {
      List_of_Deals: 'deals?',
      Deal_Lookup: 'deals?',
      List_of_Games: 'games?',
      Game_Lookup: 'games?',
      Multiple_Game_Lookup: 'games?',
      Stores_Info: 'stores',
    }
    const reRender = ref(0)

    getStores(stores)
    function searchGames() {
      // console.log(searchSettings);
      config.setToLocalstorage("searchSettings", searchSettings.value)
      reRender.value = Math.random()
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

    function sendOnServer(url, params, output=ref('')) {
      fetch(url, params)
      .then(response => response.json())
      .then((result) => {
        // console.log('stores', result)
        output.value = result
        })
    }

    return {
      drawer,
      stores,
      isShowShopSelect,
      reRender,
      searchSettings,
      searchGames
    }
  }
}
</script>

<style>
.border {
  border: 1px solid;
}
.q-dialog__inner{
  overflow: auto;
}
.flex {
  display: flex;
  flex-direction: row;
}
.control_panel{
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 50px);
}
.bottom_section{
  position: sticky;
  padding: 10px;
  bottom: 0;
  border: 1px solid;
  border-radius: 5px;
  background-color:hwb(208 94% 0%);
}

</style>