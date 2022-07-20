<template>
  <div class="q-pa-md row items-start q-gutter-md card">
    <q-card
    class="my-card"
    flat
    bordered
    >
      <q-img
        fit="contain"
        height="120px"
        :src="games[0].thumb"
        @click="card= true"
      />

      <q-card-section>
        <div class="text-h5 q-mt-sm q-mb-xs">{{games[0].title}}</div>
      </q-card-section>
      <q-separator />
      <q-card-section >
        <div class="flex justify-between items-center">
          <span class="text-h6">Metacritic score: </span>
          <q-circular-progress
            show-value
            class="text-light-blue-1 text-weight-bold q-ma-md"
            :value="+games[0].metacriticScore"
            size="50px"
            color="yellow-5"
            center-color="dark"
          />
        </div>
        <div class="flex justify-between items-center">
          <span class="text-h6">Steam score: </span>
          <q-circular-progress
            show-value
            class="q-ma-md text-blue-grey-9"
            :value="+games[0].steamRatingPercent"
            size="50px"
            color="blue-grey-9"
          />
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="flex justify-end">
          <q-btn @click="card= true">Show Stores</q-btn>
        </div>
        <div class="flex justify-end">
          <q-btn :to="{ name: 'gamePage', params: { id: games[0].gameID }}">More...</q-btn>
        </div>
      </q-card-section>
    </q-card>

    <q-dialog v-model="card" class="overflow-auto">
      <q-card class="my-card q-ma-md" v-for="(game,index) in games" :key="index">
        <q-img
        fit="contain"
        height="150px"
        :src="game.thumb"
        />

      <q-card-section>
        <div class="text-overline text-orange-9">Overline</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{game.title}}</div>
        <div class="descriptionContainer text-caption q-mb-md">
          <div>
            <span v-if="game.isOnSale === '1'" class="text-red-5"> Распродажа! </span><br>
            <span>В магазине {{shops.filter((shop) => game.storeID === shop.storeID)[0]?.storeName}}</span>
          </div>
          <div class="storeImgContainer">
            <q-img
              :src="'https://www.cheapshark.com/'+shops.filter((shop) => game.storeID === shop.storeID )[0]?.images.logo"
              alt=""
            />
          </div> 
        </div>
        <div class="price">
          Цена:
          <span v-if="game.isOnSale === '1'" class="normalPrice q-mr-sm">{{game.normalPrice}}$</span>
          <span class="salePrice text-h5 text-red-7">{{game.salePrice}}$</span>
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
    </q-dialog>
  </div>
</template>

<script>
import { ref, toRef } from '@vue/reactivity'
  export default{
    props: {
      gameInfo: {
        type: Object
      },
      shopInfo: {
        type: Object,
        default: {
          title: '',
          images: ''
        }
      },
      showByGroup: {
        type: Boolean
      }
    },
    setup(props) {
      const games = toRef(props, 'gameInfo')
      const shops = toRef(props, 'shopInfo')
      const card = ref(false)
      // console.log(games);
      // console.log(shops.value);
      // toNumber(game.value.dealRating, game)

      function toNumber(str, output){
        output.value.dealRating = Number(str)
      }
      return {
        expanded: ref(false),
        games,
        card,
        shops,
        
      }
    }
  }
</script>

<style scoped>
.card{
  min-width: 100%;
}
.q-dialog__backdrop{
  overflow: auto;
}

.my-card{
  width: 100%;
}
.normalPrice {
text-decoration: line-through;
}
.storeImgContainer{
  width: 20%;
  max-width: 60px;
  overflow: hidden;
}
img{
  width: 100%;
  max-height: 100%;
  object-fit: cover;
}
.descriptionContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
}
</style>