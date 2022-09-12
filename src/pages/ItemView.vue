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
      <q-page padding>
        <div class="container">
          <div class="itemTitle flex">
            <div class="gameImgs q-pr-lg">
              <div>
                <div class="q-mb-md">
                  <q-img
                    fit
                    :src="steamInfo?.header_image"
                  />
                </div>
                <div>
                  <q-carousel
                    swipeable
                    animated
                    arrows
                    v-model="slide"
                    thumbnails
                    infinite
                    navigation
                  >
                    <q-carousel-slide
                      v-for="(img, index) in steamInfo?.screenshots"
                      :key="index"
                      :name="index"
                      :img-src="img.path_thumbnail"
                    />
                  </q-carousel>
                </div>
              </div>
              <!-- <div class="historical_block">
                <p class="text-h5">Lowest price ever:</p>
                <span class="text-body1"> {{gameInfo?.cheapestPriceEver.price}} </span>
                <span class="text-body1"> {{gameInfo?.cheapestPriceEver.date}} </span>
              </div> -->
            </div>
            <div class="gameInfo flex">
              <div class="q-mb-md">
                <span class="text-h3">{{ gameInfo?.info.title }}</span>
              </div>
              <div>
                <span class="text-body1">
                  {{ steamInfo?.short_description }}
                </span>
                <p class="text-h5">
                  Lowest price ever: {{ gameInfo?.cheapestPriceEver.price }} $
                </p>
                <span class="text-body1"> </span>
              </div>

              <!-- <button @click="checkConnection">Проверить соединение</button> -->

              <div class="price_place q-mt-md">
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

                    <q-card-section>
                      <!-- <div class="text-overline text-orange-9">Overline</div> -->
                      <!-- <div class="text-h5 q-mt-sm q-mb-xs">{{game.title}}</div> -->
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
                    </q-card-section>

                    <!-- <q-card-section class="q-pt-none">
                        <div class="text-subtitle1">
                          $・Italian, Cafe
                        </div>
                        <div class="text-caption text-grey">
                          Small plates, salads & sandwiches in an intimate setting.
                        </div>
                      </q-card-section> -->

                    <q-separator />

                    <!-- <q-card-actions align="right">
                        <q-btn v-close-popup flat color="primary" label="Reserve" />
                        <q-btn v-close-popup flat color="primary" round icon="event" />
                      </q-card-actions> -->
                  </q-card>
                </div>
              </div>
            </div>
          </div>
          <!-- <q-img :src="steamInfo?.background"></q-img> -->
        </div>
        <!-- <pre>{{steamInfo}}</pre> -->
        <!-- <pre>{{gameInfo}}</pre> -->
        <!-- <pre>{{stores}}</pre> -->
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

      // async function getSteamInfo(gameID, output) {
      //   const gameInfoURL = `https://store.steampowered.com/api/appdetails?appids=${gameID.value}`;
      //   // console.log(gameInfoURL);
      //   const params = {
      //     method: 'GET',
      //     headers: {
      //       'Access-Control-Allow-Origin':
      //         'https://calm-refuge-07361.herokuapp.com',
      //       // 'Content-Type':	'application/json;',
      //     },
      //     mode: 'cors',
      //   };
      //   fetch(gameInfoURL, params)
      //     .then((response) => {
      //       console.log(response);
      //       return response.json();
      //     })
      //     .then((result) => {
      //       console.log('gameInfo', result);
      //       output.value = result[gameID.value].data;
      //     });
      //   // await sendOnServer(gameInfoURL, params, output)
      // }

      async function getLocalSteamInfo(gameID, output) {
        const gameInfoURL = `https://server-for-cinema-app.herokuapp.com/api/getSteamInfo?appids=${gameID.value}`;
        // console.log(gameInfoURL);
        let myHeaders = new Headers({
          "Content-Type": "application/json",
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
            output.value = result[gameID.value].data
          });
        // await sendOnServer(gameInfoURL, params, output)
      }

      function checkConnection() {
        const gameInfoURL = `http://localhost:5000/api/getSteamInfo?appids=8870`;
        let myHeaders = new Headers({
          "Content-Type": "application/json",
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
        checkConnection
      };
    },
  };
</script>

<style>
  .gameImgs {
    width: 40%;
    display: flex;
    flex-direction: column;
  }
  .itemTitle {
    display: flex;
    width: 100%;
  }
  .my-card {
    width: 45%;
  }
  .card_container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
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
    flex-direction: column;
    width: 60%;
  }
</style>
