import Vue from 'vue'


import sideBar from '../components/sideBar.vue'
import bottomBar from '../components/bottomBar.vue'
import profilPendaftar from '../components/profilPendaftar.vue'



// const components = { BlMain, BlRegion, ... }

const components = {sideBar, bottomBar, profilPendaftar}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
