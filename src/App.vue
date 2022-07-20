<template>
  <!-- <div class="q-pa-md"> -->
    <router-view></router-view>
</template>

<script>
// import HeaderVue from './components/Header.vue'
// import BodyVue from './components/Body.vue'
// import { ref } from '@vue/reactivity'
// import config from './config'
// const menuList = [
//   {
//     icon: 'inbox',
//     label: 'Inbox',
//     separator: true
//   },
//   {
//     icon: 'send',
//     label: 'Outbox',
//     separator: false
//   },
//   {
//     icon: 'delete',
//     label: 'Trash',
//     separator: false
//   },
//   {
//     icon: 'error',
//     label: 'Spam',
//     separator: true
//   },
//   {
//     icon: 'settings',
//     label: 'Settings',
//     separator: false
//   },
//   {
//     icon: 'feedback',
//     label: 'Send Feedback',
//     separator: false
//   },
//   {
//     icon: 'help',
//     iconColor: 'primary',
//     label: 'Help',
//     separator: false
//   }
// ]



// export default {
//   name: 'store-app',
//   components:{
//     HeaderVue,
//     BodyVue
//   },
//   setup () {
//     const searchSettings = ref({
//       onSale: false,
//       priceRange: {
//         min: 0,
//         max: 50
//       },
//       steamRating: 65,
//       metacriticRating: 65,
//       sortBy: {label: 'Title', value: 'Title'},
//       showFromShop: []
//      })
//     const drawer = ref(false)
//     const stores = ref([])
//     const isShowShopSelect =ref(false)
//     // const showFromShop = ref([])
//     const API_Section = {
//       List_of_Deals: 'deals?',
//       Deal_Lookup: 'deals?',
//       List_of_Games: 'games?',
//       Game_Lookup: 'games?',
//       Multiple_Game_Lookup: 'games?',
//       Stores_Info: 'stores',
//     }
//     const reRender = ref(0)

//     getStores(stores)
//     function searchGames() {
//       console.log(searchSettings);
//       reRender.value = Math.random()
//     }
//     function getStores(output) {
//       const URLFabric = new config.API_Fabric()
//       const fetch_url = URLFabric.createURL(API_Section.Stores_Info)
//       const fetch_options = {
//         method: 'GET',
//         redirect: 'follow'
//       }

//       sendOnServer(fetch_url, fetch_options, output)
//     }

//     function sendOnServer(url, params, output=ref('')) {
//       fetch(url, params)
//       .then(response => response.json())
//       .then((result) => {
//         // console.log('stores', result)
//         output.value = result
//         })
//     }

//     return {
//       drawer,
//       menuList,
//       stores,
//       isShowShopSelect,
//       reRender,
//       searchSettings,
//       searchGames
//     }
//   }
// }
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
/* .control_panel{
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
} */

</style>