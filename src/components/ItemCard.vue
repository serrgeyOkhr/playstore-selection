<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-img
        fit="contain"
        height="120px"
        :src="game.thumb"
      />

      <q-card-section>
        <div class="text-overline text-orange-9">Overline</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{game.title}}</div>
        <div class="descriptionContainer text-caption q-mb-md">
          <div>
            <span v-if="game.isOnSale" class="text-red-5"> Распродажа! </span>
            <span>В магазине {{shop.storeName}}</span>
          </div>
          <div class="storeImgContainer">
            <q-img :src="'https://www.cheapshark.com/'+shop.images.logo" alt=""/>
          </div> 
        </div>
        <!-- <div class="raiting">
          <q-rating
            v-model="game.dealRating"
            :max="10"
            icon-selected="star"
            icon-half="star_half"
          ></q-rating>
        </div> -->
        <div class="price">
          Цена:
          <span class="normalPrice q-mr-sm">{{game.normalPrice}}$</span>
          <span class="salePrice text-h5 text-red-7">{{game.salePrice}}$</span>
        </div>
      </q-card-section>

      <!-- <q-card-actions>
        <q-btn flat color="dark" label="Share" />
        <q-btn flat color="primary" label="В магазин" />

        <q-space />

        <q-btn
          color="grey"
          round
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded"
        />
      </q-card-actions> -->
    </q-card>
    <!-- <pre>{{shop}}</pre> -->
  </div>
</template>

<script>
import { ref, toRef } from '@vue/reactivity'
import { toNumber } from '@vue/shared'
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
    },
    setup(props) {
      const game = toRef(props, 'gameInfo')
      const shop = toRef(props, 'shopInfo')

      toNumber(game.value.dealRating, game)

      function toNumber(str, output){
        output.value.dealRating = Number(str)
      }
      return {
        expanded: ref(false),
        game,
        shop,
        
      }
    }
  }
</script>

<style scoped>
.normalPrice {
text-decoration: line-through;
}
.storeImgContainer{
  width: 20%;
  max-height: 60px;
  overflow: hidden;
}
img{
  width: 100%;
  max-height: 100%;
  object-fit: contain;
}
.descriptionContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
}
</style>