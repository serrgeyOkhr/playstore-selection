<template>
  <!-- <div class="q-pa-md"> -->
    <q-layout view="hHh lpr lff" container style="height: 100vh" class="shadow-2 rounded-borders">
      <q-header elevated class="bg-black">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Игры выгодно!</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        :width="200"
        :breakpoint="500"
        
        bordered
        overlay
        class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <q-list>

            <template v-for="(menuItem, index) in menuList" :key="index">
              <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index"  v-if="menuItem.separator" />
            </template>

          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <BodyVue></BodyVue>
        </q-page>
      </q-page-container>
    </q-layout>
  <!-- </div> -->
</template>

<script>
import HeaderVue from './components/Header.vue'
import BodyVue from './components/Body.vue'
import { ref } from '@vue/reactivity'

const menuList = [
  {
    icon: 'inbox',
    label: 'Inbox',
    separator: true
  },
  {
    icon: 'send',
    label: 'Outbox',
    separator: false
  },
  {
    icon: 'delete',
    label: 'Trash',
    separator: false
  },
  {
    icon: 'error',
    label: 'Spam',
    separator: true
  },
  {
    icon: 'settings',
    label: 'Settings',
    separator: false
  },
  {
    icon: 'feedback',
    label: 'Send Feedback',
    separator: false
  },
  {
    icon: 'help',
    iconColor: 'primary',
    label: 'Help',
    separator: false
  }
]



export default {
  name: 'store-app',
  components:{
    HeaderVue,
    BodyVue
  },
  setup () {
    const drawer = ref(false)
    return {
      drawer,
      menuList
    }
  }
}
</script>

<style>
.border {
  border: 1px solid;
}
</style>