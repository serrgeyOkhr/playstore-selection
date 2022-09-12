<template>
  <q-layout>
    <q-header
      elevated
      class="bg-black"
    >
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="arrow_back"
          @click="$router.go(-1)"
        />
        <q-toolbar-title>Игры выгодно!</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page>
        <div
          class="page"
          :style="{ 'background-image': 'url(' + steamInfo?.background + ')' }"
        >
          <div class="container">
            <div class="gameTitle q-mb-md">
              <span class="text-h3">{{ steamInfo?.name }}</span>
            </div>
            <div class="presentGame">
              <div class="gameImgs q-pr-lg">
                <q-carousel
                  swipeable
                  animated
                  arrows
                  v-model="slide"
                  thumbnails
                  infinite
                  navigation
                  :height="'350px'"
                >
                  <q-carousel-slide
                    class="carouselSlide"
                    v-for="(img, index) in steamInfo?.screenshots"
                    :key="index"
                    :name="index"
                    :img-src="img.path_thumbnail"
                  />
                </q-carousel>
              </div>
              <div class="gameDescription">
                <div class="q-mb-md header_img">
                  <q-img
                    fit
                    :src="steamInfo?.header_image"
                  />
                </div>
                <div class="gameShortDesc">
                  {{ steamInfo?.short_description }}
                </div>
                <div>
                  <span class="text-h5"
                    >Lowest price ever:
                    {{ gameInfo?.cheapestPriceEver.price }} $</span
                  >
                </div>
              </div>
            </div>
            <!-- <div class="itemTitle flex"> -->
            <!-- <pre> {{ steamInfo }} </pre> -->
            <div class="gameInfo">
              <div class="bigDescription">
                <h2>About</h2>
                <span
                  class="text-body1"
                  v-html="steamInfo?.about_the_game"
                ></span>
                <span class="text-body1"> </span>
              </div>

              <!-- <button @click="checkConnection">Проверить соединение</button> -->
            </div>
            <div class="price_place">
              <span class="text-h5"> Список всех магазинов: </span>
              <div class="card_container">
                <q-card
                  class="my-card q-ma-md"
                  v-for="(game, index) in gameInfo?.deals"
                  :key="index"
                >
                  <!-- <q-img
                    fit="contain"
                    height="150px"
                    :src="game.thumb"
                    /> -->

                  <div class="q-pa-md">
                    <div class="descriptionContainer text-caption q-mb-md">
                      <div class="storeImgContainer">
                        <q-img
                          :src="
                            'https://www.cheapshark.com/' +
                            stores.filter(
                              (shop) => game.storeID === shop.storeID
                            )[0]?.images.logo
                          "
                          alt=""
                        />
                      </div>
                      <div>
                        <span
                          v-if="game.retailPrice - game.price != 0"
                          class="text-red-5"
                        >
                          Распродажа! </span
                        ><br />
                        <span class="text-body1"
                          >В магазине
                          {{
                            stores.filter(
                              (shop) => game.storeID === shop.storeID
                            )[0]?.storeName
                          }}</span
                        >
                      </div>
                    </div>
                    <div class="price">
                      Цена:
                      <span
                        v-if="game.retailPrice - game.price != 0"
                        class="normalPrice q-mr-sm text-strike"
                        >{{ game.retailPrice }}$</span
                      >
                      <span class="salePrice text-h5 text-red-7"
                        >{{ game.price }}$</span
                      >
                    </div>
                  </div>
                  <q-separator />
                </q-card>
              </div>
            </div>
          </div>
        </div>
        <!-- <q-img :src="steamInfo?.background"></q-img> -->
        <!-- </div> -->
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
  import { ref } from '@vue/reactivity';
  import { useRoute } from 'vue-router';
  import config from '../config';

  export default {
    setup() {
      const gameInfo = ref(null);
      const steamInfo = ref(null);
      const route = useRoute();
      const slide = ref(0);
      const gameID = ref(0);
      const steamID = ref(0);
      const stores = ref([]);
      const showMore = ref('больше');

      getStores(stores);
      getGameID(route, gameID);
      getGameInfo(gameID, gameInfo).then(() => {
        getSteamID(gameInfo, steamID);
        // getSteamInfo(steamID, steamInfo)
        getLocalSteamInfo(steamID, steamInfo);
        // console.log(steamID.value);
      });

      function getSteamID(gameInfo, output) {
        output.value = Number(gameInfo?.value?.info?.steamAppID);
      }
      function getGameID(route, output) {
        output.value = Number(route.params.id);
      }

      function changeDescription() {
        if (showMore.value === 'больше') {
          showMore.value = 'меньше';
        } else {
          showMore.value = 'больше';
        }
      }

      async function getLocalSteamInfo(gameID, output) {
        const gameInfoURL = `https://server-for-cinema-app.herokuapp.com/api/getSteamInfo?appids=${gameID.value}`;
        // console.log(gameInfoURL);
        let myHeaders = new Headers({
          'Content-Type': 'application/json',
        });
        const params = {
          method: 'GET',
          headers: myHeaders,
          mode: 'cors',
        };
        fetch(gameInfoURL, params)
          .then((response) => response.json())
          .then((result) => {
            console.log('got from my server', result);
            output.value = result[gameID.value].data;
          });
        // await sendOnServer(gameInfoURL, params, output)
      }

      function checkConnection() {
        const gameInfoURL = `http://localhost:5000/api/getSteamInfo?appids=8870`;
        let myHeaders = new Headers({
          'Content-Type': 'application/json',
        });
        const params = {
          method: 'GET',
          headers: myHeaders,
          mode: 'cors',
        };
        fetch(gameInfoURL, params)
          .then((response) => response.json())
          .then((result) => {
            console.log('got from my server', result);
            // output.value = result[gameID.value].data
          });
      }

      async function getGameInfo(gameID, output) {
        const URLFabric = new config.API_Fabric();
        const params = {
          id: gameID.value,
        };

        const gameInfoURL = URLFabric.createURL(
          config.API_Section.Game_Lookup,
          params
        );

        await sendOnServer(gameInfoURL, params, output);
      }

      async function sendOnServer(url, params, output = ref('')) {
        await fetch(url, params)
          .then((response) => {
            // console.log(response)
            return response.json();
          })
          .then((result) => {
            console.log('gameInfo', result);
            output.value = result;
          });
      }

      function getStores(output) {
        const URLFabric = new config.API_Fabric();
        const fetch_url = URLFabric.createURL(config.API_Section.Stores_Info);
        const fetch_options = {
          method: 'GET',
          redirect: 'follow',
        };

        sendOnServer(fetch_url, fetch_options, output);
      }

      return {
        gameInfo,
        slide,
        stores,
        steamInfo,
        checkConnection,
        changeDescription,
        showMore,
      };
    },
  };
</script>

<style scoped>
  .page {
    background-repeat: no-repeat;
    background-size: cover;
    min-height: calc(100vh - 50px);
    padding: 20px;
  }
  .container {
    width: 1140px;
    margin: 0 auto;
    background-color: rgb(240, 240, 240);
    padding: 15px;
    border-radius: 15px;
  }
  .presentGame {
    display: flex;
    background-color: #ccc;
    padding: 15px;
    /* border: 2px solid rgb(250, 250, 250); */
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    overflow: hidden;
  }
  .price_place {
    background-color: #ccc;
    padding: 15px;
    /* border: 2px solid rgb(250, 250, 250); */
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
  }

  .gameImgs {
    width: 60%;
    border-top-left-radius: 15px;
    overflow: hidden;
  }
  .gameDescription {
    width: 40%;
    display: flex;
    flex-direction: column;
    border-top-right-radius: 15px;
    overflow: hidden;
  }
  .itemTitle {
    display: flex;
    width: 100%;
  }
  .gameTitle {
    display: flex;
    justify-content: center;
  }
  .my-card {
    width: 45%;
  }
  .card_container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
  }
  .descriptionContainer {
    display: flex;
    align-items: center;
  }
  .storeImgContainer {
    width: 15%;
    margin-right: 25px;
  }
  .gameInfo {
    display: flex;
    flex-direction: column;
    padding: 10px 15px 10px 15px;
    background-color: rgb(236, 234, 234);
  }
  .link_alike {
    border: none;
    background-color: transparent;
    text-decoration: underline;
    color: #027be3;
  }
  .link_alike:hover {
    cursor: pointer;
    text-decoration: underline;
  }
  .carouselSlide {
    background-size: contain;
    background-repeat: no-repeat;
  }
</style>
